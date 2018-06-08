package houses;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class House extends JFrame {
	House(String s) {
		super(s);
		setLayout(null);
		setSize(500,500);
		setVisible(true);
		this.setDefaultCloseOperation(EXIT_ON_CLOSE);
		this.setResizable(false);

		Button building = new Button("Build");
		building.setBounds(10,10,150,50);
		add(building);

		building.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				new Realone("House");
			}
		});
	}

	public static void main (String[] args) {
		new House("House");
	}
}
