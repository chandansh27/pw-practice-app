import { ASTWithSource } from '@angular/compiler'
import {test, expect } from '@playwright/test'
import { timeout } from 'rxjs/operators'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout+ 2000)
    
})

test('Auto Waiting', async({page}) =>{

    const sucessButton= page.locator('.bg-success')
    //await sucessButton.click()

    //const text =await sucessButton.textContent()
    //await sucessButton.waitFor({state:"attached"})
    //const text=await sucessButton.allTextContents()

    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(sucessButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})

test('alternative waits', async({page})=>{

   const sucessButton= page.locator('.bg-success')

   // ___ Wait for Element
    //await page.waitForSelector('.bg-success')

    // __ wait for Particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___ wait for the network calls to be completed ('Not Recommenend')

    await page.waitForLoadState("networkidle")

    const text=await sucessButton.allTextContents() 
    expect (text).toContain('Data loaded with AJAX get request.')

})

test ('timeout', async({page})=>{

    //test.setTimeout(10000)
    test.slow()

    const sucessButton= page.locator('.bg-success')
    await sucessButton.click()
    

})