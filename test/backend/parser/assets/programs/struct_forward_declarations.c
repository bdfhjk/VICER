struct A;
struct B;

struct A {
    int val;
    struct B * next_b;
};

struct B {
    int val;
    struct A * next_a;
};
