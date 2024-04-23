
import { ASTWithSource } from '@angular/compiler'
import {test, expect } from '@playwright/test'
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test ('Reusin the locter', async({page}) => {

              const basicform= await page.locator('nb-card').filter({hasText: "Basic Form "})
              const emailField=basicform.getByRole('textbox',{name: "Email"})

              await emailField.fill('cs_test@test.com')
              await basicform.getByRole('textbox',{name: "Password"}).fill('welcome123')
              await basicform.locator('nb-checkbox').click()
              await basicform.getByRole('button').click()

              await expect(emailField).toHaveValue('cs_test@test.com')

})
// extracting values

test ('extracting values', async({page})=> {

          // single test values
           const basicform= await page.locator('nb-card').filter({hasText: "Basic Form "})
           const buttonText= await basicform.locator('button').textContent()
           expect(buttonText).toEqual('Submit')

           // all text values
           const allRadioButtonsLabels= await page.locator('nb-radio').allTextContents()
            expect(allRadioButtonsLabels).toContain("Option 1")
           
            //input value

            const emailField= basicform.getByRole('textbox',{name: "Email"})
            await emailField.fill('cs_test@test.com')
            const emailValue= await emailField.inputValue()
            expect(emailValue).toEqual('cs_test@test.com')

            const placeholderValue= await emailField.getAttribute('placeholder')
            expect(placeholderValue).toEqual('Email')


})