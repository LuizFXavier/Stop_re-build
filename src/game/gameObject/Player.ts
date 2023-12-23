import Games from "../Games";
import Botao from "../UI/Botao";
import Baralho from "./Baralho";
import Carta from "./Carta";
import GameObject from "./GameObject";
import Mao from "./Mao";
import Pilha from "./Pilha";

export default class Player extends GameObject{

    mao:Mao;
    cartaComprada:Carta | null = null;


    constructor(x:number, y:number, width:number, height:number, tag?:string){

        super(x,y,width,height,tag);

        this.mao = new Mao(x,y,tag);

    }
    render(): void {
        this.mao.render();
        this.cartaComprada?.render()
    }
    update(): void {
        
        this.comprar()
        this.descartar()
        if(this.cartaComprada) this.trocar()
        else this.corte()
    
        this.cartaComprada?.update()
    }
    comprar(){

        if(this.cartaComprada){
            return
        }

        const monte = Games.getGameObjectByTag("monte") as Pilha
        const descarte = Games.getGameObjectByTag("descarte") as Pilha
        
        if (monte.colisao()){

            this.cartaComprada = monte.tirarUltima()
            this.cartaComprada.x = 0;
            this.cartaComprada.y = 200;
            this.cartaComprada.viradaPBaixo = false;
        }
        if(descarte.colisao()){
            this.cartaComprada = descarte.tirarUltima()
            this.cartaComprada.x = 0;
            this.cartaComprada.y = 200;
            this.cartaComprada.viradaPBaixo = false;
        }
        
    }

    trocar(){
        
        if(!this.cartaComprada){
            return
        }

        const descarte = Games.getGameObjectByTag("descarte") as Pilha
        
        let indexTroca = this.mao.colisao() as number

        if (indexTroca >= 0){

            let cartaTroca = this.mao.getCarta(indexTroca)
            descarte.porCarta(cartaTroca)

            this.mao.mudarCarta(this.cartaComprada, indexTroca)
            this.cartaComprada = null;
        }
    }
    descartar(){
        
        const botaoDescartar = Games.getInterfaceByTag("botao descarte") as Botao;

        if(!this.cartaComprada){
            botaoDescartar.visivel = false;
            return;
        }

        const descarte = Games.getGameObjectByTag("descarte") as Pilha;

        botaoDescartar.visivel = true;

        if(botaoDescartar.colisao()){
            descarte.porCarta(this.cartaComprada)

            this.cartaComprada = null;

        }
    }

    corte(){

        if(this.cartaComprada){
            return;
        }
        
        let indexCarta = this.mao.colisao() as number

        if (indexCarta < 0){
            return;
        }

        const monte = Games.getGameObjectByTag("monte") as Pilha
        const descarte = Games.getGameObjectByTag("descarte") as Pilha

        let cartaCortada = this.mao.getCarta(indexCarta)

        if(cartaCortada.valor === descarte.getUltima().valor){

            this.mao.mudarCarta(Baralho.cartaNula, indexCarta) //Mudar Mão pra não ter que mandar a carta nula

            descarte.porCarta(cartaCortada)

        }else{
            let cartaPena = monte.tirarUltima() as Carta;

            this.receberCarta(cartaPena)
        }
    }

    receberCarta(carta:Carta){
        this.mao.receberCarta(carta)
    }
}