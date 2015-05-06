define(function () {
    var ID_LENGTH = 16;
    var ids = {};

    function randomString(length) {
	return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    }

    function generateUniqueId() {
	var generatedId;
	do {
	    generatedId = randomString(ID_LENGTH);
	} while(ids[generatedId]);

	ids[generatedId] = true;
	return generatedId;
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

	for (var nodeId in cfg.graph) {
	    this.graph[nodeId] = cfg.graph[nodeId];
	}

	cfg.graph[cfg.last].next = this.first;
	this.first = cfg.first;
    };

    Cfg.prototype.mergeLeft = function mergeLeft(cfg) {
	// check if IDs are really unique?

	for (var nodeId in cfg.graph) {
	    this.graph[nodeId] = cfg.graph[nodeId];
	}

	this.graph[this.last].next = cfg.first;
	this.last = cfg.last;
    };

    Cfg.prototype.mergeTwoLeft = function mergeTwoLeft(cfgLeft, cfgRight) {
	for (var nodeIdL in cfgLeft.graph) {
	    this.graph[nodeIdL] = cfgLeft.graph[nodeIdL];
	}
	for (var nodeIdR in cfgRight.graph) {
	    this.graph[nodeIdR] = cfgRight.graph[nodeIdR];
	}

	var noopId = generateUniqueId();
	this.graph[noopId] = {
	    "type": "NOOP",
	    "next": null
	};

	this.graph[this.last].true = cfgLeft.first;
	this.graph[this.last].false = cfgRight.first;
	this.graph[cfgLeft.last].next = noopId;
	this.graph[cfgRight.last].next = noopId;
	this.last = noopId;
    };

    return Cfg;
});
