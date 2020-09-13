import { LoadImage } from "./LoadImage";
import { disableBodyScroll } from "body-scroll-lock";
import { Block } from "./Blocks/Block";
import { Toby } from "./Blocks/Toby";
import { Physics } from "./Physics";

export class Level {



    container: HTMLDivElement;
    blocks: Block[] = [];
    highlightedBlock: Block;

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

    UpdateHighlightBlock(toby: Toby) {
        if (this.highlightedBlock != null)
            this.highlightedBlock.img.style.filter = '';


        let targetBlock = this.GetTargetBlock(toby);
        if (targetBlock != null) {
            targetBlock.img.style.filter = 'brightness(150%)';
            this.highlightedBlock = targetBlock;
        }
    }

    ActionButton() {
        // find target block
    }

    tested = new Float32Array(2);
    GetTargetBlock(toby: Toby): Block {

        this.tested[0] = toby.position[0];
        this.tested[1] = toby.position[1];

        /*
        let dir = toby.direction;
        if (dir[0] > 0 && Math.abs(dir[0]) > Math.abs(dir[1]))
        {
            // test right
            testedX += toby.size;
        }

        if (this.speed[0] < 0 && Math.abs(this.speed[0]) > Math.abs(this.speed[1]))
            img = this.imgLeft;

        if (this.speed[1] > 0 && Math.abs(this.speed[1]) > Math.abs(this.speed[0]))
            img = this.imgDown;
        if (this.speed[1] < 0 && Math.abs(this.speed[1]) > Math.abs(this.speed[0]))
            img = this.imgUp;
        */





        for (let block of this.blocks) {
            //console.log(this.tested, block.position, block.size);
            if (Physics.IsPointInRect(this.tested, block.position, block.size))
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
