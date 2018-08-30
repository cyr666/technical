import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import axios from 'axios';
import biz from '../../../config.js';
import qs from 'qs';

export default{

    state:{
        provinceArray:[],
        topArea:[],
        top10Name:[],
        num:[],
        top10Apply:[],
        top10Grant:[],
        img:[
            "icon-1@2x",
            "icon-2@2x",
            "icon-3@2x",
            "icon-4@2x",
            "icon-5@2x",
            "icon-6@2x",
            "icon-7@2x",
            "icon-8@2x",
        ],
        ipcArray:[],
        chinaF_term_List:[],
        chinalevel_2_ipcArray:[],
        chinainstitutionArray:[],
        provinceList:[],
        F_termArray:[],
        company:[],
        chinaDeadLine:''
    },

    actions:{
        getMapData(context){
            return axios.get(biz.serverUrl+"/piionee/transfer/situation/china/patent_static").then((res)=>{
                if(res.status == 200){
                    context.commit('getChinaData',res.data)
                }
            })
        },
        getChinadistribution(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/situation/china/get_hot_institution_distribution?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getchinahotIns',res.data);
                    
                }               
            })
        },
        getchinaFterm(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/situation/china/get_Fterm_distribution?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getchinadis',res.data);
                    
                }               
            })
        }
    },
    mutations:{
        getChinaData(state,data){
            let top10 = data.provinceArray.slice(0,10);           
            let cityArray = JSON.parse(JSON.stringify(data.provinceArray).replace(/apply_num/g,"value"));
            let name = [];
            let value1 = [];//城市申请专利数量
            let value2 = [];// 城市授予专利数量
            let num = [];
            let countryName = [];
            top10.forEach((obj,v)=>{
                num.push({num:v+1,id:obj.id})
                name.push({name:obj.name,id:obj.id});
                value1.unshift(obj.apply_num);
                value2.unshift(obj.grant_num );
                countryName.unshift(obj.name)
            })
            state.top10Name = countryName;
            sessionStorage.setItem('maptop10Name',state.top10Name)
            state.num = num;
            state.topArea = name;
            state.top10Apply = value1;
            sessionStorage.setItem('maptop10Apply',state.top10Apply)
            state.top10Grant = value2;
            sessionStorage.setItem('maptop10Grant',state.top10Grant)
            state.provinceArray = cityArray;
            sessionStorage.setItem("mapProvinceArray",JSON.stringify(state.provinceArray));
            data.ipcArray.forEach((val,ind)=>{
                val.img = state.img[ind]
            });
            state.ipcArray = data.ipcArray;
            state.chinaDeadLine = data.deadLine;
            sessionStorage.setItem("chinaDeadLine",data.deadLine);
        },
        getchinahotIns(state,data){
            if(data.level_2_ipcArray){
                let level_2_ipcArray = JSON.parse(JSON.stringify(data.level_2_ipcArray).replace(/count/g,"value"));
                state.chinalevel_2_ipcArray = level_2_ipcArray;
                sessionStorage.setItem('chinalevel_2_ipcArray',JSON.stringify(state.chinalevel_2_ipcArray));
                state.chinaF_term_List = data.F_term_List;
                sessionStorage.setItem('chinaF_term_List',JSON.stringify(state.chinaF_term_List));
                state.chinainstitutionArray = data.institutionArray;
                sessionStorage.setItem('chinainstitutionArray',JSON.stringify(state.chinainstitutionArray)); 
                state.provinceList = data.provinceList;
                sessionStorage.setItem('provinceList',JSON.stringify(state.provinceList));              
            } 
        },
        getchinadis(state,data){
            let F_termArray = JSON.parse(JSON.stringify(data.F_termArray).replace(/count/g,"value"));
            state.F_termArray = F_termArray;
            sessionStorage.setItem('chinaFtermArray',JSON.stringify(state.F_termArray));
            let names = [];
            F_termArray.map((currentValue,index,arr)=>{
                names.push(currentValue.name)   
            })
            let company = F_termArray[0].company;
            sessionStorage.setItem('chinaFtermName',names);
            sessionStorage.setItem('company',JSON.stringify(company))
        }
    },
    getters:{}
    
}