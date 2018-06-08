import java.awt.*;
import java.applet.*;
import java.applet.*;
import java.awt.*;
import java.util.*;

public class Clock extends Applet implements Runnable { 
   Thread t,t1;
   
   public void start() {
      t = new Thread(this);
      t.start();
   }

   public void run() { 
      t1 = Thread.currentThread();
      while(t1 == t) {
         repaint();
         try {
            /*
             * less then 100 probably most useless actions could ever be made
            **/
            t1.sleep(100);    
         }
         catch(InterruptedException e){}
      }
   }

   public void paint(Graphics g) {
      Calendar cal = new GregorianCalendar();
      Integer apm = cal.get(Calendar.AM_PM);
      String apm_val = "a.m";
      String hour = String.valueOf(cal.get(Calendar.HOUR));
      String minute = String.valueOf(cal.get(Calendar.MINUTE));
      String second = String.valueOf(cal.get(Calendar.SECOND));
      String ms = String.valueOf(cal.get(Calendar.MILLISECOND));
        if(Integer.parseInt(second)<10){
            second = "0"+second;
        }
        if(Integer.parseInt(minute)<10){
            minute = "0"+minute;
        }
        if(Integer.parseInt(hour)<10){
            hour = "0"+hour;
        }
        if( apm == 1){
            apm_val = "p.m.";
        }
      g.setFont(new Font("Helvetica", Font.PLAIN, 100));
      g.drawString(apm_val + " " + hour + ":" + minute + ":" + second + ":" + ms, 100, 250);
   }
}