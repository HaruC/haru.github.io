#include <stdlib.h>
#include <string.h>
#include <GL/glut.h>
#include <stdio.h>
#include <math.h>

bool  light = 0;        
bool  lp; 
GLuint texture[2];
GLfloat xrot;
GLfloat yrot;           
GLfloat zrot;           
GLfloat xspeed;
GLfloat yspeed;

GLfloat LightAmbient[]= {0.5f, 0.5f, 0.5f, 1.0f};
GLfloat LightDiffuse[]= {1.0f, 1.0f, 1.0f, 1.0f};
GLfloat LightPosition[]={0.0f, 0.0f, 2.0f, 1.0f};
struct Image {
    unsigned long sizeX;
    unsigned long sizeY;
    char *data;
};

typedef struct Image Image;

#define checkImageWidth 64
#define checkImageHeight 64

GLubyte checkImage[checkImageWidth][checkImageHeight][3];

void makeCheckImage(void){
    int i, j, c;
    for (i = 0; i < checkImageWidth; i++) {
        for (j = 0; j < checkImageHeight; j++) {
            c = ((((i&0x8)==0)^((j&0x8)==0)))*255;
            checkImage[i][j][0] = (GLubyte) c;
            checkImage[i][j][1] = (GLubyte) c;
            checkImage[i][j][2] = (GLubyte) c;
        }
    }
}



int ImageLoad(char *filename, Image *image) {
    FILE *file;
    unsigned long size; // size of the image in bytes.
    unsigned long i; // standard counter.
    unsigned short int planes; // number of planes in image (must be 1)
    unsigned short int bpp; // number of bits per pixel (must be 24)
    char temp; // temporary color storage for bgr-rgb conversion.
    // make sure the file is there.
    if ((file = fopen(filename, "rb"))==NULL){
        printf("File Not Found : %s\n",filename);
        return 0;
    }

    // seek through the bmp header, up to the width/height:
    fseek(file, 18, SEEK_CUR);
    // read the width
    if ((i = fread(&image->sizeX, 4, 1, file)) != 1) {
        printf("Error reading width from %s.\n", filename);
        return 0;
    }

    // read the height
    if ((i = fread(&image->sizeY, 4, 1, file)) != 1) {
        printf("Error reading height from %s.\n", filename);
        return 0;
    }
    // calculate the size (assuming 24 bits or 3 bytes per pixel).
    size = image->sizeX * image->sizeY * 3;
    // read the planes
    if ((fread(&planes, 2, 1, file)) != 1) {
        printf("Error reading planes from %s.\n", filename);
        return 0;
    }
    if (planes != 1) {
        printf("Planes from %s is not 1: %u\n", filename, planes);
        return 0;
    }
    // read the bitsperpixel
    if ((i = fread(&bpp, 2, 1, file)) != 1) {
        printf("Error reading bpp from %s.\n", filename);
        return 0;
    }
    if (bpp != 24) {
        printf("Bpp from %s is not 24: %u\n", filename, bpp);
        return 0;
    }
    // seek past the rest of the bitmap header.
    fseek(file, 24, SEEK_CUR);
    // read the data.
    image->data = (char *) malloc(size);
    if (image->data == NULL) {
        printf("Error allocating memory for color-corrected image data");
        return 0;
    }
    if ((i = fread(image->data, size, 1, file)) != 1) {
        printf("Error reading image data from %s.\n", filename);
        return 0;
    }
    for (i=0;i<size;i+=3) { // reverse all of the colors. (bgr -> rgb)
        temp = image->data[i];
        image->data[i] = image->data[i+2];
        image->data[i+2] = temp;
    }
    return 1;
}


Image * loadTexture(){
    Image *image1;
    image1 = (Image *) malloc(sizeof(Image));
    if (image1 == NULL) {
        printf("Error allocating space for image");
        exit(0);
    }
    if (!ImageLoad("image.bmp", image1)) {
        exit(1);
    }
    return image1;
}



int myinit(void)
{
   glClearColor (0.5, 0.5, 0.5, 0.0);
   glEnable(GL_DEPTH_TEST);
   glDepthFunc(GL_LESS);
   Image *image1 = loadTexture();
   if(image1 == NULL){
     printf("Image was not returned from loadTexture\n");
     exit(0);
   }

   makeCheckImage();
   glPixelStorei(GL_UNPACK_ALIGNMENT, 1);
   glGenTextures(2, texture);
   glBindTexture(GL_TEXTURE_2D, texture[0]);
   glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_LINEAR);
   glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_LINEAR); 
   glTexImage2D(GL_TEXTURE_2D, 0, 3, image1->sizeX, image1->sizeY, 0,
   GL_RGB, GL_UNSIGNED_BYTE, image1->data);
   glTexEnvf(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_DECAL);
   glBindTexture(GL_TEXTURE_2D, texture[1]);
   glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP);
   glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP);
   glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
   glTexParameterf(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
   glTexEnvf(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_DECAL);
   glTexImage2D(GL_TEXTURE_2D, 0, 3, checkImageWidth,
   checkImageHeight, 0, GL_RGB, GL_UNSIGNED_BYTE,&checkImage[0][0][0]);
   glEnable(GL_TEXTURE_2D);
   glShadeModel(GL_FLAT);
            
   glShadeModel(GL_SMOOTH);              
   glLightfv(GL_LIGHT1, GL_AMBIENT, LightAmbient);   
   glLightfv(GL_LIGHT1, GL_DIFFUSE, LightDiffuse);   
   glLightfv(GL_LIGHT1, GL_POSITION,LightPosition);  
   glEnable(GL_LIGHT1);
   return 1; 
}



void display(void)
  {
   glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
   glLoadIdentity();
   
   glTranslatef(0.0f,0.0f,-5.0f);
   glRotatef(xrot,1.0f,0.0f,0.0f);      // Вращение по оси X
   glRotatef(yrot,0.0f,1.0f,0.0f);      // Вращение по оси Y
   glRotatef(zrot,0.0f,0.0f,1.0f);      // Вращение по оси Z
   glEnable(GL_TEXTURE_2D);
   glBindTexture(GL_TEXTURE_2D, texture[0]);
   glBegin(GL_QUADS);

    // Передняя грань
    glTexCoord2f(0.0f, 0.0f); glVertex3f(-1.0f, -1.0f,  1.0f);  // Низ лево
    glTexCoord2f(1.0f, 0.0f); glVertex3f( 1.0f, -1.0f,  1.0f);  // Низ право
    glTexCoord2f(1.0f, 1.0f); glVertex3f( 1.0f,  1.0f,  1.0f);  // Верх право
    glTexCoord2f(0.0f, 1.0f); glVertex3f(-1.0f,  1.0f,  1.0f);  // Верх лево

    // Задняя грань
    glTexCoord2f(1.0f, 0.0f); glVertex3f(-1.0f, -1.0f, -1.0f);  // Низ право
    glTexCoord2f(1.0f, 1.0f); glVertex3f(-1.0f,  1.0f, -1.0f);  // Верх право
    glTexCoord2f(0.0f, 1.0f); glVertex3f( 1.0f,  1.0f, -1.0f);  // Верх лево
    glTexCoord2f(0.0f, 0.0f); glVertex3f( 1.0f, -1.0f, -1.0f);  // Низ лево

    // Верхняя грань
    glTexCoord2f(0.0f, 1.0f); glVertex3f(-1.0f,  1.0f, -1.0f);  // Верх лево
    glTexCoord2f(0.0f, 0.0f); glVertex3f(-1.0f,  1.0f,  1.0f);  // Низ лево
    glTexCoord2f(1.0f, 0.0f); glVertex3f( 1.0f,  1.0f,  1.0f);  // Низ право
    glTexCoord2f(1.0f, 1.0f); glVertex3f( 1.0f,  1.0f, -1.0f);  // Верх право
        
    // Нижняя грань
    glTexCoord2f(1.0f, 1.0f); glVertex3f(-1.0f, -1.0f, -1.0f);  // Верх право
    glTexCoord2f(0.0f, 1.0f); glVertex3f( 1.0f, -1.0f, -1.0f);  // Верх лево
    glTexCoord2f(0.0f, 0.0f); glVertex3f( 1.0f, -1.0f,  1.0f);  // Низ лево
    glTexCoord2f(1.0f, 0.0f); glVertex3f(-1.0f, -1.0f,  1.0f);  // Низ право

    // Правая грань
    glTexCoord2f(1.0f, 0.0f); glVertex3f( 1.0f, -1.0f, -1.0f);  // Низ право
    glTexCoord2f(1.0f, 1.0f); glVertex3f( 1.0f,  1.0f, -1.0f);  // Верх право
    glTexCoord2f(0.0f, 1.0f); glVertex3f( 1.0f,  1.0f,  1.0f);  // Верх лево
    glTexCoord2f(0.0f, 0.0f); glVertex3f( 1.0f, -1.0f,  1.0f);  // Низ лево

    // Левая грань
    glTexCoord2f(0.0f, 0.0f); glVertex3f(-1.0f, -1.0f, -1.0f);  // Низ лево
    glTexCoord2f(1.0f, 0.0f); glVertex3f(-1.0f, -1.0f,  1.0f);  // Низ право
    glTexCoord2f(1.0f, 1.0f); glVertex3f(-1.0f,  1.0f,  1.0f);  // Верх право
    glTexCoord2f(0.0f, 1.0f); glVertex3f(-1.0f,  1.0f, -1.0f);  // Верх лево
   glEnd();

    glFinish();
    xrot+=xspeed;
    yrot+=yspeed;
    zrot+=0.0f;
    glDisable(GL_TEXTURE_2D);
}


void reshape(int w, int h){
    glViewport(0, 0, w, h);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluPerspective(60.0, 1.0*(GLfloat)w/(GLfloat)h, 1.0, 30.0);
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();
    glTranslatef(0.0, 0.0, -3.6);

}


void keyboard (unsigned char key, int x, int y){
    switch (key) {
      case 27: 
        exit(0);
        break;
      default: 
        break;
    }
}
void specialKeys (int key, int x, int y){
   if (key == GLUT_KEY_RIGHT){
      xspeed += 0.05f;
      printf("Current x speed is %f\n",xspeed);
   }
   else if (key == GLUT_KEY_LEFT){
      xspeed -= 0.05f;
      printf("Current x speed is %f\n",xspeed);
   }
   else if (key == GLUT_KEY_UP){
      yspeed += 0.05f;
      printf("Current y speed is %f\n",yspeed);
   }
   else if (key == GLUT_KEY_DOWN){
      yspeed -= 0.05f;
      printf("Current y speed is %f\n",yspeed);
   }
   glutPostRedisplay();
}

int main(int argc, char** argv)
{
   glutInit(&argc, argv);
   glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB | GLUT_DEPTH);
   glutInitWindowSize(1100, 600);
   glutInitWindowPosition(100, 100);
   glutCreateWindow(argv[0]);
   myinit();
   glutDisplayFunc(display);
   glutReshapeFunc(reshape);
   glutIdleFunc(display);
   glutKeyboardFunc(keyboard);
   glutSpecialFunc(specialKeys);
   glutMainLoop();
   return 1; 
}