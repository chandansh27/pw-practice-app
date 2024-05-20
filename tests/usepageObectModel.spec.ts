import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
// import { NavigationPage } from '../page-objects/navigationpage'      [used in pageManager now , keeping it for own refrence[]
// import { FormLayoutsPage } from '../page-objects/formlayoutspage'
// import { Datepickerpage } from '../page-objects/datePickerPage'
import {faker} from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";


test.beforeEach(async({page})=>{

    await page.goto('/')

})

test('navigate to form page @smoke @regression', async({page})=>{

    // we have created a Page Manger class to get all the navigation so we do need below code , just keep for own reference 
    
    // const navigateTo = new NavigationPage(page)
    // await navigateTo.formLayoutPage()
    // await navigateTo.datepickerPage()
    // await navigateTo.smartTablePage()
    // await navigateTo.toastrPage()
    // await navigateTo.tooltipPage()


    // Now write this way

     const pm= new PageManager(page)
     await pm.navigateTo().formLayoutPage()
     await pm.navigateTo().datepickerPage()
     await pm.navigateTo().smartTablePage()
     await pm.navigateTo().smartTablePage()
     await pm.navigateTo().toastrPage()
     await pm.navigateTo().tooltipPage()
    


})

test('parametrized methods @smoke', async({page})=>{
   
   // we can use below commented code approach in better way as below  
    //const navigateTo = new NavigationPage(page)
   //const onFormLayoutPage= new FormLayoutsPage(page)
   //const onDatepickerPage= new Datepickerpage(page)

//    await navigateTo.formLayoutPage()
//    await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOprion('cs@test.com', 'welcome123', 'Option 2')
//    await onFormLayoutPage.submInInlineWithNameEmailandCheckBox('CS Sharma', 'cs@test.com', true)
//    await navigateTo.datepickerPage()
//    await onDatepickerPage.selectCommanDatePickerDateFromToday(70)
//    await onDatepickerPage.selectDatePickerWithrangeFromToday(6,15)


   const pm= new PageManager(page)
   const randomFullName= faker.person.fullName()
   const randomEmail =`${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`  // we use replace function from JS becuse name and email giving space

   await pm.navigateTo().formLayoutPage()
   await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOprion(process.env.USERNAME, process.env.PASSWORD, 'Option 2')

   //await page.screenshot({path: 'screenShot/formLayoutPage.png'})  // this line will create screenshot folder and file

   //const buffer= await page.screenshot() 
   //console.log(buffer.toString('base64'))// just to print the logs in binary format

   //await pm.onFormLayoutPage().submInInlineWithNameEmailandCheckBox('CS Sharma', 'cs@test.com', true)
   await pm.onFormLayoutPage().submInInlineWithNameEmailandCheckBox(randomFullName, randomEmail, true) // we r using faker for random data

   await page.locator('nb-card',{hasText: "Inline form"}).screenshot({path: 'screenShot/formLayoutPage.png'})

   await pm.navigateTo().datepickerPage()
   await pm.onDatePickerPage().selectCommanDatePickerDateFromToday(70)
   await pm.onDatePickerPage().selectDatePickerWithrangeFromToday(6,15)


})

test.only('testing with argo CI', async({page})=>{
   
    const pm= new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await argosScreenshot(page, "form layouts page");
    await pm.navigateTo().datepickerPage()
    await argosScreenshot(page, "datePicker page");
  
})

