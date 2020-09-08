import { Toby } from "../Toby";
import { Draggable } from "../Draggable";
import { Block } from "./Block";

export class Jar extends Block {
    jarDraggable: Draggable;

    Action(toby: Toby) {
        if (!toby.isDragging)
            toby.draggable = this.jarDraggable;
    }
}
