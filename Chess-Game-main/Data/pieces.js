
//black pieces
function blackpawn(current_position){
    return{
        current_position,
        img:"./pieces/black/pawn.png",
        piece_name: "BLACK_PAWN"
    };
}

function blackrook(current_position){
    return{
        current_position,
        img:"./pieces/black/rook.png",
        piece_name: "BLACK_ROOK"
    };
}

function blackknight(current_position){
    return{
        current_position,
        img:"./pieces/black/knight.png",
        piece_name: "BLACK_KNIGHT"
    };
}

function blackbishop(current_position){
    return{
        current_position,
        img:"./pieces/black/bishop.png",
        piece_name: "BLACK_BISHOP"
    };
}

function blackking(current_position){
    return{
        current_position,
        img:"./pieces/black/king.png",
        piece_name: "BLACK_KING"
    };
}

function blackqueen(current_position){
    return{
        current_position,
        img:"./pieces/black/queen.png",
        piece_name: "BLACK_QUEEN"
    };
}



//white pieces
function whitepawn(current_position){
    return{
        current_position,
        img:"./pieces/white/pawn.png",
        piece_name: "WHITE_PAWN"
    };
}

function whiterook(current_position){
    return{
        current_position,
        img: "./pieces/white/rook.png",
        piece_name: "WHITE_ROOK"
    }
}

function whiteknight(current_position){
    return{
        current_position,
        img: "./pieces/white/knight.png",
        piece_name: "WHITE_KNIGHT"
    }
}

function whitebishop(current_position){
    return{
        current_position,
        img: "./pieces/white/bishop.png",
        piece_name: "WHITE_BISHOP"
    }
}

function whiteking(current_position){
    return{
        current_position,
        img: "./pieces/white/king.png",
        piece_name: "WHITE_KING"
    }
}

function whitequeen(current_position){
    return{
        current_position,
        img: "./pieces/white/queen.png",
        piece_name: "WHITE_QUEEN"
    }
}




export {blackpawn,whitepawn,whitebishop,whiteking,whiteknight,whitequeen,whiterook,blackbishop,blackking,blackknight,blackqueen,blackrook};