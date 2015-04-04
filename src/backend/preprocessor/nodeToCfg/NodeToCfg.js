define([
    './Return'
], function (Return) {
    var ID_LENGTH = 16;
    
    function randomString(length) {
	return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    }

    function generateUniqueId() {
	return randomString(ID_LENGTH);
    }

    function CfgFromNode(singleton) {
	var firstId = generateUniqueId();
	
	this.graph = {};
	this.graph[firstId] = singleton;
	this.first = firstId;
	this.last = firstId;
    };

    CfgFromNode.prototype.addBefore = function addBefore(cfg) {
	// check if IDs are really unique?

	for(var nodeId in cfg.graph) {
	    this.graph[nodeId] = cfg.graph[nodeId];
	}

	cfg.graph[cfg.last].next = this.first;
	this.first = cfg.first;
    };

    CfgFromNode.prototype.addAfter = function addAfter(cfg) {
	// check if IDs are really unique?

	for(var nodeId in cfg.graph) {
	    this.graph[nodeId] = cfg.graph[nodeId];
	}

	this.graph[this.last].next = cfg.first;
	this.last = cfg.last;
    };

    function nodeToCfg(nodeAst) {
	var generators = {
	    'RETURN': Return
	};

	var generator = generators[nodeAst.type];
	return CfgFromNode(generator(nodeAst));
    };

    return nodeToCfg;
});
