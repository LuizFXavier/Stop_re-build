import Games from "../Games";
import Collision from "../math/Collision";
import Input from "./Input";
import Interface from "./Interface";

export default class Botao extends Interface{

    cor:string;
    visivel:boolean = false;

    constructor(x:number, y:number, width:number, height:number, tag?:string, cor?:string){

        super(x,y,width,height,tag)

        this.cor = cor ? cor:"#000";
    }

    colisao():boolean{

        let colisor = Collision.rectangleCollision(Input, this) as boolean

        return colisor && Input.clicou
    }

    update(): void {
        
    }
    render(): void {

        if(!this.visivel){
            return;
        }

        Games.ctx.fillStyle = this.cor;

        Games.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}