import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { TobActionSupply } from "../Blocks/TobActionSupply";
import { Tob } from "../Blocks/Tob";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerActionControl } from "../Blocks/PlayerActionControl";
import { Supply } from "../Blocks/Supply";

export class FoodSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);


        this.app.db.OnInserted(Tob, (tob) => {
            let tobActionSupply = new TobActionSupply();
            app.db.Insert(tobActionSupply);

            let playerActionControl = new PlayerActionControl();
            app.db.Insert(playerActionControl);
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
        });

        this.app.db.OnUpdated(PlayerActionControl, action => {

            let supplies = app.db.GetAll(Supply);
            let toby = app.db.First(Tob);
            let tobActionSupply = app.db.First(TobActionSupply);

            for (let supply of supplies) {
                if (Math.abs(supply.x - toby.x) + Math.abs(supply.y - toby.y) < 5) {
                    tobActionSupply.idSupply = supply.id;
                    this.app.db.Update(tobActionSupply);
                    return;
                }
            }
        })
    }


    Update(dt: number) {

    }
}