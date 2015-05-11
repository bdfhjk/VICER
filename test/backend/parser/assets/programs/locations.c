int b, c;

int main(void) {
    int h, j, k;
    
    h = j = k = 1;

    for (h = 2, j = 3;; ++j) {
        k = h + j;
    }

    while (k != 2) ++k;

    if (h != j) {
        printf("LOL");
    } else {
        printf("NOLOL");
    }

    return 10;
}

int square(int a) {
    return a*a;
}
    
