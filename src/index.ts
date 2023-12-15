import express, { Router } from "express";
import { resolve } from "path";
import http from "http"
import router from "./router";
import Multiplayer from "./socket/Multiplayer";

const PORT = 9090;

const app = express();

const server = http.createServer(app)

Multiplayer.setIO(server)

Multiplayer.conexao()

app.use(express.urlencoded({ extended: true })) //Pro body existir no controller
app.use("/public", express.static(resolve("./src/public")))
app.use("/assets", express.static(resolve("./src/public/assets")))
app.use("/style.css", express.static(resolve("./src/public/style.css")))
app.use(router)

server.listen(PORT, () =>{
    console.log(`Rodando na porta ${PORT}`);
    
})