import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Users__3214EC071EF23413", ["id"], { unique: true })
@Entity("Users", { schema: "dbo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "FirstName", length: 50 })
  firstName: string;

  @Column("varchar", { name: "LastName", length: 50 })
  lastName: string;

  @Column("int", { name: "RoleId" })
  roleId: number;

  @Column("varchar", { name: "EmailId", length: 100 })
  emailId: string;

  @Column("varchar", { name: "Password", length: 100 })
  password: string;

  @Column("varchar", { name: "PhoneNo", length: 12 })
  phoneNo: string;

  @Column("bit", { name: "isActive" })
  isActive: boolean;

  @Column("varchar", { name: "HashKey", nullable: true, length: 100 })
  hashKey: string | null;

  @Column("date", { name: "CreatedOn", nullable: true })
  createdOn: Date | null;
}
