import * as piece from "../Data/pieces.js";
import { root_div } from "../Helper/constants.js";
import { globalstate } from "../index.js";
import { movepiecefromxtoy } from "../Events/global.js";


//use when you want to render pieces on the board
function piecerender(data){
    data.forEach(row => {
        row.forEach(square => {
            //if square has piece
            if(square.piece){
                const squareel = document.getElementById(square.id);

                //create piece
                const piece = document.createElement("img");
                piece.src = square.piece.img;
                piece.classList.add("piece");

                //insert piece into square
                squareel.appendChild(piece);
            }
        });
    });
}


//to render the start of the game 
function initgamerender(data){
    data.forEach(element => {
        const rowel = document.createElement("div");
        element.forEach( square => {
            const squarediv = document.createElement("div");
            squarediv.id = square.id;
            squarediv.classList.add(square.color,"square");

            //render blackpawn
            if(square.id[1]==7){
                square.piece = piece.blackpawn(square.id);
            }

            //render blackrook
            if(square.id == "h8" || square.id == "a8"){
                square.piece = piece.blackrook(square.id);
            }

            //render blackbishop
            if(square.id == "c8" || square.id == "f8"){
                square.piece = piece.blackbishop(square.id);
            }

            //render blackqueen
            if(square.id == "d8"){
                square.piece = piece.blackqueen(square.id);
            }

            //render blackking
            if(square.id == "e8"){
                square.piece = piece.blackking(square.id);
            }

            //render blackknight
            if(square.id == "b8" || square.id == "g8"){
                square.piece = piece.blackknight(square.id);
            }

            //render whitepawn
            if(square.id[1]==2){
                square.piece = piece.whitepawn(square.id);
            }

            //render whiterook
            if(square.id == "a1" || square.id == "h1"){
                square.piece = piece.whiterook(square.id);
            }

            //render whiteknight
            if(square.id == "b1" || square.id == "g1"){
                square.piece = piece.whiteknight(square.id);
            }

            //render whitebishop
            if(square.id == "c1" || square.id == "f1"){
                square.piece = piece.whitebishop(square.id);
            }

            //render whiteking
            if(square.id == "e1"){
                square.piece = piece.whiteking(square.id);
            }

            //render whitequeen
            if(square.id == "d1"){
                square.piece = piece.whitequeen(square.id);
            }

            rowel.appendChild(squarediv);
        });
        rowel.classList.add("squarerow");
        root_div.appendChild(rowel);
    });

    piecerender(data);
}

//render highlight circle
function renderhighlight(squareid){
    const highlightspan = document.createElement("span");
    highlightspan.classList.add("highlight");
    document.getElementById(squareid).appendChild(highlightspan);
}

//clear all highlights
function clearhighlight(){
    const flatdata = globalstate.flat();
    flatdata.forEach((el) => {

        if(el.capturehighlight){
            document.getElementById(el.id).classList.remove("capturecolor");
            el.capturehighlight = false;
        }


        if(el.highlight){
            el.highlight = false;
        }
        globalstaterenderer();
    });
}

//to highlight yellow
function selfhighlight(piece){
    document.getElementById(piece.current_position).classList.add("highlightyellow");
}


//function global state renderer (to render pieces from gobal state data) => use when updating globalstate
function globalstaterenderer(){
    globalstate.forEach(row => {
        row.forEach(element => {

            //if square highlight is true adds highlight
            if(element.highlight){
                const highlightspan = document.createElement("span");
                highlightspan.classList.add("highlight");
                document.getElementById(element.id).appendChild(highlightspan);
            }
            //if false remove highlight
            else{

                const el = document.getElementById(element.id)
                const highlights = Array.from(el.getElementsByTagName("span"));

                highlights.forEach(element => {
                    el.removeChild(element);
                });
            }
        });
    });
}


export {initgamerender,renderhighlight,clearhighlight,selfhighlight,globalstaterenderer};