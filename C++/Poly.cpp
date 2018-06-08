#include <GL/glut.h>
 
void renderScene(void) {
	// Очистка экрана
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	// Отрисовка треугольника
	glBegin(GL_TRIANGLES);
		glVertex3f(-0.5,-0.5,0.0);
		glVertex3f(0.0,0.5,0.0);
		glVertex3f(0.5,-0.5,0.0);
	glEnd();
	// Отрисовка квадрата
	glBegin(GL_QUADS);
		glVertex3f(-0.5, 0.5, 0.0);
		glVertex3f( 0.5, 0.5, 0.0);
		glVertex3f( 0.5,-0.5, 0.0);
		glVertex3f(-0.5,-0.5, 0.0);
	glEnd();
	// Отрисовка двойной буфферизацией
	glutSwapBuffers();
}
 
int main(int argc, char **argv) {
 
	// инициализация
	glutInit(&argc, argv);
	// Режим отображения
	glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA);
	// Позиция окна x,y
	glutInitWindowPosition(400,200);
	// Размер окна
	glutInitWindowSize(600,600);
	// Название окна
	glutCreateWindow("Polygone");
 
	// регистрация обратных вызовов
	glutDisplayFunc(renderScene);
 
	// Основной цикл GLUT
	glutMainLoop();
 
	return 1;
}