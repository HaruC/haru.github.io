class Seventh {
	public static int one = (int)(Math.random());
	public static void main (String args[]) {
		new fclass2().print_this();
	}
}

class fclass3 extends Seventh {

}

class fclass2 extends fclass3 {
	public static void print_this() {
		System.out.print(one);
	}
}