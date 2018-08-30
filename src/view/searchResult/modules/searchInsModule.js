import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import axios from 'axios';
import biz from '../../../config.js';
import qs from 'qs';

export default{
    state:{
        institutionArray:[],
        pages:1,
        queryStatics:{},
    },
    actions:{
        getInstitutionByFilter(context,text){
            // let query = sessionStorage.getItem("searchVal")
            let params = qs.stringify(text);
            axios.get(biz.serverUrl+"/piionee/transfer/es/getInstitutionByQuery?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getInstitution',res.data)
                }else{
                    alert("请求失败")
                }
            })
        },
    },
    mutations:{
        getInstitution(state,data){
            state.institutionArray = data.institutionArray;
            state.queryStatics = data.queryStatics;
            if(Math.ceil(data.numFound/8)>100){
                state.pages = 100
            }
        }
    },
    getters:{}
}