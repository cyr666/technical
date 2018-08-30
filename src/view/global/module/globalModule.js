import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import axios from 'axios';
import biz from '../../../config.js';
import qs from 'qs';

export default{

    state:{
        countryArray:[],
        time:[],
        deadLine:'',
        china:[],
        japan:[],
        korea:[],
        america:[],
        europe:[],
        china1:[],
        japan1:[],
        korea1:[],
        america1:[],
        europe1:[],
        staticName:[],
        ipc_max:[],
        max:'',
        pieArray:[],
        treeArray:[],
        hotFiledArray:[],
        level_2_ipcArray:[],
        F_term_List:[],
        institutionArray:[],
        
    },

    actions:{
        getPatentCount(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/situation/getPatentCount?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getConturyData',res.data);
                }               
            })
        },
        getDistribution(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/situation/get_ipc_distribution?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('gettaticArray',res.data);
                }               
            })
        },
        getFtermdistribution(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/situation/get_Fterm_distribution?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('getFtermArray',res.data);
                }               
            })
        },
        get_2_ipc_distribution(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/situation/get_2_ipc_distribution?"+params).then((res)=>{
                if(res.status == 200){
                    console.log(res.data)
                    context.commit('getipc',res.data);
                }               
            })
        },
        get_hot_institution_distribution(context,text){
            let params = qs.stringify(text);
            return axios.get(biz.serverUrl+"/piionee/transfer/situation/get_hot_institution_distribution?"+params).then((res)=>{
                if(res.status == 200){
                    context.commit('gethotIns',res.data);
                }               
            })
        },
        
    },
    mutations:{
        getConturyData(state,data){
            let timeObj = data.countryArray[3].staticArray;
            let date =  [];
            timeObj.forEach((val,ind) => {
               date.unshift(val.date) 
            });
            data.countryArray.forEach((val,ind)=>{
                if(val.name == "日本"){
                    let japan = [];
                    val.staticArray.forEach((obj,num)=>{
                        japan.unshift(obj.count)
                    })
                    state.japan = japan;
                    sessionStorage.setItem('japan',state.japan)
                }
                if(val.name == "中国"){
                    let china = [];
                    val.staticArray.forEach((obj,num)=>{
                        china.unshift(obj.count)
                    })
                    state.china = china
                    sessionStorage.setItem('china',state.china)
                }
                if(val.name == "美国"){
                    let america = [];
                    val.staticArray.forEach((obj,num)=>{
                        america.unshift(obj.count)
                    })
                    state.america = america
                    sessionStorage.setItem('america',state.america)
                }
                if(val.name == "韩国"){
                    let korea = [];
                    val.staticArray.forEach((obj,num)=>{
                        korea.unshift(obj.count)
                    })
                    state.korea = korea
                    sessionStorage.setItem('korea',state.korea)
                }
                if(val.name == "欧洲"){
                    let europe = [];
                    val.staticArray.forEach((obj,num)=>{
                        europe.unshift(obj.count)
                    })
                    state.europe = europe
                    sessionStorage.setItem('europe',state.europe)
                }
            })
            let arr = []
            let arr2 = arr.concat(state.japan,state.china,state.america,state.korea,state.europe)            
            arr2.sort((a,b)=>{
                return b-a
            })
            state.max=arr2[0];
            sessionStorage.setItem('max',state.max)
            state.countryArray = data.countryArray;
            state.time = date;
            sessionStorage.setItem('time',state.time);
            sessionStorage.setItem('deadLine',data.deadLine);
        },
        gettaticArray(state,data){
            state.ipc_max = data.ipc_max;
            sessionStorage.setItem('ipc_max',JSON.stringify(state.ipc_max))
            data.countryArray.forEach((val,ind)=>{
                if(val.name == "日本"){
                    let japan1 = [];
                    val.staticArray.forEach((obj,num)=>{
                        japan1.push(obj.count)
                    })
                    state.japan1 = japan1;
                    sessionStorage.setItem('japan1',state.japan1)
                }
                if(val.name == "中国"){
                    let china1 = [];
                    val.staticArray.forEach((obj,num)=>{
                        china1.push(obj.count)
                    })
                    state.china1 = china1;
                    sessionStorage.setItem('china1',state.china1)
                }
                if(val.name == "美国"){
                    let america1 = [];
                    val.staticArray.forEach((obj,num)=>{
                        america1.push(obj.count)
                    })
                    state.america1 = america1;
                    sessionStorage.setItem('america1',state.america1)
                }
                if(val.name == "韩国"){
                    let korea1 = [];
                    val.staticArray.forEach((obj,num)=>{
                        korea1.push(obj.count)
                    })
                    state.korea1 = korea1;
                    sessionStorage.setItem('korea1',state.korea1)
                }
                if(val.name == "欧洲"){
                    let europe1 = [];
                    val.staticArray.forEach((obj,num)=>{
                        europe1.push(obj.count)
                    })
                    state.europe1 = europe1;
                    sessionStorage.setItem('europe1',state.europe1)
                }
            })
        },
        getFtermArray(state,data){
            if(data.staticArray){
                let staticArray = JSON.parse(JSON.stringify(data.staticArray).replace(/count/g,"value"));
                state.pieArray = staticArray;
                sessionStorage.setItem('pieArray',JSON.stringify(state.pieArray));
                let names = [];
                staticArray.map((currentValue,index,arr)=>{
                    names.push(currentValue.name)   
                })
                sessionStorage.setItem('FtermName',names);
            } else{
                alert("没有数据")
            }          
        },
        getipc(state,data){
            let ipcArray = JSON.parse(JSON.stringify(data.ipcArray).replace(/count/g,"asset_num"));
            state.treeArray = ipcArray;
            state.hotFiledArray = data.hotFiledArray;
            sessionStorage.setItem('treeArray',JSON.stringify(state.treeArray));
            sessionStorage.setItem('hotFiledArray',JSON.stringify(data.hotFiledArray))
        },
        gethotIns(state,data){
            if(data.level_2_ipcArray){
                let level_2_ipcArray = JSON.parse(JSON.stringify(data.level_2_ipcArray).replace(/count/g,"value"));
                state.level_2_ipcArray = level_2_ipcArray;
                sessionStorage.setItem('level_2_ipcArray',JSON.stringify(state.level_2_ipcArray));
                state.F_term_List = data.F_term_List;
                sessionStorage.setItem('F_term_List',JSON.stringify(state.F_term_List));
                state.institutionArray = data.institutionArray;
                sessionStorage.setItem('institutionArray',JSON.stringify(state.institutionArray));                
            }            
        },
        
    },
    getters:{}
    
}