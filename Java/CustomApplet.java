import java.awt.Graphics;
import java.awt.Color;
// import javax.swing.JComponent;
import java.applet.*;

public class CustomApplet extends Applet {
	public void paint(Graphics g) {
    	g.setColor(Color.BLACK);
		g.fillRect(0,0,500,500);
		g.setColor(Color.WHITE);
		//Body
		g.drawRect(250,250,80,80);
		//Signal's catcher
		g.drawLine(270, 230, 270, 190);
		g.drawLine(260,195,280,195);
		g.drawLine(260,200,280,200);
		g.drawLine(260,205,280,205);
		//Roof
		g.drawLine(250, 250, 290, 210);
		g.drawLine(330, 250 , 290, 210);
    }
}

// 	270,190

// 260,195; 280,195
// 260,200; 280,200
// 260,205; 280,205
// 		290,210

// 	270,230

// 250,250			250,330



// 330,250			330,330