%{
    function extend(from, to) {
        for (var k in from) to[k] = from[k];
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

/* DEKLARACJE -------------------------------------------------------------------------------- DEKLARACJE */

declaration
    : type_specifier declarator_list ';'
        {

            $$ = $2.map(function(obj) {
                extend($1, obj.proto);
                return obj.result;
            });
        }
    ;

declarator_list
    : declarator
        { $$ = [$1]; }
    | declarator_list ',' declarator
        { 
            $1.append($2);
            $$ = $1;
        }
    ;

type_specifier
    : INT 
        { $$ = { type: "concrete_type", name: "int" }; }
    ;

declarator
    : direct_declarator
        { $$ = $1; }
    | '*' declarator
        {
            empty = {};
            extend($2.proto, {
                type: "pointer",
                tvalue: empty
            });
            $$ = {
                result: $2.result,
                proto: empty
            };
        }
    ;

direct_declarator
    : IDENTIFIER
        {
            empty = {};
            $$ = {
                proto: empty,
                result = {
                    type: "declaration",
                    name: $1,
                    tvalue : empty
            };
        }
    | '(' declarator ')'
        { $$ = $2; }
    | direct_declarator '(' parameter_type_list ')'
        {
            empty = {};
            extend($1.proto, {
                type: "function",
                param_tvalues: $3.params,
                return_tvalue: empty,
                is_variadic = $3.is_variadic
            });
            
            $$ = {
                result: $1.result,
                proto: empty
            };
        }
    ;       

parameter_type_list
    : parameter_list
        { $$ = { params: $1, is_variadic: false }; }
    | parameter_list ',' ELLIPSIS
        { $$ = { params: $1, is_variadic: true }; }
    | VOID
        { $$ = { params: [], is_variadic: false }; }
    ;
    
parameter_list
    : parameter_declaration
        { $$ = [$1]; }
    | parameter_list ',' parameter_declaration
        { 
            $1.push($3);
            $$ = $1;
        }
    ;

parameter_declaration
    : type_specifier declarator /* named parameter */
    | type_name /* unnamed parameter */
    ;

type_name
    : type_specifier
    | type_specifier abstract_declarator
    ;

abstract_declarator
    : '*'
    | '*' abstract_declarator
    | direct_abstract_declarator
    ;

direct_abstract_declarator
    : '(' abstract_declarator ')'
    | '(' parameter_type_list ')'
    | direct_abstract_declarator '(' parameter_type_list ')'
    ;

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
        { $$ = {
            type = "compound_statement",
            declarations = [],
            statements = []
        };}
    | '{' statement_list '}'
        { $$ = {
            type = "compound_statement",
            declarations = [],
            statements = $2
        };}

    | '{' declaration_list '}'
        { $$ = {
            type = "compound_statement",
            declarations = $2,
            statements = []
        };}
    | '{' declaration_list statement_list '}'
        { $$ = {
            type = "compound_statement",
            declarations = $2,
            statements = $3
        };}
    ;

declaration_list
    : declaration
        { $$ = [$1]; }
    | declaration_list declaration
        { 
            $1.append($2);
            $$ = $1;
        }
    ;

statement_list
    : statement
        { $$ = [$1]; }
    | statement_list statement
        { 
            $1.append($2);
            $$ = $1;
        }
    ;

expression_statement
    : ';' 
        { $$ = {
            type = "expression_statement",
            expression = null
        };}
    | expression ';'
        { $$ = {
            type = "expression_statement",
            expression = $1
        };}
    ;

selection_statement /* we use compound_statement to avoid ambiguity */
    : IF '(' expression ')' compound_statement
        { $$ = {
            type = "if",
            condition = $3,
            true_body = $5,
            false_body = null
        };}
    | IF '(' expression ')' compound_statement ELSE compound_statement
        { $$ = {
            type = "if",
            condition = $3,
            true_body = $5,
            false_body = $7
        };}
    ;

iteration_statement
    : WHILE '(' expression ')' statement
        { $$ = {
            type = "while",
            condition = $3,
            body = $5
        };}
    | FOR '(' expression_statement expression_statement ')' statement
        { $$ = {
            type = "for",
            condition = $4.expression,
            pre_statement = $3.expression,
            post_statement = null,
            body = $6
        };}

    | FOR '(' expression_statement expression_statement expression ')' statement
        { $$ = {
            type = "for",
            condition = $4.expression,
            pre_statement = $3.expression,
            post_statement = $5,
            body = $7
        };}
    ;

jump_statement
    : CONTINUE ';'
        { $$ = { type: "continue" }; }
    | BREAK ';'
        { $$ = { type: "break" }; }
/*  | RETURN ';' */ /* we have only int type right now */ 
    | RETURN expression ';'
        { $$ = { 
            type: "return",
            expression: $2
        };}
    ;

translation_unit
    : external_declaration 
        { $$ = { 
            type: "translation_unit",
            external_declarations: [$1]
        };}
    | translation_unit external_declaration
        { 
            $1.external_declarations.push($2);
            $$ = $1;
        }
    ;

external_declaration
    : function_definition
        { $$ = $1; }
    | declaration
        { $$ = $1; }
    ;

function_definition
    : type_specifier declarator compound_statement
    ;
%%
