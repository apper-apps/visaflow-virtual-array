import documentsData from "../mockData/documents.json";

class DocumentService {
  constructor() {
    this.documents = [...documentsData];
  }

  async getAll() {
    await this.delay(350);
    return [...this.documents];
  }

  async getById(id) {
    await this.delay(200);
    const document = this.documents.find(d => d.Id === parseInt(id));
    if (!document) {
      throw new Error("Document not found");
    }
    return { ...document };
  }

  async create(documentData) {
    await this.delay(500);
    const newDocument = {
      ...documentData,
      Id: this.getNextId(),
      uploadDate: new Date().toISOString(),
      verified: false
    };
    this.documents.push(newDocument);
    return { ...newDocument };
  }

  async update(id, documentData) {
    await this.delay(400);
    const index = this.documents.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Document not found");
    }
    this.documents[index] = {
      ...this.documents[index],
      ...documentData
    };
    return { ...this.documents[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.documents.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Document not found");
    }
    const deletedDocument = this.documents.splice(index, 1)[0];
    return { ...deletedDocument };
  }

  async getByApplicationId(applicationId) {
    await this.delay(250);
    return this.documents.filter(d => d.applicationId === parseInt(applicationId));
  }

  getNextId() {
    return Math.max(...this.documents.map(d => d.Id), 0) + 1;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const documentService = new DocumentService();