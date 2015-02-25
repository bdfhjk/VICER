define(["./TestableFile"], function(Testable) {
    alert("calculation result is " + new Testable(function() { return 3; }).activity());
});
