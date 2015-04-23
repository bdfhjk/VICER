int main(void) {
      int tab[50];
      tab[1] = 3;
      tab[2] = 4;
      return *(tab + 1) + *(tab + 2); 
}
