import { globalstate } from "../index.js";
import { keysquaremapper } from "../index.js";


//function to check if piece of opponent exist
function checkpieceofopponentonelement(id,color){
    const opponentcolor = color === "white"? "BLACK":"WHITE";

    const element = keysquaremapper[id];

    if(!element){
        return false;
    }

    if(element.piece && element.piece.piece_name.includes(opponentcolor)){
        const el = document.getElementById(id);
        el.classList.add("capturecolor");
        element.capturehighlight = true;
        return true;
    }

    return false;
}

//function to check if opponent's piece exist 
function checkpieceofopponent(id,color){
    const opponentcolor = color === "WHITE" ? "BLACK" : "WHITE";

    const element = keysquaremapper[id];

    //for last rows 
    if(!element){
        return false;
    }

    if(element.piece && element.piece.piece_name.includes(opponentcolor)){
        const el =document.getElementById(id);
        el.classList.add("capturecolor");
        element.capturehighlight = true;
        return true;
    }

    return false;
}

//function yo check if piece exists
function checkweatherpieceexistornot(squareid){
    const square = keysquaremapper[squareid];

    if(square.piece){
        return square;
    }
    else{
        return false;
    }
}

//function to check capture id square (if there is an element infront of the element movement for that square is not possible)
function checksquarecaptureid(array){
    let returnarray = [];

    for(let index=0;index<array.length;index++){
        const squareid = array[index];
        const square = keysquaremapper[squareid];

        if(square.piece){
            break;
        }
        returnarray.push(squareid);
    }

    return returnarray;
}

//function to give highlight ids for bishop
function givebishophighlightid(id){

    //for top left
    function topleft(id){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        while(alpha!="a" && num!=8){
            num = num+1;
            alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
            resultarr.push(`${alpha}${num}`);
        }
        return resultarr;
    }

    //for bottom left
    function bottomleft(id){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        while(alpha!="a" && num!=1){
            num = num-1;
            alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
            resultarr.push(`${alpha}${num}`);
        }
        return resultarr;
    }

    //for top right
    function topright(id){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        while(alpha!="h" && num!=8){
            num = num+1;
            alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
            resultarr.push(`${alpha}${num}`);
        }
        return resultarr;
    }

    //for bottom right
    function bottomright(id){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        while(alpha!="h" && num!=1){
            num = num-1;
            alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
            resultarr.push(`${alpha}${num}`);
        }
        return resultarr;
    }

    return{
        topleft: topleft(id),
        bottomleft: bottomleft(id),
        topright: topright(id),
        bottomright: bottomright(id),
    };
}

//function to give highlight ids for rook
function giverookhighlightid(id){

    //for top 
    function top(id){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        while(num!=8){
            num = num+1;
            resultarr.push(`${alpha}${num}`);
        }
        return resultarr;
    }

    //for left
    function left(id){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        while(alpha!="a"){
            alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
            resultarr.push(`${alpha}${num}`);
        }
        return resultarr;
    }

    //for right
    function right(id){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        while(alpha!="h"){
            alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
            resultarr.push(`${alpha}${num}`);
        }
        return resultarr;
    }

    //for bottom
    function bottom(id){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        while(num!=1){
            num = num-1;
            resultarr.push(`${alpha}${num}`);
        }
        return resultarr;
    }

    return{
        top: top(id),
        left: left(id),
        right: right(id),
        bottom: bottom(id),
    };
}

//function to give highlight ids for queen
function givequeenhighlightid(id){
    const rookmoves = giverookhighlightid(id);
    const bishopmoves = givebishophighlightid(id);

    const returnresult = {
        "left": rookmoves.left,
        "right" :rookmoves.right,
        "top" : rookmoves.top,
        "bottom" : rookmoves.bottom,
        "topleft": bishopmoves.topleft,
        "topright": bishopmoves.topright,
        "bottomleft" : bishopmoves.bottomleft,
        "bottomright" : bishopmoves.bottomright
    }

    return returnresult;
}

//function to give highlight ids for king
function givekinghighlightid(id){
    const rookmoves = giverookhighlightid(id);
    const bishopmoves = givebishophighlightid(id);

    const returnresult = {
        "left": rookmoves.left,
        "right" :rookmoves.right,
        "top" : rookmoves.top,
        "bottom" : rookmoves.bottom,
        "topleft": bishopmoves.topleft,
        "topright": bishopmoves.topright,
        "bottomleft" : bishopmoves.bottomleft,
        "bottomright" : bishopmoves.bottomright
    }


    //this loop will give one move in each direction -> will be filtered from each array of returnresult 
    for (const key in returnresult) {
        if (Object.prototype.hasOwnProperty.call(returnresult, key)) {
            const element = returnresult[key];

            if(element.length!=0){
                returnresult[key] = new Array(element[0]);
            }
        }
    }
    return returnresult;
}


//function to give highlight ids for knight
function giveknighthighlightid(id){

    if(!id){
        return;
    }

    //for left
    function left(){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        let temp =0;

        //this loop is to find square two square away
        while(alpha!="a"){

            if(temp==2){
                break;
            }

            alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
            resultarr.push(`${alpha}${num}`);
            temp++;
        }

        //now that we have that we will do this to find an upper element and a lower element
        if(resultarr.length==2){
            let finalreturnarr = []

            const lastelement = resultarr[resultarr.length - 1];
            let alpha = lastelement[0];
            let number = Number(lastelement[1]);

            if(number<8){
                finalreturnarr.push(`${alpha}${number+1}`);
            }
            if(number>1){
                finalreturnarr.push(`${alpha}${number-1}`);
            }
            return finalreturnarr
        }
        //if the size of array is not two then that means knight cant move this side
        else{
            return [];
        }
    }

    //for top
    function top(){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        let temp =0;

        //this loop is to find square two square away
        while(num!="8"){

            if(temp==2){
                break;
            }

            num = num+1;
            resultarr.push(`${alpha}${num}`);
            temp++;
        }

        //now that we have that we will do this to find an upper element and a lower element
        if(resultarr.length==2){
            let finalreturnarr = []

            const lastelement = resultarr[resultarr.length-1]
            let alpha = lastelement[0];
            let number = Number(lastelement[1]);

            if(alpha!="a"){
                let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
                finalreturnarr.push(`${alpha2}${number}`);
            }
            if(alpha!="h"){
                let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
                finalreturnarr.push(`${alpha2}${number}`);
            }
            return finalreturnarr
        }
        //if the size of array is not two then that means knight cant move this side
        else{
            return [];
        }
    }

    //for right
    function right(){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        let temp =0;

        //this loop is to find square two square away
        while(alpha!="h"){

            if(temp==2){
                break;
            }

            alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
            resultarr.push(`${alpha}${num}`);
            temp++;
        }

        //now that we have that we will do this to find an upper element and a lower element
        if(resultarr.length==2){
            let finalreturnarr = []

            const lastelement = resultarr[resultarr.length-1]
            let alpha = lastelement[0];
            let number = Number(lastelement[1]);

            if(number<8){
                finalreturnarr.push(`${alpha}${number+1}`);
            }
            if(number>1){
                finalreturnarr.push(`${alpha}${number-1}`);
            }
            return finalreturnarr
        }
        //if the size of array is not two then that means knight cant move this side
        else{
            return [];
        }
    }

    //for bottom
    function bottom(){
        let alpha = id[0];
        let num = Number(id[1]);
        let resultarr = [];

        let temp =0;

        //this loop is to find square two square away
        while(num!="1"){

            if(temp==2){
                break;
            }

            num = num-1;
            resultarr.push(`${alpha}${num}`);
            temp++;
        }

        //now that we have that we will do this to find an upper element and a lower element
        if(resultarr.length==2){
            let finalreturnarr = []

            const lastelement = resultarr[resultarr.length - 1];
            let alpha = lastelement[0];
            let number = Number(lastelement[1]);

            if(alpha!="a"){
                let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
                finalreturnarr.push(`${alpha2}${number}`);
            }
            if(alpha!="h"){
                let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
                finalreturnarr.push(`${alpha2}${number}`);
            }
            return finalreturnarr
        }
        //if the size of array is not two then that means knight cant move this side
        else{
            return [];
        }
    }

    //the ... is known as spread operator it will convert all arrays from different functions into a single array
    return [...top(),...bottom(),...left(),...right()];
}

export {checkpieceofopponent,checksquarecaptureid,givebishophighlightid,checkweatherpieceexistornot,checkpieceofopponentonelement,giverookhighlightid,giveknighthighlightid,givequeenhighlightid,givekinghighlightid};