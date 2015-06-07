int main(void) {
  int errs;

  errs = 0;

  if ((4 & 5) != 4) {
    errs++;
  }

  if ((123 | 456) != 507) {
    errs++;
  }

  if ((4 << 2) != 16) {
    errs++;
  }

  if ((32 >> 2) != 8) {
    errs++;
  }

  return errs;
}
