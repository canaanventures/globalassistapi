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

  @Column("varchar", { name: "Address", nullable: true, length: 150 })
  address: string | null;

  @Column("varchar", { name: "State", nullable: true, length: 50 })
  state: string | null;

  @Column("varchar", { name: "Country", nullable: true, length: 50 })
  country: string | null;

  @Column("varchar", { name: "Pincode", nullable: true, length: 10 })
  pincode: string | null;

  @Column("int", { name: "CoordinatorId", nullable: true })
  coordinatorId: number | null;

  @Column("int", { name: "SupervisorId", nullable: true })
  supervisorId: number | null;

  @Column("int", { name: "UpdatedBy", nullable: true })
  updatedBy: number | null;

  @Column("date", { name: "UpdatedOn", nullable: true })
  updatedOn: Date | null;
}
