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
import { TobActionCut } from "../Blocks/TobActionCut";
import { FoodType } from "../Blocks/FoodType";
import { Knife } from "../Blocks/Knife";


export class KnifeSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);

        this.app.db.OnInserted(Tob, (tob) => {
            let tobActionCut = new TobActionCut();
            app.db.Insert(tobActionCut);
        });


        this.app.db.OnUpdated(TobActionCut, action => {

            if (action.idKnife == null)
                return;

            let toby = this.app.db.First(Tob);

            // toby to knife board
            let tobyFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == toby.id);
            if (tobyFoodAttachment != null) {
                tobyFoodAttachment.idAttached = action.idKnife;
                app.db.Update(tobyFoodAttachment);
                return;
            }

            // cut if attached and not cut
            let knifeAttachment = app.db.First(FoodAttachment, x => x.idAttached == action.idKnife);
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

        this.app.db.OnUpdated(PlayerAction, action => {
            let knives = app.db.GetAll(Knife);
            let toby = app.db.First(Tob);
            let tobActionCut = app.db.First(TobActionCut);

            for (let knife of knives) {
                if (Math.abs(knife.x - toby.x) < 50 && Math.abs(knife.y - toby.y) < 50) {

                    console.log('table action !');
                    tobActionCut.idKnife = knife.id;
                    this.app.db.Update(tobActionCut);
                    return;
                }
            }
        })
    }


    Update(dt: number) {

    }
}