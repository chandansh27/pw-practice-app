import {test } from '@playwright/test'

//we use hook for repeat stuff : below lines show that

test.beforeEach(async({page})=>{
    await page.goto('/')
    await page.getByText('Forms').click()
})

test('the first test',async ({page}) => {
                                                                                                
    //await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('navigate to date picker page',async ({page}) => {
    //await page.goto('http://localhost:4200/')
    //await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()


})
