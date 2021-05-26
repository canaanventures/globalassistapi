import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import Output from "../_models/output";
import { Application } from "../entity";

class ReportController {
    static CreateApplication = async (req: Request, res: Response) => {
        let _output = new Output();
        let { Id, NoOfVillages, NoOfPersonHeard, NoOfMen, NoOfWomen, NoOfChildren, NoOfNewGroup, NoOfLevel1Leader,
            NoOfLevel2Leader, NoOfLevel3Leader, NoOfVolunteers, NoOfSocialProjects, NoOfBeneficiaries, isGoodPoints,
            GoodPoints, isConcernReport, ConcernPoints, isPhotoShared, isVideoShared, UserId, AppMonth, SupervisorRemarks, CoordinatorRemarks, SponserRemarks } = req.body;
        const appRepository = await getRepository(Application);
        let application: Application;
        try {
            if (Id == 0) {
                application = new Application();
                application.postedOn = new Date();
                application.postedBy = UserId;
            }
            else {
                application = await appRepository.findOne({ where: { id: Id } });
                application.supervisorRemarks = SupervisorRemarks;
                application.coordinatorRemarks = CoordinatorRemarks;
                application.sponserRemarks = SponserRemarks;
            }

            application.noOfVillages = NoOfVillages;
            application.noOfPersonHeard = NoOfPersonHeard;
            application.noOfMen = NoOfMen;
            application.noOfWomen = NoOfWomen;
            application.noOfChildren = NoOfChildren;
            application.noOfNewGroup = NoOfNewGroup;
            application.noOfLevel1Leader = NoOfLevel1Leader;
            application.noOfLevel2Leader = NoOfLevel2Leader;
            application.noOfLevel3Leader = NoOfLevel3Leader;
            application.noOfVolunteers = NoOfVolunteers;
            application.noOfSocialProjects = NoOfSocialProjects;
            application.noOfBeneficiaries = NoOfBeneficiaries;
            application.isGoodPoints = isGoodPoints;
            application.goodPoints = GoodPoints;
            application.isConcernReport = isConcernReport;
            application.concernPoints = ConcernPoints;
            application.isPhotoShared = isPhotoShared;
            application.isVideoShared = isVideoShared;
            application.appMonth = AppMonth;
            application.supervisorApproval = false;
            application.coordinatorApproval = false;
            application.updatedBy = UserId;
            application.overallStatus = "Approval Pending";
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
        let { RoleId, ReportId, isApproved, Remarks, userId } = req.body;
        const appRepository = await getRepository(Application);
        let application = await appRepository.findOne({ where: { id: ReportId } });
        try {
            let Query = ``;
            if (RoleId == 3) {
                application.coordinatorApproval = isApproved;
                application.coordinatorRemarks = Remarks;
                if (!isApproved)
                    application.overallStatus = 'Rejected';
                else
                    application.overallStatus = 'Approved';
                Query = `execute GetReportsDetails 5, null, null,${userId}, null, null, null`;
            }
            else if (RoleId == 4) {
                application.supervisorApproval = isApproved;
                application.supervisorRemarks = Remarks;
                if (!isApproved)
                    application.overallStatus = 'Rejected';
                Query = `execute GetReportsDetails 6, null, null,null, ${userId}, null, null`;
            }

            await appRepository.save(application);
            _output.data = await getConnection().query(Query);
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

    static GetOverallReports = async (req: Request, res: Response) => {
        let _output = new Output();
        try {
            let Query = `execute GetOverallReports ${req.query.OperationId}, ${req.query.ReportId ? req.query.ReportId : 'null'},${req.query.CoordinatorId ? req.query.CoordinatorId : 'null'}, ${req.query.SupervisorId ? req.query.SupervisorId : 'null'}`;
            _output.data = await getConnection().query(Query);
            _output.isSuccess = true;
            _output.message = 'Get Reports success';
        }
        catch (ex) {
            _output.isSuccess = false;
            _output.data = {};
            _output.message = 'Get failed';
        }
        res.send(_output);
    };


    static GetGraphData = async (req: Request, res: Response) => {
        let _output = new Output();
        try {
            let date = new Date();
            let data = await getConnection().query(`execute GetGraphData ${req.query.OperationId},${req.query.CoordinatorId ? req.query.CoordinatorId : 'null'}, ${req.query.SupervisorId ? req.query.SupervisorId : 'null'}`);
            var months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            data.sort(function (a, b) {
                return months.indexOf(a.Month)
                    - months.indexOf(b.Month);
            });
            let Result = {
                BarData: data.map(a => a.Counts),
                ProgressData: await getConnection().query(`execute GetProgressData ${req.query.OperationId},${req.query.CoordinatorId ? req.query.CoordinatorId : 'null'}, ${req.query.SupervisorId ? req.query.SupervisorId : 'null'}, ${req.query.OrgId ? req.query.OrgId : 'null'}`)
            }
            _output.data = Result;
            _output.isSuccess = true;
            _output.message = 'Get Reports success';
        }
        catch (ex) {
            _output.isSuccess = false;
            _output.data = {};
            _output.message = 'Get failed';
        }
        res.send(_output);
    };

}
export default ReportController;
