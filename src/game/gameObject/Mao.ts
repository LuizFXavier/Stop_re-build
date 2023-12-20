import Carta from "./Carta";
import GameObject from "./GameObject";

export default class Mao extends GameObject{

    cartas:Carta[] = []

    constructor(x:number, y:number, tag?:string){

        super(x,y,0,0,tag)

    }

    receberCarta(carta:Carta){
        
        carta.x = this.x;
        carta.y = this.y;
        this.cartas.push(carta);
        this.arrumarCartas()
    }

    render(): void {
        
        for (let i = 0; i < this.cartas.length; i++){
            this.cartas[i].render()
        }
        
    }
    update(): void {
        for (let i = 0; i < this.cartas.length; i++){
            this.cartas[i].update()
        }
    }

    arrumarCartas(){
        for (let i = 0; i < this.cartas.length; i++){
            
            this.cartas[i].y = this.y + (i % 2) * Carta.altura
            this.cartas[i].x = this.x + Math.floor(i / 2) * Carta.largura
        }
    }
}