function DisjointSet(numelements){
	this.numSet = [];
	for (var i = 0; i < numelements; i++) {
		this.numSet[i] = -1;
	}
}

DisjointSet.prototype.union = function(set1, set2) {
     if(this.numSet[set1] >= 0 || this.numSet[set2] >= 0) {
     	console.log("error");
	} else if(set1 > this.numSet.length - 1 || set2 > this.numSet.length - 1) {
		console.log("error");
	} else {
	  if(this.numSet[set1] < this.numSet[set2]){
         this.numSet[set1] = this.numSet[set1] + this.numSet[set2];
         this.numSet[set2] = set1;
      }else{
         this.numSet[set2] = this.numSet[set1] + this.numSet[set2];
         this.numSet[set1] = set2;
      }
  }
}

DisjointSet.prototype.find = function(root) {
	var rootCopy = root;
	while(this.numSet[root] > -1) {
		root = this.numSet[root];
	}
	if(root == rootCopy) {
		return root;
	} else {
		while(rootCopy != root) {
			this.numSet[rootCopy] = root;
			rootCopy = this.numSet[rootCopy];
		}
		return root;
	}
};

DisjointSet.prototype.numSets = function() {
	var count = 0;
	for(var i = 0; i < this.numSet.length; i++) {
		if(this.numSet[i] < 0) {
			count++;
		}
	}
	return count;
}
