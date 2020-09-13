import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { TobActionSupply } from "../Blocks/TobActionSupply";
import { Tob } from "../Blocks/Tob";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";

export class FoodSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);


        this.app.db.OnInserted(Tob, (tob) => {
            let tobActionSupply = new TobActionSupply();
            app.db.Insert(tobActionSupply);
        });

        this.app.db.OnUpdated(TobActionSupply, action => {

            if (action.idSupply == null)
                return;

            let toby = this.app.db.First(Tob);

            let food = new Food();
            this.app.db.Insert(food);

            let foodAttachment = new FoodAttachment();
            foodAttachment.idAttached = toby.id;
            foodAttachment.idFood = food.id;
            this.app.db.Insert(foodAttachment);
        })
    }


    Update(dt: number) {

    }
}