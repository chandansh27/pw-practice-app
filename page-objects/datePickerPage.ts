import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class Datepickerpage extends HelperBase{

    //private readonly page: Page      [becuse of concept of inheritance we do not need this now ]

    constructor(page: Page){

        //this.page= page

        super(page)
    }

    async selectCommanDatePickerDateFromToday(numberofDaysFromToday: number){
        const calendarInputFiled= this.page.getByPlaceholder('Form Picker')
        await calendarInputFiled.click()

       const dateToAssert=  await this.selectDateInTheCalander(numberofDaysFromToday) 
       await expect(calendarInputFiled).toHaveValue(dateToAssert)

    }

    async selectDatePickerWithrangeFromToday(startDateFromToday: number, endDayFromToday: number){

        const calendarInputFiled= this.page.getByPlaceholder('Range Picker')
        await calendarInputFiled.click()

        const dateToAssertStart=  await this.selectDateInTheCalander(startDateFromToday) 
        const dateToAssertEnd=  await this.selectDateInTheCalander(endDayFromToday) 
        const dateToAssert= `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputFiled).toHaveValue(dateToAssert)

    }

    private async selectDateInTheCalander(numberofDaysFromToday: number){

        let date= new Date()
        date.setDate(date.getDate() + numberofDaysFromToday)
        const expectedDate=date.getDate().toString()
        const expectedMonthShot= date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong= date.toLocaleString('En-US', {month: 'long'})
        const expectedYear= date.getFullYear()
        const dateToAssert= `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear= await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear= ` ${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
    
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear= await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()

        return dateToAssert

    }
}