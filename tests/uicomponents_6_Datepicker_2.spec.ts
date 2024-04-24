import {expect, test } from '@playwright/test'
import { EPERM } from 'constants'
import { tooltip } from 'leaflet'
import { execPath } from 'process'
import { delay } from 'rxjs-compat/operator/delay'

test.beforeEach(async({page})=>{

    await page.goto('/')

})

test.describe('Form Layouts page', () =>{

        test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

})

test ('datePicker',async({page})=>{  // This script will select the date 
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputFiled= page.getByPlaceholder('Form Picker')
    await calendarInputFiled.click()


    let date= new Date()
    date.setDate(date.getDate() + 285)
    const expectedDate=date.getDate().toString()
    const expectedMonthShot= date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong= date.toLocaleString('En-US', {month: 'long'})
    const expectedYear= date.getFullYear()
    const dateToAssert= `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear= await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear= ` ${expectedMonthLong} ${expectedYear}`
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){

        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear= await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputFiled).toHaveValue(dateToAssert)


})

      


