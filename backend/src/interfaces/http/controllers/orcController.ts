import { Request, Response } from "express";
import { IorcController } from "./interfaces/IorcController";

export class OrcController implements IorcController {
    constructor( ) {}

    async extractText(req: Request, res: Response): Promise<void> {
        const {adhaarFront, adhaarBack} = req.body;

        const response = await 
    }
}