import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Output from "../_models/output";
import { Organization } from "../entity";

class ReportController {
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

}
export default ReportController;
