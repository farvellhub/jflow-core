import { State } from "../core";

class Click {
    keys: Element[];

    constructor(target: string) {
        this.keys = [...document.querySelectorAll(`.${target}`)];
    }

    public listen(states: State[]) {
        this.keys.forEach((trigger: Element) => {
            trigger.addEventListener("click", (e) => {
                e.stopPropagation();
                states.forEach((state) => {
                    state.toggleStates();
                });
            });
        });
    }
}

export default Click;