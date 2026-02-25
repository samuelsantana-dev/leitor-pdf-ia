import "reflect-metadata";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  clientNumber!: string;

  @Column({ type: "varchar" })
  referenceMonth!: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  electricEnergyKwh!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  electricEnergyAmount!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  sceeeEnergyKwh!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  sceeeEnergyAmount!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  compensatedEnergyKwh!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  compensatedEnergyAmount!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  publicLightingContribution!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  totalConsumptionKwh!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  totalAmountWithoutGD!: number;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  gdSavingsAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}