"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./Server");
const mockServer = new Server_1.Server(8080);
mockServer.start();
