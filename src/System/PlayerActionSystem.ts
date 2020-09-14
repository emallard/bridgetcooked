import { App } from "../App";
import { PlayerAction as PlayerAction } from "../Blocks/PlayerAction";

export class PlayerActionSystem {

    Configure(app: App) {

        let playerActionControl = new PlayerAction();
        app.db.Insert(playerActionControl);
    }
}