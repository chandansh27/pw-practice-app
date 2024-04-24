import {test } from '@playwright/test'
import { first } from 'rxjs-compat/operator/first'

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
 test('locator syntax rule', async({page})=>{
    // how to find locater by name
    await page.locator('input').first().click()
    
    // how to find page locater by ID
     page.locator('#inputEmail1')
    
    // how to find class by value
    page.locator('.shape-rectangle')
    
    // how to find by attribute
    page.locator('[placeholder="Email"]')
    
    // how to find by class value(full) 
    
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
    
    // combined different selector
    
    page.locator('input[placeholder="Email"][nbinput]')
    
    // how to find the page locater by Xpath (not recomended )
    
    page.locator('//.*[@id="inputEmail1"]')
    
    // how to find locater by partial text match
    
    page.locator(':text("Using")')
    
    //how to find locater by exact text match
    
    page.locator(':text-is("Using the Grid")')
    
    })

// user facing locater

test('User facing locater', async({page}) => {
await page.getByRole('textbox',{name: "Email"}).first().click()

//await page.getByRole('button',{name: "Sign in"}).first().click()

await page.getByLabel('Email').first().click()

await page.getByPlaceholder('Jane Doe').click()

await page.getByText('Using the Grid').click()

await page.getByTestId('SignIn').click()

//await page.getByTitle('IoT Dashboard').click()

})
// find child elements : Date: 14th March24
test('locating child element', async({page}) =>{

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    //other way
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click()

    //least preferred approach : try to avoid this approach
     
    await page.locator('nb-card').nth(3).getByRole('button').click()
})