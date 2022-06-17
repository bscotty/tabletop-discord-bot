import {Speaker} from "../commands/speaker";
import {Lancer} from "../commands/lancer";
import {Godbound} from "../commands/godbound";

export function decorateCommands() {
    new Speaker()
    new Lancer()
    new Godbound()
}
