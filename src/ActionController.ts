
export class ActionController {

    button: HTMLButtonElement;

    Load() {

        this.button = document.createElement('button');
        //this.button.innerHTML = '<svg><circle cx="50" cy="50" r="50" /></svg> '

        this.button.style.position = 'fixed';
        this.button.style.backgroundColor = 'red';
        this.button.style.right = '100' + "px";
        this.button.style.top = '200' + "px";

        this.button.style.width = '50' + "px";
        this.button.style.height = '50' + "px";

        this.button.addEventListener('click', () => {
            //alert('hop');
        });

        document.body.appendChild(this.button);
    }
}
