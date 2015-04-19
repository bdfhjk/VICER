int fun(int n) {
    while (n > 0) {
        fun(n-1);
        n -= 2;
    }

    return 1;
}
