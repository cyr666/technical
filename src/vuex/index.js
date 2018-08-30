import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import findModule from '../view/source/module/findModule.js';
import insDelModule from '../view/source/module/insDelModule.js';
import searchInsModule from '../view/searchResult/modules/searchInsModule.js';
import chinaModule from '../view/china/module/chinaModule.js';
import globalModule from '../view/global/module/globalModule.js';
import innovationModule from '../view/innovation/module.js';
import ChainModule from '../view/chainMap/module.js';

export default new Vuex.Store({
    modules:{
        findModule:findModule,
        insDelModule:insDelModule,
        searchInsModule:searchInsModule,
        chinaModule:chinaModule,
        globalModule:globalModule,
        innovationModule:innovationModule,
        ChainModule:ChainModule
    }
})