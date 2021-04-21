import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Output from "../_models/output";
import { Organization } from "../entity";

class OrgController {
  static GetAllOrganization = async (req: Request, res: Response) => {
    let _output = new Output();
    try {
      const orgRepository = await getRepository(Organization);
      if (req.query.OrgId && req.query.OrgId !== "0") {
        _output.data = await orgRepository.findOne({ where: { id: req.query.OrgId } });
      }
      else {
        _output.data = await orgRepository.find();
      }
      _output.isSuccess = true;
      _output.message = 'Get All Organization';
    }
    catch (ex) {
      _output.isSuccess = false;
      _output.data = ex;
      _output.message = 'Get failed';
    }
    res.send(_output);
  };

  static AddOrganization = async (req: Request, res: Response) => {
    let _output = new Output();
    try {
      let { id, name, emailId, phoneNo, address, state, city, country, isActive, userId } = req.body;
      const orgRepository = await getRepository(Organization);
      let organization: Organization;

      if (id !== 0)
        organization = await orgRepository.findOne({ where: { id: id } });
      else
        organization = new Organization();

      organization.name = name;
      organization.emailId = emailId;
      organization.phoneNo = phoneNo;
      organization.address = address;
      organization.state = state;
      organization.city = city;
      organization.country = country;
      organization.isActive = isActive;
      organization.createdBy = userId;
      organization.createdOn = new Date();

      await orgRepository.save(organization).then(() => {
        _output.data = {};
        _output.isSuccess = true;
        _output.message = `Organization ${id == 0 ? 'added' : 'updated'} successfully`;
      })
    }
    catch (ex) {
      _output.isSuccess = false;
      _output.data = ex;
      _output.message = `Failed to ${req.body.id == 0 ? 'add' : 'update'} organization`;
    }
    res.send(_output);
  };
}
export default OrgController;
