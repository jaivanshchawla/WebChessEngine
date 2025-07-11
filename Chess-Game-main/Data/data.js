import { renderhighlight } from "../render/main.js";

function Greet() {
  alert("Hello, World");
}

  
// for each square
function Square(color, id, piece) {
  return { color, id, piece,};
}

function squarerow(rowid){
  const squarerow = [];
  const abcd = ['a','b','c','d','e','f','g','h'];

  if(rowid%2==0){
    abcd.forEach((element, index) => {
      if(index%2==0){
        squarerow.push(Square("white",element + rowid,null));
      }
      else{
        squarerow.push(Square("black",element + rowid,null));
      }
    })
  }
  else{
    abcd.forEach((element, index) => {
      if(index%2==0){
        squarerow.push(Square("black",element + rowid,null));
      }
      else{
        squarerow.push(Square("white",element + rowid, null));
      }
    })
  }

  return squarerow;
}

function initgame(){
    return [squarerow(8),squarerow(7),squarerow(6),squarerow(5),squarerow(4),squarerow(3),squarerow(2),squarerow(1)];
}

export {initgame};