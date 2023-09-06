import {Speaker} from "../commands/speaker";
import {Lancer} from "../commands/lancer";
import {Godbound} from "../commands/godbound";
import {Icon} from "../commands/icon";

export function decorateCommands() {
    new Speaker()
    new Lancer()
    new Godbound()
    new Icon()
}
