function TestableFile(dependency) {
    this.dependency = dependency;
}

TestableFile.prototype.activity = function activity() {
    return this.dependency(2) * 2;
};

module.exports = TestableFile;