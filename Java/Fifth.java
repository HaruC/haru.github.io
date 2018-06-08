class Fifth {
	public static int rand = (int)((Math.random()*10)-1);

	public static void main (String args[]){
		switch (rand){
			case 9:
				System.out.print("Девять!");
				break;
			case 8:
				System.out.print("Восемь!");
				break;
			case 7:
				System.out.print("Семь!");
				break;
			case 6:
				System.out.print("Шесть!");
				break;
			case 5:
				System.out.print("Пять!");
				break;
			case 4:
				System.out.print("Четыре!");
				break;
			case 3:
				System.out.print("Три!");
				break;
			case 2:
				System.out.print("Два!");
				break;
			case 1:
				System.out.print("Один!");
				break;
			case 0:
				System.out.print("Ноль!");
				break;
		}
	}
}