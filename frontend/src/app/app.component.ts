import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

import { Property, PropertyService } from './api/client/properties/property.service';
import { PropertyEditorModalComponent } from './edit-property.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Easy Property Management';

  properties: Property[] = [];

  constructor(
    private propertyService: PropertyService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.queryProperties()
      .subscribe(properties => {
        this.properties = properties;
      });
  }

  addNewPropertyClicked() {
    PropertyEditorModalComponent.show(this.modalService, {
      savePropertyCallback: (_property: Property) => this.savePropertyCallback(_property)
    });
  }

  reloadClicked() {
    this.loadProperties();
  }

  editPropertyClicked(property: Property) {
    PropertyEditorModalComponent.show(this.modalService, {
      property: property,
      savePropertyCallback: (_property: Property) => this.savePropertyCallback(_property)
    });
  }

  savePropertyCallback(property: Property): Observable<any> {
    const saveResult$ = !property._id ?
      this.propertyService.insertProperty(property) :
      this.propertyService.updateProperty(property);
    return saveResult$.pipe(
      tap(() => {
        console.log('Succesfully saved property', property);
        this.loadProperties();
      })
    );
  }
}
