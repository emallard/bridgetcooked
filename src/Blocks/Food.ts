import { DbEntity } from "../Db/DbEntity";
import { FoodType } from "./FoodType";

export class Food extends DbEntity {

    foodType: FoodType;
}



