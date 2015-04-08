int **f(void);

int f2(int a, int *b);

int f3(int (*g)(int a, int b));

int (*f4(int a))(void);

int *(*(*f5)(int (*z)(int a), int *b))(int c);
