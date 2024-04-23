import {test, expect } from '@playwright/test'
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test ('Reusin the locter', async({page}) => {

    
    //await page.locator('nb-card').filter({hasText: "Basic Form "}).getByRole('textbox',{name: "Email"}).fill('cs_test@test.com')
    //await page.locator('nb-card').filter({hasText: "Basic Form "}).getByRole('textbox',{name: "Password"}).fill('welcome123')
    //await page.locator('nb-card').filter({hasText: "Basic Form "}).getByRole('button').click()

     // in above lines of code we use repititve code , so better to create a const varaible because  : e.g for  Basic Form

              //const basicform= await page.locator('nb-card').filter({hasText: "Basic Form "})

              //await basicform.getByRole('textbox',{name: "Email"}).fill('cs_test@test.com')
              //await basicform.getByRole('textbox',{name: "Password"}).fill('welcome123')
              //await basicform.getByRole('button').click()

              // for above code we can also create a level of abstraction to creating another const variable for Email

              const basicform= await page.locator('nb-card').filter({hasText: "Basic Form "})
              const emailField=basicform.getByRole('textbox',{name: "Email"})

              await emailField.fill('cs_test@test.com')
              await basicform.getByRole('textbox',{name: "Password"}).fill('welcome123')
              await basicform.locator('nb-checkbox').click()
              await basicform.getByRole('button').click()

              await expect(emailField).toHaveValue('cs_test@test.com')

})