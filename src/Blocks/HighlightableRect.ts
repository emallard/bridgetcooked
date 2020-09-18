import { PhysicsRect } from "../Physics";
import { DbEntity } from "../Db/DbEntity";

export class HighlightableRect extends DbEntity {
    physicsRect: PhysicsRect;
    userId: string;
}
