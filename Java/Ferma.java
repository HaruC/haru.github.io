package org.levran79.task1;
 
import java.util.Scanner;
 
public class Ferma {
 
	public static final String TITLE_INFO = "n>0: ";
 
	public static final byte ARRAY_START_VALUE = 1;
 
	public static final short ARRAY_END_VALUE = 100;
 
	private final int initValue;
 
	public Ferma(int initValue) {
		this.initValue = initValue;
	}
 
	String getPrintN(int n) {
		final StringBuilder sb = new StringBuilder(Ferma.TITLE_INFO);
		sb.append(n);
		return sb.toString();
	}
 
	public void iterateA() {
		// for(_int64 a=1; a<=100; a++)
		int an = 0;
		for (int a = ARRAY_START_VALUE; a <= ARRAY_END_VALUE; a++) {
			an = mypow(a, this.initValue);
			iterateB(a, an);
		}
	}
 
	/**
	 * Power function
	 * 
	 * @param a
	 * @param initValue
	 * @return
	 */
	static int mypow(int a, int initValue) {
		int res = 1;
		int an = a;
		int n = initValue;
		while (0 != n) {
			if ((1 & n) > 0) {
				res *= an;
			}
			an *= an;
			n >>= 1;
		}
		return res;
 
	}
 
	void iterateB(int a, int an) {
		int bn = 0;
		int cn = 0;
		for (int b = a; b <= ARRAY_END_VALUE; b++) {
			bn = mypow(b, initValue);
			cn = mypow(b + 1, initValue);
			iterateC(b, cn, bn, an, a);
		}
 
	}
 
	void iterateC(int b, int cn, int bn, int an, int a) {
		int value1 = an + bn;
		for (int c = b + 1; cn <= value1; cn = mypow(++c, initValue)) {
			if (value1 == cn) {
				System.out.format("a=%3d b=%3d c=%3d  %3d+%3d=%3d\n", a, b, c, an, bn, cn);
			}
		}
 
	}
 
	public static void main(String[] args) {
 
		Scanner scanner = null;
		try{
			int n = 0;
			scanner = new Scanner(System.in);
			do{
				System.out.print(TITLE_INFO);
				n = scanner.nextInt(10);
				
			}while(n < 1);
			Ferma ferma = new Ferma(n);
			ferma.iterateA();
		}finally{
			if(null != scanner){
				scanner.close();
			}
		}
	}
 
}