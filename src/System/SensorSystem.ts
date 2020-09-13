import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { Tob } from "../Blocks/Tob";
import { TobSensor } from "../Blocks/TobSensor";
import { SensorRect } from "./SensorRect";
import { Supply } from "../Blocks/Supply";
import { Table } from "../Blocks/Table";
import { Physics } from "../Physics";


export class SensorSystem implements IUpdatable {

    static SensorWidth = 101;
    static SensorHeight = 80;
    app: App;

    Configure(app: App) {
        this.app = app;

        this.app.db.OnInserted(Tob, (tob) => {
            let tobSensor = new TobSensor();
            app.db.Insert(tobSensor);
        });


        function InsertSensorRect(id: string, x: number, y: number) {
            let sensorRect = new SensorRect();
            sensorRect.userId = id;
            sensorRect.x = x;
            sensorRect.y = y;
            sensorRect.width = SensorSystem.SensorWidth;
            sensorRect.height = SensorSystem.SensorHeight;
            app.db.Insert(sensorRect);
        }

        this.app.db.OnInserted(Supply, (supply) => {
            InsertSensorRect(supply.id, supply.x, supply.y);
        });

        this.app.db.OnInserted(Table, (table) => {
            InsertSensorRect(table.id, table.x, table.y);
        });

        this.app.db.OnUpdated(Tob, (tob) => {
            let tobSensor = app.db.First(TobSensor);
            tobSensor.idSensored = null;

            let sensorRects = app.db.GetAll(SensorRect);
            for (let sensorRect of sensorRects) {

            }
        });
    }

    Update(dt: number) {

    }

}