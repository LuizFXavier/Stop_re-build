export default abstract class Interface{

    x:number;
    y:number;
    width:number;
    height:number;
    tag:string | undefined;

    constructor(x:number, y:number, width:number, height:number, tag?:string){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        if (tag){
            this.tag = tag;
        }
    }
    abstract update():void;
    abstract render():void;
}