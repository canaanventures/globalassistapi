import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import config from "../config/config";
import Output from "../_models/output";

class AuthController {
  static login = async (req: Request, res: Response) => {
    let _output = new Output();
    _output.isSuccess = false;
    _output.data = {};
    _output.message = 'Invalid Email/Password';
    res.send(_output);
  };
}
export default AuthController;
