import Baralho from "./Baralho";
import Carta from "./Carta";
import GameObject from "./GameObject";

export default class Pilha extends GameObject{

    cartas:Carta[] = []

    constructor(x:number, y:number, tag?:string, cartas?:Carta[]){

        super(x,y,0,0,tag)

        if(cartas){

            for(let i = 0; i < cartas.length; i++){
                this.porCarta(cartas[i])
            }
        }else{
            this.porCarta(Baralho.cartaNula)
        }
    }

    update(): void {
        // this.getUltima().update()
        this.colisao()
    }
    render(): void {
        this.getUltima().render()
    }

    colisao(){
        if(this.getUltima().colisao()){
            return true
        }

        return false;
    }

    getUltima(): Carta{

        return this.cartas[this.cartas.length - 1]
    }
    porCarta(carta:Carta){
        carta.x = this.x;
        carta.y = this.y;

        this.cartas.push(carta)
    }

    tirarUltima(): Carta{
        
        return this.cartas.pop() as Carta
    }

}