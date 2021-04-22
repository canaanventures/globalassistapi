import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import Output from "../_models/output";
import { Application } from "../entity";

class ReportController {
    static CreateApplication = async (req: Request, res: Response) => {
        let _output = new Output();
        let { id, noOfVillages, noOfPersonHeard, noOfMen, noOfWomen, noOfChildren, noOfNewGroup, noOfLevel1Leader,
            noOfLevel2Leader, noOfLevel3Leader, noOfVolunteers, noOfSocialProjects, noOfBeneficiaries, isGoodPoints,
            goodPoints, isConcernReport, concernPoints, isPhotoShared, isVideoShared, userId, appMonth } = req.body;
        const appRepository = await getRepository(Application);
        let application: Application;
        try {
            if (id == 0) {
                application = new Application();
                application.postedOn = new Date();
                application.postedBy = userId;
            }
            else
                application = await appRepository.findOne({ where: { id: id } });

            application.noOfVillages = noOfVillages;
            application.noOfPersonHeard = noOfPersonHeard;
            application.noOfMen = noOfMen;
            application.noOfWomen = noOfWomen;
            application.noOfChildren = noOfChildren;
            application.noOfNewGroup = noOfNewGroup;
            application.noOfLevel1Leader = noOfLevel1Leader;
            application.noOfLevel2Leader = noOfLevel2Leader;
            application.noOfLevel3Leader = noOfLevel3Leader;
            application.noOfVolunteers = noOfVolunteers;
            application.noOfSocialProjects = noOfSocialProjects;
            application.noOfBeneficiaries = noOfBeneficiaries;
            application.isGoodPoints = isGoodPoints;
            application.goodPoints = goodPoints;
            application.isConcernReport = isConcernReport;
            application.concernPoints = concernPoints;
            application.isPhotoShared = isPhotoShared;
            application.isVideoShared = isVideoShared;
            application.appMonth = appMonth;
            application.supervisorApproval = false;
            application.coordinatorApproval = false;
            application.updatedBy = userId;
            application.updatedOn = new Date();

            await appRepository.save(application);
            _output.data = {}
            _output.isSuccess = true;
            _output.message = 'Report has been submitted';
        }
        catch (ex) {
            _output.isSuccess = false;
            _output.data = ex;
            _output.message = 'Failed to sumbit the report';
        }
        res.send(_output);
    };

    static GetReports = async (req: Request, res: Response) => {
        let _output = new Output();
        try {
            let Query = `execute GetReportsDetails ${req.query.OperationId}, ${req.query.ReportId ? req.query.ReportId : 'null'}, ${req.query.PostedBy ? req.query.PostedBy : 'null'},${req.query.CoordinatorId ? req.query.CoordinatorId : 'null'}, ${req.query.SupervisorId ? req.query.SupervisorId : 'null'}, ${req.query.AppMonth ? req.query.AppMonth : 'null'}, ${req.query.OrgId ? req.query.OrgId : 'null'}`;
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

    static ApproveReports = async (req: Request, res: Response) => {
        let _output = new Output();
        let { RoleId, ReportId, isApproved, Remarks } = req.body;
        const appRepository = await getRepository(Application);
        let application = await appRepository.findOne({ where: { id: ReportId } });
        try {
            if (RoleId == 3) {
                application.coordinatorApproval = isApproved;
                application.coordinatorRemarks = Remarks;
            }
            else if (RoleId == 4) {
                application.supervisorApproval = isApproved;
                application.supervisorRemarks = Remarks;
            }

            await appRepository.save(application);
            _output.data = {}
            _output.isSuccess = true;
            _output.message = isApproved ? 'Request as been approved' : 'Request has been rejected';
        }
        catch (ex) {
            _output.isSuccess = false;
            _output.data = {};
            _output.message = 'Failed to do the process';
        }
        res.send(_output);
    };

}
export default ReportController;
