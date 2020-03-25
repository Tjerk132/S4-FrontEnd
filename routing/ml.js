import Vue from 'vue'
import { MLInstaller, MLCreate } from 'vue-multilanguage';
import Languages from '../languages/languages.js';
 
Vue.use(MLInstaller);

export default new MLCreate({
  initial: 'English',
  save: process.env.NODE_ENV === 'production',
  languages: Languages
})