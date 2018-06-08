public class Third{
	public static void main(String[] args) {
			//1. Q: 2^n
 
			int ask = (int)(Math.random()*100);
			do{
				ask = (int)(Math.random()*100);
			}while(ask >= 32 && ask >0);
		//Wait until get
			for (int i = 0; i <= 32; i++ ) {
				if(ask == i){
					//Precision formater '%.Nf'
					System.out.printf("Power of 2 in %d is %.0f \n", ask, Math.pow(2, ask));
				}
			}
 
		//2. Q: !n<10
 
		//Psycle until n>0
			double rand_n, res = 1;		
			do{
				rand_n = (int)(Math.random()*10);
			}while(rand_n == 0);
		//Log
			System.out.printf("Random number is %.0f\n", rand_n);
		//Count
			for (int i = 1; i < 10; i++ ) {
				if(i <= rand_n){
					res *= i;
					if(i == rand_n){
						System.out.printf("Factorial of %d = %.0f \n", i, res);
					}
				}
			}
 
		//3. Q: a (+, -, *) b
 
			int a = (int)(Math.random()*1000), b = (int)(Math.random()*1000);
		//Count
			if(a>b){
				int add = a + b;
				int sub = a - b;
				int mult = a * b;
				System.out.printf("Addition: %d + %d = %d\nSubtraction: %d - %d = %d\nMultiplication: %d * %d = %d\n", a, b, add, a, b, sub, a, b, mult);
			}else{
				int add = b + a;
				int sub = b - a;
				int mult = a * b;
				System.out.printf("Addition: %d + %d = %d\nSubtraction: %d - %d = %d\nMultiplication: %d * %d = %d\n", b, a, add, b, a, sub, b, a, mult);
			}
 
		//4. Q: Time of falling when H is ???
			//? For?
			double g = 9.8;
			double H = (int)(Math.random()*100);
			double time = H/g;
			System.out.printf("Falling time of mass point from H = %.0f meters is %.1f seconds.\n", H, time);
 
		//5. Q: a^2+b^2=c^2
 
			int cat_a = (int)(Math.random()*100), gip_c = (int)(Math.random()*100), cat_b;
 
			cat_b = (int)(Math.sqrt((Math.pow(gip_c, 2))) - (Math.pow(cat_a,2)));
			System.out.printf("B from a^2+b^2=c^2 equals %d, where A = %d and C = %d\n", cat_b, cat_a, gip_c);
	}
}