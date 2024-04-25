import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 10000,
  globalTimeout: 60000,

  use: {

    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'http://localhost:4200/',
      
  },

  projects: [
    
    {
      name: 'chromium',

    },

 
  ],

});
