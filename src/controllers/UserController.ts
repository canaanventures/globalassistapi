import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import config from "../config/config";
import Output from "../_models/output";
import { UserMapping, Users } from "../entity";

class UserController {
  static GetAllUsers = async (req: Request, res: Response) => {
    let _output = new Output();
    try {
      if (req.query.RoleId && req.query.RoleId !== "0") {
        _output.data = await getConnection().createQueryBuilder('Users', 'u')
          .addSelect('u.Id', 'Id').addSelect('u.FirstName', 'FirstName').addSelect('u.LastName', 'LastName')
          .addSelect('u.EmailId', 'EmailId').addSelect('u.PhoneNo', 'PhoneNo').addSelect('u.isActive', 'isActive')
          .addSelect('ap.FirstName', 'ApproverFirst').addSelect('ap.LastName', 'ApproverLast').addSelect('ap.Id', 'ApproverId')
          .addSelect('um.OrgId', 'OrgId').addSelect('rl.Rolename', 'Role').addSelect('u.RoleId', 'RoleId')
          .leftJoin('UserMapping', 'um', 'u.Id = um.UserId').leftJoin('Users', 'ap', 'ap.Id = um.ApproverId')
          .leftJoin('Roles', 'rl', 'u.RoleId = rl.Id').where('u.RoleId = ' + req.query.RoleId).getRawMany();
      }
      else {
        _output.data = await getConnection().createQueryBuilder('Users', 'u')
          .addSelect('u.Id', 'Id').addSelect('u.FirstName', 'FirstName').addSelect('u.LastName', 'LastName')
          .addSelect('u.EmailId', 'EmailId').addSelect('u.PhoneNo', 'PhoneNo').addSelect('u.isActive', 'isActive')
          .addSelect('ap.FirstName', 'ApproverFirst').addSelect('ap.LastName', 'ApproverLast').addSelect('ap.Id', 'ApproverId')
          .addSelect('um.OrgId', 'OrgId').addSelect('rl.Rolename', 'Role').addSelect('u.RoleId', 'RoleId')
          .leftJoin('UserMapping', 'um', 'u.Id = um.UserId').leftJoin('Users', 'ap', 'ap.Id = um.ApproverId')
          .leftJoin('Roles', 'rl', 'u.RoleId = rl.Id').getRawMany();
      }
      _output.isSuccess = true;
      _output.message = 'Get All Users';
    }
    catch (ex) {
      _output.isSuccess = false;
      _output.data = {};
      _output.message = 'Get failed';
    }
    res.send(_output);
  };

  static GetUserByOrgId = async (req: Request, res: Response) => {
    let _output = new Output();
    try {
      _output.data = await getConnection().createQueryBuilder('Users', 'u')
        .addSelect('u.Id', 'Id').addSelect('u.FirstName', 'FirstName').addSelect('u.LastName', 'LastName')
        .addSelect('u.EmailId', 'EmailId').addSelect('u.PhoneNo', 'PhoneNo').addSelect('u.isActive', 'isActive')
        .addSelect('ap.FirstName', 'ApproverFirst').addSelect('ap.LastName', 'ApproverLast').addSelect('ap.Id', 'ApproverId')
        .addSelect('um.OrgId', 'OrgId').addSelect('rl.Rolename', 'Role').addSelect('u.RoleId', 'RoleId')
        .leftJoin('UserMapping', 'um', 'u.Id = um.UserId').leftJoin('Users', 'ap', 'ap.Id = um.ApproverId')
        .leftJoin('Roles', 'rl', 'u.RoleId = rl.Id').where('um.OrgId =' + req.query.OrgId).getRawMany();
      _output.isSuccess = true;
      _output.message = 'Get All Users';
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
      let { id, salutations, firstName, lastName, roleId, emailId, phoneNo, isActive, password, address, state, country, pincode } = req.body;
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
        userMapping.orgId = req.body.OrgId;
        userMapping.address = address;
        userMapping.state = state;
        userMapping.country = country;
        userMapping.pincode = pincode;
        userMapping.coordinatorId = req.body.coordinatorId;
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
