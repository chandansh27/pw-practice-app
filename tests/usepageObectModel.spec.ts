import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
// import { NavigationPage } from '../page-objects/navigationpage'      [used in pageManager now , keeping it for own refrence[]
// import { FormLayoutsPage } from '../page-objects/formlayoutspage'
// import { Datepickerpage } from '../page-objects/datePickerPage'
import {faker} from '@faker-js/faker'


test.beforeEach(async({page})=>{

    await page.goto('http://localhost:4200/')

})

test('navigate to form page', async({page})=>{

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

test('parametrized methods', async({page})=>{
   
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
   await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOprion('cs@test.com', 'welcome123', 'Option 2')
   //await pm.onFormLayoutPage().submInInlineWithNameEmailandCheckBox('CS Sharma', 'cs@test.com', true)
   await pm.onFormLayoutPage().submInInlineWithNameEmailandCheckBox(randomFullName, randomEmail, true) // we r using faker for random data

   await pm.navigateTo().datepickerPage()
   await pm.onDatePickerPage().selectCommanDatePickerDateFromToday(70)
   await pm.onDatePickerPage().selectDatePickerWithrangeFromToday(6,15)


})

