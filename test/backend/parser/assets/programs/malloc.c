int main(void) {
    char * a;
    int * b;
    a = (char *) malloc(800);
    b = (int *) malloc(100);
    *((int*) malloc(20) + 4);   
}
