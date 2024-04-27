import {test as base} from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions= {

    globalsQaURL: string
    formLayoutPage: String
    pageManager: PageManager

}

export const test= base.extend<TestOptions>({

    globalsQaURL: ['',{option: true}],

    formLayoutPage: async({page}, use) =>{

        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        //console.log('Tear Down')
    }, 

    pageManager: async({page, formLayoutPage}, use)=> {
        const pm= new PageManager(page)
        await use(pm)

        
    }
})