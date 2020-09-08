import { Toby } from "../Toby";


export abstract class Block {
    position = new Float32Array(2);
    size = 40;
    img: HTMLImageElement;
    imgOffset = new Float32Array();

    abstract Action(toby: Toby): void;
}


