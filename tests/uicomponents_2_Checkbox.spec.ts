import {expect, test } from '@playwright/test'
import { EPERM } from 'constants'
import { delay } from 'rxjs-compat/operator/delay'

test.beforeEach(async({page})=>{

    await page.goto('http://localhost:4200/')

})

test.describe('Form Layouts page', () =>{

        test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

// How to find the Radio Button : Chapter :34 : for Section UI components

test('radio Button', async({page})=>{

    const usingTheGridForm=page.locator('nb-card',{hasText: "Using the Grid"})
    //await usingTheGridForm.getByLabel('Option 1').check({force:true})

    await usingTheGridForm.getByRole('radio',{name: "Option 1"}).check({force:true}) // another way using get by role
    const radiostatus= await usingTheGridForm.getByRole('radio',({name:"Option 1"})).isChecked()
    expect(radiostatus).toBeTruthy()
    await expect(usingTheGridForm.getByRole('radio',{name: "Option 1"})).toBeChecked()

    // below 2nd lines will make the Radio option 1 deselected as set falsy and 
    await usingTheGridForm.getByRole('radio',{name:"Option 2"}).check({force:true})
    expect(await usingTheGridForm.getByRole('radio',{name:"Option 1"}).isChecked()).toBeFalsy()
    expect(await usingTheGridForm.getByRole('radio',{name:"Option 2"}).isChecked()).toBeTruthy()

})

})

test('checkboxes', async({page})=>{

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //await page.getByRole('checkbox',{name: "Hide on click"}).check({force: true})
    await page.getByRole('checkbox',{name: "Hide on click"}).uncheck({force: true})
    await page.getByRole('checkbox',{name: "Prevent arising of duplicate toast"}).check({force: true})

    await page.getByRole('checkbox',{name: "Show toast with icon"}).uncheck({force: true})


    //Loop through all checkboxes to true

    const allBoxes=page.getByRole('checkbox')
    for ( const box of await allBoxes.all()){
    
         //await box.check({force: true}) // to check 
         //expect(await box.isChecked()).toBeTruthy() // to make all the checkboxes checked

         await box.uncheck({force: true}) // to uncheck
         expect(await box.isChecked()).toBeFalsy() // to make all the checkboxes uncheck

    }
    



})