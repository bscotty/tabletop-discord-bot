import {Speaker} from "../commands/speaker";
import {Lancer} from "../commands/lancer";
import {Godbound} from "../commands/godbound";
import {Roll} from "../commands/roll";

export function decorateCommands() {
    new Speaker()
    new Lancer()
    new Godbound()
    new Roll()
}
