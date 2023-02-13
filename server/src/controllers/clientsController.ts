import { json, Request, Response } from 'express';

import pool from '../database'

class ClientsController {

    public async list(req: Request, res: Response) {
        const clientes = await pool.query('select * from clientes');
        res.json(clientes);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        // res.json({ text: "This is the client " + req.params.id })
        const { id } = req.params;
        const cliente = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
        // console.log(cliente);
        if (cliente.length > 0){
            return res.json(cliente[0]);
        }
        // res.json({message: 'Game found'})
        res.status(404).json({text: "The game doesn't exist"});
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO clientes set ?', [req.body])
        console.log(req.body);
        res.json({ message: "Client Created" })
    }

    public async update(req: Request, res: Response): Promise<void>{
        // res.json({ text: "Updating the client " + req.params.id })
        const {id} = req.params;
        await pool.query('UPDATE clientes set ? WHERE id = ?', [req.body, id])
        res.json({message: 'The client '+ req.params.id + " was updated"})
    }

    public delete(req: Request, res: Response) {
        const {id} = req.params;
        pool.query('DELETE FROM clientes WHERE id = ?', [id])
        res.json({ message: "The client " + req.params.id + " was deleted"})
    }
}

export const clientsController = new ClientsController;