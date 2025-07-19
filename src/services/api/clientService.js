import clientsData from "../mockData/clients.json";

class ClientService {
  constructor() {
    this.clients = [...clientsData];
  }

  async getAll() {
    await this.delay(300);
    return [...this.clients];
  }

  async getById(id) {
    await this.delay(200);
    const client = this.clients.find(c => c.Id === parseInt(id));
    if (!client) {
      throw new Error("Client not found");
    }
    return { ...client };
  }

  async create(clientData) {
    await this.delay(500);
    const newClient = {
      ...clientData,
      Id: this.getNextId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.clients.push(newClient);
    return { ...newClient };
  }

  async update(id, clientData) {
    await this.delay(400);
    const index = this.clients.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Client not found");
    }
    this.clients[index] = {
      ...this.clients[index],
      ...clientData,
      updatedAt: new Date().toISOString()
    };
    return { ...this.clients[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.clients.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Client not found");
    }
    const deletedClient = this.clients.splice(index, 1)[0];
    return { ...deletedClient };
  }

  getNextId() {
    return Math.max(...this.clients.map(c => c.Id), 0) + 1;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const clientService = new ClientService();