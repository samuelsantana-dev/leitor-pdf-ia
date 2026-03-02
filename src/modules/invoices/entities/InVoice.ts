import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Index
} from "typeorm";
import { Customer } from "./Customer";

@Entity("invoices")
@Index(["referenceMonth"])
export class Invoice {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Customer, c => c.invoices)
  @JoinColumn()
  customer!: Customer;

  @Column()
  referenceMonth!: string;

  // Energia elétrica
  @Column("decimal", { precision: 10, scale: 2 })
  electricEnergyKwh!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  electricEnergyAmount!: number;

  // SCEEE
  @Column("decimal", { precision: 10, scale: 2 })
  sceeeEnergyKwh!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  sceeeEnergyAmount!: number;

  // GD
  @Column("decimal", { precision: 10, scale: 2 })
  compensatedEnergyKwh!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  compensatedEnergyAmount!: number;

  // CIP
  @Column("decimal", { precision: 10, scale: 2 })
  publicLightingContribution!: number;

  // Calculados
  @Column("decimal", { precision: 10, scale: 2 })
  totalConsumptionKwh!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  totalAmountWithoutGD!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  gdSavingsAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}