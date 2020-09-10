import { Toby } from "../Toby";


export abstract class Block {
    position = new Float32Array(2);
    size = new Float32Array(2);
    img: HTMLImageElement;
    imgOffset = new Float32Array();

    abstract Action(toby: Toby): void;
}


