<template>
  <div class = "searchList_con">
      <div class = "searchList">
              <div class = "tableHead">
                  <span class = "Head1">专家</span>
                  <span class = "Head2">所属机构</span>
                  <span class = "Head3">研究方向</span>
                  <span class = "Head4">学术产出</span>
              </div>
              <table>
                  <tr class = "listItem" v-for="item in scholarArray" :key="item.id">
                      <td class = "special_name">
                          {{item.name}}
                      </td>
                      <td class = "listItem_name">
                          <span @click="getInsDel(item.institution.id)" class="insname">{{item.institution.name}}</span>
                      </td>
                      <td class = "search_direc">
                          <span v-for="obj in item.researchList" :key="obj.id">{{obj}}&nbsp;<em></em></span>
                      </td>
                      <td class = "special_num">
                          {{item.paper_num}}
                      </td>
                      <td  class = "listItem_check">
                          <span @click="getScholar(item.id,item.name,item.institution.id)">查看</span>
                      </td>
                  </tr>
              </table>
              <!-- <div class = "listItem" v-for="item in scholarArray" :key="item.id">
                <span class = "special_name">{{item.name}}</span>
                <h3 class = "listItem_name" @click="getInsDel(item.institution.id)">{{item.institution.name}}</h3>
                <div class = "search_direc">
                    <span v-for="obj in item.researchList" :key="obj.id">{{obj}}<em></em></span>
                </div>
                <span class = "special_num">{{item.paper_num}}</span>
                <span class = "listItem_check" @click="getScholar(item.id,item.name,item.institution.id)">查看</span>
            </div> -->
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
        padding: 15px 1%;
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
                border-bottom: 1px solid #EAEDF1;
                border-collapse: collapse;
                .listItem{
                    overflow: hidden;
                    width: 100%;
                    height: 90px;
                    box-sizing: border-box;
                    padding: 0 2%;
                    border-bottom: 1px solid #EAEDF1;
                    background: #fff;
                    .special_name{
                        width: 7%;
                        padding-left: 2%;
                        font-size: 16px;
                        color: #222D36;
                        font-weight: bold;
                        line-height: 90px;
                    }
                    
                    .listItem_name{  
                        width:25%;
                        padding-left: 4%;
                        // padding-right: 6%;                   
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
                    
                    
                    .search_direc{
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
                    .special_num{
                        padding-left: 7%; 
                        color: #39454E;
                        font-size: 13px;
                        line-height: 22px;
                        width: 12%;
                    }
                    .listItem_check{
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
            // .listItem{
            //     overflow: hidden;
            //     width: 100%;
            //     height: 90px;
            //     box-sizing: border-box;
            //     padding: 0 2%;
            //     border-bottom: 1px solid #EAEDF1;
            //     background: #fff;
            //     .special_name{
            //         float: left;
            //         font-size: 16px;
            //         color: #222D36;
            //         font-weight: bold;
            //         line-height: 90px;
            //         margin-left: 0.5%;
            //         width: 5%;
            //     }
            //     .listItem_name{
            //         float: left;
            //         width:11%;
            //         margin: 34px 0 0 7.5%;
            //         color: #008EFF;
            //         font-size: 13px;
            //         line-height: 20px;
            //         cursor: pointer;
            //     }
            //     .listItem_name:hover{
            //         border-bottom: 1px solid #008EFF;
            //     }
            //     .search_direc{
            //         float: left;
            //         margin: 20px 0 0 20%;
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
            //                 position: absolute;
            //                 display: inline-block;
            //                 width: 4px;
            //                 height: 4px;
            //                 border-radius: 2px;
            //                 background:rgba(49,60,69,1);
            //                 top:48%;
            //                 right: -5%;
            //             }
            //         }
            //         span:last-child{
            //             em{
            //                 background: #fff;
            //             }
            //         }
            //     }
            //     .special_num{
            //        float: left;
            //        display:inline-block; 
            //        color: #39454E;
            //        font-size: 13px;
            //        line-height: 22px;
            //         margin-top: 37px;
            //         margin-left: 13%;
            //         width:5%;
            //     }
            //     .listItem_check{
            //         float: left;
            //         display:inline-block;
            //         box-sizing: border-box;
            //         padding: 5px 2%;
            //         margin: 32px 0 0px 6%;
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
import remove from '../array.js' 
export default {
    name: 'HelloWorld',
    components: {
        navigation,
    },
    data(){
        return{
            scholarArray:[],
            pages:1,
            pageNum:1,//当前页
        }
    },
    methods:{
        msgListView(curPage){
            window.scrollTo(0,0)
            this.pageNum = curPage;
            this.getScholarByFilter();
        },
        getScholarByFilter(){
            let query = sessionStorage.getItem("searchVal")
            let params = qs.stringify({page:this.pageNum,query:query})
            axios.get(this.biz.serverUrl+"/piionee/transfer/es/getScholarByQuery?"+params).then((res)=>{
                if(res.status == 200){
                    this.pages = Math.ceil(res.data.numFound/8);
                    if(this.pages>100){
                        this.pages = 100
                    }
                    this.scholarArray = res.data.scholarArray;
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
        getScholar(id,name,insId){
            this.$router.push(`/technical/insDel`)
            sessionStorage.setItem("institution_id",insId);
            sessionStorage.setItem("scholarId",id);
            sessionStorage.setItem('speName',name)
            this.$store.dispatch('getSchDel',{institution_id:insId,scholarId:id})  
        },
    },
    mounted(){
        this.getScholarByFilter();
    }
}
</script>
