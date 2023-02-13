"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientsController_1 = require("../controllers/clientsController");
class ClientsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clientsController_1.clientsController.list);
        this.router.get('/:id', clientsController_1.clientsController.getOne);
        this.router.post('/', clientsController_1.clientsController.create);
        this.router.put('/:id', clientsController_1.clientsController.update); //update
        this.router.delete('/:id', clientsController_1.clientsController.delete);
    }
}
const clientsRoutes = new ClientsRoutes();
exports.default = clientsRoutes.router;
