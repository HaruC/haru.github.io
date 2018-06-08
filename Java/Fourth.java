class Fourth{

	public static double math_me(){
		//1. Fermi
		double a = 2.5,b = 2.5 ,c;

		for (double i =1 ; i <= 100 ; i++ ) {
			double left = Math.pow(a,i) + Math.pow(b, i);
			double right = Math.sqrt(left);
			//if( left == right){
				System.out.printf("c = %.5f a^%.0f+b^%.0f = %.2f \n", right, i, i, left);
			//}
		}		
		
		//2. Series
		double ends = 1.0;
		double max = 10000;
		for (double i = 2; i <= max ; i++ ) {
			double temp = 1.0/i;
			if(i!=max){
				if( i % 2 == 0){
					ends -=temp;
				}else{
					ends +=temp;
				}
			}
			if(i == max){
				System.out.printf("%.10f on position %.10f\n", ends, temp);
			}
		}
		return ends;
	}
 
	public static void main( String args[]){
		math_me();
	}
}