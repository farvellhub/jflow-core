import { TypeParallax } from "../types/";

// Animation parallax
export default class Parallax {
    #config: TypeParallax[] = [];

    constructor(...config) {

        // Init multiple configs
        this.initConfig(config);
        // Need updates movement at restart
        // Prevents charging scroll when re-renders position
        this.updateMovement();
    }

    // Sets config params scroll direction, speed , offset
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

    // Updates movement relative on direction and offset
    private updateMovement(offsetScroll: number = window.scrollY): void {
        // For each parallax configuration object
        this.#config.forEach(({ target, direction, offset }: TypeParallax) => {
            const movement = (offset! - offsetScroll) * direction;

            // Only executes if offset arrives to minOffset
            if (offsetScroll >= offset!)
                (target as HTMLElement).style.transform = `translateY(${movement}px)`;
        });
    }

    // Real scroll param with request Animation
    private render(offset: number) {
        window.requestAnimationFrame(() => {
            this.updateMovement(offset);
        });
    }

    // Event handler for scroll
    public listen() {
        window.addEventListener("scroll", () => {
            this.render(window.scrollY);
        });
    }
}