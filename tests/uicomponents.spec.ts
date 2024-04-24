import {expect, test } from '@playwright/test'
import { EPERM } from 'constants'
import { delay } from 'rxjs-compat/operator/delay'

test.beforeEach(async({page})=>{

    await page.goto('/')

})

test.describe('Form Layouts page', () =>{

    test.describe.configure({retries:2}) // if we feel some tests are more falaky, so we can configure retries here also

        test.beforeEach(async({page})=>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })


test('input fields', async({page}, testInfo)=>{

    if (testInfo.retry){

        // e.g if we like clean the DB before running the test again
    }

    const usingTheGridEmailInput=page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox',{name:"Email"})
    await usingTheGridEmailInput.fill('cs@cs.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('cs1@cs.com',{delay:200})

    //generic assertion
    const inputValue=await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('cs1@cs.com')

    //locater assertion

    await expect(usingTheGridEmailInput).toHaveValue('cs1@cs.com')
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