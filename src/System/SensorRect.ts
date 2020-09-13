import { DbEntity } from "../Db/DbEntity";

export class SensorRect extends DbEntity {
    userId: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
