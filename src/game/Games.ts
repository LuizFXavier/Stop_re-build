import $ from "jquery";
import GameObject from "./gameObject/GameObject";
import Carta from "./gameObject/Carta";
import Input from "./UI/Input";
import Caminhos from "../Caminhos";

export default class Games{

    public static ctx:CanvasRenderingContext2D

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
        
        const carta = new Carta(20,20,50,70);

        this.gameObjects.push(carta)

        this.loop()
    }
}