struct only_struct_definition {
    int a;
    int *b;
    long c;
};

struct definition_with_variable_declaration {
    int a, b;
} x, y;

struct {
    char *word;
} variable_of_anonymous_struct;
