
import java.awt.Color; 
import java.awt.Graphics; 
import javax.swing.JFrame;
public class Sinus extends JFrame{ 
	Sinus(String s){ 
		super(s); 
		setLayout(null); 
		setSize(600,300); 
		setVisible(true); 
		this.setDefaultCloseOperation(DISPOSE_ON_CLOSE); 
		this.setResizable(false); 
		this.setLocation(100, 100); 
	} 
	public void paint(Graphics gr){ 
		int y; int j=0; int k=0; 
		gr.setColor(Color.WHITE); 
		gr.fillRect(0, 0, 600, 300); 
		gr.setColor(Color.lightGray); 
		while(j<600){
			gr.drawLine(j, 0, j, 300); 
			j+=30; 
		} 
		while(k<300){ 
			gr.drawLine(0, k, 600, k); 
			k+=30; 
		} 
		gr.setColor(Color.BLACK); 
		gr.drawLine(300, 0, 300, 300); 
		gr.drawLine(0, 150, 600, 150); 
		gr.drawLine(120, 140, 120, 160); 
		gr.drawLine(480, 140, 480, 160); 
		gr.drawString("0", 305, 165); 
		gr.drawString("-"+"\u03c0", 125, 140); 
		gr.drawString("\u03c0", 485, 140); 
		gr.setColor(Color.RED); 
		for(double i=0;i<1000;i++){ 
			y=(int)(80*Math.sin(Math.PI*i/180)); 
			gr.drawLine((int)i-240, y+150, (int)i-240, y+150); 
		} 
		gr.dispose(); 
	} 
}
