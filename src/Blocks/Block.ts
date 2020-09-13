import { Toby } from "./Toby";
import { BlockType } from "./BlockType";
import { ImageLoader } from "../LoadImage";


export abstract class Block {

    type: BlockType;
    position = new Float32Array(2);
    size = new Float32Array(2);
    img: HTMLImageElement;
    imgOffset = new Float32Array();


    div: HTMLDivElement;


    SetPosition(x: number, y: number) {

    }

    SetType(type: BlockType) {
        this.type = type;
        if (this.type == BlockType.Table) {
            let img = ImageLoader.instance.Clone('WoodBlock.png')
        }
    }

    /*
    SetDraggable(draggable: Draggable) {

    }*/

}




