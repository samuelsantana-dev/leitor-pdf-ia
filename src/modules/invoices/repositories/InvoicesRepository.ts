import { AppDataSource } from "@/shared/infra/database/data-source";
import { Invoice } from "../entities/InVoice";
import { Repository } from "typeorm";

export class InvoicesRepository {
  private repository: Repository<Invoice>;

  constructor() {
    this.repository = AppDataSource.getRepository(Invoice);
  }

  async create(data: Partial<Invoice>): Promise<Invoice> {
    const invoice = this.repository.create(data);
    return await this.repository.save(invoice);
  }
}