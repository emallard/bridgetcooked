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

            if (msg.win) {
                let message = '<img src="TobyDown.png" style="float: left; margin-right:20px;">';
                message += 'Well done !!! <br/><br/> Your time is : <b>' + app.timerSystem.TotalTimeString() + ' ! </b>';
                if (app.timerSystem.totalTime > 90)
                    message += "<br><br><br> You're good at cooking, but .... <br/> <br /> Another try ?";
                else
                    message += "<br><br><br> How can you cook so well and so fast !!! Have you ever had a Michelin star ? ";
                document.getElementById('endModalText').innerHTML = message;
            }
            else {
                let message = '<img src="TobyLost.png" style="float: left; margin-right:20px;">';
                message += 'The service is a little too slow, and the client is exigent.';
                message += "<br/>Let's have another chance !";

                document.getElementById('endModalText').innerHTML = message;
            }
        });
    }

    Update(dt: number) {

    }
}