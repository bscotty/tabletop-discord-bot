import "reflect-metadata"
import {initClient} from "./client";
import {Config} from "./config";

const config = new Config()

initClient(config.botToken(), config.guilds());
