require("../../prepare-tests.js");

describe("Executor", function() {
    var Executor;
    var EventEmitter;

    before(function(done) {
        requirejs(["mod_executor/Executor", "eventEmitter"], function(executor, ee) {
            Executor = executor;
            EventEmitter = ee;
            done();
        });
    });

    [
        {
            description: "just exit with code 42",
            file: "return-42.json",
            expected: 42

            /*
                int main() {
                    return 42;
                }
            */
        },
        {
            description: "no return statement",
            file: "noreturn.json",
            expected: 0

            /*
                int main() {

                }
            */
        },
        {
            description: "assign and add to global and local scope",
            file: "global-local-scope.json",
            expected: 5

            /*
                int a;

                int main() {
                    int b;
                    a=2;
                    b=3;
                    return a+b;
                }
            */
        },
        {
            description: "return function called without parameters",
            file: "paramless-function-call.json",
            expected: 42

            /*
                int fun() {
                    return 42;
                }

                int main() {
                    return fun();
                }
            */
        },
        {
            description: "call a function with 2 numbers",
            file: "adder.json",
            expected: 6

            /*
                int add(int a, int b) {
                    return a + b;
                }

                int main() {
                    return add(4, 2);
                }
            */
        },
        {
            description: "simple branch true",
            file: "simple-branch-true.json",
            expected: 42

            /*
                int main() {
                    if (1) 
                        return 42;
                    else
                        return 21;
                }
            */
        },
        {
            description: "simple branch false",
            file: "simple-branch-false.json",
            expected: 21

            /*
                int main() {
                    if (0) 
                        return 42;
                    else
                        return 21;
                }
            */
        },
        {
            description: "sum [1..5]",
            file: "sum1to5.json",
            expected: 15

            /*
                int result;
                int main() {
                    int i;
                    i = 0;
                    result = 0;
                    while (!(i == 6)) {
                        result = result + i;
                        i++;
                    }
                }
            */
        },
        {
            description: "10th Fibonacci",
            file: "fibonacci10th.json",
            expected: 55

            /*
                int fib(int n) {
                    if (n == 0)
                        return 0;
                    if (n == 1)
                        return 1;
                    return fib(n-1) + fib(n-2);
                }

                int main() {
                    return fib(10);
                }
            */
        },
        {
            description: "String literal",
            file: "string-literal.json",
            expected: 33 // char code of '!'

            /*
                char* hello;

                int main() {
                    hello = "Hello, world!";
                    return hello[12];
                }
            */
        },
        {
            description: "Adder upon pointers",
            file: "adder-upon-pointers.json",
            expected: 6

            /*
                int add(int* a, int* b) {
                    return *a + *b;
                }

                int main() {
                    int a;
                    int b;
                    a = 4;
                    b = 2;
                    return add(&a, &b);
                }
            */
        },
        {
            description: "Fibonacci 10th - dynamic",
            file: "fibonacci10th-dynamic.json",
            expected: 55

            /*
                int fibval[11];
                
                int fib(int n) {
                    if (n == 0)
                        return 0;
                    if (n == 1)
                        return 1;
                    if (fibval[n] != 0)
                        return fibval[i];
                    fibval[n] = fib(n-1) + fib(n-2);
                    return fibval[n];
                }

                void zeroArray() {
                    int i;
                    i = 0;
                    while (i <= 10) {
                        fibval[i] = 0;
                        i++;
                    }    
                }

                int main() {
                    return fib(10);
                }
            */
        },
        {
            description: "call printf with varargs",
            file: "printf-varargs.json",
            expected_printf: "Hello world!"

            /*
                void main() {
                    printf("%s %s", "Hello", "world!");
                }
            */
        },
    ]
    .map(function(testCase) {
        it (testCase.description, function(done) {
            var world = new EventEmitter();
            
            var asset = require("./assets/" + testCase.file);
            var proc = Executor.createProcess(asset.global, asset.functions, asset.values, world);
            if (typeof testCase.expected === "number") {
                expect(Executor.finish(proc)).to.equal(testCase.expected);
                done();
            } else if (testCase.expected_printf) {
                world.addListener("stdout", function(str) {
                    expect(str).to.equal(testCase.expected_printf);
                    done();
                });
                Executor.finish(proc);
            }
            
        });
    }.bind(this));
});