import { Socket } from "socket.io-client"
import {DefaultEventsMap} from "../node_modules/socket.io/dist/typed-events"

export default class Caminhos{
    public static socket:Socket<DefaultEventsMap, DefaultEventsMap>
}