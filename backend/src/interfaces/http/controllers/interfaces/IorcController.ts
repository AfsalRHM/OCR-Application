import { Request, Response } from "express";

export interface IorcController {
  extractText(req: Request, res: Response): Promise<void>;
}
