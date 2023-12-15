import {Server} from "socket.io"
import {DefaultEventsMap} from "../../node_modules/socket.io/dist/typed-events"
import http from "http"

export default class Multiplayer{

    private static io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

    public static listaID:string[] = []

    public static salas:string[] = []

    public static setIO(server:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){
        this.io = new Server(server)
    }

    public static conexao(){
        this.io.on("connection", socket =>{

            socket.on("session", magicN =>{
                socket.emit("session",{id:socket.id, magicNumber:magicN})
            })
            
            socket.on("entrar sala", sala =>{
                socket.join(sala)
                console.log(sala);
                
                this.io.in(sala).emit("sus","joga y joga")
            })
            
            socket.on("super", (a)=>{
                
                // console.log("a:",a);
                this.io.in("sala").emit("super","samba")
            })
        })
    }

    public static verificarSala(sessionID:string){

        return this.listaID.includes(sessionID)
    }
}