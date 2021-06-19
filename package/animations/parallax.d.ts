import TypeParallax from "../types/type-parallax";
declare class Parallax {
    #private;
    constructor(...config: Array<TypeParallax>);
    private initConfig;
    private updateMovement;
    private render;
    listen(): Promise<void>;
}
export default Parallax;
