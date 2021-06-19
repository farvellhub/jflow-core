declare class Style {
    #private;
    constructor(styles: Record<string, unknown>);
    setStyles(className: string): Array<HTMLElement>;
}
export default Style;
