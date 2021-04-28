import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import Output from "../_models/output";
import { UserMapping, Users } from "../entity";

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
    try {
      let { Id, Salutations, FirstName, LastName, RoleId, EmailId, PhoneNo, isActive, Password, Address, State, Country, Pincode, UserId } = req.body;
      const userRepository = await getRepository(Users);
      const userMappingRepository = await getRepository(UserMapping);
      let users: Users;
      let userMapping: UserMapping;

      if (Id !== 0) {
        users = await userRepository.findOne({ id: Id });
        userMapping = await userMappingRepository.findOne({ userId: Id });
      }
      else {
        users = new Users();
        userMapping = new UserMapping();
        users.password = Password;
      }

      users.salutations = Salutations;
      users.firstName = FirstName;
      users.lastName = LastName;
      users.roleId = RoleId;
      users.emailId = EmailId;
      users.phoneNo = PhoneNo;
      users.isActive = isActive;
      users.createdOn = new Date();
      users.hashPassword();
      await userRepository.save(users);

      if (RoleId !== 1) {
        // Add to user mappping table
        userMapping.userId = users.id;
        userMapping.orgId = req.body.orgId;
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
      }
      _output.data = await getConnection().query(`execute GetUserDetails 5,null,null,null,null,${Id}`);
      _output.isSuccess = true;
      _output.message = Id == 0 ? 'User created successfully' : 'Updated successfully';
    }
    catch (ex) {
      _output.isSuccess = false;
      _output.data = ex;
      _output.message = req.body.Id == 0 ? 'User creation failed' : 'Update failed';
    }
    res.send(_output);
  };
}
export default UserController;
