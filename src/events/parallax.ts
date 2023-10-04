import { TypeParallax } from "../types/";

export default class Parallax {
    #config: TypeParallax[] = [];

    constructor(...config) {
        this.initConfig(config);
        this.updateMovement();
    }

    private initConfig(config) {
        config.forEach(({ target, direction, offset }) => {
            this.#config.push({
                target: document.getElementById(target as string) as HTMLElement,
                direction: (direction > -2 && direction < 2)
                    ? direction
                    : 0,
                offset: (offset ? offset : 0)
            });
        });
    }

    private updateMovement(offsetScroll: number = window.scrollY): void {
        this.#config.forEach(({ target, direction, offset }: TypeParallax) => {
            const movement = (offset! - offsetScroll) * direction;

            if (offsetScroll >= offset!)
                (target as HTMLElement).style.transform = `translateY(${movement}px)`;
        });
    }

    private render(offset: number) {
        window.requestAnimationFrame(() => {
            this.updateMovement(offset);
        });
    }

    public listen() {
        window.addEventListener("scroll", () => {
            this.render(window.scrollY);
        });
    }
}