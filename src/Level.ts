import { LoadImage } from "./LoadImage";
import { disableBodyScroll } from "body-scroll-lock";
import { Block } from "./Blocks/Block";
import { Toby } from "./Toby";

export class Level {



    container: HTMLDivElement;

    blocks: Block[] = [];

    constructor() {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.container.style.position = 'fixed';
    }

    CanMove(position: Float32Array): boolean {
        /*
        let dy = 80;

        if (position[0] < 0 || position[0] > 10 * 100)
            return false;
        if (position[1] < 0 || position[1] > 5 * dy)
            return false;
        */
        return true;
    }

    ActionButton() {
        // find target block
    }

    GetTargetBlock(toby: Toby): Block {
        for (let block of this.blocks) {
            let dx = block.position[0] - toby.position[0];
            let dy = block.position[1] - toby.position[1];
            //if (Math.abs(dx) < toby.size + 2)

            if (Math.abs(dx) < (toby.size + block.size + 3)
                && Math.abs(dy) < (toby.size + block.size + 3))
                return block;
        }
        return null;
    }

    /*
    AddCocotte() {

    }

    AddOnionJar() {

    }

    AddOilJar() {

    }

    AddWaterJar() {

    }

    AddCourtBouillonJar() {

    }


    AddCuttingBoard() {

    }

    AddKiwiJar() {

    }

    AddDelivery() {

    }
    */

}
