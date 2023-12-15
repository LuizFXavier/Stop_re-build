import { resolve } from "path"
import { Request, Response } from "express"

export default class IndexController{
    public static async index(req:Request, res:Response){
       
        return res.sendFile(resolve("./src/public/index.html"))
    }
    
}