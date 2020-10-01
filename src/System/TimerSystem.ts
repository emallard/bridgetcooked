import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { DbTypedGroup } from "../Db/DbGroup";

export class TimerSystem implements IUpdatable {
    app: App;
    totalTime = 0;
    started = false;

    Configure(app: App): TimerSystem {
        this.app = app;
        app.AddUpdatable(this);
        return this;
    }

    Update(dt: number) {
        if (this.started)
            this.totalTime += dt;

        let min = '' + Math.floor(this.totalTime / 60);
        let s = '' + Math.floor(this.totalTime % 60);
        if (min.length == 1) min = '0' + min;
        if (s.length == 1) s = '0' + s;

        let timerText = document.getElementById('timerText');
        if (timerText != null)
            timerText.innerText = min + ' : ' + s;

    }

    Start() {
        this.started = true;
    }

    Stop() {
        this.started = false;
    }
}