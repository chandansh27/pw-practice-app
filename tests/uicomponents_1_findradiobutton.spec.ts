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