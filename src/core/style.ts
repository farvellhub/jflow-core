class Style {
    #styles: Record<string, unknown>;

    constructor(styles: Record<string, unknown>) {
        this.#styles = styles;
    }

    public setStyles(className: string): Array<HTMLElement> {
        const elements: Array<HTMLElement> =
            [...document.getElementsByClassName(className)] as Array<HTMLElement>;

        elements.forEach((element: HTMLElement) => {
            Object.assign(element, this.#styles);
        });

        return elements;
    }
}

export default Style;