import $ from "jquery";
import GameObject from "./gameObject/GameObject";
import Input from "./UI/Input";
import Caminhos from "../Caminhos";
import Imagem from "./spriteSheet/Imagem";
import Baralho from "./gameObject/Baralho";
import Pilha from "./gameObject/Pilha";
import Player from "./gameObject/Player";

export default class Games{

    public static ctx:CanvasRenderingContext2D
    
    quantidadeCartas:number = 5
    gameObjects:GameObject[] = []

    update(){
        this.gameObjects.forEach(e =>{
            e.update()
        })
    }

    render(){

        Games.ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        this.gameObjects.forEach(e =>{
            e.render()
        })
    }

    loop(){
        this.render()
        this.update()

        if (Input.clicou) {

            Input.clicou = !Input.clicou
        }

        Caminhos.socket.emit("super", "almondegas")

        window.requestAnimationFrame(() => this.loop())
    }

    start():void{
        $("#app").append("<canvas id='canvinhas'></canvas>");

        const canvas = $("#canvinhas")[0] as HTMLCanvasElement;

        canvas.width = window.innerWidth;
        canvas.height = globalThis.innerHeight;
        
        Games.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const imagemBaralho = new Imagem({x:0,y:0,width:71,height:101},"./src/game/assets/do_meu_avo2.png");
        
        const baralho = new Baralho(imagemBaralho);

        baralho.embaralhar()

        const monte = new Pilha(20,20,baralho.cartas,"monte");

        const player = new Player(200,200,0,0,"player1");

        for (let i = 0; i < this.quantidadeCartas; i++) {

            player.receberCarta(monte.tirarUltima());
        }
        
        this.gameObjects.push(monte);
        this.gameObjects.push(player);

        this.loop();
    }
}