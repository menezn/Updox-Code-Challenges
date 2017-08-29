Prime Number Challenge:

Takes in two arguments commandline (Main in WheelGeneration)
  <startingValue> <endingValue>

For the Prime Number challenge I opted to trying out a sieving/wheel-generation
algorithm. I also realized that I should use concurrency in order to abstract
the generation of primes from the user.

I use a total of 3 threads, the main thread hosts the user program, the other
two do prep work and then the generation of primes.

Once I wrote the code for everything I realized that the generation thread would
starve the main thread which is highly undesirable. I wrote a simple class that
is comprised of two locks, one for basic use and one for priority use. I then
abstracted all the concepts into the class as it handles most of the overhead of
using priorities. The main function in this class is the "shouldStopAndWait"
which does as it's named. The class only handles priorities if the basic lock
holders are generous enough to call that function.

With everything running I realized it was still too slow for my liking. I then
looked into using local memory caching with the CPU in order to speed things up
with hardware optimizations. I found the sudo code for the algorithm and implemented
it using my threading design with priority locks and now it can generate the first
million primes in under .2s most of the time. The generic algorithm of checking
all the numbers below the square root of n, even optimized to only use primes,
ran all the numbers under 1 million in about 13s.

As for the isPrime function I opted to use the generic algorithm of checking all
primes below the square root. Mainly because I wanted the user to be able to
request any number, even a number that has not been checked before. This can be
seen in "IsPrimeTest_6" which runs the upper limit of an int in java (2147483647)
and manages to get it done really quickly. This is because the prep thread
generates all the primes below the square root of the upper limit. A simple sieve
can produce all those numbers in a fraction of a second so in theory isPrime
should be able to check any one number quickly but not when used in a range.

UI Challenge:

This challenge was the hardest for me as I have never programed in javascript
before. I decided to use react as I knew it was something that you suggested that
I should use. It was very confusing at first so I started arranging the render
functions and css so that I could see something similar to the photo given.

Once I got something roughly like the prompt photo I started trying to make it
interactable. The first hurdle that I had to jump over was figuring out that
sub components should not hold a state and only inherit the props of the parent
App. Once I learned this, the actual structure of the code was easy, it was just
learning javascript that was in the way. Once I got a hang of things the programming
wasn't too hard.

The next big hurdle was polishing off the html and css portion so it resembled
as closely to the photo as I could make it. Otherwise I really enjoyed seeing the
UI come together.
