import { DbEntity } from "../Db/DbEntity";



export class GraphicsSprite extends DbEntity {
    userId: string;

    x: number;
    y: number;

    width: number;
    height: number;

    url: string;


}
