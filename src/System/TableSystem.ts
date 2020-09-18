import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { Tob } from "../Blocks/Tob";
import { Food } from "../Blocks/Food";
import { FoodAttachment } from "../Blocks/FoodAttachment";
import { PlayerAction } from "../Blocks/PlayerAction";
import { Supply } from "../Blocks/Supply";
import { Table } from "../Blocks/Table";
import { TobHighlighted } from "../Blocks/TobHighlighted";
import { TobAction } from "../Blocks/TobAction";


export class TableSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);


        this.app.db.OnUpdated(TobAction, action => {

            if (action.targetId == null)
                return;

            let table = app.db.First(Table, x => x.id == action.targetId);
            if (table == null)
                return;

            let toby = this.app.db.First(Tob);

            // toby to table
            let tobyFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == toby.id);
            if (tobyFoodAttachment != null) {
                tobyFoodAttachment.idAttached = table.id;
                app.db.Update(tobyFoodAttachment);
                return;
            }

            // table to toby
            let tableFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == table.id);
            if (tableFoodAttachment != null) {
                tableFoodAttachment.idAttached = toby.id;
                app.db.Update(tableFoodAttachment);
                return;
            }
        });
    }


    Update(dt: number) {

    }
}