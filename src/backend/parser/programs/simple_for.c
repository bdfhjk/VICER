int some_sum(void) {
    int i, j, result, result2;
    result = result2 = 0;
    
    for (i = 1; i < 100; ++i) {
        result += i;
    }

    for (i = 1; i < 100; ++i) {
        for (j = i; j < 100; ++j) {
            result2 += i + j;
        }
    }
    
    return result + result2;
}
