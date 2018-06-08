lab4.
1.Организовать и распечатать последовательность чисел Фибоначчи, не превосходящих
m, введенную с клавиатуры. Числа Фибоначчи - каждое число этой последовательности
равно сумме двух предыдущих: например, 1, 1, 2, 3, 5, 8, 13, ... Использовать конструкцию for
>>>>
#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	int m;
	scanf("%d\n", &m);
	int a = 0, c = 1;
	for(; c < m ;){
		a = c - a;
		c = c + a; 
		printf("%d\n",c);
	}
	return 0;
}
<<<<
>>>>
2.Дано натуральное число. Вывести на экран все натуральные числа до заданного
включительно.
>>>>
#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	int b;
	scanf("%d\n", &b);
	for(unsigned i=0;i<=b;i++){
		printf("%d | ",i);	
	}
	return 0;
}
3.Вычислить значение выражения:
>>>>
#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	int i;
	double x,z,qe,res,n;
	x=1.5;
	n=4.0;
	z=1.0;
	for( i=1.0; i < n; i++){
		qe = (1+(10+x)/x);
		z*= pow(qe,1/i);
	}
	res=-cos(0.1*z);
	printf("%f\n", res);
	return 0;
}
>>>>-0.647371
4.Вычислить значение выражения:
>>>>
#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	int i;
	double x, n,cre, req;
	x=1.5;	
	n=4.0;
	z=1.0;
    for( i=3.0; i < n+4; i++){
		req+= (2*pow(x,3)*i +cos(i)*pow((x+1),1/2) - 2.3/i);
	}
	cre = 6.3*x -req;
	printf("%f\n", cre);
	return 0;
}
>>>>-157.140527
5.С клавиатуры вводится трехзначное число, считается сумма его цифр. Если сумма цифр
числа больше 10, то вводится следующее трехзначное число, если сумма меньше либо
равна 10 – программа завершается.
>>>>
#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	int d,e,f,g,h;
	do{
 
			g = 0;
		    scanf("%d\n", &d);
		    e = 1;
		    while(e<=3){
		    	f = pow(10, e);
		    	h = d%f;
		    	if(h >= 10){
		    		f = f/10;
		    		h = h/f;
		    	}
		    	g += h;
		    	e = e + 1;
		    }
		    printf(" %d ", g);
 
	}while(g<=10);
		printf(" good job ");
	return 0;
}
6.Вычислить методом Ньютона:
>>>>
