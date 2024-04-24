import {expect, test } from '@playwright/test'
import { EPERM } from 'constants'
import { tooltip } from 'leaflet'
import { execPath } from 'process'
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

test ('sliders', async({page})=>{
// update attributes

    //  const tempGauge= page.locator(' [tabtitle="Temperature"] ngx-temperature-dragger circle')
    //  await tempGauge.evaluate(Node=>{
    //     Node.setAttribute('cx', '232.630')
    //     Node.setAttribute('cy', '232.630')

  
    //  })
    //  await tempGauge.click()

     // Below example to move the Mouse 

     const tempbox= page.locator(' [tabtitle="Temperature"] ngx-temperature-dragger ')
     await tempbox.scrollIntoViewIfNeeded()

     const box= await tempbox.boundingBox()
     const x= box.x + box.width / 2
     const y= box.y + box.height / 2
     await page.mouse.move(x, y)
     await page.mouse.down()
     await page.mouse.move(x +100, y)
     await page.mouse.move(x+100, y+100)
     await page.mouse.up()
     await expect(tempbox).toContainText('30')

     


})


      


