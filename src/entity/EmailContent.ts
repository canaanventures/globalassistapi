import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK_EmailContent", ["id"], { unique: true })
@Entity("EmailContent", { schema: "dbo" })
export class EmailContent {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Category", length: 50 })
  category: string;

  @Column("varchar", { name: "EmailContent", length: 500 })
  emailContent: string;
}
