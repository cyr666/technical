import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import axios from 'axios';
import biz from '../../config.js';
import qs from 'qs';

export default{

    state:{       
        chainPieArray:[],
        chinaChainArray:[],
        parkChainArray:[],
        chainCompanyArray:[],
        chainID:1,
        chainNAME:'',
        ChainProvinceArray:[],
    },
    actions:{
        getChainArray(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/chain/getChainArray?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('handleGetChainArray',res.data);
                }               
            })
        },
        getChainAnalysis(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/chain/getChainAnalysis?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('handleGetChainAnalysis',res.data);
                }               
            })
        },
        getInstitutionOrScholar(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/chain/getInstitutionOrScholar?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('handleGetInsOrsol',res.data);
                    // console.log(res)
                }               
            })
        }
    },
    mutations:{
        handleGetChainArray(state,data){
            let chainPieArray = JSON.parse(JSON.stringify(data.chainArray).replace(/count/g,"value"));
            state.chainPieArray = chainPieArray;
            sessionStorage.setItem('chainPieArray',JSON.stringify(state.chainPieArray));
        },
        handleGetChainAnalysis(state,data){
            state.chinaChainArray = data.china;
            sessionStorage.setItem('chinaChainArray',JSON.stringify(state.chinaChainArray));
            state.parkChainArray = data.park;
            sessionStorage.setItem('parkChainArray',JSON.stringify(state.parkChainArray));
            state.chainCompanyArray = data.companyArray;
            sessionStorage.setItem('chainCompanyArray',JSON.stringify(state.chainCompanyArray));
            state.ChainProvinceArray = data.provinceArray;
            sessionStorage.setItem('ChainProvinceArray',JSON.stringify(state.ChainProvinceArray));
        },
        
        handleGetInsOrsol(state,data){
            state.chainID = data.id;
            state.chainNAME = data.name;
            sessionStorage.setItem('chainID',state.chainID);
            sessionStorage.setItem('chainName',state.chainNAME);
            // console.log(state.chainNAME)
        }
    },
    getters:{}
}