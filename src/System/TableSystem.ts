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


export class TableSystem implements IUpdatable {

    app: App;

    Configure(app: App) {
        this.app = app;
        app.AddUpdatable(this);

        this.app.db.OnInserted(Tob, (tob) => {
            let tobActionTable = new TobActionTable();
            app.db.Insert(tobActionTable);
        });


        this.app.db.OnUpdated(TobActionTable, action => {

            if (action.idTable == null)
                return;

            let toby = this.app.db.First(Tob);

            // toby to table
            let tobyFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == toby.id);
            if (tobyFoodAttachment != null) {
                tobyFoodAttachment.idAttached = action.idTable;
                app.db.Update(tobyFoodAttachment);
                return;
            }

            // table to toby
            let tableFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == action.idTable);
            if (tableFoodAttachment != null) {
                tableFoodAttachment.idAttached = toby.id;
                app.db.Update(tableFoodAttachment);
                return;
            }
        });

        this.app.db.OnUpdated(PlayerAction, action => {
            let tobActionTable = app.db.First(TobActionTable);
            let tobHighlighted = app.db.First(TobHighlighted);

            if (tobHighlighted != null && tobHighlighted.highlightedId != null) {
                let table = app.db.First(Table, x => x.id == tobHighlighted.highlightedId);
                if (table != null) {
                    console.log('table action !');
                    tobActionTable.idTable = table.id;
                    this.app.db.Update(tobActionTable);
                    return;
                }
            }
        })
    }


    Update(dt: number) {

    }
}