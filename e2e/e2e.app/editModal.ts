import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';

export class EditModal{
    
    async getModalHeadText(){
       return await element(by.className('modal-header')).getText();
    };

    cancelButton(){
       return element(by.buttonText('Cancel')); 
    };

    async clickCancelButton(){
       return await this.cancelButton().click(); 
    };

    okButton(){
       return element(by.buttonText('OK'));
    };

    async clickOKButton(){
       return await this.okButton().click();
    };

    nameInputBox(){
       return element(by.className('modal-body')).all(by.tagName('input')).get(0);
    };

    async setNameInputBox(name:string){
       return await this.nameInputBox().sendKeys(name);
    };

    async clearNameInputBox(){
        return await this.nameInputBox().clear();
     };

    addressInputBox(){
        return element(by.className('modal-body')).all(by.tagName('input')).get(1);
    };

    async setAddressInputBox(address:string){
        return await this.addressInputBox().sendKeys(address);
    };

    async clearAddressInputBox(){
        return await this.addressInputBox().clear();
    };

    nameLabel(){
        return element(by.className('modal-body')).all(by.tagName('label')).get(0); 
    };

    addressLabel(){
        return element(by.className('modal-body')).all(by.tagName('label')).get(1); 
    };

    async getNameInputBoxvalue(){
        return await this.nameInputBox().getAttribute('value');
    };

    async getAddressInputBoxvalue(){
        return await this.addressInputBox().getAttribute('value');
    };

}