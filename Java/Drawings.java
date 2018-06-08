import javax.swing.JFrame;

public class Drawings {
	public static void main (String[] args){
		JFrame f = new JFrame();
		f.setSize(500,500);
		f.setTitle("House");
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		CustomComponent h = new CustomComponent();
		f.add(h);
		f.setVisible(true);
	}
}