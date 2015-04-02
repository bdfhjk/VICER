require("../../prepare-tests.js");

describe("Executor", function() {
    var Executor; 

    before(function(done) {
        requirejs(["mod_executor/Executor"], function(executor) {
            Executor = executor;
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
                    return a+b;
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
        }
    ]
    .map(function(testCase) {
        it (testCase.description, function() {
            var asset = require("./assets/" + testCase.file);
            var proc = Executor.createProcess(asset.global, asset.functions, asset.values);
            expect(Executor.finish(proc)).to.equal(testCase.expected);
        });
    }.bind(this));
});