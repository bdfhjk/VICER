int main(void)
{
  int *x;
  x = (int *) malloc(sizeof(int));
  *x = 5;
  return *x;
}
