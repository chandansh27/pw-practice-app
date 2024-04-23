import {expect, test } from '@playwright/test'
import { EPERM } from 'constants'
import { tooltip } from 'leaflet'
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

test('Lists and dropdown', async({page})=>{

    const dropDownMenu=page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list')// when the list has a UL tag
    page.getByRole('listitem')// when the list has LI tag

    //const optionList = page.getByRole('list').locator('nb-option')

    const optionList=page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])
    await optionList.filter({hasText: "Cosmic" }).click()

    // backgroud color change as per selection of the option from list, so how to use it see below

    const header=page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color',"rgb(50, 50, 89)")

   const colors={    // create object for colors and loopthrough until last color is selected and once reached at last check with if condition
     "Light": "rgb(255, 255, 255)",
     "Dark": "rgb(34, 43, 69)",
     "Cosmic": "rgb(50, 50, 89)",
     "Corporate": "rgb(255, 255, 255)"

    }

    await dropDownMenu.click()
    for (const color in  colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color !="Corporate")
        await dropDownMenu.click()



    }

})

test('Tooltip', async({page})=>{
    
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard=page.locator('nb-card',{hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button',{name: "Top"}).hover()

    page.getByRole('tooltip')// if you have a role tooltip created, but in this page we dont have it 
    const tooltip= await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
    
})

test('dialogBoxes', async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog=>{ // accept the confirmation message that comes from browser to delete the row

     expect(dialog.message()).toEqual('Are you sure you want to delete?')
     dialog.accept()
    })

    await page.getByRole('table').locator('tr',{hasText: 'mdo@gmail.com '}).locator('.nb-trash').click() // 
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com') // after deleting the row checking if the row is not present

})