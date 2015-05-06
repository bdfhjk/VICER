int expressions_by_priority(void) {
    identifier;
    4324235;
    0x1E4C;
    0474;
    "a word";
    (expression);

    function(arg1, arg2);
    tab[index];
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

    return 0;
}
