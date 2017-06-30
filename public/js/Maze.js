function createMaze() {
   $("#maze").empty();
    var rows = parseInt($("#width").val());
    var cols = parseInt($("#height").val());
    $('#note').empty();
    if (rows > 50 || cols > 50) {
      $('#note').html("good luck - you'll need it.");
    }
    if (rows && cols) {
        printMaze(new DisjointSet(rows * cols), rows, cols);  
    } else {
      alert("please input numeric values");
    }
}

function printMaze(dis, rows, cols) {
   var size = rows * cols;
   var verticals = [];
   var horizontals = [];

   for (var i = 0; i < size; i++) {
    verticals.push(true);
   }
   //size -1 opens up last cell
   for (var i = 0; i < size - 1; i++) {
      horizontals.push(true);
   }

   while(dis.numSets() > 1) {
      // select a random cell and adjacent cell
      var cell = Math.floor(Math.random() * size);
      var adjacentCell = locate(cell, rows, cols);

      // if disjoint, union and find direction of cell
      var u = dis.find(cell);
      var v = dis.find(adjacentCell);

      if(u != v) {
         dis.union(u, v);

         if(adjacentCell == (cell - cols)) { // above cell
            horizontals[adjacentCell] = false;
         } else if(adjacentCell == (cell + cols)) { // bottom cell
            horizontals[cell] = false;;
         } else if(adjacentCell == (cell + 1)) { //right cell
            verticals[cell] = false;
         } else if(adjacentCell == (cell - 1)) { //left cell
            verticals[adjacentCell] = false 
         }
      }
   }
   
   var mazeArea = $("#maze");
   //print the horizontals line
   mazeArea.append("+");
   for(var i = 0; i < cols; i++) {
      mazeArea.append("-+");
   }
   mazeArea.append("<br>");
   
   //continue printing rest of maze
   for(var row = 0; row < rows * cols; row += cols) {
      if(row == 0) {
         mazeArea.append("&nbsp;");
      } else {
         mazeArea.append("|");
      }
      
      for(var col = row; col < cols + row; col++) {
         if(verticals[col]) {
            mazeArea.append("&nbsp;|");
         } else {
            mazeArea.append("&nbsp;&nbsp;");
         }
      }
      mazeArea.append("<br>");
      
      for(var col = row; col < cols + row; col++) {
         if(horizontals[col]) {
            mazeArea.append("+-");
         } else {
            mazeArea.append("+&nbsp;");
         }
      }
      mazeArea.append("+");
      mazeArea.append("<br>");
   }
}





function locate(cell, rows, cols) {
   var aroundList = [];
   if ((cell + cols) < (rows * cols)) {
      aroundList.push(cell + cols);
   }
   if ((cell % cols) != 0) {
      aroundList.push(cell - 1);
   }
   if ((cell + 1) % cols != 0) {
      aroundList.push(cell + 1);
   }
   if (cell - cols > 0) {
      aroundList.push(cell - cols);
   }
   return aroundList[Math.floor(Math.random() * aroundList.length)];
}