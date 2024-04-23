import { Page, expect } from "@playwright/test"
import { NavigationPage } from '../page-objects/navigationpage'
import { FormLayoutsPage } from '../page-objects/formlayoutspage'
import { Datepickerpage } from '../page-objects/datePickerPage'

export class PageManager{

    private readonly page: Page
    private readonly navigatePage: NavigationPage
    private readonly formLayoutPage: FormLayoutsPage
    private readonly datePickerPage: Datepickerpage

    constructor(page: Page){
        this.page= page
        this.navigatePage= new NavigationPage(this.page)
        this.formLayoutPage= new FormLayoutsPage(this.page)
        this.datePickerPage= new Datepickerpage(this.page)

    }

    navigateTo(){
        return this.navigatePage
    }

    onFormLayoutPage(){
      return this.formLayoutPage

    }

    onDatePickerPage(){
        return this.datePickerPage
    }


}