1. С клавиатуры вводятся три числа. Определите большее из трех чисел
#include <stdio.h>

int main(void) {
	// ex. 6.1
	int a,b,c;
	scanf("%d %d %d", &a, &b, &c);
	if(a>b && a>c) printf("max = %d", a);
	if(b>a && b>c) printf("max = %d", b);
	if(c>a && c>b) printf("max = %d", c);
	return 0;
}

2. Ввести a, b, h. Если h=0, вычислить площадь прямоугольника; при a = b,
найти площадь квадрата; в противном случае подсчитать площадь трапеции.
#include <stdio.h>

int main(void) {
	// ex. 6.2
	int a,b,h;
	scanf("%d %d %d", &a, &b, &h);
	int rect = a*b;
	int squad = a*a;
	int trap = (a+b)*h/2;
	printf("a = %d, b = %d, h = %d\n", a,b,h);
	if(h==0){
		if (a==b){
			printf("Surface area of square = %d", squad);
		}
		else{
			printf("Surface area of rectangle = %d", rect);
		}
	}
	else {
		printf("Surface area of trapezium = %d", trap);
	}
	return 0;
}

3. Ввести с клавиатуры цифру. Определить, какой системе счисления она
может принадлежать.
#include <stdio.h>

int main(void) {
// ex. 6.3
	int num;
	scanf("%d", &num);
    printf("Your number belongs to the ");
    if (num<2){
        printf(" 2-number system");
    }
    if (num<8){
        printf(" 8-number system");
    }
    if (num<=9){
        printf(" 16 and 32-number system");
    }
	return 0;
}

4. Программа позволяет в заданном интервале найти все совершенные числа.
Натуральное число называется совершенным, если оно равно сумме всех
своих делителей, не считая его самого.
#include <stdio.h>

int main(void) {
	// ex. 6.4
	int rana, ranb;
	int tmp = 0;
	scanf("[%d, %d]", &rana, &ranb);
	for(int i = rana; i<=ranb; i++){
		int sum = 0;
		for(int j = 1; j<=i; j++){
			int del = i%j;
			if(del == 0){
				if(i!=j){
					sum +=j;
				}
			}
		}
			if(i == sum){
				printf("Perfect number is %d\n", i);
			}
	}
	return 0;
}

5. Определить двузначные целые числа, которые делятся на сумму своих
цифр.
#include <stdio.h>

int main(void) {
	// ex. 6.5
	int num[100];
	int temp;
	const v = 10;
	for(int j = 10; j<100; j++){
		int fr = j/v;
		int ls = j%v;
		int del = fr+ls;
		if( j%del == 0){
			printf("<<< %d and %d\n", fr,ls);
			printf(">>> %d del by %d\n", j,del);
		}
	}
	return 0;
}

6. Составьте программу, которая по трем введенным числам определяет,
могут ли быть эти числа длинами сторон треугольника. если да, то какой
получится треугольник с данными сторонами (прямоугольный,
остроугольный, тупоугольный).
#include <stdio.h>

int main(void) {
	// ex. 6.6
	float a,b,c;
	scanf("%f %f %f", &a, &b, &c);
	int str = a*a+b*b-c*c;
	if(a == b && a==c) {
		printf("Equilateral triangle with sides = %f", a);
	}
	else if(a==b || a==c || b==c) {
		printf("Isosceles triangle with sides a = %f, b = %f, c = %f", a,b,c);
	}
	else if(str == 0){
		printf("Right triangle with sides a = %f, b = %f, c = %f", a,b,c);
	}
	else{
		printf("Obtuse triangle with sides a = %f, b = %f, c = %f", a,b,c);
	}
	
	// Probably would be better to go with angles sin/cos/tg
	// upd. worst idea ever
	/*
	float cosa=(b*b+c*c-a*a)/(2*b*c);
	float cosb=(a*a+c*c-b*b)/(2*a*c);
	float cosc=(a*a+b*b-c*c)/(2*a*b);
	printf("%f %f %f",cosa, cosb, cosc);
	*/
	if(str == 0) printf("Right triangle with sides a = %d, b = %d, c = %d", a,b,c);
	return 0;
}

7. Напечатать в зависимости от числа углов название фигуры (треугольник,
четырехугольник, пятиугольник, шестиугольник, многоугольник). Вариант
реализации задачи написать с применением оператора выбора.
#include <stdio.h>

int main(void) {
// ex. 6.7
	int csop;
	scanf("%d", &csop);
	switch(csop) {
	  case 1 :
	     printf("Angle in vacum?\n" );
	     break;
	  case 2 :
	  	 printf("Digon (sphere)!\n" );
	  	 break;
	  case 3 :
	     printf("Rectangle!\n" );
	     break;
	  case 4 :
	     printf("Quadrilateral!\n" );
	     break;
	  case 5 :
	     printf("Pentagon!\n" );
	     break;
	  case 6 :
	     printf("Hexagon!\n" );
	     break;
	  default :
	     printf("Something-gon!\n" );
	}
	return 0;
}

8. В зависимости от номера (N) типа фигуры, организовать ввод
необходимых данных и вычислить при N = 1 - площадь круга, N = 2- объем
шара (4/3πR3), N=3 - объем цилиндра, N = 4-площадь поверхности сферы
4πr2.
#include <stdio.h>

int main(void) {
// ex. 6.8
	int shape;
	float r, h;
	float pi = 3.141592;
	scanf("%d", &shape);
	switch(shape) {
	  case 1 :
	  scanf("%f", &r);
	  	 float scircle = pi*r*r;
	     printf("Circle square is %f\n", scircle);
	     break;
	  case 2 :
	  	scanf("%f", &r);
	  	float ssphere = 4/3*pi*r*r*r;
	  	 printf("Surface area of sphere is %f\n", ssphere);
	  	 break;
	  case 3 :
	  	 scanf("%f %f", &r, &h);
	  	 float scil = pi*r*r*h;
	     printf("Surface area of cylinder is %f\n", scil);
	     break;
	  case 4 :
	  scanf("%f", &r);
	  	 float ssp = 4*pi*r*r;
	     printf("Surface area of sphere is %f\n", ssp);
	     break;
	}
	return 0;
}
