import { Block } from "./Block";
import { DbEntity } from "../Db/DbEntity";


export class Floor extends DbEntity {
    x: number;
    y: number;
    url: string;
}
