import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { MessageEnd } from "../Blocks/MessageEnd";



export class DomMessageSystem implements IUpdatable {


    app: App;

    static TobySpeed = 200;


    Configure(app: App) {
        this.app = app;
        this.app.AddUpdatable(this);

        app.db.OnInserted(MessageEnd, (msg) => {

            alert('Well done !');
        });
    }

    Update(dt: number) {

    }
}