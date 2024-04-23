import {  Locator, Page } from "@playwright/test";

export class Navigationpage_OldApproach{

    readonly page: Page
    
    constructor(page:Page){
        this.page=page
    }
    
   

    async formLayoutPage(){

      await this.selectGroupMenuItem('Forms') // we use this now 
      await this.page.getByText('Form Layouts').click()
        
    }

    async datepickerPage(){

     await this.selectGroupMenuItem('Forms') 
      await this.page.getByText('DatePicker').click()


    }

    async smartTablePage(){
    
        
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()


    }

    async toastrPage(){

      await this.selectGroupMenuItem('Modal & Overlays') 
      await this.page.getByText('Toster').click()
    
 
    }

    async tooltipPage(){

      //await this.page.getByText('Modal & Overlays').click()
      await this.selectGroupMenuItem('Modal & Overlays') 
      await this.page.getByText('Tooltip').click()


    }

    private async selectGroupMenuItem(groupItemTile: string){

        const groupMenuItem = this.page.getByTitle(groupItemTile)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
        await groupMenuItem.click()
    }
}