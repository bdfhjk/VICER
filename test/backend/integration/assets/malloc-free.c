int main(void)
{
  int *x;
  x = (int *) malloc(sizeof(int));
  free(x);
  return 5;
}
