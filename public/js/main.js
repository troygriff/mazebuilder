var set;

$(document).ready(function() {

   $("#MazeButton").click(function() {
      createMaze();
   });
    
    document.body.onkeyup = function(e) {
        var keyCode = e.keyCode;
        if(keyCode == 13) { // enter
            createMaze();
        }
    }
});