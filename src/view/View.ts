import DOM from "./DOM/DOM";
import Menu from "./DOM/Menu";

export default class View{

    private static views:Map<string, DOM> = new Map<string, DOM>()

    public static update(currentScene:string, visivel:boolean){

        this.views.get(currentScene)?.show(visivel)
    }

    public static start(){
        const mainMenu = new Menu(`
        <div id='mainMenu'>
            <form method='post' action='/room/enter/' id='inserirSala'>
                <input id='room' type='text' name='room'>
                <input type='submit'>
            </form>
            <a id='createRoom' href='/room/create/'>Criar nova sala</a>
        </div>
        `,"mainMenu")
        this.views.set("mainMenu",mainMenu);

        const sus = new Menu("<h1 id='sus'> Recomendo uso de fones de ouvido</h1>","sus")
        this.views.set("sus",sus);

        this.views.forEach((v,k,map)=>{
            v
            map.get(k)?.show(false)
        })
    }
}