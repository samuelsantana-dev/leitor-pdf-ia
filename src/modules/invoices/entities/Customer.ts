import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { Invoice } from "./InVoice";

@Entity("customers")
export class Customer {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  clientNumber!: string;

  @OneToMany(() => Invoice, invoice => invoice.customer)
  invoices!: Invoice[];
}