import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import axios from 'axios';
import biz from '../../../config.js';
import qs from 'qs';

export default{
    state:{
        achievementArray:[],
        patentArray:[],
        topNumber:{},
        scholarArray:[],
        institutionArray:[],
    },
    actions:{
         /*最新研究成果*/
        getFindPatentByQuery(context){
            let params = qs.stringify({rows:5})
            axios.get(biz.serverUrl+"/piionee/transfer/es/getPatentByQuery?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getAchievementArray',res.data.achievementArray);
                }else{
                    alert("请求失败")
                }
            }) 
        },
        getPatentByQuery2(context){
            let params = qs.stringify({type:'patent',rows:5})
            axios.get(biz.serverUrl+"/piionee/transfer/es/getPatentByQuery?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getPatentArray',res.data.patentArray);
                }else{
                    alert("请求失败")
                }
            }) 
        },
        getStatistics(context){
            axios.get(biz.serverUrl+"/piionee/transfer/es/getStatistics").then((res)=>{
                if(res.status == 200){
                    context.commit('getTopNumber',res.data)
                }else{
                    alert("请求失败")
                }
            })
        },
        getScholarByFilter(context){
            let params = qs.stringify({rows:5})
            axios.get(biz.serverUrl+"/piionee/transfer/es/getScholarByFilter?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getScholarArray',res.data.scholarArray);
                }else{
                    alert("请求失败")
                }
            })
        },
        getInstitutionByFilter(context){
            let params = qs.stringify({rows:5});
            axios.get(biz.serverUrl+"/piionee/transfer/es/getInstitutionByFilter?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getInsArray',res.data.institutionArray);
                }else{
                    alert("请求失败")
                }
            })
        },
    },
    mutations:{
        getAchievementArray(state,data){
            state.achievementArray = data;
        },
        getPatentArray(state,data){
            data.forEach((obj,ind)=>{
                obj.keywordObject.keyword=obj.keywordObject.keyword.split(";");
                if(obj.keywordObject.keyword.length>3){
                    obj.keywordObject.keyword.length = 3
                }
            })
            state.patentArray = data;
        },
        getTopNumber(state,data){
            state.topNumber = data;
        },
        getScholarArray(state,data){
            state.scholarArray = data;
        },
        getInsArray(state,data){
            state.institutionArray = data;
        }
    },
    getters:{}
}