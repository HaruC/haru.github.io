#include <GL/glut.h>
// Window height and width
int wh, ww;

// Draw by Line
void draw_string(void *font, const char* string) 
{
  while(*string)
    glutStrokeCharacter(font, *string++);
}

// Draw by Symbols
void draw_string_bitmap(void *font, const char* string) 
{
  while (*string)
    glutBitmapCharacter(font, *string++);
}
 
void changeSize(int wid, int ht)
{
  glViewport(0, 0, wid, ht);
  glMatrixMode(GL_PROJECTION);
  glLoadIdentity();
  gluOrtho2D(-wid/2, wid/2, -ht/2, ht/2);
  glMatrixMode(GL_MODELVIEW);
  ww = wid;
  wh = ht;
}
 
void renderScene(void)
{
  glClear(GL_COLOR_BUFFER_BIT); 
  glLineWidth(7.0f);
  // Отрисовка построчно
  glPushMatrix();
  glTranslatef(-ww/2, -100, 0);
  glScalef(1.0f, 1.0f, 1.0f);
  draw_string(GLUT_STROKE_ROMAN, "Hello, Kappa!");
  glPopMatrix();
  // Отрисовка посимвольно
  glRasterPos2f(100, 100);
  draw_string_bitmap(GLUT_BITMAP_HELVETICA_18, "Hello, world!");
  glFinish();
  glutSwapBuffers();   
}
 
int main(int argc, char **argv) {
  
  ww = 1100;
  wh = 600;
 
  // Инициализация GLUT и создание окна
  glutInit(&argc, argv);
  glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA);
  glutInitWindowPosition(100,100);
  glutInitWindowSize(ww,wh);
  glutCreateWindow("Fonts");
 
  // регистрация
  glutDisplayFunc(renderScene);
  glutReshapeFunc(changeSize);
  glutIdleFunc(renderScene);
 
  // основной цикл
  glutMainLoop();
 
  return 1;
}