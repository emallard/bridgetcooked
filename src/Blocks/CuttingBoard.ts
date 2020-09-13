import { Toby } from "./Toby";
import { Draggable } from "../Draggable";
import { Block } from "./Block";

export class CuttingBoard extends Block {

    draggable: Draggable;
    cuttingProgress: number = 0;

    /*
    Action(toby: Toby) {
        if (!toby.isDragging) {
            this.draggable = toby.draggable;
            toby.draggable = Draggable.None;
            this.cuttingProgress = 0;
        }

        if (this.draggable != Draggable.None) {
            this.cuttingProgress++;

            if (this.cuttingProgress > 10) {
                if (this.draggable == Draggable.Onion)
                    this.draggable = Draggable.OnionCut;

                if (this.draggable == Draggable.Kiwi)
                    this.draggable = Draggable.KiwiCut;
            }
        }
    }*/
}
