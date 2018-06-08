#include <windows.h>
#include <gl/glut.h>

int x, y;
bool down = false;
void display()
{
  glClear(GL_COLOR_BUFFER_BIT);
  if(down)
  {
  glRotatef(1, 1, 1, 0);
}
  glBegin(GL_LINE_LOOP);
  glColor3f(1.0, 0.0, 1.0);
  glVertex3f(-50, 0,  50);
  glVertex3f(-50, 50, 50);
  glVertex3f(-50, 50, 100);
  glVertex3f(-50, 0,  100);
  glEnd();
    glBegin(GL_LINE_LOOP); 
  glColor3f(1.0, 0.0, 1.0); 
  glVertex3f(0, 0,  50);
  glVertex3f(0, 50, 50);
  glVertex3f(0, 50, 100);
  glVertex3f(0, 0,  100);
  glEnd();
    glBegin(GL_LINES); 
  glColor3f(0.0, 1.0, 1.0);
  glVertex3f(-50, 0,  50);
  glVertex3f(0, 0,  50);
  glVertex3f(-50, 50, 50);
  glVertex3f(0, 50, 50);
  glVertex3f(-50, 50, 100);
  glVertex3f(0, 50, 100);
  glVertex3f(-50, 0,  100);
  glVertex3f(0, 0,  100);
  glEnd();
  glutSwapBuffers();
  glFlush();
}


void Timer(int t)
{
  display();
  glutTimerFunc(10, Timer, t);
}

void mouse(int button, int state, int ax, int ay)
{
    x = ax;
    y = ay;
    down = state == GLUT_DOWN;
}

int main(int argc, char **argv)
{

    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB); 
    glutInitWindowSize(600, 600); 
    glutInitWindowPosition(200, 500);  
    glutCreateWindow("Coub");
    glClearColor(0, 0, 0, 1.0); 
    glMatrixMode(GL_PROJECTION); 
    glLoadIdentity();
    glOrtho(-200.0, 200.0, -200.0, 200.0, -200.0, 200.0); 
    glutDisplayFunc(display); 
    Timer(0);
    glutMouseFunc(mouse);
    glutMainLoop(); 
}
