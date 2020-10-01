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


export class KnifeSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);


        this.app.db.OnUpdated(TobAction, action => {

            if (action.targetId == null)
                return;

            let knife = this.app.db.First(Knife, x => x.id == action.targetId);
            if (knife == null)
                return;

            let toby = this.app.db.First(Tob);

            // toby to knife board
            let tobyFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == toby.id);
            if (tobyFoodAttachment != null) {
                let food = this.app.db.GetById(Food, tobyFoodAttachment.idFood);
                if (food.foodType != FoodType.Kiwi
                    && food.foodType != FoodType.Pork)
                    return;

                tobyFoodAttachment.idAttached = knife.id;
                app.db.Update(tobyFoodAttachment);
                return;
            }

            // cut if attached and not cut
            let knifeAttachment = app.db.First(FoodAttachment, x => x.idAttached == knife.id);
            if (knifeAttachment != null) {
                let food = this.app.db.GetById(Food, knifeAttachment.idFood);
                if (food.foodType == FoodType.Kiwi) {
                    food.foodType = FoodType.KiwiCut;
                    app.db.Update(food);
                }
                else if (food.foodType == FoodType.KiwiCut) {
                    knifeAttachment.idAttached = toby.id;
                    app.db.Update(knifeAttachment);
                }
                else if (food.foodType == FoodType.Pork) {
                    food.foodType = FoodType.PorkCut;
                    app.db.Update(food);
                }
                else if (food.foodType == FoodType.PorkCut) {
                    knifeAttachment.idAttached = toby.id;
                    app.db.Update(knifeAttachment);
                }
                return;
            }

            /*
            // cut food to tobi
            let tableFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == action.idTable);
            if (tableFoodAttachment != null) {
                tableFoodAttachment.idAttached = toby.id;
                app.db.Update(tableFoodAttachment);
                return;
            }
            */
        });


    }


    Update(dt: number) {

    }
}