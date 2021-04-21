import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import Output from "../_models/output";
import { Users } from "../entity";
import * as bcrypt from "bcryptjs";

class AuthController {
  static Login = async (req: Request, res: Response) => {
    let _output = new Output();

    //Check if username and password are set
    let { UserEmail, Password } = req.query;
    if (!(UserEmail && Password)) {
      _output.isSuccess = false;
      _output.data = {};
      _output.message = 'Invalid Email/Password';
      res.send(_output);
      return;
    }

    //Get user from database
    const userRepository = getRepository(Users);
    let user: Users;
    try {
      user = await userRepository.findOne({ where: { emailId: UserEmail } });
    } catch (error) {
      _output.isSuccess = false;
      _output.data = error;
      _output.message = 'Login failed';
      res.send(_output);
      return;
    }

    if (user == undefined) {
      _output.isSuccess = false;
      _output.data = {};
      _output.message = 'Email Id does not exists';
      res.send(_output);
      return;
    }

    //Check if encrypted password match
    if (user && !user.isActive || !user.checkIfUnencryptedPasswordIsValid(Password.toString())) {
      _output.isSuccess = false;
      _output.data = {};
      _output.message = !user.isActive ? 'Account has been locked. Please contact Admin' : 'Invalid Email/Password';
      res.send(_output);
      return;
    }
    _output.data = await getConnection().query(`execute GetUserDetails 5,null,null,null,null,${user.id}`);
    _output.isSuccess = true;
    _output.message = 'Login success';

    res.send(_output);
  };

  static ForgotPassword = async (req: Request, res: Response) => {
    let _output = new Output();

    let { UserEmail } = req.body;
    const userRepository = getRepository(Users);
    var random = Math.random().toString();
    var encry_hash = await bcrypt.hash(random, 10);

    try {
      if (await userRepository.count({ where: { emailId: UserEmail } }) > 0) {
        let users = await userRepository.findOne({ where: { emailId: UserEmail } });
        users.hashKey = encry_hash;
        await userRepository.save(users);
        _output.isSuccess = true;
        _output.data = {};
        _output.message = 'Request rasied.. Check your email';
        res.send(_output);
      }
      else {
        _output.isSuccess = false;
        _output.data = {};
        _output.message = 'Email Id does not exist';
        res.send(_output);
      }
    } catch (error) {
      _output.isSuccess = false;
      _output.data = error;
      _output.message = 'Forgot Password failed';
      res.send(_output);
      return;
    }
  };

  static ResetPassword = async (req: Request, res: Response) => {
    let _output = new Output();

    let { UserEmail, HashKey, Password } = req.body;
    const userRepository = getRepository(Users);

    try {
      if (await userRepository.count({ where: { emailId: UserEmail } }) > 0) {
        let users = await userRepository.findOne({ where: { emailId: UserEmail } });
        if (users.hashKey == HashKey) {
          users.password = Password;
          users.isActive = true;
          users.hashPassword();
          await userRepository.save(users);
          _output.isSuccess = true;
          _output.data = {};
          _output.message = 'Password reset success';
        }
        else {
          _output.isSuccess = false;
          _output.data = {};
          _output.message = 'Invalid Link provided. Contact Admin';
        }
        res.send(_output);
      }
      else {
        _output.isSuccess = false;
        _output.data = {};
        _output.message = 'Email Id does not exist';
        res.send(_output);
      }
    } catch (error) {
      _output.isSuccess = false;
      _output.data = error;
      _output.message = 'Forgot Password failed';
      res.send(_output);
      return;
    }
  };

  static ChangePassword = async (req: Request, res: Response) => {
    let _output = new Output();

    const id = req.body.UserId;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      _output.isSuccess = false;
      _output.data = {};
      _output.message = 'Password reset failed';
      res.send(_output);
      return;
    }

    const userRepository = getRepository(Users);
    let user: Users;
    try {
      user = await userRepository.findOneOrFail(id);
      //Check if old password matchs
      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        _output.isSuccess = false;
        _output.data = {};
        _output.message = 'Current password is incorrect';
        res.send(_output)
        return;
      }

      user.password = newPassword;
      user.hashPassword();
      await userRepository.save(user);

      _output.isSuccess = true;
      _output.data = {};
      _output.message = 'Password changed successfully';
      res.send(_output)
    } catch (id) {
      _output.isSuccess = false;
      _output.data = {};
      _output.message = 'Password reset failed';
      res.send(_output)
      return;
    }


  };
}
export default AuthController;
