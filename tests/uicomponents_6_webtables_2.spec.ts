import {expect, test } from '@playwright/test'
import { EPERM } from 'constants'
import { tooltip } from 'leaflet'
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


test('web tables', async({page})=>{

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1: get the row by any test in this row
      const targetRow=page.getByRole('row',{name: "twitter@outlook.com"})
      await targetRow.locator('.nb-edit').click()
      await page.locator('input-editor').getByPlaceholder('Age').clear()
      await page.locator('input-editor').getByPlaceholder('Age').fill('35')
      await page.locator('.nb-checkmark').click()
     
   // 2: get the row based on the value in the specific columm

   await page.locator('.ng2-smart-page-link').getByText('2').click()
   const targetRowByID=page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
   await targetRowByID.locator('.nb-edit').click()
   await page.locator('input-editor').getByPlaceholder('E-mail').clear()
   await page.locator('input-editor').getByPlaceholder('E-mail').fill('cs@test.com')
   await page.locator('.nb-checkmark').click()
   await expect(targetRowByID.locator('td').nth(5)).toHaveText('cs@test.com')
    
 //3: Test Filter of the table
    
        const ages= ["20", "30", "40", "200"] 

        for(let age of ages){

            await page.locator('input-filter').getByPlaceholder('Age').clear()
            await page.locator('input-filter').getByPlaceholder('Age').fill(age)
            await page.waitForTimeout(500)
            const ageRows= page.locator('tbody tr')

            for (let row of await ageRows.all()){
                const  cellValue = await row.locator('td').last().textContent()

                if (age=="200"){

                    expect(await page.getByRole('table').textContent()).toContain('No data found')
                } else{
                    expect(cellValue).toEqual(age)

                    }
            }

     }
     
      
})

