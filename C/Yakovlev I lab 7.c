1. Даны три одномерных массива вещественных чисел A [1..6], B [1..8] и
С[1..7]. Найти общую сумму положительных элементов в массивах.
Нахождение суммы элементов в массиве оформить функцией.

#include <stdio.h>

int msu(int *arr, int sca) {
  int sum = 0;
  for(int i=0; i<sca; i++) {
  	if(arr[i]>0){
		sum += arr[i];
  	}
  }
  return sum;
}
int main(void) {
	int a[7]= {1,2,3,4,5,6,7};
	int b[8]= {1,2,3,4,5,6,7,8};
	int c[6]= {1,2,3,4,5,6};
	int tripl = msu(a,7)+msu(b,8)+msu(c,6);
	printf("Summary of a[1..7], b[1..8], c[1..6] is %d\n", tripl);
	return 0;
}

2. Даны два одномерных массива целых чисел A [1..8] и B[1..8]. Найти сумму
их максимальных элементов. Для нахождения максимального элемента в
массиве использовать функцию.

#include <stdio.h>

int biggest(int *arr, int sca) {
  int temp = 0;
  for(int i=0; i<sca; i++) {
	if(arr[i]>temp) {
		temp = arr[i];
	}
  }
  		printf("%d max\n", temp);
  return temp;
}
int main(void) {
	int a[7]= {1,2,3,4,5,6,7};
	int b[8]= {1,2,3,4,5,6,7,8};
	int c[6]= {1,2,3,4,5,6};
	int doublehigh = biggest(a, 7)+biggest(b, 8)+biggest(c, 6);
	printf("Max. elements addition is %d", doublehigh);
	return 0;
}

3. Даны три одномерных массива вещественных чисел A[1..6], B[1..8] и
С[1..7]. Найти среднее геометрическое значение положительных элементов
для каждого. Вычисление среднего геометрического оформить в виде
функции.

#include <stdio.h>
#include <math.h>

float mult = 1.0;
float meang(float *arr, float sca) {
	for(unsigned i=0; i<sca; i++) {
			mult *= arr[i];
	}
	float res = powf(mult, 1.0/sca);
	return res;
}
int main(void) {
	float a[7]= {1,2,3,4,5,6,7};
	float b[8]= {1,2,3,4,5,6,7,8};
	float c[6]= {1,2,3,4,5,6};
	float meaning = meang(a, 7);
	printf("Geometric mean is %.3lf", meaning);
	return 0;
}

4. Даны две матрицы целых чисел S[1..3,0..2], К[1..3,0..2], в каждой из
которых имеется по два одинаковых числа. Распечатать их значения.

#include <stdio.h>
#define SIZE 6
int comparator(int arr[][SIZE], int sarr[][SIZE]){
    for(int i = 0; i < 3; i++){
        for(int j = 0; j <= SIZE - 1; j++){
        	for(int m = 0; m < 3; m++){
        		for(int n = 0; n <= SIZE - 1; n++){
					if(arr[i][j] == sarr[m][n]){
        				printf("%d\n", sarr[m][n]);
    				}
        		}
        	}
        }
    }
}
int main (void){
    int mass[3][SIZE] = {{1, 3, 4, 3, 2, 6},{600,500,400,300,200,100},{7,8,9,10,11,12}};
    int mass2[3][SIZE] = {{2, 1, 7, 8, 4, 10},{100,200,300,400,500,600},{1,2,3,4,5,6}};
    int clap = comparator(mass, mass2);
    return 0;
}


5. Дана матрица целых чисел D[1..6,1..5]. Найти наименьшую из сумм
неотрицательных элементов строк матрицы. Для вычисления суммы
использовать подпрограмму (функцию).

#include <stdio.h>

int futher(int arr[][6], int scai, int scaj) {
	int sumu = 0;
	int sumd = 0;
	for(int i = 0; i<scai; i++){
		for(int j = 0; j<scaj; j++){
			if(arr[i][j]>0){
				if(i == 0){
					sumu += arr[i][j];
				}
				if(i == 1){
					sumd += arr[i][j];
				}
			}
		}
	}
	if(sumu>sumd){
		return sumd;
	}
	else{
		return sumu;
	}
}
int main(void) {
	int a[2][6]= {{1,2,3,4,5,6},{1,2,3,4,5}};
	int kappa = futher(a, 2, 6);
	printf("Futher summary is %d", kappa);
	return 0;
}

6. Дана матрица целых чисел E [1..3,1..5]. Используя функцию, найти среднее
геометрическое значение для каждого столбца матрицы.

#include <stdio.h>
#include <math.h>

int futher(int arr[][6], int scai, int scaj) {
	for(int i = 0; i<scai; i++){
		for(int j = 0; j<scaj; j++){
			float summ = 1;
			for(int k = 0; k<scai; k++){
				summ *= arr[k][j];
				float meang = powf(summ, 1.0/scai);
				if(i == 2){
					printf("For row %d arr == %.3lf\n",j+1, meang);
				}
			}

		}
	}
}
int main(void) {
	int a[3][6]= {{1,2,3,4,5,6},{1,2,3,4,5,6},{6,5,4,3,2,1}};
	int kappa = futher(a, 3, 6);
	return 0;
}

7. Дана матрица целых чисел F [1..4,1..5]. Найти наименьшие значения
элементов в каждой из строк матрицы с помощью функции.

#include <stdio.h>
#include <math.h>

int futher(int arr[][6], int scai, int scaj) {
	int cur = 1000;
	printf("Basic information about array:\n\trows %d\n\tcolumns %d\n",scai, scaj);
	for(int i = 0; i<scai; i++){
		for(int j = 0; j<scaj; j++){
				if(arr[i][j]<cur){
					cur = arr[i][j];
				}
			}
			printf("Minimum is %d\n", cur);;
		}
}
int main(void) {
	int a[3][6]= {{1,2,3,4,5,6},{0,2,3,4,5,6},{6,5,4,3,2,-1}};
	int kappa = futher(a, 3, 6);
	return 0;
}

8. Ввести число N и определить, простое оно или нет. Использовать
функцию, которая отвечает на этот вопрос.

#include <stdio.h>

int futher(int numeric) {
	int count = 0;
	for(int i=1; i<=10; i++){
		if(numeric%i == 0){
			count +=1;
		}
	}
	if(count>2){
		printf("No");
	}
	else{
		printf("Yes");
	}
}
int main(void) {
	int numb;
	scanf("%d", &numb);
	int clow = futher(numb);
	return 0;
}