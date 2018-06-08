lab3.
part 1.
1.Назовите имена переменных, объявленных как указатели:
						char *ch;
						int *temp, i, *j;
						float *pf, f;
>>>> *ch, *temp, *j, *pf
2.Опишите программу по строкам и назовите, что произойдет в ходе
выполнения программы. Выполните программу, представьте результаты. Объясните
результаты.
>>>>
	float x=12.3, y;
	float *p;
	p=&x;		//getting value from x
	y=*p;		//y with value of dinamic p
	printf(" x=%f y=%f\n %p", x, y,(void *)p);		//output of current x and y 
	*p++;		//postincrement of pointer( +4 )
	printf(" x=%f y=%f\n %p", x, y,(void *)p);		//output after to compare
	y=1+*p*y;		//
	printf(" x=%f y=%f\n %p", x, y,(void *)p);		//last output
3.Объясните программу построчно. Выполните программу, получите и
представьте результаты ее выполнения, объясните их значение.
>>>>
	int x=12;
	int *p, *g;
	p=&x;		//getting value from x
	g=p;		//
	printf("%p ", p);		//physical address
	printf("%p ", g);		//physical address
	printf("%d %d ", x,*g);		//swap of value and physical address

4.Объясните программу построчно. Выполните программу, получите и
представьте результаты ее выполнения, объясните их значение. Почему значение p
увеличилось именно на такое значение?
>>>>
	int *p;
	int x=12;
	p=&x;		//getting value from x
	printf("%p, %d\n", p, *p);		//output 1-address 2-value
	++p;		//preincrement(+4)
	printf("%p, %d\n", p, *p);		//

5.Напишите программу, которая продемонстрирует сравнение указателей.
Представьте результаты ее выполнения
>>>>
