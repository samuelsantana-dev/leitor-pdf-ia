import { AppDataSource } from "@/shared/infra/database/data-source";
import { CustomersRepository } from "./CustomersRepository";
import { Invoice } from "../entities/InVoice";

export class InvoicesRepository {

  private repository =
    AppDataSource.getRepository(Invoice);

  async create(data: Partial<Invoice>) {
    const invoice = this.repository.create(data);
    return this.repository.save(invoice);
  }

  async findByCustomer(clientNumber: string) {
    return this.repository
      .createQueryBuilder("invoice")
      .leftJoinAndSelect("invoice.customer", "customer")
      .where("customer.clientNumber = :clientNumber", {
        clientNumber
      })
      .getMany();
  }
}