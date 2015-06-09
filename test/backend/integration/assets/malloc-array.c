int main(void)
{
  int *x;
  x = (int *) malloc(sizeof(int) * 3);
  x[0] = 1;
  x[1] = 2;
  x[2] = 3;
  return x[0] + x[1] + x[2];
}
