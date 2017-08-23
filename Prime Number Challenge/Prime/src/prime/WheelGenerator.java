package prime;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class WheelGenerator implements PrimeNumberGenerator {
	
	private class IntegerLimit {
		public IntegerLimit(int i, int n) {
			value = i;
			limit = n;
		}
		
		public Integer value;
		public int limit;
	}
	
	private static List<Integer> primes = new ArrayList<Integer>();
	private static List<IntegerLimit> primeQueue = new LinkedList<IntegerLimit>();
	private static Set<Integer> smallPrimes = new HashSet<Integer>(Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23));
	private static int wheelCircumference = 223092870;
	private static int MAX_VALUE = Integer.MAX_VALUE;
	private static Set<Integer> currentSieve = new HashSet<Integer>();
	
	private static ReentrantReadWriteLock primeLock = new ReentrantReadWriteLock();
	private static ReentrantLock queueLock = new ReentrantLock();
	private static ReentrantLock sieveLock = new ReentrantLock();

	@Override
	public List<Integer> generate(int startingValue, int endingValue) {
		
		if (endingValue < startingValue) {
			int tmp = startingValue;
			startingValue = endingValue;
			endingValue = tmp;
		}
		
		return null;
	}

	@Override
	public boolean isPrime(int value) {
		// TODO Auto-generated method stub
		
		return false;
	}
	
	public void generateWheelList() {
		IntegerLimit current;
		queueLock.lock();
	    try {
	    	current = primeQueue.get(0);
			primeQueue.remove(0);
	    } finally {
	        queueLock.unlock();
	    }
	    
	    while (primeLock.getWriteHoldCount() > 0) {
	    	try {
	    		Thread.sleep(10);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
	     }
	    
	    primeLock.readLock().lock();
	    boolean prime = true;
	    try {
	    	int i = 0;
		    float currentPrime;
		    do {
		    	currentPrime = primes.get(i);
		    	if (current.value / currentPrime < 0.0001) {
		    		prime = false;
		    		break;
		    	}
		    	i++;
		    } while(i <= current.limit);
	    } finally {
	    	primeLock.readLock().unlock();
	    }
	    
	    if (prime) {
	    	while (primeLock.getReadHoldCount() > 0) {
		    	try {
		    		Thread.sleep(10);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
		     }
	    	
	    	primeLock.writeLock().lock();
	    	try {
	    		primes.add(current.value);
	    	} finally {
	    		primeLock.writeLock().unlock();
	    	}
	    }
	}
	
	public void generatePrimaryList() {
		primes.add(2);
		int n = 2;
		int sqr = 4;
		
		for (int i = 3; i <= wheelCircumference; i+=2) {
			
			primeQueue.add(new IntegerLimit(i,n));
			
			if (i == sqr) {
				n++;
				sqr = i * i;
			}
			System.out.println(i);
		}
	}
}
