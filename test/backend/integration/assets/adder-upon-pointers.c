int add(int* a, int* b) {
  return *a + *b;
}

int main(void) {
  int a;
  int b;
  a = 4;
  b = 2;
  return add(&a, &b);
}
