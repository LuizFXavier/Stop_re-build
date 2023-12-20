import Imagem from "../spriteSheet/Imagem";
import Carta from "./Carta";

export default class Baralho{

    public static naipes:string[] = ["PAUS","OUROS","COPAS","ESPADAS"]
    cartas:Carta[] = []
    
    
    constructor(imagem:Imagem){

        for (let i = 0; i < 4; i ++){
            for(let j = 0; j < 13; j++){

                let valor = j+1;
                let tag = j.toString() + Baralho.naipes[i]

                let img_baralho = new Imagem({
                                                x:j * Carta.largura,
                                                y:i * Carta.altura,
                                                width:Carta.largura,
                                                height:Carta.altura}, imagem.image.src)

                
                this.cartas.push(new Carta(0, 0, Baralho.naipes[i], valor, img_baralho, tag))
            }
        }
    }

    embaralhar(cartas?:Carta[]){

        if (cartas){

            for(let i = cartas.length - 1; i > 0; --i){

                let j = Math.floor(Math.random() * (i + 1))
    
                let temp = cartas[i]
                cartas[i] = cartas[j]
                cartas[j] = temp
            
            }
            return
        }

        for(let i = this.cartas.length - 1; i > 0; --i){

            let j = Math.floor(Math.random() * (i + 1))

            let temp = this.cartas[i]
            this.cartas[i] = this.cartas[j]
            this.cartas[j] = temp
        
        }
    }

}