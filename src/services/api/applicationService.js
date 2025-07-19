import applicationsData from "../mockData/applications.json";

class ApplicationService {
  constructor() {
    this.applications = [...applicationsData];
  }

  async getAll() {
    await this.delay(400);
    return [...this.applications];
  }

  async getById(id) {
    await this.delay(200);
    const application = this.applications.find(a => a.Id === parseInt(id));
    if (!application) {
      throw new Error("Application not found");
    }
    return { ...application };
  }

  async create(applicationData) {
    await this.delay(600);
    const newApplication = {
      ...applicationData,
      Id: this.getNextId(),
      lodgementDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.applications.push(newApplication);
    return { ...newApplication };
  }

  async update(id, applicationData) {
    await this.delay(500);
    const index = this.applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    this.applications[index] = {
      ...this.applications[index],
      ...applicationData,
      updatedAt: new Date().toISOString()
    };
    return { ...this.applications[index] };
  }

  async delete(id) {
    await this.delay(400);
    const index = this.applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    const deletedApplication = this.applications.splice(index, 1)[0];
    return { ...deletedApplication };
  }

  async getByClientId(clientId) {
    await this.delay(300);
    return this.applications.filter(a => a.clientId === parseInt(clientId));
  }

  getNextId() {
    return Math.max(...this.applications.map(a => a.Id), 0) + 1;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const applicationService = new ApplicationService();