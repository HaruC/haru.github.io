import java.awt.*; 
import java.awt.event.*;
import javax.swing.*;
public class Calc extends JFrame{  
	double temp = 0;  
	char op = ' ';  
	
	Calc(String s){ 
		super(s);  
		setLayout(null); 
		setSize(500,500); 
		setVisible(true); 
		this.setDefaultCloseOperation(EXIT_ON_CLOSE); 
		
		final TextField display = new TextField(""); 
		display.setEditable(true); 
		display.setBounds(2, 2, 232, 22); 
		add(display);
		
		try{
			Integer.parseInt(display.getText());
		}catch(NumberFormatException e) {

		}

		final TextField disp_hist = new TextField(""); 
		disp_hist.setEditable(false); 
		disp_hist.setBounds(240, 2, 150, 220 ); 
		add(disp_hist);

		Button b1 = new Button("1"); 
		b1.setBounds(2,30,40,40); 
		add(b1);

		Button b2 = new Button("2");
		b2.setBounds(52,30,40,40); 
		add(b2);

		Button b3 = new Button("3"); 
		b3.setBounds(102,30,40,40); 
		add(b3);

		Button b4 = new Button("4"); 
		b4.setBounds(2,80,40,40); 
		add(b4);

		Button b5 = new Button("5"); 
		b5.setBounds(52,80,40,40); 
		add(b5);

		Button b6 = new Button("6"); 
		b6.setBounds(102,80,40,40); 
		add(b6);

		Button b7 = new Button("7"); 
		b7.setBounds(2,130,40,40); 
		add(b7);

		Button b8 = new Button("8"); 
		b8.setBounds(52,130,40,40); 
		add(b8);

		Button b9 = new Button("9"); 
		b9.setBounds(102,130,40,40); 
		add(b9);

		Button b0 = new Button("0"); 
		b0.setBounds(2,180,40,40); 
		add(b0);

		Button beq = new Button("="); 
		beq.setBounds(52,180,90,40); 
		add(beq);

		Button bplus = new Button("+"); 
		bplus.setBounds(152,30,80,40); 
		add(bplus);

		Button bminus = new Button("-");
		bminus.setBounds(152,80,80,40); 
		add(bminus);

		Button bmul = new Button("*"); 
		bmul.setBounds(152,130,80,40); 
		add(bmul);

		Button bdiv = new Button("/"); 
		bdiv.setBounds(152,180,80,40); 
		add(bdiv);

		Button meme = new Button("Meme");
		meme.setBounds(2, 280, 220, 40);
		add(meme);

		Button call_me = new Button("Call from meme");  
		call_me.setBounds(240, 232, 150, 40); 
		add(call_me);

		Button clean = new Button("C");
		clean.setBounds(2, 230, 220, 40);
		add(clean);

		clean.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				op = ' ';
				display.setText("");
			}
		});

		meme.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				disp_hist.setText(display.getText());
			}
		});

		//Better version of meme at the bottom
		call_me.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				display.setText(disp_hist.getText());
			}
		});

		b1.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"1"); 
			} 
		});

		b2.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"2"); 
			}
		});

		b3.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"3"); 
			}
		});

		b4.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"4"); 
			}
		});

		b5.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"5"); 
			}
		});

		b6.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"6");
			}
		});

		b7.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"7"); 
			} 
		});

		b8.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"8"); 
			} 
		});

		b9.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"9"); 
			} 
		});

		b0.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				display.setText(display.getText()+"0"); 
			} 
		});

		bplus.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				op = '+'; 
				temp = Double.valueOf(display.getText()); 
				display.setText(""); 
			} 
		});

		bminus.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				op = '-'; 
				temp = Double.valueOf(display.getText()); 
				display.setText(""); 
			} 
		});

		bdiv.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				op = '/'; 
				temp = Double.valueOf(display.getText()); 
				display.setText(""); 
			} 
		});

	 	bmul.addActionListener(new ActionListener() { 
			public void actionPerformed(ActionEvent e) { 
				op = '*'; 
				temp = Double.valueOf(display.getText()); 
				display.setText(""); 
			} 
	 	});

		beq.addActionListener(new ActionListener() { 
			 public void actionPerformed(ActionEvent e) { 
				 	switch(op){ 
						case '+': 
							display.setText(String.valueOf(temp+Double.valueOf(display.getText())));
							disp_hist.setText(display.getText());
							break;
						case '-': 
							display.setText(String.valueOf(temp-Double.valueOf(display.getText()))); 
							disp_hist.setText(display.getText());
							break;
						case '*':
							display.setText(String.valueOf(temp*Double.valueOf(display.getText()))); 
							disp_hist.setText(display.getText());
							break; 
						case '/':
							display.setText(String.valueOf(temp/Double.valueOf(display.getText())));
							disp_hist.setText(display.getText());
							break;
					}
			 	}
		});
	}

 	public static void main(String[] args) { 
 		new Calc("Calculator");
	}
}