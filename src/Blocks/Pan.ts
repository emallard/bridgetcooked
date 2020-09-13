import { Toby } from "./Toby";
import { Draggable } from "../Draggable";
import { Block } from "./Block";

export class Pan extends Block {

    draggable: Draggable;

    Action(toby: Toby) {
        if (toby.isDragging) {
            this.draggable = toby.draggable;
            //toby.draggable = Draggable.None;
        }
    }
}
