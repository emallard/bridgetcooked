import { DbEntity } from "../Db/DbEntity";

export class PlayerMoveControl extends DbEntity {
    cx: number;
    cy: number;
    touchX: number;
    touchY: number;
}
