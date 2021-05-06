import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import Output from "../_models/output";
import { EmailContent, UserMapping, Users } from "../entity";
import MailOptions from "../_mailer/mailOptions";
import EmailController from "../_mailer/mailer";

class UserController {
  static GetUsersByFilter = async (req: Request, res: Response) => {
    let _output = new Output();
    try {
      let Query = `execute GetUserDetails ${req.query.OperationId}, ${req.query.RoleId ? req.query.RoleId : 'null'}, ${req.query.OrgId ? req.query.OrgId : 'null'}, ${req.query.SupervisorId ? req.query.SupervisorId : 'null'}, ${req.query.CoordinatorId ? req.query.CoordinatorId : 'null'}, ${req.query.userId ? req.query.userId : 'null'}`;
      _output.data = await getConnection().query(Query);
      _output.isSuccess = true;
      _output.message = 'Get Users success';
    }
    catch (ex) {
      _output.isSuccess = false;
      _output.data = {};
      _output.message = 'Get failed';
    }
    res.send(_output);
  };

  static CreateUsers = async (req: Request, res: Response) => {
    let _output = new Output();
    let mailOptions = new MailOptions();
    try {
      let { Id, Salutations, FirstName, LastName, RoleId, EmailId, PhoneNo, isActive, Password, Address, State, Country, Pincode, UserId } = req.body;
      if (Password == undefined || Password == null)
        Password = Math.random().toString(36).substring(7);
      const userRepository = await getRepository(Users);
      const userMappingRepository = await getRepository(UserMapping);
      let users: Users;
      let userMapping: UserMapping;

      if (Id !== 0) {
        users = await userRepository.findOne({ id: Id });
        userMapping = await userMappingRepository.findOne({ userId: Id });
      }
      else if (await userRepository.count({ where: { emailId: EmailId } }) > 0) {
        _output.data = {};
        _output.isSuccess = false;
        _output.message = 'Email Id already exists';
        res.send(_output);
        return
      }
      else {
        users = new Users();
        userMapping = new UserMapping();
        users.password = Password;
        users.hashPassword();
        users.createdOn = new Date();
        const emailRepository = getRepository(EmailContent);
        mailOptions.to = EmailId;
        mailOptions.bcc = 'saran@vecan.co; abraham@vecan.co;';
        mailOptions.subject = "Account Creation";
        mailOptions.html = await (await emailRepository.findOne({ where: { id: 1 } })).emailContent.replace('@Name', FirstName + ' ' + LastName)
          .replace('@Password', Password)
        await EmailController.sendEmail(mailOptions);
      }

      users.salutations = Salutations;
      users.firstName = FirstName;
      users.lastName = LastName;
      users.roleId = RoleId;
      users.emailId = EmailId;
      users.phoneNo = PhoneNo;
      users.isActive = isActive;
      await userRepository.save(users);

      if (RoleId > 2) {
        // Add to user mappping table
        userMapping.userId = users.id;
        userMapping.orgId = req.body.OrgId;
        userMapping.address = Address;
        userMapping.state = State;
        userMapping.country = Country;
        userMapping.pincode = Pincode;
        userMapping.coordinatorId = req.body.CoordinatorId;
        userMapping.updatedBy = UserId;
        userMapping.updatedOn = new Date();
        if (RoleId === 5)
          userMapping.supervisorId = req.body.SupervisorId;

        await userMappingRepository.save(userMapping);

        _output.data = await getConnection().query(`execute GetUserDetails 5,null,null,null,null,${Id}`);
        _output.isSuccess = true;
        _output.message = Id == 0 ? 'User created successfully' : 'Updated successfully';
      }
    }
    catch (ex) {
      _output.isSuccess = false;
      _output.data = ex;
      _output.message = req.body.Id == 0 ? 'User creation failed' : 'Update failed';
    }
    res.send(_output);
  };

  static WelcomeInfo = async (req: Request, res: Response) => {
    let _output = new Output();
    try {
      _output.isSuccess = true;
      _output.data = "Welcome to Global Assit Admin - API";
      _output.message = 'Welcome to Global Assit Admin - API';
      res.send(_output);
    }
    catch (e) {
      _output.isSuccess = false;
      _output.data = e.toString();
      _output.message = 'Failed to run the Server';
      res.send(_output);
    }
  }
}
export default UserController;
