import { App } from "../App";
import { PlayerAction as PlayerAction } from "../Blocks/PlayerAction";
import { Root } from "../Blocks/Root";

export class PlayerActionSystem {

    Configure(app: App) {

        app.db.OnInserted(Root, x => {
            let playerActionControl = new PlayerAction();
            app.db.Insert(playerActionControl);
        });
    }
}