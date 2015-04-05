define(function () {
    var ID_LENGTH = 16;

    function randomString(length) {
	return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    }

    function generateUniqueId() {
	return randomString(ID_LENGTH);
    }

    function Cfg(singleton) {
	var firstId = generateUniqueId();
	
	this.graph = {};
	this.graph[firstId] = singleton;
	this.first = firstId;
	this.last = firstId;
    }

    Cfg.prototype.mergeRight = function mergeRight(cfg) {
	// check if IDs are really unique?

	for(var nodeId in cfg.graph) {
	    this.graph[nodeId] = cfg.graph[nodeId];
	}

	cfg.graph[cfg.last].next = this.first;
	this.first = cfg.first;
    };

    Cfg.prototype.mergeLeft = function mergeLeft(cfg) {
	// check if IDs are really unique?

	for(var nodeId in cfg.graph) {
	    this.graph[nodeId] = cfg.graph[nodeId];
	}

	this.graph[this.last].next = cfg.first;
	this.last = cfg.last;
    };

    return Cfg;
});
