1. Написать программу для вычисления факториала числа, введенного с
клавиатуры.

#include <stdio.h>

int fact(int n){
	int res = 1;
	char err[] = "Not possible to take factorial from negative number";
	if(n==0){
		return res;
	}else if(n>0){
		res = n*fact(n-1);
		return res;
	}else{
		return err;
	}
}
int main(void){
	int n = 9;
	int klapp = fact(n);
	printf("Factorial from %d is %d\n", n, klapp);
	return 0;
}

2. Написать программу для вычисления чисел Фибоначчи fi:

#include <stdio.h>

int fibon(int fib_fst, int fib_sec, int n){
	int nachi = fib_fst+fib_sec;
	if (nachi < n){
		return fibon(fib_sec, nachi, n);
	}else{
		return fib_sec;
	}
}
int main(void){
	int klapp = fibon(0,1,1000);
	printf("Recursive summary of array is %d", klapp);
	return 0;
}

3. Определите функцию K(n), которая возвращает количество цифр в
заданном натуральном числе n:

#include <stdio.h>

int ka(int n){
	if(n<10){
		return 1;
	}else if(n>=10){
		return ka(n/10)+1;
	}
}
int main(void){
	int klapp = ka(123);
	printf("K(n) is %d", klapp);
	return 0;
}

4. Функция C(m, n), где 0 <= m <= n, для вычисления биномиального
коэффициента

#include <stdio.h>

int fact(int n){
	int res = 1;
	if(n==0){
		return res;
	}else{
		res = n*fact(n-1);
		return res;
	}
}
int cu(int n,int m){
	return fact(n)/(fact(m)*fact(n-m));
}
int main(void){
	int m = 4;
	int n = 10;
	int klapp = cu(n, m);
	printf("C(%d, %d) is %d", n, m, klapp);
	return 0;
}

5. Вычислить сумму элементов одномерного массива.

#include <stdio.h>
#define size 10

int rec_sum(int *array, int n){
	int sum = 0;
	if (n < 0) {
         return sum;
    }

    return array[n] + rec_sum(array, n - 1);
}
int main(void){
	int arr[size] = {1,2,3,4,5,6,7,8,9};
	int klapp = rec_sum(arr, size);
	printf("Recursive summary of array is %d", klapp);
	return 0;
}
