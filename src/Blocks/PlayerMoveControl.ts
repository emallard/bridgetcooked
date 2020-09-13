import { DbEntity } from "../Db/DbEntity";

export class PlayerMoveControl extends DbEntity {
    cx: number;
    cy: number;
    isDown: boolean;
    touchX: number;
    touchY: number;
}
