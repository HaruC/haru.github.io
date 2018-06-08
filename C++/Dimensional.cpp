#include <glut.h>
 
float angle = 0.0f;
 
void changeSize(int w, int h) {
	// предотвращение деления на ноль
	if (h == 0)
		h = 1;
	float ratio =  w * 1.0 / h;
	// используем матрицу проекции
	glMatrixMode(GL_PROJECTION);
	// обнуляем матрицу
	glLoadIdentity();
	// установить параметры вьюпорта
	glViewport(0, 0, w, h);
	// установить корректную перспективу
	gluPerspective(45.0f, ratio, 0.1f, 100.0f);
	// вернуться к матрице проекции
	glMatrixMode(GL_MODELVIEW);
}
 
void renderScene(void) {
	// очистка буфера цвета и глубины
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
	// обнуление трансформации
	glLoadIdentity();
	// установка камеры
	gluLookAt( 0.0f, 0.0f, 20.0f,
		   0.0f, 0.0f,  0.0f,
		   0.0f, 1.0f,  0.0f);
 
	glRotatef(angle, 0.0f, 1.0f, 0.0f);
 	
	glBegin(GL_TRIANGLES);
		glColor3f(1.0f,0.0f,0.0f);                      // R
	    glVertex3f( 0.0f, 2.0f, 0.0f);                  // 1 side
	    glColor3f(0.0f,0.0f,1.0f);                      // B
	    glVertex3f( 2.0f,-2.0f, 2.0f);                  // 1 side
	    glColor3f(0.0f,1.0f,0.0f);                      // G
	    glVertex3f( 2.0f,-2.0f, -2.0f);                 // 1 side
	    glColor3f(1.0f,0.0f,0.0f);                      // R
        glVertex3f( 0.0f, 2.0f, 0.0f);                  // 2 side
        glColor3f(0.0f,1.0f,0.0f);                      // G
        glVertex3f( 2.0f,-2.0f, -2.0f);                 // 2 side
        glColor3f(0.0f,0.0f,1.0f);                      // B
        glVertex3f(-2.0f,-2.0f, -2.0f);                 // 2 side
        glColor3f(1.0f,0.0f,0.0f);                      // R
        glVertex3f( 0.0f, 2.0f, 0.0f);                  // 3 side
        glColor3f(0.0f,0.0f,1.0f);                      // B
        glVertex3f(-2.0f,-2.0f,-2.0f);                  // 3 side
        glColor3f(0.0f,1.0f,0.0f);                      // G
        glVertex3f(-2.0f,-2.0f, 2.0f);                  // 3 side
        glColor3f(1.0f,0.0f,0.0f);                      // R
        glVertex3f( 0.0f, 2.0f, 0.0f);                  // 4 side
        glColor3f(0.0f,1.0f,0.0f);                      // B
        glVertex3f(-2.0f,-2.0f,2.0f);                   // 4 side
        glColor3f(0.0f,0.0f,1.0f);                      // G
        glVertex3f(2.0f,-2.0f, 2.0f);                   // 4 side

	glEnd();
	glBegin(GL_QUADS);
		glColor3f(0.0f,0.0f,1.0f);                      // R
        glVertex3f( 2.0f, -2.0f, 2.0f);                 // Bottom
        glColor3f(0.0f,1.0f,0.0f);                      // G
        glVertex3f(2.0f,-2.0f,-2.0f);                   // Bottom
        glColor3f(0.0f,0.0f,1.0f);                      // B
        glVertex3f(-2.0f,-2.0f, -2.0f);					// Bottom
		glColor3f(0.0f,1.0f,0.0f);						// G
        glVertex3f(-2.0f, -2.0f, 2.0f);                 // Bottom
	glEnd();

	/*
 	glBegin(GL_QUADS);
        glColor3f(0.0f,1.0f,0.0f);              // Синий
        glVertex3f( 2.0f, 2.0f,-2.0f);          // Право верх квадрата (Верх)
        glVertex3f(-2.0f, 2.0f,-2.0f);          // Лево верх
        glVertex3f(-2.0f, 2.0f, 2.0f);          // Лево низ
        glVertex3f( 2.0f, 2.0f, 2.0f);          // Право низ
        glColor3f(1.0f,0.5f,0.0f);              // Оранжевый
        glVertex3f( 2.0f,-2.0f, 2.0f);          // Верх право квадрата (Низ)
        glVertex3f(-2.0f,-2.0f, 2.0f);          // Верх лево
        glVertex3f(-2.0f,-2.0f,-2.0f);          // Низ лево
        glVertex3f( 2.0f,-2.0f,-2.0f);          // Низ право
        glColor3f(1.0f,0.0f,0.0f);              // Красный
        glVertex3f( 2.0f, 2.0f, 2.0f);          // Верх право квадрата (Перед)
        glVertex3f(-2.0f, 2.0f, 2.0f);          // Верх лево
        glVertex3f(-2.0f,-2.0f, 2.0f);          // Низ лево
        glVertex3f( 2.0f,-2.0f, 2.0f);          // Низ право
        glColor3f(1.0f,1.0f,0.0f);              // Желтый
        glVertex3f( 2.0f,-2.0f,-2.0f);          // Верх право квадрата (Зад)
        glVertex3f(-2.0f,-2.0f,-2.0f);          // Верх лево
        glVertex3f(-2.0f, 2.0f,-2.0f);          // Низ лево
        glVertex3f( 2.0f, 2.0f,-2.0f);          // Низ право
        glColor3f(0.0f,0.0f,1.0f);              // Синий
        glVertex3f(-2.0f, 2.0f, 2.0f);          // Верх право квадрата (Лево)
        glVertex3f(-2.0f, 2.0f,-2.0f);          // Верх лево
        glVertex3f(-2.0f,-2.0f,-2.0f);          // Низ лево
        glVertex3f(-2.0f,-2.0f, 2.0f);          // Низ право
        glColor3f(1.0f,0.0f,1.0f);              // Фиолетовый
        glVertex3f( 2.0f, 2.0f,-2.0f);          // Верх право квадрата (Право)
        glVertex3f( 2.0f, 2.0f, 2.0f);          // Верх лево
        glVertex3f( 2.0f,-2.0f, 2.0f);          // Низ лево
        glVertex3f( 2.0f,-2.0f,-2.0f);          // Низ право
    glEnd();
    */
	angle+=0.1f;
 
	glutSwapBuffers();
}
 
int main(int argc, char **argv) {
 
	// Инициализация GLUT и создание окна
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA);
	glutInitWindowPosition(100,100);
	glutInitWindowSize(600,600);
	glutCreateWindow("Dimensional");
 
	// регистрация
	glutDisplayFunc(renderScene);
	glutReshapeFunc(changeSize);
	glutIdleFunc(renderScene);
 
	// основной цикл
	glutMainLoop();
 
	return 1;
}