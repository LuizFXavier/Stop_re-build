import { Request, Response } from "express"
import Multiplayer from "../socket/Multiplayer"

export default class RoomsController{

    public static async entrarSala(req:Request, res:Response){

        console.log("b:", req.body);
        
        const sala = (req.body.room) as string
        console.log("saas ",sala);
        
        if (Multiplayer.salas.includes(sala)){

            return res.redirect(`/?room=${sala}&scene=sus`)
        }
        
    }

    public static async criarSala(req:Request, res:Response){

        console.log("criou");
        

        let sala = Math.floor(Math.random() * 1000).toString()

        while(sala.length < 4){
            sala = "0" + sala;
        }

        Multiplayer.salas.push(sala)

        return res.redirect(`/?room=${sala}&scene=sus`)
    }
}