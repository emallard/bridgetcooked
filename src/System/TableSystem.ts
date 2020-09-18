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
import { FoodType } from "../Blocks/FoodType";


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
            let tableFoodAttachment = app.db.First(FoodAttachment, x => x.idAttached == table.id);

            if (tobyFoodAttachment != null) {

                let tobyFood = app.db.First(Food, x => x.id == tobyFoodAttachment.idFood);

                // if no food on the table
                if (tableFoodAttachment == null) {
                    tobyFoodAttachment.idAttached = table.id;
                    app.db.Update(tobyFoodAttachment);
                }

                // if there is a plate on the table
                else {
                    let tableFood = app.db.First(Food, x => x.id == tableFoodAttachment.idFood);
                    if (tableFood.foodType == FoodType.Plate) {

                        if (tobyFood.foodType == FoodType.RiceCooked) {
                            tableFood.foodType = FoodType.PlateRiceCooked;
                            app.db.Update(tableFood);

                            tobyFoodAttachment.idAttached = null;
                            app.db.Update(tobyFoodAttachment);
                        }
                        else if (tobyFood.foodType == FoodType.PorkKiwiCooked) {
                            tableFood.foodType = FoodType.PlatePorkKiwiCooked;
                            app.db.Update(tableFood);

                            tobyFoodAttachment.idAttached = null;
                            app.db.Update(tobyFoodAttachment);
                        }
                    }

                    else if (tableFood.foodType == FoodType.PlateRiceCooked) {
                        if (tobyFood.foodType == FoodType.PorkKiwiCooked) {
                            tableFood.foodType = FoodType.PlateEnd;
                            app.db.Update(tableFood);

                            tobyFoodAttachment.idAttached = null;
                            app.db.Update(tobyFoodAttachment);
                        }
                    }

                    else if (tableFood.foodType == FoodType.PlatePorkKiwiCooked) {
                        if (tobyFood.foodType == FoodType.RiceCooked) {
                            tableFood.foodType = FoodType.PlateEnd;
                            app.db.Update(tableFood);

                            tobyFoodAttachment.idAttached = null;
                            app.db.Update(tobyFoodAttachment);
                        }
                    }
                }
            }
            else {
                // table to toby
                if (tableFoodAttachment != null) {
                    tableFoodAttachment.idAttached = toby.id;
                    app.db.Update(tableFoodAttachment);

                }
            }
        });
    }


    Update(dt: number) {

    }
}