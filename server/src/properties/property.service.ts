import { PropertyDAO } from './property.dao';
import { Property } from './property.model';

export interface InsertPropertyResponse {
  insertedId: string;
}

export class PropertyService {

  constructor(
    private dao = new PropertyDAO()
  ) { }

  public listProperties(
    query: any = {},
    offset: number = 0,
    limit: number = 10
  ): Promise<Property[]> {
    return this.dao.query(query, offset, limit);
  }

  public async insertProperty(
    property: Partial<Property>
  ): Promise<InsertPropertyResponse> {
    if (property._id) {
      throw new Error(`Error inserting property. _id must not be specified`);
    }

    if (!property.address || !property.name) {
      throw new Error(`Property address and name must be specified`);
    }

    const insertedId = await this.dao.insert(property as Property);
    return {
      insertedId: insertedId
    }
  }

  public async updateProperty(
    property: Property
  ): Promise<InsertPropertyResponse> {
    if (!property._id) {
      throw new Error(`Error updating property. _id must be specified`);
    }

    if (!property.address || !property.name) {
      throw new Error(`Property address and name must be specified`);
    }

    const insertedId = await this.dao.update(property);
    return {
      insertedId: insertedId
    }
  }

}
