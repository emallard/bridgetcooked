import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { Tob } from "../Blocks/Tob";
import { TobSensor } from "../Blocks/TobSensor";


export class SensorSystem implements IUpdatable {




    app: App;


    Configure(app: App) {
        this.app = app;

        this.app.db.OnInserted(Tob, (tob) => {
            let tobSensor = new TobSensor();
            app.db.Insert(tobSensor);
        });

        this.app.db.OnUpdated(Tob, (tob) => {
            let tobSensor = app.db.First(TobSensor);

        });

    }

    Update(dt: number) {

    }

}