%{

    function extend(to, from) {
        for (var k in from) to[k] = from[k];
    }

    function print(obj) {
        console.log(JSON.stringify(obj, null, 4));
    }

    function pointer(declarator) {
        empty = {};
        extend(declarator.proto, {
            type: "pointer",
            tvalue: empty
        });
        return {
            result: declarator.result,
            proto: empty
        };
    }

    function concrete_type(name) {
        return { 
            type: "concrete_type",
            name: name
        };
    }

    function full_declaration(type_specifier, declarator) {
        extend(declarator.proto, type_specifier);
        return declarator.result;
    }

    function full_declaration_array(type_specifier, declarator_list) {
        return declarator_list.map(
            function(declarator) {
                full_declaration(type_specifier, declarator);
            }
        );
    }

    function push_elem(array, elem) {
        array.push(elem);
        return array;
    }

    function partial_declaration(name) {
        empty = {};
        return {
            proto: empty,
            result: {
                type: "declaration",
                name: name,
                tvalue: empty
            }
        };
    }

    function partial_function_declaration(name, parameters) {
        empty = {};
        return {
            proto: empty,
            result: {
                type: "function_declaration",
                name: name,
                param_declarations: parameters,
                return_tvalue: empty
            }
        };
    }

    function compound_statement(declarations, statements) {
        return {
            type: "compound_statement",
            declarations: declarations,
            statements: statements
        };
    }
        
    function expression_statement(expression) {   
        return {
            type: "expression_statement",
            expression: expression
        };
    }
       
    function if_statement(condition, true_body, false_body) {
        return {
            type: "if",
            condition: condition,
            true_body: true_body,
            false_body: null
        };
    }
    
    function while_statement(condition, body) {
        return {
            type: "while",
            condition: condition,
            body: body
        };
    }

    function for_statement(condition, pre, post, body) {
        return {
            type: "for",
            condition: condition,
            pre_statement: pre,
            post_statement: post,
            body: body
        };
    }
   
    function continue_statement() {
        return { type: "continue" };
    }
    
    function break_statement() {
        return { type: "break" };
    }

    function return_statement(expression) {
        return {
            type: "return",
            expression: expression
        };
    }

    function translation_unit(external_declarations) {
        return {
            type: "translation_unit",
            external_declarations: external_declarations
        };
    }
     
    function function_definition(declaration, body) {
        return {
            type: "function_definition",
            declaration: declaration,
            body: body
        };
    }
%}


%token IDENTIFIER CONSTANT STRING_LITERAL SIZEOF
%token PTR_OP INC_OP DEC_OP LEFT_OP RIGHT_OP LE_OP GE_OP EQ_OP NE_OP
%token AND_OP OR_OP MUL_ASSIGN DIV_ASSIGN MOD_ASSIGN ADD_ASSIGN
%token SUB_ASSIGN LEFT_ASSIGN RIGHT_ASSIGN AND_ASSIGN
%token XOR_ASSIGN OR_ASSIGN TYPE_NAME

%token TYPEDEF EXTERN STATIC AUTO REGISTER
%token CHAR SHORT INT LONG SIGNED UNSIGNED FLOAT DOUBLE CONST VOLATILE VOID
%token STRUCT UNION ENUM ELLIPSIS

%token CASE DEFAULT IF ELSE SWITCH WHILE DO FOR GOTO CONTINUE BREAK RETURN

%start translation_unit
%%

/* --------- EXPRESSIONS ---------- */

primary_expression
    : IDENTIFIER
    | CONSTANT
    | STRING_LITERAL
    | '(' expression ')'
    ;

postfix_expression
    : primary_expression
    | postfix_expression '(' ')'
    | postfix_expression '(' argument_expression_list ')'
    | postfix_expression INC_OP
    | postfix_expression DEC_OP
    ;

argument_expression_list
    : assignment_expression
    | argument_expression_list ',' assignment_expression
    ;

unary_expression
    : postfix_expression
    | INC_OP unary_expression
    | DEC_OP unary_expression
    | unary_operator cast_expression
    | SIZEOF unary_expression
    | SIZEOF '(' type_name ')'
    ;

unary_operator
    : '&'
    | '*'
    | '+'
    | '-'
    | '~'
    | '!'
    ;

cast_expression
    : unary_expression
    | '(' type_name ')' cast_expression
    ;

multiplicative_expression
    : cast_expression
    | multiplicative_expression '*' cast_expression
    | multiplicative_expression '/' cast_expression
    | multiplicative_expression '%' cast_expression
    ;

additive_expression
    : multiplicative_expression
    | additive_expression '+' multiplicative_expression
    | additive_expression '-' multiplicative_expression
    ;

shift_expression
    : additive_expression
    | shift_expression LEFT_OP additive_expression
    | shift_expression RIGHT_OP additive_expression
    ;

relational_expression
    : shift_expression
    | relational_expression '<' shift_expression
    | relational_expression '>' shift_expression
    | relational_expression LE_OP shift_expression
    | relational_expression GE_OP shift_expression
    ;

equality_expression
    : relational_expression
    | equality_expression EQ_OP relational_expression
    | equality_expression NE_OP relational_expression
    ;

and_expression
    : equality_expression
    | and_expression '&' equality_expression
    ;

exclusive_or_expression
    : and_expression
    | exclusive_or_expression '^' and_expression
    ;

inclusive_or_expression
    : exclusive_or_expression
    | inclusive_or_expression '|' exclusive_or_expression
    ;

logical_and_expression
    : inclusive_or_expression
    | logical_and_expression AND_OP inclusive_or_expression
    ;

logical_or_expression
    : logical_and_expression
    | logical_or_expression OR_OP logical_and_expression
    ;

conditional_expression
    : logical_or_expression
    | logical_or_expression '?' expression ':' conditional_expression
    ;

assignment_expression
    : conditional_expression
    | unary_expression assignment_operator assignment_expression
    ;

assignment_operator
    : '='
    | MUL_ASSIGN
    | DIV_ASSIGN
    | MOD_ASSIGN
    | ADD_ASSIGN
    | SUB_ASSIGN
    | LEFT_ASSIGN
    | RIGHT_ASSIGN
    | AND_ASSIGN
    | XOR_ASSIGN
    | OR_ASSIGN
    ;

expression
    : assignment_expression
    | expression ',' assignment_expression
    ;

constant_expression
    : conditional_expression
    ;

/* ---------- DECLARATIONS ---------- */

declaration
    : type_specifier declarator_list ';'
        { $$ = full_declaration_array($1, $2); }
    ;

declarator_list
    : declarator
        { $$ = [$1]; }
    | declarator_list ',' declarator
        { $$ = push_elem($1, $3); }
    ;

type_specifier
    : INT 
        { $$ = concrete_type("int"); }
    ;

declarator
    : direct_declarator
        { $$ = $1; }
    | '*' declarator
        { $$ = pointer($2); }
    ;

direct_declarator
    : IDENTIFIER
        { $$ = partial_declaration($1); }
    | '(' declarator ')'
        { $$ = $2; }
    ;

function_declarator
    : direct_function_declarator
        { $$ = $1; }
    | '*' function_declarator
        { $$ = pointer($2); }
    ;

direct_function_declarator
    : IDENTIFIER '(' parameter_list ')'
        { $$ = partial_function_declaration($1, $3); }
    | '(' declarator ')'
        { $$ = $2; }
    ;

parameter_list
    : parameter_nonempty_list
        { $$ = $1; }
    | VOID
        { $$ = []; }
    ;
    
parameter_nonempty_list
    : parameter_declaration
        { $$ = [$1]; }
    | parameter_list ',' parameter_declaration
        { $$ = push_elem($1, $3); }
    ;

parameter_declaration
    : type_specifier declarator /* parameter must be named */
        { $$ = full_declaration($1, $2); }
    ;

/* ---------- STATEMENTS ---------- */

statement
    : compound_statement
        { $$ = $1; }
    | expression_statement
        { $$ = $1; }
    | selection_statement
        { $$ = $1; }
    | iteration_statement
        { $$ = $1; }
    | jump_statement
        { $$ = $1; }
    ;

compound_statement
    : '{' '}'
        { $$ = compound_statement([], []); }
    | '{' statement_list '}'
        { $$ = compound_statement([], $2); }
    | '{' declaration_list '}'
        { $$ = compound_statement($2, []); }
    | '{' declaration_list statement_list '}'
        { $$ = compound_statement($2, $3); }
    ;

declaration_list
    : declaration
        { $$ = [$1]; }
    | declaration_list declaration
        { $$ = push_elem($1, $2); }
    ;

statement_list
    : statement
        { $$ = [$1]; }
    | statement_list statement
        { $$ = push_elem($1, $2); }
    ;

expression_statement
    : ';' 
        { $$ = expression_statement(null); }
    | expression ';'
        { $$ = expression_statement($1); }
    ;

selection_statement /* we use compound_statement to avoid ambiguity */
    : IF '(' expression ')' compound_statement
        { $$ = if_statement($3, $5, null); }

    | IF '(' expression ')' compound_statement ELSE compound_statement
        { $$ = if_statement($3, $5, $7); }
    ;

iteration_statement
    : WHILE '(' expression ')' statement
        { $$ = while_statement($3, $5); }

    | FOR '(' expression_statement expression_statement ')' statement
        { $$ = for_statement($4.expression, $3.expression, null, $6); }

    | FOR '(' expression_statement expression_statement expression ')' statement
        { $$ = for_statement($4.expression, $3.expression, $5, $7); }
    ;

jump_statement
    : CONTINUE ';'
        { $$ = continue_statement(); }
    | BREAK ';'
        { $$ = break_statement(); }
    | RETURN ';'
        { $$ = return_statement(null); }
    | RETURN expression ';'
        { $$ = return_statement($2); }
    ;

translation_unit
    : external_declaration_list
        { print(translation_unit($1)); return translation_unit($1); }
    ;

external_declaration_list
    : external_declaration
        { $$ = [$1]; }
    | external_declaration_list external_declaration
        { $$ = push_elem($1, $2); }
    ;

external_declaration
    : function_definition
        { $$ = $1; }
    | function_declaration
        { $$ = $1; }
    | declaration
        { $$ = $1; }
    ;

function_definition
    : function_declaration_no_colon compound_statement
        { $$ = function_definition($1, $2); }
    ;

function_declaration
    : function_declaration_no_colon ';'
        { $$ = $1; }
    ;

function_declaration_no_colon
    : type_specifier function_declarator
        { $$ = full_declaration($1, $2); }
    ;
%%
