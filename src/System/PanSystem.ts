import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { Tob } from "../Blocks/Tob";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { TobAction } from "../Blocks/TobAction";
import { FoodType } from "../Blocks/FoodType";
import { Knife } from "../Blocks/Knife";
import { TobHighlighted } from "../Blocks/TobHighlighted";
import { Pan } from "../Blocks/Pan";


export class PanSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);


        this.app.db.OnUpdated(TobAction, action => {

            if (action.targetId == null)
                return;

            let pan = this.app.db.First(Pan, x => x.id == action.targetId);
            if (pan == null)
                return;

            let toby = this.app.db.First(Tob);

            // toby to pan board
            let tobyFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == toby.id);
            let panFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == pan.id);

            // toby has food
            if (tobyFoodAttachment != null) {
                let tobyFood = this.app.db.GetById(Food, tobyFoodAttachment.idFood);
                if (tobyFood.foodType != FoodType.PorkCut && tobyFood.foodType != FoodType.KiwiCut)
                    return;

                // if no food in the pan
                if (panFoodAttachment == null) {
                    tobyFoodAttachment.idAttached = pan.id;
                    app.db.Update(tobyFoodAttachment);
                }
                else {
                    let panFood = this.app.db.GetById(Food, panFoodAttachment.idFood);
                    if ((panFood.foodType == FoodType.PorkCut && tobyFood.foodType == FoodType.KiwiCut)
                        || (panFood.foodType == FoodType.KiwiCut && tobyFood.foodType == FoodType.PorkCut)
                    ) {
                        panFood.foodType = FoodType.PorkKiwiCooked;
                        app.db.Update(panFood);
                        tobyFoodAttachment.idAttached = null;
                        app.db.Update(tobyFoodAttachment);
                    }
                }
            }

            // attach back to toby
            else {
                if (panFoodAttachment != null) {
                    let panFood = this.app.db.GetById(Food, panFoodAttachment.idFood);
                    if (panFood.foodType == FoodType.PorkKiwiCooked) {
                        panFoodAttachment.idAttached = toby.id;
                        app.db.Update(panFoodAttachment);
                    }
                }
            }
        });
    }


    Update(dt: number) {

    }
}