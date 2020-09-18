import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { TobAction } from "../Blocks/TobAction";
import { Tob } from "../Blocks/Tob";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { Supply } from "../Blocks/Supply";
import { Table } from "../Blocks/Table";
import { TobHighlighted } from "../Blocks/TobHighlighted";


export class SupplySystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);


        this.app.db.OnUpdated(TobAction, action => {

            if (action.targetId == null)
                return;

            let supply = this.app.db.First(Supply, x => x.id == action.targetId);
            if (supply == null)
                return;

            let toby = this.app.db.First(Tob);

            let food = new Food();
            food.foodType = supply.foodType;
            this.app.db.Insert(food);

            let foodAttachment = new FoodAttachment();
            foodAttachment.idAttached = toby.id;
            foodAttachment.idFood = food.id;
            this.app.db.Insert(foodAttachment);
        });
    }


    Update(dt: number) {

    }
}