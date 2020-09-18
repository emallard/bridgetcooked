import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { TobActionSupply } from "../Blocks/TobActionSupply";
import { TobActionTable } from "../Blocks/TobActionTable";
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


        this.app.db.OnInserted(Tob, (tob) => {
            let tobActionSupply = new TobActionSupply();
            app.db.Insert(tobActionSupply);
        });

        this.app.db.OnUpdated(TobActionSupply, action => {

            if (action.idSupply == null)
                return;

            let supply = this.app.db.GetById(Supply, action.idSupply);
            let toby = this.app.db.First(Tob);

            let food = new Food();
            food.foodType = supply.foodType;
            this.app.db.Insert(food);

            let foodAttachment = new FoodAttachment();
            foodAttachment.idAttached = toby.id;
            foodAttachment.idFood = food.id;
            this.app.db.Insert(foodAttachment);
        });


        this.app.db.OnUpdated(PlayerAction, action => {

            let tobActionSupply = app.db.First(TobActionSupply);
            let tobHighlighted = app.db.First(TobHighlighted);

            if (tobHighlighted != null && tobHighlighted.highlightedId != null) {
                let supply = app.db.First(Supply, x => x.id == tobHighlighted.highlightedId);
                if (supply != null) {
                    console.log('supply action !');
                    tobActionSupply.idSupply = supply.id;
                    this.app.db.Update(tobActionSupply);
                    return;
                }
            }
        });

    }


    Update(dt: number) {

    }
}