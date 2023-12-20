import Carta from "./Carta";
import GameObject from "./GameObject";
import Mao from "./Mao";

export default class Player extends GameObject{

    mao:Mao;

    constructor(x:number, y:number, width:number, height:number, tag?:string){

        super(x,y,width,height,tag);

        this.mao = new Mao(x,y,tag);

    }
    render(): void {
        this.mao.render();
    }
    update(): void {
        this.mao.update()
    }
    receberCarta(carta:Carta){
        this.mao.receberCarta(carta)
    }
}