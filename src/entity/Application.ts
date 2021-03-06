import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_Application", ["id"], { unique: true })
@Entity("Application", { schema: "dbo" })
export class Application {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "NoOfVillages" })
  noOfVillages: number;

  @Column("int", { name: "NoOfPersonHeard" })
  noOfPersonHeard: number;

  @Column("int", { name: "NoOfMen" })
  noOfMen: number;

  @Column("int", { name: "NoOfWomen" })
  noOfWomen: number;

  @Column("int", { name: "NoOfChildren" })
  noOfChildren: number;

  @Column("int", { name: "NoOfNewGroup" })
  noOfNewGroup: number;

  @Column("int", { name: "NoOfLevel1Leader", nullable: true })
  noOfLevel1Leader: number | null;

  @Column("int", { name: "NoOfLevel2Leader", nullable: true })
  noOfLevel2Leader: number | null;

  @Column("int", { name: "NoOfLevel3Leader", nullable: true })
  noOfLevel3Leader: number | null;

  @Column("int", { name: "NoOfVolunteers" })
  noOfVolunteers: number;

  @Column("int", { name: "NoOfSocialProjects", nullable: true })
  noOfSocialProjects: number | null;

  @Column("int", { name: "NoOfBeneficiaries", nullable: true })
  noOfBeneficiaries: number | null;

  @Column("varchar", { name: "isGoodPoints", length: 20 })
  isGoodPoints: string;

  @Column("varchar", { name: "GoodPoints", nullable: true, length: 200 })
  goodPoints: string | null;

  @Column("varchar", { name: "isConcernReport", length: 20 })
  isConcernReport: string;

  @Column("varchar", { name: "ConcernPoints", nullable: true, length: 200 })
  concernPoints: string | null;

  @Column("varchar", { name: "isPhotoShared", length: 20 })
  isPhotoShared: string;

  @Column("varchar", { name: "isVideoShared", nullable: true, length: 20 })
  isVideoShared: string | null;

  @Column("bit", { name: "SupervisorApproval", nullable: true })
  supervisorApproval: boolean | null;

  @Column("varchar", { name: "SupervisorRemarks", nullable: true, length: 200 })
  supervisorRemarks: string | null;

  @Column("bit", { name: "CoordinatorApproval", nullable: true })
  coordinatorApproval: boolean | null;

  @Column("varchar", { name: "CoordinatorRemarks", nullable: true, length: 200 })
  coordinatorRemarks: string | null;

  @Column("bit", { name: "SponserApproval", nullable: true })
  sponserApproval: boolean | null;

  @Column("varchar", { name: "SponserRemarks", nullable: true, length: 200 })
  sponserRemarks: string | null;

  @Column("varchar", { name: "OverallStatus", nullable: true, length: 20 })
  overallStatus: string | null;

  @Column("varchar", { name: "AppMonth", length: 50 })
  appMonth: string;

  @Column("date", { name: "PostedOn" })
  postedOn: Date;

  @Column("int", { name: "PostedBy" })
  postedBy: number;

  @Column("date", { name: "UpdatedOn", nullable: true })
  updatedOn: Date | null;

  @Column("int", { name: "UpdatedBy", nullable: true })
  updatedBy: number | null;
}
