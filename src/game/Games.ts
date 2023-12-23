import $ from "jquery";
import GameObject from "./gameObject/GameObject";
import Input from "./UI/Input";
import Caminhos from "../Caminhos";
import Imagem from "./spriteSheet/Imagem";
import Baralho from "./gameObject/Baralho";
import Pilha from "./gameObject/Pilha";
import Player from "./gameObject/Player";
import Interface from "./UI/Interface";
import Botao from "./UI/Botao";

export default class Games{

    public static ctx:CanvasRenderingContext2D;
    public static vez:number = 0;
    
    public static quantidadeCartas:number = 5
    public static gameObjects:GameObject[] = []
    public static interfaces:Interface[] = []

    public static getGameObjectByTag(tag:string){

        for(let i = 0; i < this.gameObjects.length; i++){

            if(this.gameObjects[i].tag === tag){
                return this.gameObjects[i];
            }
        }
        return null
    }
    public static getInterfaceByTag(tag:string){

        for(let i = 0; i < this.interfaces.length; i++){

            if(this.interfaces[i].tag === tag){
                return this.interfaces[i];
            }
        }
        return null
    }

    public static update(){
        Games.gameObjects.forEach(e =>{
            e.update()
        })
        Games.interfaces.forEach(e =>{
            e.update();
        })
    }

    public static render(){

        Games.ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        Games.gameObjects.forEach(e =>{
            e.render()
        })

        Games.interfaces.forEach(e=>{
            e.render()
        })
    }

    public static loop(){
        this.render()
        this.update()

        if (Input.clicou) {
            
            Input.clicou = !Input.clicou
        }

        Caminhos.socket.emit("super", "almondegas")

        window.requestAnimationFrame(() => this.loop())
    }

    public static start():void{

        $("#app").append("<canvas id='canvinhas'></canvas>");

        const canvas = $("#canvinhas")[0] as HTMLCanvasElement;

        canvas.width = window.innerWidth;
        canvas.height = globalThis.innerHeight;
        
        Games.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        const imagemBaralho = new Imagem({x:0,y:0,width:71,height:101},"./src/game/assets/do_meu_avo2.png");
        
        const baralho = new Baralho(imagemBaralho);

        baralho.embaralhar()

        const monte = new Pilha(20,20,"monte",baralho.cartas);
        const descarte = new Pilha(canvas.width / 2, canvas.height * 0.1,"descarte")

        const player = new Player(canvas.width *0.25, canvas.height * 0.25,0,0,"player1");

        for (let i = 0; i < this.quantidadeCartas; i++) {

            player.receberCarta(monte.tirarUltima());
        }
        
        Games.gameObjects.push(monte);
        Games.gameObjects.push(descarte);
        Games.gameObjects.push(player);

        const botaoDescartar = new Botao(player.x * 0.5, player.y, 40,25,"botao descarte","#E31A51")

        Games.interfaces.push(botaoDescartar);

        this.loop();
    }
}