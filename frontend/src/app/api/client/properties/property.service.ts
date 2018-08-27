import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { APIConfig } from '../api.config';

const PROPERTIES_PATH = `${APIConfig.BASE_API_PATH}/api/properties`;

export interface Unit {
  number: string;
  floor: number;
  rent: number;
  vacant?: boolean;
}

export interface Property {
  _id?: string; // Assigned automatically by datastore
  name: string;
  address: string;
  units: Unit[];
}


@Injectable()
export class PropertyService {

  constructor(
    private http: HttpClient
  ) { }

  public queryProperties(
    query: any = {},
    limit: number = 10,
    offset: number = 0
  ): Observable<Property[]> {
    return this.http.get<Property[]>(PROPERTIES_PATH, {
      params: {
        query: JSON.stringify(query),
        limit: `${limit}`,
        offset: `${offset}`
      }
    });
  }

  public insertProperty(property: Property): Observable<any> {
    return this.http.post(PROPERTIES_PATH, property);
  }

  public updateProperty(property: Property): Observable<any> {
    return this.http.put(PROPERTIES_PATH, property);
  }
}
