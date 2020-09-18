import { App } from "../App";
import { PlayerAction as PlayerAction } from "../Blocks/PlayerAction";
import { Root } from "../Blocks/Root";
import { TobAction } from "../Blocks/TobAction";
import { TobHighlighted } from "../Blocks/TobHighlighted";

export class PlayerActionSystem {

    Configure(app: App) {

        app.db.OnInserted(Root, x => {
            let playerActionControl = new PlayerAction();
            app.db.Insert(playerActionControl);

            let tobAction = new TobAction();
            app.db.Insert(tobAction);
        });

        app.db.OnUpdated(PlayerAction, () => {
            let tobAction = app.db.First(TobAction);
            let tobHighlighted = app.db.First(TobHighlighted);

            if (tobHighlighted != null && tobHighlighted.highlightedId != null) {
                console.log('action !');
                tobAction.targetId = tobHighlighted.highlightedId;
                app.db.Update(tobAction);
            }
        })
    }
}