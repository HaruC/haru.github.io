lab 5.
p1.
1.Организовать и распечатать последовательность чисел Фибоначчи, не превосходящих m, введенную с клавиатуры.  Числа Фибоначчи - каждое число этой последовательности равно сумме двух предыдущих: например, 1, 1, 2, 3, 5, 8, 13, ..
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
2.Организовать ввод массива по столбцам. 
>>>>
#include <stdio.h>
#include <stdlib.h>
 
int main(void) 
{
	unsigned i,j;
	int arr[i][j];
	for(i=1; i<4; i++){
		for(j=1; j<4; j++){
			scanf("%d", &arr[j][i]);
			printf("[%d][%d] = ", j, i);
			printf(" %d ", arr[j][i]);
		}
		printf("\n");
	}
 return 0;
}
3. Задан массив, состоящий из 10 целых чисел. Необходимо изменить порядок следования его элементов на обратный без привлечения вспомогательного массива. 
>>>>
#include <stdio.h>
#include <stdlib.h>
 
int main(void) 
{
	int dec[10] = {9,8,7,6,5,4,3,2,1,0};
	qsort(dec, 10, sizeof(int), cmp );
	for(i=0; i<10; i++){
		printf(" %d ", dec[i]);
	}
 	return 0;
}
4.Умножение матриц. Написать программу для умножения матриц
>>>>
p2.
5.Вычислить: 
>>>>
#include <stdio.h>

int main(void)
{
	int i,j,k;

    int c[2][2] = {{1,2},{3,0}};
    int bas[2][2] = {{1,0},{0,1}};
    int result[2][2];
    for(i = 0; i < 2; i++) {
        for(j = 0; j < 2; j++) {
            result[i][j] = -2*pow(c[i][j],2) + 5*c[i][j] + 9*bas[i][j];
            }
        }


    for(i=0; i<2; i++){
		for(j=0; j<2; j++){
            // Last digit ????
            printf("%d %d = %d",i,j,result[i][j]);
		}
		printf("\n");
	}

	return 0;
}
6.Транспонировать матрицу:
>>>>
#include <stdio.h>

int main(void) 
{
	int i,j,k,temp;
	int six[2][3] = {{1,2,3},{4,5,6}};

	for(i=0; i<2; i++){
		for(j=0; j<3; j++){
			temp = six[j][i];
			six[j][i] = six[i][j];
			six[i][j]= temp;
		}
	}

    for(i=0; i<3; i++){
		for(j=0; j<2; j++){
			printf("[%d][%d] = %d ",j,i,six[j][i]);
		}
		printf("\n");
	}
	return 0;
}

7.Вычислить:
>>>>
#include <stdio.h>

int main(void) 
{
	int i,j,k;

	int st[2][4] = {{1,2,1,3},{4,-1,5,-1}};
    int tr[4][2] = {{1,4},{2,-1},{1,5},{3,-1}};
	int result[2][2];
    for(i = 0; i < 2; i++) {
        for(j = 0; j < 2; j++) {
            result[i][j] = 0;
            for(k = 0; k < 3; k++) {
                result[i][j] += tr[i][k] * st[k][j];
            }
        }
    }
    int res[2][2];
    for(i = 0; i < 2; i++) {
        for(j = 0; j < 2; j++) {
            res[i][j] = 0;
            for(k = 0; k < 3; k++) {
                res[i][j] += st[i][k] * tr[k][j];
            }
        }
    }
    for(i=0; i<2; i++){
		for(j=0; j<2; j++){
			printf("[%d][%d] = %d & %d",i,j,res[i][j],result[i][j]);
		}
		printf("\n");
	}

	return 0;
}
8.Вычислить:
>>>>
#include <stdio.h>

int main(void)
{
	int i,j,k;

	int a[2][2] = {{1,-1},{-1,1}};
    int b[2][2] = {{2,0},{-3,1}};
    int c[2][2] = {{3,1},{2,3}};
	int reson[2][2];
    for(i = 0; i < 2; i++) {
        for(j = 0; j < 2; j++) {
            reson[i][j] = 0;
            for(k = 0; k < 3; k++) {
                reson[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    int restw[2][2];
    for(i = 0; i < 2; i++) {
        for(j = 0; j < 2; j++) {
            restw[i][j] = 0;
            for(k = 0; k < 3; k++) {
                restw[i][j] += reson[i][k] * c[k][j];
            }
        }
    }
    int resus[2][2];
    for(i = 0; i < 2; i++) {
        for(j = 0; j < 2; j++) {
            resus[i][j] = 0;
            for(k = 0; k < 3; k++) {
                resus[i][j] += b[i][k] * c[k][j];
            }
        }
    }
    int result[2][2];
    for(i = 0; i < 2; i++) {
        for(j = 0; j < 2; j++) {
            result[i][j] = 0;
            for(k = 0; k < 3; k++) {
                result[i][j] += a[i][k] * resus[k][j];
            }
        }
    }
    for(i=0; i<2; i++){
		for(j=0; j<2; j++){
			printf("[%d][%d] = %d & %d",i,j,restw[i][j],result[i][j]);
		}
		printf("\n");
	}

	return 0;
}

9. Преобразовать исходную матрицу так, чтобы первый элемент каждой строки был заменен средним арифметическим элементов  этой строки 
>>>>
#include <stdio.h>

int main(void)
{
	int i,j,k;

    int c[3][3] = {{3,1,6},{2,3,5},{7,6,5}};
	int reson[3] = {0,0,0};

    for(i = 0; i < 3; i++) {
        for(j = 0; j < 3; j++) {
            reson[i] += c[i][j];
            }
        }


    for(i=0; i<3; i++){
		for(j=0; j<3; j++){
            if(j == 0){
                printf("[%d][%d] = %d",i,j,reson[i]/3);
            }
            else {
                printf("[%d][%d] = %d",i,j,c[i][j]);
            }
		}
		printf("\n");
	}

	return 0;
}