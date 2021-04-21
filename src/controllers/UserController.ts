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
      let { id, salutations, firstName, lastName, roleId, emailId, phoneNo, isActive, password, address, state, country, pincode, userId } = req.body;
      const userRepository = await getRepository(Users);
      const userMappingRepository = await getRepository(UserMapping);
      let users: Users;
      let userMapping: UserMapping;

      if (id !== 0) {
        users = await userRepository.findOne({ id: id });
        userMapping = await userMappingRepository.findOne({ userId: id });
      }
      else {
        users = new Users();
        userMapping = new UserMapping();
      }

      users.salutations = salutations;
      users.firstName = firstName;
      users.lastName = lastName;
      users.roleId = roleId;
      users.emailId = emailId;
      users.phoneNo = phoneNo;
      users.isActive = isActive;
      users.password = password;
      users.createdOn = new Date();
      users.hashPassword();
      await userRepository.save(users);

      if (roleId !== 1) {
        // Add to user mappping table
        userMapping.userId = users.id;
        userMapping.orgId = req.body.orgId;
        userMapping.address = address;
        userMapping.state = state;
        userMapping.country = country;
        userMapping.pincode = pincode;
        userMapping.coordinatorId = req.body.coordinatorId;
        userMapping.updatedBy = userId;
        userMapping.updatedOn = new Date();
        if (roleId === 5)
          userMapping.supervisorId = req.body.supervisorId;

        await userMappingRepository.save(userMapping);
      }
      _output.data = {};
      _output.isSuccess = true;
      _output.message = id == 0 ? 'User created successfully' : 'Updated successfully';
    }
    catch (ex) {
      _output.isSuccess = false;
      _output.data = ex;
      _output.message = req.body.id == 0 ? 'User creation failed' : 'Update failed';
    }
    res.send(_output);
  };
}
export default UserController;
