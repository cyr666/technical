import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import axios from 'axios';
import biz from '../../config.js';
import qs from 'qs';

export default{

    state:{
        chainArray:[],
        children:[],
        companyArray:[],
        numFound:'',
        F_term:[],
        trend:[],
        trendMax:'',
        companyObj:{},
        companyDelArray:[],
        patentArray:[],//申请专利
        companyFtermName:[],
        years:[],
        values:[],
    },

    actions:{
        getChanyelian(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/chain/getChainFilter?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('handleChanyelian',res.data);
                }               
            })
        },
        getCompany(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/chain/getCompany?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('handleCompanyList',res.data);
                }               
            })
        },
        getCompanyDetail(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/chain/getCompanyDetail?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('handleCompanyDel',res.data);
                }               
            })
        },
        getCompanyDetail_patent(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/chain/getCompanyDetail_patent?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('handleCompanyDetail_patent',res.data);
                }               
            })
        }
    },
    mutations:{
        handleChanyelian(state,data){
            state.chainArray = data.chainArray;
            sessionStorage.setItem('chainArray',JSON.stringify(state.chainArray));
            state.children = data.children;
            sessionStorage.setItem('children',JSON.stringify(state.children));
        },
        handleCompanyList(state,data){
            state.companyArray = data.companyArray;
            sessionStorage.setItem('companyArray',JSON.stringify(state.companyArray));
            state.numFound = data.numFound;
            sessionStorage.setItem('numFound',JSON.stringify(state.numFound));
        },
        handleCompanyDel(state,data){
            let F_term = JSON.parse(JSON.stringify(data.F_term).replace(/count/g,"value"));
            state.F_term = F_term;
            sessionStorage.setItem('F_term',JSON.stringify(state.F_term));
            let names = [];
            F_term.map((currentValue,index,arr)=>{
                names.push(currentValue.name)   
            })
            state.companyFtermName = names
            sessionStorage.setItem('companyFtermName',names);
            let years = [];
            let value = [];
            data.trend.map((currentValue,index,arr)=>{
                years.push(currentValue.year)   
            })
            data.trend.map((currentValue,index,arr)=>{
                value.push(currentValue.value)   
            })
            state.values = value;
            state.years = years;
            sessionStorage.setItem('years',years)
            sessionStorage.setItem('value',value);
            value.sort((a,b)=>{
                return b-a;
            })
            sessionStorage.setItem('trendMax',value[0]);
            state.companyObj={
                industry:data.industry,
                introduction:data.introduction,
                keyword:data.keyword,
                logo:data.logo,
                name:data.name,
                start: data.start
            }
            sessionStorage.setItem('companyObj',JSON.stringify(state.companyObj))
            state.companyDelArray = data.companyArray;
            sessionStorage.setItem('companyDelArray',JSON.stringify(state.companyDelArray));
        },
        handleCompanyDetail_patent(state,data){
            if(data.patentArray){
                state.patentArray = data.patentArray;
            }
        }
    },
    getters:{}
    
}