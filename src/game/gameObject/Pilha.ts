import Carta from "./Carta";
import GameObject from "./GameObject";

export default class Pilha extends GameObject{

    cartas:Carta[] = []

    constructor(x:number, y:number, cartas:Carta[], tag?:string){

        super(x,y,0,0,tag)

        this.cartas = cartas;
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
            
            console.log(this.cartas.pop());
            
        }
    }

    getUltima(): Carta{

        return this.cartas[this.cartas.length - 1]
    }

    tirarUltima(): Carta{
        
        return this.cartas.pop() as Carta
    }

}