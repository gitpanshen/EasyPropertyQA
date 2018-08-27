import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';

import { Property } from './api/client/properties/property.service';
import { UIContext } from './ui-context';

export interface PropertyEditorModalRequest {
  property?: Property;
  savePropertyCallback: (property: Property) => Observable<any>;
}

@Component({
  selector: 'app-property-editor-modal',
  template: `
  <div class="modal-header">Edit Property</div>
  <div class="modal-body">
    <div class="form-horizontal">
      <div class="row form-group">
        <div class="col-xs-4">
        <label>Name</label>
        </div>
        <div class="col-xs-8">
          <input type="text" class="form-control" [formControl]="formGroup.controls['name']">
        </div>
      </div>
      <div class="row form-group">
        <div class="col-xs-4">
        <label>Address</label>
        </div>
        <div class="col-xs-8">
          <input type="text" class="form-control" [formControl]="formGroup.controls['address']">
        </div>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button class="btn btn-default" (click)="cancelClicked()">Cancel</button>
    <button class="btn btn-primary" (click)="okClicked()">OK</button>
  </div>
  `
})
export class PropertyEditorModalComponent implements OnInit {

  @Input() property: Property;
  @Input() savePropertyCallback: (property: Property) => Observable<any>;
  formGroup: FormGroup;

  public static show(modalService: BsModalService, request: PropertyEditorModalRequest) {
    modalService.show(PropertyEditorModalComponent, { initialState: request });
  }

  constructor(
    private fb: FormBuilder,
    private modalRef: BsModalRef,
    private uiContext: UIContext,
  ) {
  }

  ngOnInit() {
    this.initData();
    this.initFormGroup();
  }

  private initData() {
    if (!this.property) {
      this.property = {
        name: '',
        address: '',
        units: []
      };
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      name: [''],
      address: ['']
    });
    this.formGroup.setValue({
      name: this.property.name,
      address: this.property.address
    });
  }

  private updateProperty() {
    const data = this.formGroup.value;
    this.property.name = data.name;
    this.property.address = data.address;
  }

  cancelClicked() {
    this.hide();
  }

  okClicked() {
    this.updateProperty();
    this.savePropertyCallback(this.property).subscribe(
      () => {
        this.hide();
      },
      (err) => this.uiContext.handleError(err));
  }

  private hide() {
    this.modalRef.hide();
  }
}
