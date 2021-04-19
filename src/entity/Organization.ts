import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Organiza__3214EC0757618343", ["id"], { unique: true })
@Entity("Organization", { schema: "dbo" })
export class Organization {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Name", length: 100 })
  name: string;

  @Column("varchar", { name: "EmailId", length: 50 })
  emailId: string;

  @Column("varchar", { name: "PhoneNo", length: 12 })
  phoneNo: string;

  @Column("varchar", { name: "Address", length: 150 })
  address: string;

  @Column("varchar", { name: "State", length: 50 })
  state: string;

  @Column("varchar", { name: "City", length: 50 })
  city: string;

  @Column("varchar", { name: "Country", length: 50 })
  country: string;

  @Column("bit", { name: "isActive" })
  isActive: boolean;

  @Column("int", { name: "CreatedBy", nullable: true })
  createdBy: number | null;

  @Column("date", { name: "CreatedOn", nullable: true })
  createdOn: Date | null;
}
