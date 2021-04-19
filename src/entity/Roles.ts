import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Roles__3214EC070DB0A866", ["id"], { unique: true })
@Entity("Roles", { schema: "dbo" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Rolename", nullable: true, length: 50 })
  rolename: string | null;
}
