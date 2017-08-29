package prime;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;

public class BlackBoxTesting {
	
	private static WheelGenerator generator = new WheelGenerator();
	@Test
	public void timeTest() {
		// 1 million time test
		generator.generate(1, 1000000);
	}

	@Test
	public void basicRangeTest() {
		List<Integer> returnType = generator.generate(1, 10);
		List<Integer> testType = Arrays.asList(2,3,5,7);
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void inverseBasicRangeTest() {
		List<Integer> returnType = generator.generate(10, 1);
		List<Integer> testType = Arrays.asList(2,3,5,7);
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void largeNumberTest() {
		List<Integer> returnType = generator.generate(7900, 7920);
		List<Integer> testType = Arrays.asList(7901, 7907, 7919);
		
		assertEquals(testType, returnType);
	}

	@Test
	public void smallRangeTest() {
		List<Integer> returnType = generator.generate(1, 200);
		List<Integer> testType = Arrays.asList(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199);
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void noRangeTest() {
		List<Integer> returnType = generator.generate(1, 1);
		List<Integer> testType = Arrays.asList();
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void negativeNumberTest_1() {
		List<Integer> returnType = generator.generate(-10, 10);
		List<Integer> testType = Arrays.asList(2,3,5,7);
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void negativeNumberTest_2() {
		List<Integer> returnType = generator.generate(-100, -10);
		List<Integer> testType = Arrays.asList();
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void EdgePrimeTest_1() {
		List<Integer> returnType = generator.generate(1, 2);
		List<Integer> testType = Arrays.asList(2);
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void EdgePrimeTest_2() {
		List<Integer> returnType = generator.generate(3, 4);
		List<Integer> testType = Arrays.asList(3);
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void EdgePrimeTest_3() {
		List<Integer> returnType = generator.generate(2, 3);
		List<Integer> testType = Arrays.asList(2,3);
		
		assertEquals(testType, returnType);
	}
	
	@Test
	public void IsPrimeTest_1() {
		assertFalse(generator.isPrime(1));
	}
	
	@Test
	public void IsPrimeTest_2() {
		assertTrue(generator.isPrime(2));
		assertFalse(generator.isPrime(4));
		assertFalse(generator.isPrime(6));
		assertFalse(generator.isPrime(8));
		assertFalse(generator.isPrime(10));
	}
	
	@Test
	public void IsPrimeTest_3() {
		assertFalse(generator.isPrime(1 ));
		assertTrue(generator.isPrime(2 ));
		assertTrue(generator.isPrime(3 ));
		assertFalse(generator.isPrime(4 ));
		assertTrue(generator.isPrime(5 ));
		assertFalse(generator.isPrime(6 ));
		assertTrue(generator.isPrime(7 ));
		assertFalse(generator.isPrime(8 ));
		assertFalse(generator.isPrime(9 ));
		assertFalse(generator.isPrime(10));
	}
	
	@Test
	public void IsPrimeTest_4() {
		assertTrue(generator.isPrime(999999937));
	}
	
	@Test
	public void IsPrimeTest_5() {
		assertTrue(generator.isPrime(1000000007));
		generator.setOff();
	}
	
	@Test
	public void IsPrimeTest_6() {
		assertTrue(generator.isPrime(2147483647));
		generator.setOff();
	}
}
