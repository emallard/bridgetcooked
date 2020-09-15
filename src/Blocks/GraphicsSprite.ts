import { DbEntity } from "../Db/DbEntity";



export class GraphicsSprite extends DbEntity {
    userId: string;

    x: number;
    y: number;
    z: number;
    width: number;
    height: number;

    url: string;

    isForeground = false;

}


