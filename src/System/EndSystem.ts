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
import { End } from "../Blocks/End";
import { MessageEnd } from "../Blocks/MessageEnd";


export class EndSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);


        this.app.db.OnUpdated(TobAction, action => {

            if (action.targetId == null)
                return;

            let foundEnd = this.app.db.First(End, x => x.id == action.targetId);
            if (foundEnd == null)
                return;

            let toby = this.app.db.First(Tob);

            // toby to pan board
            let tobyFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == toby.id);

            // toby has food
            let showMessage = false;
            if (tobyFoodAttachment != null) {
                let tobyFood = this.app.db.GetById(Food, tobyFoodAttachment.idFood);
                if (tobyFood.foodType == FoodType.PlateEnd) {

                    tobyFoodAttachment.idAttached = null;
                    app.db.Update(tobyFoodAttachment);

                    showMessage = true;
                }
            }

            if (showMessage) {
                let message = new MessageEnd();
                message.win = true;
                app.db.Insert(message);
                if (this.app.timerSystem != null)
                    this.app.timerSystem.Stop();
            }
        });
    }


    Update(dt: number) {

    }
}