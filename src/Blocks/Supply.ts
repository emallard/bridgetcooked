import { DbEntity } from "../Db/DbEntity";
import { FoodType } from "./FoodType";


export class Supply extends DbEntity {
    x: number;
    y: number;

    foodType: FoodType;
}
