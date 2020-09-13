import { Level } from "./Level";
import { Toby } from "./Blocks/Toby";
import { BlockType } from "./Blocks/BlockType";
import { Draggable } from "./Draggable";
import { LoadImage } from "./LoadImage";
import { Table } from "./Blocks/Table";

export class ActionController {

    star: HTMLImageElement;
    button: HTMLButtonElement;
    level: Level;
    toby: any;


    async LoadAsync(level: Level, toby: Toby) {

        this.star = await LoadImage('Star.png');


        this.level = level;
        this.toby = toby;

        this.button = document.createElement('button');
        //this.button.innerHTML = '<svg><circle cx="50" cy="50" r="50" /></svg> '

        this.button.style.position = 'fixed';
        this.button.style.backgroundColor = 'red';
        this.button.style.right = '100' + "px";
        this.button.style.top = '200' + "px";

        this.button.style.width = '50' + "px";
        this.button.style.height = '50' + "px";

        this.button.addEventListener('click', () => {
            this.Action();
        });

        document.body.appendChild(this.button);
    }



    Action() {
        if (!this.level.highlightedBlock)
            return;

        let b = this.level.highlightedBlock;

        if (b.type == BlockType.Supply) {
            console.log('supply');
            //this.toby.Drag(Draggable.Star);
        }


        if (b.type == BlockType.Table) {
            //b.SetDraggable(this.toby.draggable);
            this.toby.RemoveDraggable();
        }
    }
}
