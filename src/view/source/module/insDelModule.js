import axios from 'axios';
import biz from '../../../config.js';
import qs from 'qs';

export default({
    state:{
        Ins_name:"",//机构名字
        Ins_logo:'',//机构logo
        introduction:'',//机构简介
        researchList:[],//研究方向
        scholarArray:[],//机构专家
        scholarObject:{},//学者信息
        count:0,
        count1:1,
    },
    actions:{
        getInstitutionDetailAndScholar(context,test){
            let params = qs.stringify(test);
            axios.get(biz.serverUrl+"/piionee/transfer/es/getInstitutionDetailAndScholar?"+params).then((res)=>{
                context.commit('getInsAndSchMes',res.data);
            })
            
        },
        changeResearch(context,test){
            let params = qs.stringify(test);
            axios.get(biz.serverUrl+"/piionee/transfer/es/getInstitutionDetailAndScholar?"+params).then((res)=>{
                context.commit('getScholarArrayAndScholarObject',res.data);
            })
        },
        getScholarObject(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/es/getInstitutionDetailAndScholar?"+params).then((res)=>{
                context.commit('getScholarMesg',res.data);
            })
        },
        getSchDel(context,text){
            let params = qs.stringify(text);
            axios.get(biz.serverUrl+"/piionee/transfer/es/getInstitutionDetailAndScholar?"+params).then((res)=>{
                
                context.commit('getInsAndSchMes',res.data);
            })
        }
    },
    mutations:{
        getInsAndSchMes(state,data){
            state.Ins_name = data.name;
            state.Ins_logo = data.logo;
            state.introduction = data.introduction;
            state.researchList = data.researchList;
            sessionStorage.setItem('research',state.researchList[0])
            state.scholarArray = data.scholarArray;
            state.scholarObject = data.scholarObject;
            state.count ++;
        },
        getScholarArrayAndScholarObject(state,data){
            state.scholarArray = data.scholarArray;
            state.scholarObject = data.scholarObject;
            state.count1 ++;
        },
        getScholarMesg(state,data){
            state.scholarObject = data.scholarObject;
        }
    },
    getters:{}
})