import { IUpdatable } from "../IUpdatable";
import { App } from "../App";
import { MessageEnd } from "../Blocks/MessageEnd";
declare var $: any;


export class DomMessageSystem implements IUpdatable {


    app: App;

    static TobySpeed = 200;


    Configure(app: App) {
        this.app = app;
        this.app.AddUpdatable(this);

        app.db.OnInserted(MessageEnd, (msg) => {

            //alert('Well done !');
            $('#endModal').modal();

            let message = '<img src="TobyDown.png" style="float: left; margin-right:20px;">';
            message += 'Well done !!! <br/><br/> Your time is : <b>' + app.timerSystem.TotalTimeString() + ' ! </b>';
            if (app.timerSystem.totalTime > 120)
                message += "<br><br><br> You're good at cooking, but .... <br/> The service was a little too slow, the client is exigent. <br /> Another try ?";
            else
                message += "<br><br><br> How can you cook so well and so fast !!! Have you ever had a Michelin star ? ";
            document.getElementById('endModalText').innerHTML = message;
        });
    }

    Update(dt: number) {

    }
}