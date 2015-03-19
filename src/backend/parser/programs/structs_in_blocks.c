struct global_struct {
    int a;
};

void fun1(void) {
    struct local_struct {
        int var1, var2;
    } x, y;
}

void fun2(void) {
    struct one_struct {
        int a, b;
    } xx;
    
    while (1) {
        struct other_struct {
            int a, b;
        } yy;
    }
}

void fun3(void) {
    struct shadowing_example {
        int aa;
    };
    if (1) {
        struct shadowing_example {
            long bb; 
        };
        struct shadowing_example z;
    }
}

void fun4(void) {
    struct A;
    struct B;
    
    struct A {
        struct B * b;
    };
    struct B {
        struct A * a;
    };
}
