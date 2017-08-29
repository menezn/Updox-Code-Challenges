package prime;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class WheelGenerator implements PrimeNumberGenerator {
	
	private class GenerateSmallPrimesRunnable implements Runnable {

		@Override
		public void run() {
			isPrimeLock.writeLock().lock();
			try {
				// Perform preliminary Sieving of small primes <= sqrt
				isPrime = new Vector<Byte>(sqrt + 1);
				for (int i = 0; i <= sqrt; i++) isPrime.add(i, (byte) 1);
				
				// Go through all small squares
				for (int i = 2; i * i <= sqrt; i++) {
					
					if (isPrime.get(i) == 1) {
						for (int j = i * i; j <= sqrt; j += i) {
							isPrime.set(j, (byte) 0);
						}
					}
				}
			} finally {
				isPrimeLock.writeLock().unlock();
			}
		}
	}
	
	private class SegmentedSieveRunnable implements Runnable {

		@Override
		public void run() {
			// Set up for the algorithm.
			// segmentSize is important as it should adjust to a size to fit in the 
			// L1 Cache of the CPU
			int segmentSize = Math.max(sqrt, L1D_CACHE);
			
			int s = 3;
			int n = 3;
			
			sieve  = new Vector<Byte>(segmentSize);
			queue  = new Vector<Integer>();
			primes = new Vector<Integer>();
			
			// Get a lock for the prime vector
			isPrimeLock.readLock().lock();
			// For every chunk that can fit in the L1 Cache until the maximum limit
			for (int low = 0; low < MAX_VALUE; low += segmentSize) {
				
				// Safety net for killing off Threads
				if (!on) break;
				
				// default the sieve to all true
				if (sieve.size() == 0) {
					for (int i = 0; i < segmentSize; i++)
						sieve.add(   (byte) 1);
				} else {
					for (int i = 0; i < segmentSize; i++) 
						sieve.set(i, (byte) 1);
				}
				
				int high = Math.min(low + segmentSize - 1, MAX_VALUE);
				// generate primes up to the high value and then
				// add them to a prime queue
				for (; s * s <= high; s += 2) {
					if (isPrime.get(s) != null && isPrime.get(s) == 1) {
						primes.add(s);
						queue.add(s*s - low);
					}
				}
					
				// sieve the primes in the current sieve chunk
				for (int i = 0; i < primes.size(); i++) {
					int j = queue.get(i);
					
					for (int k = primes.get(i) * 2; j < segmentSize; j += k)
						sieve.set(j, (byte) 0);
					
					queue.set(i,j - segmentSize);
				}
				
				primeLock.basicWriteLock();
				// Go and and test if the current n is prime and ad it to the
				// All primes list
				for (; n <= high; n += 2 ) {
					if (sieve.get(n - low) != null && sieve.get(n - low) == 1) {
						// Test to see if we should stop writing for a priority read or write
						primeLock.shouldStopAndWait();
						allPrimes.add(n);
					}
				}
				primeLock.basicWriteLockRelease();
			}
			isPrimeLock.readLock().unlock();
		}
	}

	// Tells the class to keep working in worker threads
	private static boolean on = true;
	
	// Data Structures to sieve all the primes.
	// isPrime contains all the small prime numbers <= sqrt
	// queue stores primes to use
	// primes is the list of all primes found.
	private static Vector<Byte>     isPrime;
	private static Vector<Byte>     sieve;
	private static Vector<Integer>  queue;
	private static Vector<Integer>  primes;
	
	private static Vector<Integer> allPrimes;
	
	// Locks used for threading
	private static ReentrantReadWriteLock         isPrimeLock = new ReentrantReadWriteLock();
	private static ReentrantPriorityReadWriteLock primeLock   = new ReentrantPriorityReadWriteLock();

	
	// Thread Pool
	private static ExecutorService executor = null;
	
	// This is the size of the user's L1 cache (in bytes) for their CPU
	// This can be modified using the command line.
	private static int L1D_CACHE = 32768;
	
	// MAX_VALUE is the maximum value that a java signed int can hold.
	// sqrt is the rounded square root of the maximum limit
	private static int MAX_VALUE = 2147483647;
	private static int sqrt = 46341;
	
	public WheelGenerator() {
		// In case this is the first instance
		if (executor == null) {
			executor = Executors.newFixedThreadPool(2);
			
			allPrimes = new Vector<Integer>();
			allPrimes.add(2);
			
			// Start creating the small primes in a different thread so the user
			// Never experiences generation delays
			// Every User after the first will never experience this pre-generation
			executor.execute(new GenerateSmallPrimesRunnable());
			 
			// Start the sieving process
			executor.execute(new SegmentedSieveRunnable());
		}
	}
	
	@Override
	public List<Integer> generate(int startingValue, int endingValue) {
		
		// Reverse the limits as necessary
		if (endingValue < startingValue) {
			int tmp = startingValue;
			startingValue = endingValue;
			endingValue = tmp;
		}
		
		// Truncate all negative integers to 0
		if (startingValue < 0) startingValue = 0;
		if (  endingValue < 0)   endingValue = 0;
		
		List<Integer> returnType = new ArrayList<Integer>();
		
		// Wait until all the primes we need are calculated
		primeLock.priorityReadLock();
		
		// Occasionally ask for a priority read to check up on status
		while( allPrimes.size() == 0 || allPrimes.lastElement() < endingValue ) {
			primeLock.priorityReadLockRelease();
			try {
				Thread.sleep(30);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			primeLock.priorityReadLock();
		}
		
		int i;
		// Find the starting point that we want using binary search
		if (startingValue > 2) {
			i = WheelGenerator.binarySearch(allPrimes,startingValue);
		} else
			i = 0;
		
		// Go through the list of primes and add the ones in the specified range.
		while (allPrimes.size() > i && allPrimes.get(i) <= endingValue) {
			returnType.add(allPrimes.get(i));
			i++;
		} 
		primeLock.priorityReadLockRelease();
		
		return returnType;
	}

	public static int binarySearch(Vector<Integer> allPrimes2, int startingValue) {
		// Set up for a binary search
		int high = allPrimes.size();
		int low = 0;
		int i = allPrimes.size()/2;
				
		while (!(low == high || allPrimes.get(i) == startingValue ||
				((i > 0 && allPrimes.get(i-1) < startingValue) && 
						 (i < allPrimes.size()-1 && allPrimes.get(i) > startingValue)))) {

			if (allPrimes.get(i) > startingValue && allPrimes.get(low) <= startingValue) {
				high = i;
				i = (i+low)/2;
			} else if (allPrimes.get(i) <= startingValue && allPrimes.get(high) > startingValue) {
				low = i;
				i = (i+high)/2;
			} else {

				break;
			}
		}
		
		return i;
		
	}

	@Override
	public boolean isPrime(int value) {
		if (value == 1) return false;
		
		// Check through all of the primes below the square root of the value to see if it is prime.
		int limit = (int) (Math.sqrt(value) + 1);
		primeLock.priorityReadLock();
		
		// Checks it this way in case we request a very large prime that has not been computed yet
		for (int i = 0; i < allPrimes.size() && allPrimes.get(i) < limit ; i++) {
			if (value == allPrimes.get(i)) break;
			if (value % allPrimes.get(i) == 0) 
				return false;
		}
		primeLock.priorityReadLockRelease();
		
		return true;
	}

	public void setOff() {
		on = false;		
		executor.shutdown();
	}	
	
	public static void main(String args[]) {
		// Basic variables
		int startingValue = 0;
		int endingValue   = 1000000;
		
		// Take in two variables and parse them into our variables
		if (args.length == 2) {
			startingValue = Integer.parseInt(args[0]);
			endingValue = Integer.parseInt(args[1]);
		}
		
		// Create our generator and retrieve the primes requested
		WheelGenerator generator = new WheelGenerator();
		List<Integer> returnType = generator.generate(startingValue, endingValue);
		
		// Print out all the primes
		for (Integer i : returnType) {
			System.out.println(i);
		}
		
		// Turn of the generator to make sure all threads are turned off
		generator.setOff();
	}
}
