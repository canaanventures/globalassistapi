import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__UserMapp__3214EC07AAB3ED8D", ["id"], { unique: true })
@Entity("UserMapping", { schema: "dbo" })
export class UserMapping {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "UserId" })
  userId: number;

  @Column("int", { name: "OrgId" })
  orgId: number;

  @Column("int", { name: "ApproverId", nullable: true })
  approverId: number | null;

  @Column("int", { name: "UpdatedBy", nullable: true })
  updatedBy: number | null;

  @Column("date", { name: "UpdatedOn", nullable: true })
  updatedOn: Date | null;
}
