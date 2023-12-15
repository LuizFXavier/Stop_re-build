import GameObject from "./GameObject";
import Games from "../Games";
import Collision from "../math/Collision";
import Input from "../UI/Input";

export default class Carta extends GameObject{

    cor:string = "#000";

    constructor(x:number, y:number, width:number, height:number, cor?:string, tag?:string){

        super(x,y,width,height,tag);

        if(cor){
            this.cor = cor;
        }
        
    }

    update(): void {
        this.colisao()
    }
    render(): void {
        Games.ctx.fillStyle = this.cor
        Games.ctx.fillRect(this.x,this.y,this.width, this.height)
    }

    colisao(): void{
        
        let colisor = Collision.rectangleCollision(Input, this) as boolean

        if (colisor && Input.clicou){
            this.cor = "#" + Math.floor(Math.random()*16777215).toString(16); // Cor aleatória
        }
    }

}