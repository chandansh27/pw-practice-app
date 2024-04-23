import {expect, test } from '@playwright/test'
import { EPERM } from 'constants'
import { tooltip } from 'leaflet'
import { execPath } from 'process'
import { delay } from 'rxjs-compat/operator/delay'

test.beforeEach(async({page})=>{

    await page.goto('http://localhost:4200/')

})

test.describe('Form Layouts page', () =>{

        test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

})

test ('datePicker',async({page})=>{
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputFiled=page.getByPlaceholder('Form Picker')
    await calendarInputFiled.click()

    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1',{exact: true}).click()
    await expect(calendarInputFiled).toHaveValue('Mar 1, 2024')


})

      


