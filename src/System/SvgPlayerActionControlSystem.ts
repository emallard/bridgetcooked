import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { PlayerAction } from "../Blocks/PlayerAction";


export class SvgPlayerActionControlSystem implements IUpdatable {

    app: App;


    Configure(app: App) {
        this.app = app;


        let button = document.createElement('button');
        //this.button.innerHTML = '<svg><circle cx="50" cy="50" r="50" /></svg> '
        button.style.position = 'fixed';
        button.style.backgroundColor = 'green';
        button.style.right = '100' + "px";
        button.style.top = '200' + "px";

        button.style.height = '50' + "px";
        button.style.width = '50' + "px";

        button.addEventListener('click', () => {
            let actionControl = app.db.First(PlayerAction);
            app.db.Update(actionControl);
        });

        document.getElementById('actioncontrol_container').appendChild(button);
    }

    Update(dt: number) {
    }
}
