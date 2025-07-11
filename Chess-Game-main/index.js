import { initgame } from "./Data/data.js";
import { globalevent } from "./Events/global.js";
import { initgamerender } from "./render/main.js";

//will be usefull till game end
const globalstate = initgame();

//key square mapper is like a dictionary that stores all the square and the piece on it
let keysquaremapper = {};


globalstate.flat().forEach(square => {
    keysquaremapper[square.id] = square;
});

initgamerender(globalstate);
globalevent();

export {globalstate,keysquaremapper};
