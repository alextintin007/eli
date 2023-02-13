"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsController = void 0;
const database_1 = __importDefault(require("../database"));
class ClientsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientes = yield database_1.default.query('select * from clientes');
            res.json(clientes);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.json({ text: "This is the client " + req.params.id })
            const { id } = req.params;
            const cliente = yield database_1.default.query('SELECT * FROM clientes WHERE id = ?', [id]);
            // console.log(cliente);
            if (cliente.length > 0) {
                return res.json(cliente[0]);
            }
            // res.json({message: 'Game found'})
            res.status(404).json({ text: "The game doesn't exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO clientes set ?', [req.body]);
            console.log(req.body);
            res.json({ message: "Client Created" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.json({ text: "Updating the client " + req.params.id })
            const { id } = req.params;
            yield database_1.default.query('UPDATE clientes set ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'The client ' + req.params.id + " was updated" });
        });
    }
    delete(req, res) {
        const { id } = req.params;
        database_1.default.query('DELETE FROM clientes WHERE id = ?', [id]);
        res.json({ message: "The client " + req.params.id + " was deleted" });
    }
}
exports.clientsController = new ClientsController;
