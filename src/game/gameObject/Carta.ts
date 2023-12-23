import GameObject from "./GameObject";
import Collision from "../math/Collision";
import Input from "../UI/Input";
import Imagem from "../spriteSheet/Imagem";

export default class Carta extends GameObject{
    
    public static largura:number = 71;
    public static altura:number = 101;

    viradaPBaixo:boolean = false;
    selected:boolean = false;
    imagem: Imagem | undefined;
    naipe:string;
    valor:number;
    corteImagem:{x:number, y:number, width:number, heigh:number} | undefined;
    

    constructor(x:number, y:number, naipe:string, valor:number, imagem?: Imagem, tag?:string){

        super(x, y, Carta.largura, Carta.altura,tag);

        if(imagem){

            this.imagem = imagem;
            this.corteImagem = {x:imagem.x, y:imagem.y, width:imagem.width, heigh:imagem.height};
        }

        this.naipe = naipe;
        this.valor = valor;
        
    }

    update(): void {
        this.colisao()
    }
    render(): void {

        if(!this.imagem || !this.corteImagem){
            return
        }

        if(this.viradaPBaixo){
            this.imagem.x = Carta.largura * 13;
            this.imagem.y = 0;
        }
        else{
            this.imagem.x = this.corteImagem.x;
            this.imagem.y = this.corteImagem.y;
        }

        this.imagem.drawn(this.x, this.y, this.width, this.height)
        
    }

    colisao(): void | Carta{
        
        let colisor = Collision.rectangleCollision(Input, this) as boolean

        if (colisor && Input.clicou){
            // this.x = Math.floor(Math.random() * 13.9) * 71
            // this.y = Math.floor(Math.random() * 3.9) * 101
            //this.virar()
            return this 
        }
    }
    virar(){
        this.viradaPBaixo = !this.viradaPBaixo;
    }

}