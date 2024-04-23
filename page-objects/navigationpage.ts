import {  Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class NavigationPage extends HelperBase{

    //readonly page: Page     [not needed as we use extends the HelperBase class]
    readonly fromLayoutMenuItem: Locator // Playwright recommend to not use the locater inside the method, so we are declaring it here and using them in below functions 
    readonly datePickerMenuItem: Locator // this can also be overhead when we have multiple methods and have number of locator to use, so in that case ealier approach is much better 
    readonly smartTabMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator



    constructor(page: Page){

        super(page)  // this is use because of extends (inheritance concept)
        //this.page= page   [this is not needed now]
        this.fromLayoutMenuItem= page.getByText('Form Layouts') // assigning the value to the locator 
        this.datePickerMenuItem= page.getByText('Datepicker')
        this.smartTabMenuItem= page.getByText('Smart Table')
        this.toastrMenuItem= page.getByText('Toastr')
        this.tooltipMenuItem= page.getByText('Tooltip')


    }

    async formLayoutPage(){

        // we dont need below line as we the method to check if the menu is expended or not  
        //await this.page.getByText('Forms').click()

        await this.selectGroupMenuItem('Forms') // we use this now 

        // this line is replaced by the field name by the method used in constructior : await this.page.getByText('Form Layouts').click()

        await this.fromLayoutMenuItem.click()

        await  this.waitForNumerofSeconds(2)
        
    }

    async datepickerPage(){

      //await this.page.getByText('Forms').click()

      await this.selectGroupMenuItem('Forms') // we use this now same as above
      //await this.page.waitForTimeout(1000) 
      await this.datePickerMenuItem.click()


    }

    async smartTablePage(){
    
        //await this.page.getByText('Tables & Data').click()
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTabMenuItem.click()


    }

    async toastrPage(){

      //await this.page.getByText('Modal & Overlays').click()
      await this.selectGroupMenuItem('Modal & Overlays') 
      await this.toastrMenuItem.click()
    
 
    }

    async tooltipPage(){

      //await this.page.getByText('Modal & Overlays').click()
      await this.selectGroupMenuItem('Modal & Overlays') 
      await this.tooltipMenuItem.click()


    }

    private async selectGroupMenuItem(groupItemTile: string){

        const groupMenuItem = this.page.getByTitle(groupItemTile)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
        await groupMenuItem.click()
    }
}