import $ from "jquery"

export function criarMenu(){

    $("#app").append("<div id='menu'></div>")
    $("#menu").append("<form method='post' action='/room/enter/' id='inserirSala'></form>")
    $("#inserirSala").append("<input id='room' type='text' name='room'>")
    $("#inserirSala").append("<input type='submit'>")
    $("#menu").append("<a id='createRoom' href='/room/create/'>Criar nova sala</a>")

}
export function sumirMenu(){
    $("#menu").css("display", "none")
}