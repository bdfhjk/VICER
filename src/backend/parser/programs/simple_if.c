int weird_pow(int n) {
    if (n & 1) {
        return n * n;
    } else {
        return n * n * n;
    }
}
