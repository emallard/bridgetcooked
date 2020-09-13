import { DbEntity } from "../Db/DbEntity";

export class Tob extends DbEntity {
    x: number;
    y: number;
    //dirX: number;
    //dirY: number;

}


export class TobMoveControl extends DbEntity {
    moveX: number;
    moveY: number;
}

export class TobPosition {
    x: number;
    y: number;
}

export class CollideBox {
    x: number;
    y: number;
}

export class AttachedFood {
    x: number;
    y: number;
}