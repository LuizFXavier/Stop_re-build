import { Router } from "express";
import IndexController from "./controller/IndexController";
import RoomsController from "./controller/RoomsController";

const router = Router()

router.get("/", IndexController.index)
router.post("/room/enter/", RoomsController.entrarSala)
router.get("/room/create/", RoomsController.criarSala)


export default router