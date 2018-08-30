<template>
    <div class = "chainbottom_con">
        <div class = "chainBottom_head">
            <div class = "tabButtn">
                <span class = "apply" :class="{'onlyStyle1':actions}" @click = "changeTab('科研机构')">科研机构</span><span class = "get"  :class="{'onlyStyle1':!actions}" @click = "changeTab('科研人才')">科研人才</span>
            </div>
            <div class = "source">科研资源</div>
        </div>
        <div style="border:1px solid rgba(232,234,235,1);border-top: none;">
            <div class = "chain_keyword">
                <span v-for="item in children" :key="item.id" :class ="clickid==item.id?'onlyStyle':''"  @click="getInsOrSol(item.id,item.name)">{{item.name}}</span>
            </div>
            <div class = "searchList" v-if="ins">
                <div class = "tableHead">
                    <span class = "Head1">机构</span>
                    <span class = "Head2">研究方向</span>
                </div>
                <table>
                    <tr v-for="item in institutionArray" :key="item.id">
                        <td>
                            <img :src="item.logo" alt="" class = "comLogo" v-if="item.logo">
                            <img src="../../assets/img/no_logo.png" alt="" class = "comLogo" v-else>
                        </td>
                        <td>
                            <dl>
                                {{item.name}}
                            </dl>
                            <dt v-html="item.introduction">
                                
                            </dt>
                        </td>
                        <td>
                            <span v-for="obj in item.researchList" :key="obj">{{obj}}<em></em></span>
                        </td>
                        <td align="right">
                            <span @click="checkInnovationDel(item.id)">查看</span>
                        </td>
                    </tr>
                </table>
          </div>
            <div class = "searchList2" v-else>
                <div class = "tableHead">
                    <span class = "Head1">专家</span>
                    <span class = "Head2">所属机构</span>
                    <span class = "Head3">研究方向</span>
                    <span class = "Head4">学术产出</span>
                </div>
                <table>
                    <tr class = "listItem" v-for="item in scholarArray" :key="item.id">
                        <td>{{item.name}}</td>
                        <td><span class = "insname">{{item.institution.name}}</span></td>
                        <td>
                            <span v-for="obj in item.researchList" :key="obj.id">{{obj}}&nbsp;<em></em></span>
                        </td>
                        <td>{{item.paper_num}}</td>
                        <td>
                            <span @click="getScholar(item.id,item.name,item.institution.id)">查看</span>
                        </td>
                    </tr>
                </table>
                <!-- <div class = "listItem" v-for="item in scholarArray" :key="item.id">
                    <div class ="nameCon">
                        <span class = "special_name">{{item.name}}</span>
                    </div>                   
                    <h3 class = "listItem_name"><span @click="checkInnovationDel(item.institution.id)" class="insname">{{item.institution.name}}</span></h3>                
                    <div class = "search_direc">
                        <span v-for="obj in item.researchList" :key="obj.id">{{obj}}&nbsp;<em></em></span>
                    </div>
                    <span class = "special_num">{{item.paper_num}}</span>
                    <span class = "listItem_check"><span @click="getScholar(item.id,item.name,item.institution.id)">查看</span></span>
                </div> -->
          </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .chainbottom_con{
        .chainBottom_head{
            box-sizing: border-box;
            padding: 0 30px;
            width: 100%;
            height: 50px;
            background:rgba(249,249,249,1);
            margin-top: 20px;
            border:1px solid rgba(232,234,235,1);
            .tabButtn{
                float: left;
                margin-top: 10px;
                width:15%;
                height:28px;
                border: 1px solid #008EFF;
                border-radius: 100px;
                background: #fff;
                span{
                    display: inline-block;
                    
                    height: 28px;
                    text-align: center;
                    border-radius: 100px;
                    font-size: 13px;
                    color:rgba(82,99,112,1);
                    line-height:28px; 
                    cursor: pointer;
                }
                .apply{
                    width: 50%;
                }
                .get{
                    width: 50%;
                    float:right;
                }
                .onlyStyle1{
                    font-size: 13px;
                    background:rgba(0,142,255,1);
                    color: #fff;
                }
            }
            .source{
                float: left;
                font-size: 14px;
                color: #7B8185;
                line-height: 50px;
                margin-left: 32%;
            }
        }
        .chain_keyword{
            box-sizing: border-box;
            padding: 30px 0 0 30px;
            border-bottom: 1px solid #E8EAEB;
            background: #fff;
            span{
                display: inline-block;
                font-size: 13px;
                color: #39454E;
                line-height: 40px;
                cursor: pointer;
                margin-right: 2%;
            }
            .onlyStyle{
                color: #008EFF;
                border-bottom: 2px solid #008EFF;
            } 
        }
        .searchList{
            box-sizing: border-box;
            background: #fff;
            // box-shadow: 1px 0px 1px 0px rgba(232,234,235,1);
            .tableHead{
                width: 100%;
                // height: 48px;
                box-sizing: border-box;
                padding-left: 4.4%;
                overflow: hidden;
                padding-top: 30px;
                border-bottom: 1px solid #EAEDF1;
                .Head1,.Head2,.Head3{
                    float: left;
                    font-size: 13px;
                    color: #7B8185;
                    line-height: 48px;
                }
                .Head1{
                    margin-left: 5%;
                }
                .Head2{
                    margin-left: 37%;
                }
                
            } 
            table{
                box-sizing: border-box;
                padding: 0 2%;
                border-collapse: collapse;
                tr{
                    width: 100%;
                    height: 116px;
                    border-bottom: 1px solid #EAEDF1;
                    td{
                        .comLogo{
                            width:58px;
                            height: 59px;
                        }
                    }
                    td:first-child{
                        width: 7%;
                        padding-left:2%;
                    }
                    td:nth-child(2){
                        width: 40%;
                        padding-left: 2%;
                        dl{
                            font-size:16px;
                            font-family:"微软雅黑";
                            color:rgba(34,45,54,1);
                            line-height:24px;
                            font-weight: bold;
                        }
                        dt{
                            width: 80%;
                            height: 40px;
                            margin-top: 13px;
                            font-size:13px;
                            color:rgba(57,69,78,1);
                            line-height:20px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                        
                        
                    }
                    td:nth-child(3){
                        padding-left: 0%;
                        margin-top: 20px;
                        width: 37%;
                        span{
                            box-sizing: border-box;
                            display: inline-block;
                            position: relative;
                            padding-right: 6px;
                            margin-right: 6px;
                            margin-bottom: 3px;
                            font-size: 13px;
                            color: #39454E;
                            em{
                            position: absolute;
                            display: inline-block;
                            width: 3px;
                            height: 3px;
                            border-radius: 1.5px;
                            background:rgba(49,60,69,1);
                            top:48%;
                            right: -2%;
                            }
                        }
                        span:last-child{
                            em{
                                background: #fff;
                            }
                        }
                    }
                    td:nth-child(4){
                        width: 15%;
                        padding-right: 3%;
                        span{
                            width: 72px;
                            height: 28px;
                            line-height: 28px;
                            display:inline-block;
                            box-sizing: border-box;
                            // padding: 5px 2%;
                            text-align: center;
                            border: 1px solid RGBA(0, 142, 255, 0.7);
                            color: #008EFF;
                            font-size: 14px;
                            border-radius: 2px; 
                            cursor: pointer;
                        }
                    }
                }                
            }      
        }
        .searchList2{
            box-sizing: border-box;
            background: #fff;
            box-shadow: 1px 0px 1px 0px rgba(232,234,235,1);
            .tableHead{
                width: 100%;
                height: 78px;
                box-sizing: border-box;
                padding-left: 4.4%;
                padding-top: 30px;
                border-bottom: 1px solid #EAEDF1;
                .Head1,.Head2,.Head3,.Head4{
                    float: left;
                    font-size: 13px;
                    color: #7B8185;
                    line-height: 48px;
                }
                .Head1{
                    margin-left: -2%;
                }
                .Head2{
                    margin-left: 7%;
                }
                .Head3{
                    margin-left: 23%;
                }
                .Head4{
                    margin-left: 37%;
                }
            } 
            table{
                border-collapse: collapse;
               .listItem{
                    overflow: hidden;
                    width: 100%;
                    height: 90px;
                    box-sizing: border-box;
                    padding: 0 2%;
                    border-bottom: 1px solid #EAEDF1;
                    background: #fff;
                    td:first-child{
                        width: 7%;
                        padding-left: 2%;
                        font-size: 16px;
                        color: #222D36;
                        font-weight: bold;
                        line-height: 90px;
                    } 
                    td:nth-child(2){
                        width:25%;
                        padding-left: 4%;
                        .insname{
                            color: #008EFF;
                            font-size: 13px;
                            line-height: 20px;
                            border-bottom: 1px solid #fff;
                            cursor: pointer;
                        }
                        .insname:hover{
                            border-bottom: 1px solid #008EFF;
                        } 
                    }
                    td:nth-child(3){
                        width: 41%;
                        padding-left: 6%;
                        // position: relative;
                        span{
                        //    position: absolute;
                            box-sizing: border-box;
                            display: inline-block;
                            position: relative;
                            padding-right: 6px;
                            margin-right: 6px;
                            font-size: 13px;
                            color: #39454E;
                            margin-bottom: 3px;
                            em{
                                position: absolute;
                                display: inline-block;
                                width: 3px;
                                height: 3px;
                                border-radius: 1.5px;
                                background:rgba(49,60,69,1);
                                top:48%;
                                right:1%;
                            }
                        }
                        span:last-child{
                            em{
                                background: #fff;
                            }
                        }
                    }
                    td:nth-child(4){
                        padding-left: 7%; 
                        color: #39454E;
                        font-size: 13px;
                        line-height: 22px;
                        width: 12%;
                    }
                    td:nth-child(5){
                        width: 15%;
                        padding-left: 6%;
                        box-sizing: border-box;
                        span{
                            width: 72px;
                            height: 28px;
                            line-height: 28px;
                            box-sizing: border-box;
                            display: inline-block;
                            text-align: center;
                            border: 1px solid RGBA(0, 142, 255, 0.7);
                            color: #008EFF;
                            font-size: 12px;
                            border-radius: 2px;
                            cursor: pointer; 
                        }
                    }
                } 
            }
            .listItem{
                overflow: hidden;
                width: 100%;
                height: 90px;
                box-sizing: border-box;
                padding: 0 2%;
                border-bottom: 1px solid #EAEDF1;
                background: #fff;
                // display:table-cell;
                // vertical-align: middle;

                .nameCon{
                        display:table-cell;
                        vertical-align: middle;
                        width: 7%;
                    .special_name{
                        display: inline-block;
                        font-size: 16px;
                        color: #222D36;
                        font-weight: bold;
                        line-height: 90px;
                    }
                }
                
                .listItem_name{  
                    width:25%;
                    display:table-cell;
                    vertical-align: middle;
                    padding-left: 6%;
                    padding-right: 6%;                   
                    .insname{
                        color: #008EFF;
                        font-size: 13px;
                        line-height: 20px;
                        cursor: pointer;
                    }
                }
                
                
                .search_direc{
                    display:table-cell;
                    vertical-align: middle;
                    width: 41%;
                    padding-left: 12%;
                    // position: relative;
                    span{
                    //    position: absolute;
                        box-sizing: border-box;
                        display: inline-block;
                        position: relative;
                        padding-right: 5px;
                        margin-right: 2%;
                        font-size: 13px;
                        color: #39454E;
                        em{
                            position: absolute;
                            display: inline-block;
                            width: 4px;
                            height: 4px;
                            border-radius: 2px;
                            background:rgba(49,60,69,1);
                            margin-left: 5%;
                            top:48%;
                            right: -5%;
                        }
                    }
                    span:last-child{
                        em{
                            background: #fff;
                        }
                    }
                }
                //  .search_direc:nth-child(2){
                //      width: 45%!important;
                //  }
                .special_num{
                    display:table-cell;
                    vertical-align: middle;
                    padding-left: 10%; 
                    color: #39454E;
                    font-size: 13px;
                    line-height: 22px;
                    width: 12%;
                }
                .listItem_check{
                    display:table-cell;
                    vertical-align: middle;
                    text-align: center;
                    box-sizing: border-box;
                    span{
                        box-sizing: border-box;
                        display: inline-block;
                        padding: 5px 15%;
                        border: 1px solid RGBA(0, 142, 255, 0.7);
                        color: #008EFF;
                        font-size: 12px;
                        border-radius: 2px;
                        cursor: pointer; 
                    }
                }
            }   
        }
    }
</style>
<script scoped>
import qs from 'qs';
import axios from 'axios';
    export default {
        name: 'HelloWorld',
        components: {
        },
        computed:{
            chainID(){
                return this.$store.state.ChainModule.chainID
            }
        },
        data(){
           return{
               actions:true,
               chainArray:[],
               clickid:1,
               ins:true,
               scholarArray:[],
               institutionArray:[],
               children:[],
           } 
        },
        methods:{
            changeTab(tabName){
                this.clickid = this.children[0].id;
                if(tabName == "科研机构"){
                    sessionStorage.setItem("tabName","科研机构")
                    this.ins = true;
                    this.actions = true;
                    let params = qs.stringify({field:this.children[0].name}) 
                    this.handleGetInsData(params)
                }else{
                    sessionStorage.setItem("tabName","科研人才")
                    this.ins = false; 
                    this.actions = false;
                    let params = qs.stringify({field:this.children[0].name}) 
                    axios.get(this.biz.serverUrl+"/piionee/transfer/es/getScholarByFilter?"+params).then((res)=>{
                        if(res.status == 200){
                            this.scholarArray = res.data.scholarArray;
                        }else{
                            alert("请求失败")
                        }
                    })
                }
            },
            checkInnovationDel(id){              
                sessionStorage.setItem('institution_id',id)
                this.$router.push(`/technical/insDel`)            
                this.$store.dispatch('getInstitutionDetailAndScholar',{institution_id:id})         
            },
            handleGetInsData(params){
                axios.get(this.biz.serverUrl+"/piionee/transfer/es/getInstitutionByFilter?"+params).then((res)=>{
                    if(res.status == 200){
                        this.institutionArray = res.data.institutionArray
                    }else{
                        alert("请求失败")
                    }
                })
            },
            getScholar(id,name,id2){
                this.$router.push(`/technical/insDel`)
                sessionStorage.setItem("institution_id",id2);
                sessionStorage.setItem("scholarId",id)
                sessionStorage.setItem('speName',name)
                this.$store.dispatch('getSchDel',{institution_id:id2,scholar_id:id})
                // setTimeout(()=>{
                //     bus.$emit("getSchDel",name)
                // },1)  
            },
            getInsOrSol(id,name){
                this.clickid = id;
                let query = name;
                let tabName = sessionStorage.getItem('tabName');
                if(tabName == "科研机构"){
                    let params = qs.stringify({field:query})
                    axios.get(this.biz.serverUrl+"/piionee/transfer/es/getInstitutionByFilter?"+params).then((res)=>{
                        if(res.status == 200){
                             this.institutionArray = res.data.institutionArray
                        }else{
                            alert("请求失败")
                        }
                    })
                }else{
                    let params = qs.stringify({field:query})
                    axios.get(this.biz.serverUrl+"/piionee/transfer/es/getScholarByFilter?"+params).then((res)=>{
                        if(res.status == 200){
                            this.scholarArray = res.data.scholarArray;
                        }else{
                            alert("请求失败")
                        }
                    })
                }               
            }
        },
        watch:{
            chainID(newVal,old){
                Promise.all([this.$store.dispatch("getChanyelian",{id:newVal})]).then(()=>{
                    this.$nextTick(()=>{
                        let children = JSON.parse(sessionStorage.getItem('children'));
                        this.children = children;
                        this.clickid = this.children[0].id;
                        let params = qs.stringify({field:this.children[0].name}) 
                        this.handleGetInsData(params)
                    })                        
                })
            }
        },
        mounted(){
            sessionStorage.setItem("tabName","科研机构")
            let chainArray = JSON.parse(sessionStorage.getItem('chainArray'));
            this.chainArray = chainArray;        
            Promise.all([this.$store.dispatch("getChanyelian",{id:1})]).then(()=>{
                this.$nextTick(()=>{
                    let children = JSON.parse(sessionStorage.getItem('children'));
                    this.children = children;
                    this.clickid = this.children[0].id;
                    let params = qs.stringify({field:this.children[0].name}) 
                    this.handleGetInsData(params)
                })                        
            })
        }
    }
</script>