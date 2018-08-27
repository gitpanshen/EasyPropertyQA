import {browser, element, by, By, $, $$, ExpectedConditions} from 'protractor';
import { ENGINE_METHOD_DIGESTS } from 'constants';
export class Homepage{
  
    brand(){
      return element(by.className('navbar-brand'));
    };
    
    async getBrandText(){
      return await this.brand().getText();
    };

    home(){
      return element(by.linkText('Home'));
    };
    
    async getHomeText(){
      return await this.home().getText();
    };

    async getTableName(){
      return await element(by.tagName('h2')).getText();
    };

    addNewButton(){
      return element(by.buttonText('Add New')); 
    };

    async clickAddNewButton(){
      return await this.addNewButton().click();
    };

    refreshButton(){
      return element(by.tagName('i'));
    };

    async clickRefreshButton(){
      return await this.refreshButton().click();
    };

    propertiesTableHead(){
      return element(by.tagName('table')).element(by.tagName('thead'));
    };

    async getTableHeadName(){
      return await this.propertiesTableHead().all(by.tagName('th')).get(0).getText();
    };

    async getTableHeadAddress(){
      return await this.propertiesTableHead().all(by.tagName('th')).get(1).getText();
    }

    propertiesTableBody(){
      return element(by.tagName('table')).element(by.tagName('tbody'));
    };

    async ithPropertiesName(i){
      let row = this.propertiesTableBody().all(by.tagName('tr')).get(i)
      let name = row.all(by.tagName('td')).get(0)
      return await name.getText();
    };
  
    async ithPropertiesAddress(i){
      let row = this.propertiesTableBody().all(by.tagName('tr')).get(i)
      let address = row.all(by.tagName('td')).get(1)
      return await address.getText();
    };

    ithEditButton(i){
      return this.propertiesTableBody().all(by.tagName('button')).get(i);
    };

    async clickithEditButton(i){
      return await this.ithEditButton(i).click();
    };
    

}
