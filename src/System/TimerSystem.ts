import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { DbTypedGroup } from "../Db/DbGroup";
import { MessageEnd } from "../Blocks/MessageEnd";

export class TimerSystem implements IUpdatable {
    app: App;
    totalTime = 0;
    started = false;

    Configure(app: App): TimerSystem {
        this.app = app;
        app.AddUpdatable(this);
        return this;
    }

    TotalTimeString(): string {
        let min = '' + Math.floor(this.totalTime / 60);
        let s = '' + Math.floor(this.totalTime % 60);
        if (min.length == 1) min = '0' + min;
        if (s.length == 1) s = '0' + s;
        return min + ' : ' + s;
    }
    Update(dt: number) {
        if (this.started)
            this.totalTime += dt;

        let timerText = document.getElementById('timerText');
        if (timerText != null)
            timerText.innerText = this.TotalTimeString();

        if (this.totalTime > 120) {
            let message = new MessageEnd();
            message.win = false;
            this.app.db.Insert(message);
            this.Stop();
        }

    }

    Start() {
        this.started = true;
    }

    Stop() {
        this.started = false;
    }
}