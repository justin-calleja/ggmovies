import { observable, action, decorate } from 'mobx';

class Dialog {
    visible = false;

    show = () => (this.visible = true);
    hide = () => (this.visible = false);
}

decorate(Dialog, {
    visible: observable,
    show: action,
    hide: action,
});

export default Dialog;
