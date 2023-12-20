import $ from "jquery"
import {io} from "socket.io-client"
import Cookies from "js-cookie"
import Caminhos from "./Caminhos";
import Games from "./game/Games";
import Input from "./game/UI/Input";
import View from "./view/View";

let sessionID:string | undefined;
let magicNumber:number = Math.random();
let currentRoom:string | null = null;
let currentScene:string = "mainMenu";

// View.start()
// View.update(currentScene, true);

Caminhos.socket = io()

Caminhos.socket.emit("session", magicNumber)

Caminhos.socket.on("session", chave =>{
  
  if(chave.magicNumber === magicNumber){
    sessionID = chave.id;
    console.log(sessionID);
  }
})

Caminhos.socket.on("sus", a =>{
  console.log(a);
  
})
Caminhos.socket.on("entrar sala", sala =>{
  
  let host = sala.host as string

  if(host == Cookies.get("userID")){

    console.log("tu é o host");
    
  }
})

const game = new Games()
game.start()

$(()=>{ //Quando carregar a página ele vai tentar procurar a sala na url para entrar
  let queryString = window.location.search
  let urlParams = new URLSearchParams(queryString)

  if (!currentRoom){
    currentRoom = urlParams.get("room")
    
    if(currentRoom){

      Caminhos.socket.emit("entrar sala", currentRoom)
      
    }
  }
  
  View.update(currentScene, false)
  currentScene = urlParams.get("scene") ? urlParams.get("scene") as string : "mainMenu"
  View.update(currentScene, true)

  console.log("sala ",currentRoom);
  
})

$("#canvinhas").on("click", (e) =>{

  Input.clicou = e.button == 0;
  console.log(Input.clicou);
  
})

$("#canvinhas").on("mousemove", (e) =>{

  Input.x = e.clientX;
  Input.y = e.clientY;
  
})
