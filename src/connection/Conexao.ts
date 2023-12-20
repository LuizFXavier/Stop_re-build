import {io} from "socket.io-client"
import { Socket } from "socket.io-client"
import {DefaultEventsMap} from "../../node_modules/socket.io/dist/typed-events"

export default class Conexao{

    public static socket:Socket<DefaultEventsMap, DefaultEventsMap>;

    public static sessionID:number | undefined;

    public static start(magicNumber:number){

        this.socket = io()

        this.socket.emit("session", magicNumber)

        this.socket.on("session", chave =>{
  
            if(chave.magicNumber === magicNumber){
                this.sessionID = chave.id;
                console.log(this.sessionID);
            }
        })
    }
    
}