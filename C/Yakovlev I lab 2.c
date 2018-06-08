lab 2 
1.Ввод двух чисел, вычисление суммы и печать результата.

#include <stdio.h>
#include <math.h>
 
int main(void)
{
    int a, b, c, d, e, f, g, h, k, l, m, x,y;
    scanf("%d\n", &a);
    scanf("%d\n", &b);
    c = a + b;
    printf("a %d and b %d\n", a, b);
    printf("Summary %d ",c);
    return 0;
}

2.Написать программу, которая вводит целое число и определяет сумму его цифр.

#include <stdio.h>
#include <math.h>
 
int main(void)
{
	d = 12345;
    e = 1;
    g =0;
    while(e<=5){
    	f = pow(10, e);
    	h = d%f;
    	if(h >= 10){
    		f = f/10;
    		h = h/f;
    	}
    	g += h;
    	e = e + 1;
    	printf("Digits %d @@ \n",g);
    }
    return 0;
}

3.Вычислить:

#include <stdio.h>
#include <math.h>
 
int main(void)
{
    k = 1 + pow(sin(x + y),2);
    l = 2 + abs(x -(2*pow(x,2))/(1 + abs(sin(x + y))));
    m = k/l;
    printf("Function m %e ", m);
    return 0;
}

4.Вычислить:

#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	float r;
	float z[] = {1.12,1.12,1.41};
	float s[] = {2.7,2.7,2.9};
	float x[] = {0.12,0.14,0.16};
	for(unsigned i = 0;i<3;i++){
		r = (2.17*pow(10,6)*z[i]*pow(tan(log(s[i])*x[i]),2))/(pow(2.718282,-s[i]*tan(x[i]))+abs(z[i]*x[i]));
		printf("%e\n", r);
	}
    return 0;
}

5.Вычислить:

#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	int y, x;
	y = -2 * sqrt(pow(y,2) + (4/3) * pow(x,2)) - pow(cos(x),4)/x;
	printf("%e",y);
	return 0;
}
 
6.Вычислить:

#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	float v;
	float a[] = {1.7,1.7,1.9};
	float b[] = {2.1,2.1,2.5};
	float c[] = {3.4,3.4,3.9};
	float x[] = {1.05,1.25,1.75};
	for(unsigned i = 0;i<3;i++){
		v = (b[i]*c[i]/12)*(6*pow(x[i],2)*(pow(1-(x[i]/a[i]),2) + pow(b[i],2)*(pow(1-(x[i]/sin(a[i])),2))));
		printf("%e\n", v);
	}
	return 0;
}

7.Вычислить:

#include <stdio.h>
#include <math.h>
 
int main(void) 
{
	float v;
	float a[] = {0.12,0.12,0.27};
	float b[] = {3.5,3.5,3.9};
	float c[] = {2.4,2.4,2.8};
	float x[] = {1.4,1.6,1.8};
	for(unsigned i = 0;i<3;i++){
		v = -((x[i]-a[i])/(pow((pow(x[i],2)+pow(a[i],2)),1/3)))-(4*pow((pow(x[i],2)+pow(b[i],2)),4/3))/(2+a[i]+b[i]+pow((x[i]-c[i]),2/3));
		printf("%e\n", v);
	}
 
	return 0;
}