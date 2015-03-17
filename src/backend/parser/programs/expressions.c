void expressions_by_priority(void) {
    identifier;
    4324235;
    0x1E4C;
    0474;
    "a word";
    (expression);

    tab[integer];
    function_pointer(arg1, arg2);
    struct_var.member;
    struct_ptr->member;
    lvalue++;
    lvalue--;

    ++lvalue;
    --lvalue;
    &lvalue;
    *pointer;
    +number;
    -number;
    ~integer;
    !integer_or_pointer;
    sizeof expression;
    sizeof tab;
    sizeof (int);
    sizeof (struct A);
    
    (int) number;
    (struct struct_tag *) pointer;
    (unsigned int *) pointer;

    number * number;
    number / number;
    number % number;

    num_or_ptr + number;
    num_or_ptr - number;
    pointer - pointer;

    integer << integer;
    integer >> integer;

    number < number;
    number > number;
    number <= number;
    number >= number;
    pointer < pointer;
    pointer > pointer;
    pointer <= pointer;
    pointer >= pointer;

    expr == expr;
    expr != expr;

    integer & integer;

    integer ^ integer;

    integer | integer;

    num_or_ptr && num_or_ptr;

    num_or_ptr || num_or_ptr;

    num_or_ptr ? expr : one_of_above_expr;

    a = b;
    a *= b;
    a /= b;
    a %= b;
    a += b;
    a -= b;
    a << b;
    a >>= b;
    a &= b;
    a ^= b;
    a |= b;

    expr, expr;

    return;
}

void examples(void) {
    (*(f() + g()) + struct_var.val & 0x1F4D ? fun1 : fun2)("argument");
    f(30, f2((i++, struct_ptr->member)), FLAGS);
    (void *) (1L << 23);
    x ^= 0x4;
}
