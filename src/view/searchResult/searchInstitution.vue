<template>
  <div class="searchList_con">
      <div class = "searchList">
              <div class = "tableHead">
                  <span class = "Head1">机构</span>
                  <span class = "Head2">研究方向</span>
              </div>
            <table >
                <tr class = "listItem" v-for ="item in institutionArray" :key="item.id">
                    <td class = "logo_con">
                        <img :src="item.logo" alt="" class = "listItem_img" v-if="item.logo">
                        <img src="../../assets/img/企业logo-默认@2x.png" class = "listItem_img" v-else/>
                    </td>
                    
                    <td class = "listItem_info">
                        <h3 class = "listItem_name">{{item.name}}</h3>
                        <div class = "listItem_desc" v-html="item.introduction"></div>
                    </td>
                    <td class = "search_direc">
                        <span v-for="obj in item.researchList" :key="obj">{{obj}}<em></em></span>
                    </td>
                    <td class = "check_con">
                        <span class = "listItem_check" @click="getInsDel(item.id)">查看</span>
                    </td>  
                </tr>
                             
            </table>
            <!-- <div class = "listItem" v-for ="item in institutionArray" :key="item.id">
                <img :src="item.logo" alt="" class = "listItem_img" v-if="item.logo">
                <img src="../../assets/img/企业logo-默认@2x.png" class = "listItem_img" v-else/>
                <div class = "listItem_info">
                    <h3 class = "listItem_name">{{item.name}}</h3>
                    <div class = "listItem_desc" v-html="item.introduce"></div>
                </div>
                <div class = "search_direc">
                    <span v-for="obj in item.researchList" :key="obj">{{obj}}<em></em></span>
                </div>
                <span class = "listItem_check" @click="getInsDel(item.id)">查看</span>
            </div>-->
          </div> 
          <div style="float:right;margin:30px 2% 40px 0;">
            <navigation
                v-if="pages !==0"
                :pages="pages"
                @navpage="msgListView">
            </navigation>
        </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.searchList_con{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0px 1.5%;
    .searchList{
        box-sizing: border-box;
        margin-top: 5px;
        background: #fff;
        box-shadow: 1px 0px 1px 0px rgba(232,234,235,1);
        .tableHead{
            width: 100%;
            height: 48px;
            box-sizing: border-box;
            padding-left: 4.4%;
            border-bottom: 1px solid #EAEDF1;
            .Head1,.Head2{
                float: left;
                font-size: 13px;
                color: #7B8185;
                line-height: 48px;
            }
            .Head1{
                margin-left: 4%;
            }
            .Head2{
                margin-left: 38%;
            }
        }   
        table{
                border-bottom: 1px solid #EAEDF1;
                border-collapse: collapse;
                .listItem{
                    overflow: hidden;
                    width: 100%;
                    height: 120px;
                    box-sizing: border-box;
                    // padding: 24px 2%;
                    border-bottom: 1px solid #EAEDF1;
                    background: #fff;                
                    .logo_con{
                        width: 7%;
                        padding-left: 2%;
                        .listItem_img{
                            width: 58px;
                            height: 59px;
                        }
                    }
                    .listItem_info{
                        width: 40%;
                        padding-left: 1.5%;
                        .listItem_name{
                            font-size:16px;
                            font-weight: bold;
                            // font-family:"微软雅黑";
                            color:rgba(34,45,54,1);
                            // line-height:24px;
                        }
                        .listItem_desc{
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
                    .search_direc{               
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
                    .check_con{
                        width: 15%;
                        padding-left: 6%;
                        .listItem_check{
                            width: 72px;
                            display:inline-block;
                            box-sizing: border-box;
                            padding: 5px 2%;
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
        // .listItem{
        //     overflow: hidden;
        //     width: 100%;
        //     height: 120px;
        //     box-sizing: border-box;
        //     padding: 24px 2%;
        //     border-bottom: 1px solid #EAEDF1;
        //     background: #fff;
        //     .listItem_img{
        //         float: left;
        //         width: 58px;
        //         height: 59px;
        //     }
        //     .listItem_info{
        //         float: left;
        //         width: 40%;
        //         margin-left: 2.1%;
        //         .listItem_name{
        //             font-size:16px;
        //             font-weight: bold;
        //             // font-family:"微软雅黑";
        //             color:rgba(34,45,54,1);
        //             line-height:24px;
        //         }
        //         .listItem_desc{
        //             width: 100%;
        //             height: 40px;
        //             margin-top: 5px;
        //             font-size:13px;
        //             color:rgba(57,69,78,1);
        //             line-height:20px;
        //             overflow : hidden;
        //             text-overflow: ellipsis;
        //             display: -webkit-box;
        //             -webkit-line-clamp: 2;
        //             -webkit-box-orient: vertical;
        //         }
        //     }
        //     .search_direc{               
        //         float: left;
        //         margin-left: 9.5%;
        //         margin-top: 20px;
        //         width: 25%;
        //         span{
        //             box-sizing: border-box;
        //             display: inline-block;
        //             position: relative;
        //             padding-right: 5px;
        //             margin-right: 2%;
        //             font-size: 13px;
        //             color: #39454E;
        //             em{
        //             position: absolute;
        //             display: inline-block;
        //             width: 4px;
        //             height: 4px;
        //             border-radius: 2px;
        //             background:rgba(49,60,69,1);
        //             top:48%;
        //             right: -5%;
        //             }
        //         }
        //         span:last-child{
        //             em{
        //                 background: #fff;
        //             }
        //         }
        //     }
        //     .listItem_check{
        //         float: left;
        //         display:inline-block;
        //         box-sizing: border-box;
        //         padding: 5px 2%;
        //         margin: 20px 0 20px 10%;
        //         border: 1px solid RGBA(0, 142, 255, 0.7);
        //         color: #008EFF;
        //         font-size: 12px;
        //         border-radius: 2px; 
        //         cursor: pointer;
        //     }
        // }
    }
}
</style>
<script>
import qs from 'qs';
import bus from '../../store/bus.js';
import navigation from '../../components/pagination.vue'; 
import axios from 'axios';
export default {
    name: 'HelloWorld',
    components: {
        navigation,
    },
    computed:{
        institutionArray(){
            return this.$store.state.searchInsModule.institutionArray
        },
        pages(){
            return this.$store.state.searchInsModule.pages
        }
    },
    data(){
        return{
            // institutionArray:[],
            // pages:1,
            pageNum:1,//当前页
        }       
    },
    methods:{
        msgListView(curPage){
            let query = sessionStorage.getItem("searchVal")
            window.scrollTo(0,0);
            this.pageNum = curPage;
            this.$store.dispatch('getInstitutionByFilter',{query:query,page:curPage})
        },
        getStatistics(){
            axios.get(this.biz.serverUrl+"/piionee/transfer/es/getStatistics").then((res)=>{
                if(res.status == 200){
                    sessionStorage.setItem("achievement_count",res.data.achievement_count);
                    sessionStorage.setItem("institution_count",res.data.institution_count);
                    sessionStorage.setItem("scholar_count",res.data.scholar_count);
                }else{
                    alert("请求失败")
                }
            })
        },
        getInsDel(id){
            sessionStorage.setItem('institution_id',id)
            this.$router.push(`/technical/insDel`)
            sessionStorage.setItem('speName',"") 
            this.$store.dispatch('getInstitutionDetailAndScholar',{institution_id:id})          
        },
    },
    // watch:{
    //     page(val,oldVale){
    //         if(val>100){
    //             this.pages = 100
    //         }
    //     }
    // },
    mounted(){
        let query = sessionStorage.getItem("searchVal")
        this.$store.dispatch('getInstitutionByFilter',{query:query})
        // this.getInstitutionByFilter();
        this.getStatistics();
        // bus.$on("getIns",()=>{
        //     this.getInstitutionByFilter();
        // })
    }
}
</script>
