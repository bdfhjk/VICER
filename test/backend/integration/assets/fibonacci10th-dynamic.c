int fibval[11];
                
int fib(int n) {
  if (n == 0) {
    return 0;
  }
  if (n == 1) {
    return 1;
  }
  if (fibval[n] != 0) {
    return fibval[n];
  }
  fibval[n] = fib(n-1) + fib(n-2);
  return fibval[n];
}

int zeroArray(void) {
  int i;
  i = 0;
  while (i <= 10) {
    fibval[i] = 0;
    i++;
  }    
  return 0;
}

int main(void) {
  zeroArray();
  return fib(10);
}
