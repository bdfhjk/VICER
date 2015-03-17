struct struct_t {
    int a;
    int *b;
    long c;
};

struct contains_other_structs {
    struct struct_t a;
    struct struct_t b;
    int c;
};

struct contains_struct_pointers {
    struct struct_t *a, *b;
    struct contains_struct_pointers *c;
} x, y;

struct contains_anonymous_struct {
    struct {
        int hehe;
        int hehehe;
    } some_awful_variable;
};
