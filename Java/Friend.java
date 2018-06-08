class Friend {
	public String Name;
	private String Secret;

	public String get_secret(){
		return Secret;
	}
	public Friend(String Name, String Secret){
		this.Name = Name;
		this.Secret = Secret;
	}

	public void show_friend(){
		System.out.println("Friends name is " + Name);
	}

	public static void main(String args[]){
		BestFriend yeah = new BestFriend("Kir", "he loves anime");
		yeah.show_best_friend();
	}
}

class BestFriend extends Friend {
	public BestFriend(String Name, String Secret){
		super(Name, Secret);
	}

	public void show_best_friend(){
		super.show_friend();
		System.out.println("Secret is "+ super.get_secret());
	}
}
