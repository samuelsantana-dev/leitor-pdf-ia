import { AppDataSource } from "@/shared/infra/database/data-source";
import { Customer } from "../entities/Customer";

export class CustomersRepository {

  private repository =
    AppDataSource.getRepository(Customer);

  async findOrCreate(
    clientNumber: string,
    installationNumber?: string
  ): Promise<Customer> {

    let customer = await this.repository.findOne({
      where: { clientNumber }
    });

    if (!customer) {
      customer = this.repository.create({
        clientNumber,
        installationNumber
      });

      await this.repository.save(customer);
    }

    return customer;
  }

  async create(data: Partial<Customer>) {
    const customer = this.repository.create(data);
    return this.repository.save(customer);
  }

  async findByClientNumber(clientNumber: string) {
    return this.repository.findOne({
      where: { clientNumber }
    });
  }
}