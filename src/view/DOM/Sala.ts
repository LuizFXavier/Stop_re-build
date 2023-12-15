import $ from "jquery"
import DOM from "./DOM";

export default class Sala extends DOM{

    id:string;
    
    constructor(content:string, id:string){
        super()
        this.id = id;
        $("#app").append(content)
        
    }

    show(visivel:boolean): void {
        
        if(!visivel){
            $("#"+this.id).css("display","none")
        }
        else{
            $("#"+this.id).css("display","")
        }
    }

}