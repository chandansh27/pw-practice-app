import { ASTWithSource } from "@angular/compiler";
import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{

    //private readonly page: Page

    constructor(page: Page){

        //this.page= page

        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOprion(email: string, password: string, optionText: string){
        const usingTheGridForm= this.page.locator('nb-card',{hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole("button").click()


    }

      /** This method fill out the Inline form with user details
       * 
       * @param name : should be first  and last name
       * @param email: valid email for the test user
       * @param rememberMe:  true  or false if user session to be saved 
       */

    async submInInlineWithNameEmailandCheckBox(name: string, email: string, rememberMe: boolean){

        const inLineForm= this.page.locator('nb-card',{hasText: "Inline form"})
        await inLineForm.getByRole('textbox',{name: "Jane Doe"}).fill(name)
        await inLineForm.getByRole('textbox',{name: "Email"}).fill(email)
        if (rememberMe)
            await inLineForm.getByRole('checkbox').check({force:true})
        await inLineForm.getByRole('button').click()
    }


}

