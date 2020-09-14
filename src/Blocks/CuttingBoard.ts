import { DbEntity } from "../Db/DbEntity";

export class CuttingBoard extends DbEntity {
    x: number;
    y: number;

    cuttingProgress: number = 0;
}
