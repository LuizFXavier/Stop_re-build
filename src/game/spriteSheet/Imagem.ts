import Games from "../Games";

export default class Imagem{
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;

    constructor(coord: {x:number, y:number, width:number, height:number}, url:string){

        this.x = coord.x;
        this.y = coord.y;
        this.width = coord.width;
        this.height = coord.height;
        this.image = new Image();
        this.image.src = url;
    }
    drawn(x:number, y:number, width:number, height:number){

        Games.ctx.drawImage(this.image, this.x, this.y, this.width, this.height, x, y, width, height);
        
    }
}