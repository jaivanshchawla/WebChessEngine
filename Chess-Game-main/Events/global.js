import { root_div } from "../Helper/constants.js";
import { globalstate,keysquaremapper } from "../index.js";
import { globalstaterenderer,clearhighlight,selfhighlight } from "../render/main.js";
import { checksquarecaptureid,checkpieceofopponent,givebishophighlightid,checkweatherpieceexistornot,checkpieceofopponentonelement,giverookhighlightid,giveknighthighlightid,givequeenhighlightid,givekinghighlightid } from "../Helper/commonhelper.js";


//highlighted or not (RED)
let highlight_state = false;

//to track turn
let inturn = "white";

function changeturn(){
    inturn = inturn === "white" ? "black" : "white";
}

//to capture when its turn to capture
function captureinturn(square){
    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    return;
}

//move element to square with id
function moveelement(piece,id){
    
    changeturn();
    const flatdata = globalstate.flat();
    flatdata.forEach((el) => {

        //to delete piece from previous position in database
        if(el.id == piece.current_position){
            delete el.piece;
        }

        if(el.id == id){
            el.piece = piece;
        }
    });

    clearhighlight();
    //to actually delete the pic of the piece
    const previouspiece = document.getElementById(piece.current_position);
    previouspiece.classList.remove("highlightyellow");
    const currentpiece = document.getElementById(id);

    //copying html to new piece and making the previous one empty
    currentpiece.innerHTML = previouspiece.innerHTML;
    previouspiece.innerHTML = "";

    piece.current_position = id;
}


//current yellow highlighted square 
let selfhighlightstate = null;

//in move state or not
let movestate = null;


//move piece from x to y
function movepiecefromxtoy(from , to){
    to.piece = from.piece;
    from.piece = null;
    globalstaterenderer();
}


//local function to clear highlight dot
function clearhighlightlocal(){
    clearhighlight();
    highlight_state = false;
}


//white pawn
function whitepawnclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = null;

    //on initial position
    if(current_pos[1]=="2"){
         highlightsquareids = [
            `${current_pos[0]}${Number(current_pos[1])+1}`,
            `${current_pos[0]}${Number(current_pos[1])+2}`,
        ];
    }
    else{
        highlightsquareids = [`${current_pos[0]}${Number(current_pos[1])+1}`];
    }

    highlightsquareids = checksquarecaptureid(highlightsquareids);

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    })

    // code for capturing
    const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1])+1}`;
    const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1])+1}`;

    let captureid = [col1,col2];

    captureid.forEach(element => {
        checkpieceofopponent(element,"WHITE");
    });

    globalstaterenderer();
}

//white bishop
function whitebishopclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = givebishophighlightid(current_pos);

    //temp is for capture ids
    let temp = [];

    const {bottomleft,topleft,bottomright,topright} = highlightsquareids;

    //we are using checksquareid function to check if there is anything on the pass of the bishop, if there is then bishop cant move ahead of that piece
    let result = [];
    result.push(checksquarecaptureid(bottomleft));
    result.push(checksquarecaptureid(topleft));
    result.push(checksquarecaptureid(bottomright));
    result.push(checksquarecaptureid(topright));

    // insert into temp
    temp.push(bottomleft);
    temp.push(topleft);
    temp.push(bottomright);
    temp.push(topright);

    highlightsquareids = result.flat();

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });

    // code for capturing
    let captureids = []

    for(let index=0;index<temp.length;index++){
        const arr = temp[index];

        for(let j=0;j<arr.length;j++){
            const element = arr[j];
            let checkpieceresult = checkweatherpieceexistornot(element);

            //to break if our own color piece is there no need to check ahead of it
            if(checkpieceresult && checkpieceresult.piece && checkpieceresult.piece.piece_name.toLowerCase().includes("white")){
                break;
            }

            //if there is an opponent piece this function will highlight it and break since we cannot go ahead of the opponent piece
            if(checkpieceofopponentonelement(element,"white")){
                break;
            }
        }
    }

    globalstaterenderer();
}

//white rook
function whiterookclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = giverookhighlightid(current_pos);

    //temp is for capture ids
    let temp = [];

    const {bottom,left,right,top} = highlightsquareids;

    //we are using checksquareid function to check if there is anything on the pass of the bishop, if there is then bishop cant move ahead of that piece
    let result = [];
    result.push(checksquarecaptureid(bottom));
    result.push(checksquarecaptureid(left));
    result.push(checksquarecaptureid(right));
    result.push(checksquarecaptureid(top));

    // insert into temp
    temp.push(bottom);
    temp.push(left);
    temp.push(right);
    temp.push(top);

    highlightsquareids = result.flat();

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });

    // code for capturing
    let captureids = []

    for(let index=0;index<temp.length;index++){
        const arr = temp[index];

        for(let j=0;j<arr.length;j++){
            const element = arr[j];
            let checkpieceresult = checkweatherpieceexistornot(element);

            //to break if our own color piece is there no need to check ahead of it
            if(checkpieceresult && checkpieceresult.piece && checkpieceresult.piece.piece_name.toLowerCase().includes("white")){
                break;
            }

            //if there is an opponent piece this function will highlight it and break since we cannot go ahead of the opponent piece
            if(checkpieceofopponentonelement(element,"white")){
                break;
            }
        }
    }

    globalstaterenderer();
}

//white knight
function whiteknightclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = giveknighthighlightid(current_pos);


    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });

    // code for capturing
    highlightsquareids.forEach((element) => {
        checkpieceofopponentonelement(element,"white");
    });

    globalstaterenderer();
}

//white queen
function whitequeenclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = givequeenhighlightid(current_pos);
    let temp = [];

    const {
        left,
        right,
        top,
        bottom,
        topleft,
        topright,
        bottomleft,
        bottomright,
    } = highlightsquareids;


    //we are using checksquareid function to check if there is anything on the pass of the bishop, if there is then bishop cant move ahead of that piece
    let result = [];
    result.push(checksquarecaptureid(bottomleft));
    result.push(checksquarecaptureid(topleft));
    result.push(checksquarecaptureid(bottomright));
    result.push(checksquarecaptureid(topright));
    result.push(checksquarecaptureid(bottom));
    result.push(checksquarecaptureid(left));
    result.push(checksquarecaptureid(right));
    result.push(checksquarecaptureid(top));


    // insert into temp
    temp.push(bottomleft);
    temp.push(topleft);
    temp.push(bottomright);
    temp.push(topright);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    highlightsquareids = result.flat();

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });


    // code for capturing
    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
      const arr = temp[index];
  
      for (let j = 0; j < arr.length; j++) {
        const element = arr[j];
  
        let checkPieceResult = checkweatherpieceexistornot(element);
        if (
          checkPieceResult &&
          checkPieceResult.piece &&
          checkPieceResult.piece.piece_name.toLowerCase().includes("white")
        ) {
          break;
        }
  
        if (checkpieceofopponentonelement(element, "white")) {
          break;
        }
      }
    }

    globalstaterenderer();
}

//white king
function whitekingclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = givekinghighlightid(current_pos);
    let temp = [];

    const {
        left,
        right,
        top,
        bottom,
        topleft,
        topright,
        bottomleft,
        bottomright,
    } = highlightsquareids;


    //we are using checksquareid function to check if there is anything on the pass of the bishop, if there is then bishop cant move ahead of that piece
    let result = [];
    result.push(checksquarecaptureid(bottomleft));
    result.push(checksquarecaptureid(topleft));
    result.push(checksquarecaptureid(bottomright));
    result.push(checksquarecaptureid(topright));
    result.push(checksquarecaptureid(bottom));
    result.push(checksquarecaptureid(left));
    result.push(checksquarecaptureid(right));
    result.push(checksquarecaptureid(top));


    // insert into temp
    temp.push(bottomleft);
    temp.push(topleft);
    temp.push(bottomright);
    temp.push(topright);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    highlightsquareids = result.flat();

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });


    // code for capturing
    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
      const arr = temp[index];
  
      for (let j = 0; j < arr.length; j++) {
        const element = arr[j];
  
        let checkPieceResult = checkweatherpieceexistornot(element);
        if (
          checkPieceResult &&
          checkPieceResult.piece &&
          checkPieceResult.piece.piece_name.toLowerCase().includes("white")
        ) {
          break;
        }
  
        if (checkpieceofopponentonelement(element, "white")) {
          break;
        }
      }
    }

    globalstaterenderer();
}

//black pawn
function blackpawnclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = null;

    //on initial position
    if(current_pos[1]=="7"){
         highlightsquareids = [
            `${current_pos[0]}${Number(current_pos[1])-1}`,
            `${current_pos[0]}${Number(current_pos[1])-2}`,
        ];
    }
    else{
        highlightsquareids = [`${current_pos[0]}${Number(current_pos[1])-1}`];
    }

    highlightsquareids = checksquarecaptureid(highlightsquareids);

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    })

    // code for capturing
    const col1 = `${String.fromCharCode(current_pos[0].charCodeAt(0) - 1)}${Number(current_pos[1])-1}`;
    const col2 = `${String.fromCharCode(current_pos[0].charCodeAt(0) + 1)}${Number(current_pos[1])-1}`;

    let captureid = [col1,col2];

    captureid.forEach(element => {
        checkpieceofopponent(element,"BLACK");
    });

    globalstaterenderer();
}

//black bishop
function blackbishopclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = givebishophighlightid(current_pos);

    //temp is for capture ids
    let temp = [];

    const {bottomleft,topleft,bottomright,topright} = highlightsquareids;

    //we are using checksquareid function to check if there is anything on the pass of the bishop, if there is then bishop cant move ahead of that piece
    let result = [];
    result.push(checksquarecaptureid(bottomleft));
    result.push(checksquarecaptureid(topleft));
    result.push(checksquarecaptureid(bottomright));
    result.push(checksquarecaptureid(topright));

    // insert into temp
    temp.push(bottomleft);
    temp.push(topleft);
    temp.push(bottomright);
    temp.push(topright);

    highlightsquareids = result.flat();

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });

    // code for capturing
    let captureids = []

    for(let index=0;index<temp.length;index++){
        const arr = temp[index];

        for(let j=0;j<arr.length;j++){
            const element = arr[j];
            let checkpieceresult = checkweatherpieceexistornot(element);

            //to break if our own color piece is there no need to check ahead of it
            if(checkpieceresult && checkpieceresult.piece && checkpieceresult.piece.piece_name.toLowerCase().includes("black")){
                break;
            }

            //if there is an opponent piece this function will highlight it and break since we cannot go ahead of the opponent piece
            if(checkpieceofopponentonelement(element,"black")){
                break;
            }
        }
    }

    globalstaterenderer();
}

//black Rook
function blackrookclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = giverookhighlightid(current_pos);

    //temp is for capture ids
    let temp = [];

    const {bottom,left,right,top} = highlightsquareids;

    //we are using checksquareid function to check if there is anything on the pass of the bishop, if there is then bishop cant move ahead of that piece
    let result = [];
    result.push(checksquarecaptureid(bottom));
    result.push(checksquarecaptureid(top));
    result.push(checksquarecaptureid(right));
    result.push(checksquarecaptureid(left));

    // insert into temp
    temp.push(bottom);
    temp.push(top);
    temp.push(right);
    temp.push(left);

    highlightsquareids = result.flat();

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });

    // code for capturing
    let captureids = [];

    for(let index=0;index<temp.length;index++){
        const arr = temp[index];

        for(let j=0;j<arr.length;j++){
            const element = arr[j];
            let checkpieceresult = checkweatherpieceexistornot(element);

            //to break if our own color piece is there no need to check ahead of it
            if(checkpieceresult && checkpieceresult.piece && checkpieceresult.piece.piece_name.toLowerCase().includes("black")){
                break;
            }

            //if there is an opponent piece this function will highlight it and break since we cannot go ahead of the opponent piece
            if(checkpieceofopponentonelement(element,"black")){
                break;
            }
        }
    }

    globalstaterenderer();
}

//black queen
function blackqueenclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = givequeenhighlightid(current_pos);
    let temp = [];

    const {
        left,
        right,
        top,
        bottom,
        topleft,
        topright,
        bottomleft,
        bottomright,
    } = highlightsquareids;


    //we are using checksquareid function to check if there is anything on the pass of the bishop, if there is then bishop cant move ahead of that piece
    let result = [];
    result.push(checksquarecaptureid(bottomleft));
    result.push(checksquarecaptureid(topleft));
    result.push(checksquarecaptureid(bottomright));
    result.push(checksquarecaptureid(topright));
    result.push(checksquarecaptureid(bottom));
    result.push(checksquarecaptureid(left));
    result.push(checksquarecaptureid(right));
    result.push(checksquarecaptureid(top));


    // insert into temp
    temp.push(bottomleft);
    temp.push(topleft);
    temp.push(bottomright);
    temp.push(topright);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    highlightsquareids = result.flat();

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });


    // code for capturing
    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
      const arr = temp[index];
  
      for (let j = 0; j < arr.length; j++) {
        const element = arr[j];
  
        let checkPieceResult = checkweatherpieceexistornot(element);
        if (
          checkPieceResult &&
          checkPieceResult.piece &&
          checkPieceResult.piece.piece_name.toLowerCase().includes("black")
        ) {
          break;
        }
  
        if (checkpieceofopponentonelement(element, "black")) {
          break;
        }
      }
    }

    globalstaterenderer();
}

//black knight
function blackknightclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = giveknighthighlightid(current_pos);

    console.log(highlightsquareids);


    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });

    // code for capturing
    highlightsquareids.forEach((element) => {
        checkpieceofopponentonelement(element,"black");
    });

    globalstaterenderer();
}

//black king
function blackkingclicked(square){

    const piece = square.piece;

    //clicked on same element twice
    if(piece == selfhighlightstate){
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //handel's the capturing of the piece
    if(square.capturehighlight){
        moveelement(selfhighlightstate,piece.current_position);
        clearpreviousselfhighlight(selfhighlightstate);
        clearhighlightlocal();
        return;
    }

    //clear all highlights
    clearpreviousselfhighlight(selfhighlightstate);
    clearhighlightlocal();
    
    //highlight clicked element
    selfhighlight(piece);
    highlight_state = true;
    selfhighlightstate = piece

    //add piece as move state
    movestate = piece;

    const current_pos = piece.current_position;
    const flatarray = globalstate.flat();

    let highlightsquareids = givekinghighlightid(current_pos);
    let temp = [];

    const {
        left,
        right,
        top,
        bottom,
        topleft,
        topright,
        bottomleft,
        bottomright,
    } = highlightsquareids;


    //we are using checksquareid function to check if there is anything on the pass of the bishop, if there is then bishop cant move ahead of that piece
    let result = [];
    result.push(checksquarecaptureid(bottomleft));
    result.push(checksquarecaptureid(topleft));
    result.push(checksquarecaptureid(bottomright));
    result.push(checksquarecaptureid(topright));
    result.push(checksquarecaptureid(bottom));
    result.push(checksquarecaptureid(left));
    result.push(checksquarecaptureid(right));
    result.push(checksquarecaptureid(top));


    // insert into temp
    temp.push(bottomleft);
    temp.push(topleft);
    temp.push(bottomright);
    temp.push(topright);
    temp.push(top);
    temp.push(right);
    temp.push(bottom);
    temp.push(left);

    highlightsquareids = result.flat();

    highlightsquareids.forEach((hightlight) => {
        const element = keysquaremapper[hightlight];
        element.highlight = true;
    });


    // code for capturing
    let captureIds = [];

    for (let index = 0; index < temp.length; index++) {
      const arr = temp[index];
  
      for (let j = 0; j < arr.length; j++) {
        const element = arr[j];
  
        let checkPieceResult = checkweatherpieceexistornot(element);
        if (
          checkPieceResult &&
          checkPieceResult.piece &&
          checkPieceResult.piece.piece_name.toLowerCase().includes("black")
        ) {
          break;
        }
  
        if (checkpieceofopponentonelement(element, "black")) {
          break;
        }
      }
    }

    globalstaterenderer();
}

//to remove highlight yellow
function clearpreviousselfhighlight(piece){
    if(piece){
        document.getElementById(piece.current_position).classList.remove("highlightyellow");
        selfhighlightstate = null;
    }
}


function globalevent(){
    root_div.addEventListener("click", (event) => {
        if(event.target.localName === "img"){
            const clickid = event.target.parentNode.id;
            const square = keysquaremapper[clickid];

            // to enable capture with inturn
            if(square.piece.piece_name.includes("WHITE") && inturn === "black" || square.piece.piece_name.includes("BLACK") && inturn === "white"){
                captureinturn(square);
                return;
            }

            if(square.piece.piece_name == "WHITE_PAWN"){
                if(inturn == "white") whitepawnclicked(square);
            }
            else if(square.piece.piece_name == "BLACK_PAWN"){
                if(inturn == "black") blackpawnclicked(square);
            }
            else if(square.piece.piece_name == "WHITE_BISHOP"){
                if(inturn == "white") whitebishopclicked(square);
            }
            else if(square.piece.piece_name == "BLACK_BISHOP"){
                if(inturn == "black") blackbishopclicked(square);
            }
            else if(square.piece.piece_name == "BLACK_ROOK"){
                if(inturn == "black") blackrookclicked(square);
            }
            else if(square.piece.piece_name == "WHITE_ROOK"){
                if(inturn == "white") whiterookclicked(square);
            }
            else if(square.piece.piece_name == "WHITE_KNIGHT"){
                if(inturn == "white") whiteknightclicked(square);
            }
            else if(square.piece.piece_name == "BLACK_KNIGHT"){
                if(inturn == "black") blackknightclicked(square);
            }
            else if(square.piece.piece_name == "BLACK_QUEEN"){
                if(inturn == "black") blackqueenclicked(square);
            }
            else if(square.piece.piece_name == "WHITE_QUEEN"){
                if(inturn == "white") whitequeenclicked(square);
            }
            else if(square.piece.piece_name == "WHITE_KING"){
                if(inturn == "white") whitekingclicked(square);
            }
            else if(square.piece.piece_name == "BLACK_KING"){
                if(inturn == "black") blackkingclicked(square);
            }
        }
        else{
            const childelementofclickedel = Array.from(event.target.childNodes);
            
            if(childelementofclickedel.length == 1 || event.target.localName == "span"){
                //if player click on circle
                if(event.target.localName == "span"){
                    clearpreviousselfhighlight(selfhighlightstate);
                    const id = event.target.parentNode.id;
                    moveelement(movestate,id);
                    movestate = null;
                }
                //if player clickes on square
                else{
                    clearpreviousselfhighlight(selfhighlightstate);
                    const id = event.target.id;
                    moveelement(movestate,id);
                    movestate = null;
                }
                selfhighlightstate = null;
            }
            else{
                clearhighlightlocal();
                clearpreviousselfhighlight(selfhighlightstate);
            }
        }
    });
}

export {globalevent,movepiecefromxtoy};