package houses;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class Realone extends JFrame {
	Realone(String s){
		super(s);
		setLayout(null);
		setSize(500,500);
		setVisible(true);
		this.setDefaultCloseOperation(DISPOSE_ON_CLOSE);
		this.setResizable(false);
	}

	public void draw_this (Graphics g) {
		g.setColor(Color.BLACK);
		g.fillRect(0,0,500,400);
		g.dispose();
	}
}