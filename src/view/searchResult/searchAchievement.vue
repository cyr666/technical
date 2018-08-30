<template>
  <div class = "achievement_con">
      <div class = "main">
            <div class = "chassWord">
                <span class = "chassWord1" @click="changeShow(1)" :class="classWord==1?'action':''">专利<em>（{{queryStatics.patent_num}}）</em></span>
                <span class = "chassWord2" @click="changeShow(2)" :class="classWord==2?'action':''">研究成果<em>（{{queryStatics.achievement_num}}）</em></span>
            </div>
            
            <div class = "special_box" v-if="show">
                <div class = "tableHead2">
                    <span class = "Head1">专利名称</span>
                    <span class = "Head2">申请人</span>
                    <span class = "Head3">公开号</span>
                    <span class = "Head4">技术应用领域</span>
                </div>
                <div class = "specialList_con" v-for="obj in patentArray" :key="obj.id">
                    <div class = "special_list" >
                        <div class = "first_con">
                            <div class = "special_name">{{obj.title}}</div>
                            <div class = "mainWord">
                                <span v-for="i in obj.keywordObject.keyword" :key="i">{{i}}</span>
                            </div>
                        </div>
                        
                        <div class = "special_people">{{obj.applicant}}</div>
                        <span class = "classSpecial">{{obj.patent_code}}</span>
                        <div class = "keyWord">
                            <span class = "F_term">{{obj.keywordObject.main_IPC}}<em></em></span>
                            <span class = "main_IPC">{{obj.keywordObject.F_term}}</span>
                            <!-- <span v-for="item in keyword">{{item}}</span> -->
                        </div>
                        <div class = "remark"  @click="showRemark(obj.id,$event)">
                            <span>摘要</span>
                            <img src="../../assets/img/摘要-箭头-展开@2x.png" alt="" class = "specialMore">
                            <img src="../../assets/img/摘要-箭头-收起@2x.png" alt="" class = "specialMore specialHide">
                        </div>                    
                    </div>
                    <!-- <div v-if="remarkShow == 2"></div> -->
                    <div class = "remorkText" :id="'show'+obj.id">
                        摘要：{{obj.abstract}}
                    </div>
                </div>
            </div>
            <div class = "achievement_box" v-else>
                <div class = "tableHead1">
                    <span class = "Head1">成果</span>
                    <span class = "Head2">研究机构</span>
                    <span class = "Head3">专家学者</span>
                </div>
                <div class = "achievement_list" v-for="obj in achievementArray" :key="obj.id">
                    <img :src="obj.cover" alt="" class = "achievementImg">
                    <div class = "listItem_info">
                        <h3 class = "listItem_name">{{obj.title}}</h3>
                        <p class = "listItem_desc">{{obj.abstracts}}</p>
                    </div>
                    <span class = "searchDesc" @click="getInsDel(obj.institution.id)">{{obj.institution.name}}</span>
                    <span class = "specialName" v-for="item in obj.scholarArray" :key="item.id">{{item.name}}</span>
                    <span class = "listItem_check" @click="getAchieveDel(obj.id)">查看</span>
                </div>
            </div>
      </div>
      <div style="float:right;margin:30px 2% 40px 0;z-index:9999;overflow:hidden:height:100px">
        <navigation
            v-if="pages !==0"
            :pages="pages"
            @navpage="msgListView">
        </navigation>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .achievement_con{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0px 1%;
        .main{
            box-sizing: border-box;
            margin-top: 5px;
            background: #fff;
            box-shadow: 1px 0px 1px 0px rgba(232,234,235,1);
            .chassWord{
                box-sizing: border-box;
                width: 100%;
                height: 48px;
                padding: 0 3%;
                border-bottom: 1px solid #EAEDF1;
            }
            .chassWord1,.chassWord2{
                display: inline-block;
                font-size: 14px;
                color: #222D36;
                line-height: 48px;
                cursor: pointer;
                em{
                    color: #9DA9B2;
                }
            }
            .chassWord1{
                margin-right: 3%;
            }
            .action{
                // height: 47px;
                color: #008EFF;
                border-bottom: 2px solid #008EFF;
            }
            .achievement_box{
                box-sizing: border-box;
                margin-top: 5px;
                background: #fff;
                // box-shadow: 1px 0px 1px 0px rgba(232,234,235,1);
                .tableHead1{
                    box-sizing: border-box;
                    width: 100%;
                    height: 48px;
                    box-sizing: border-box;
                    padding-left: 4.4%;
                    border-bottom: 1px solid #EAEDF1;
                    .Head1,.Head2,.Head3{
                        float: left;
                        font-size: 13px;
                        color: #7B8185;
                        line-height: 48px;
                    }
                    .Head1{
                        margin-left: 16%;
                    }
                    .Head2{
                        margin-left: 33%;
                    }
                    .Head3{
                        margin-left: 22%;
                    }
                }
                .achievement_list{
                    overflow: hidden;
                    width: 100%;
                    // height: 134px;
                    box-sizing: border-box;
                    padding: 24px 2%;
                    border-bottom: 1px solid #EAEDF1;
                    background: #fff;
                    .achievementImg,.listItem_info,.searchDesc,.specialName,.listItem_check{
                        float: left;
                    }
                    .achievementImg{
                        width: 180px;
                        height: 112px;
                    }
                    .listItem_info{
                        width: 29%;
                        margin-left: 2.1%;
                        .listItem_name{
                            font-size:16px;
                            font-weight: bold;
                            // font-family:"微软雅黑";
                            color:rgba(34,45,54,1);
                            line-height:24px;
                        }
                        .listItem_desc{
                            width: 100%;
                            height: 57px;
                            margin-top: 15px;
                            font-size:13px;
                            color:rgba(57,69,78,1);
                            line-height:20px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                        }
                    }
                    .searchDesc{
                        width: 20%;
                        font-size:13px;
                        color:rgba(0,142,255,1);
                        line-height:20px;
                        margin-top: 48px;
                        margin-left:6%;
                        cursor: pointer;
                    }
                    .searchDesc:hover{
                        border-bottom: 1px solid rgba(0,142,255,1);
                    }
                    .specialName{
                        font-size:13px;
                        color:rgba(57,69,78,1);
                        line-height:20px;
                        margin-top: 48px;
                        margin-left:8%;
                    }
                    .listItem_check{
                        float: right;
                        font-size: 13px;
                        padding: 6px 2%;
                        border: 1px solid rgba(0,142,255,0.7);
                        color: rgba(0,142,255,0.7);
                        cursor: pointer;
                        margin-top: 42px;
                        margin-left:8%;
                    }
                }
            }
            .special_box{
                box-sizing: border-box;
                margin-top: 5px;
                background: #fff;
                .tableHead2{
                    box-sizing: border-box;
                    width: 100%;
                    height: 48px;
                    box-sizing: border-box;
                    padding-left: 3%;
                    border-bottom: 1px solid #EAEDF1;
                    .Head1,.Head2,.Head3,.Head4{
                        float: left;
                        font-size: 13px;
                        color: #7B8185;
                        line-height: 48px;
                    }
                    .Head2{
                        margin-left:27%;
                    }
                    .Head3{
                        margin-left:15%;
                    }
                    .Head4{
                        margin-left:11%;
                    }
                }
                .specialList_con{
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    // height: 154px;
                    box-sizing: border-box;
                    padding-top: 30px;
                    
                    .special_list{
                        position: relative;
                        overflow: hidden; 
                        width: 100%;                       
                        // height: 154px;
                        box-sizing: border-box;
                        padding: 0px 3% 30px 3%;
                        background: #fff;
                        border-bottom: 1px solid #EAEDF1;
                        .first_con,.special_people,.classSpecial,.keyWord{
                            float: left;
                        }
                        .first_con{
                            width: 28%;
                            .special_name{
                                width: 100%;
                                // height:88px;
                                font-size:13px;
                                font-weight: bold;
                                font-family:"微软雅黑";
                                color:#39454E;
                                line-height:20px;
                                overflow : hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                            }
                            .mainWord{
                                width: 100%;
                                margin-top:15px;
                                span{
                                    display: inline-block;
                                    padding: 4px 10px;
                                    margin-right: 10px;
                                    margin-bottom: 5px;
                                    background:rgba(0,142,255,0.1); 
                                    border-radius: 4px ;
                                    font-size:13px;
                                    font-family:"微软雅黑";
                                    color:rgba(93,104,112,1);
                                    line-height:20px;
                                }
                            }
                        }
                        
                        .special_people{
                            margin-left: 5%; 
                            margin-top: 28px;
                            width: 10%;
                            // height: px;
                            font-size:13px;
                            font-family:SourceHanSansCN-Regular;
                            color:rgba(57,69,78,1);
                            line-height:18px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 5;
                            -webkit-box-orient: vertical;
                        }
                        .classSpecial{
                            font-size:13px;
                            font-family:SourceHanSansCN-Regular;
                            color:rgba(57,69,78,1);
                            margin-top: 28px;
                            margin-left: 9%;
                        }
                        .keyWord{
                            width: 19%;
                            margin-left:9%;
                            margin-top: 28px;
                            span{
                                font-size:13px;
                                font-family:"微软雅黑";
                                color:rgba(57,69,78,1);
                                line-height:20px;
                            }
                            .F_term{
                                display: inline-block;
                                width:42%;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                            .main_IPC{
                                display: inline-block;
                                width:55%;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                        } 
                        .remark{
                            width: 72px;
                            height: 28px;
                            position: relative;
                            float: right;
                            box-sizing: border-box;
                            padding-left:15px;
                            // text-align: center;
                            border: 1px solid #008EFF;
                            border-radius: 2px;
                            margin-top: 25px;
                            cursor: pointer;
                            span{
                                font-size: 13px;
                                color: #008EFF;
                                line-height: 27px;
                            }
                            .specialMore{
                                position: absolute;
                                width: 9px;
                                height:6px;
                                vertical-align: middle;
                                top:11px;
                                right:15px;
                            }
                            .specialHide{
                                visibility: hidden;
                            }
                        }                
                    }
                    .remorkText{
                        clear: both;
                        padding: 24px 15% 24px 30px;
                        background:rgba(242,249,255,1);
                        font-size:13px;
                        color:rgba(130,137,149,1);
                        line-height:24px;
                        display: none;
                    }   
                }
            }
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
            queryStatics(){
                return this.$store.state.searchInsModule.queryStatics
            }
        },
        data(){
            return{
                achievementNum: "",
                specialNum:"",
                classWord: sessionStorage.getItem('classWord'),
                show: true,
                remarkShow: sessionStorage.getItem("remarkShow"),
                keyword:[],
                pages:1,
                pageNum:1,//当前页
                achievementArray:[],
                patentArray:[],
                flug:1,
            }
        },
        methods:{
            msgListView(curPage){
                this.pageNum = curPage;
                if(this.flug==1){
                    this.getPatentByQuery2()
                }else if(this.flug == 2){
                   this.getPatentByQuery()
                }
            },
            changeShow(index){
                sessionStorage.setItem('classWord',index)
                this.classWord = sessionStorage.getItem('classWord');
                if(index == 1){
                    this.show = true;
                    this.flug=1;
                    this.getPatentByQuery2()
                }
                if(index == 2){
                    this.show = false;
                    this.flug=2;
                    this.getPatentByQuery()
                }
            },
            showRemark(index,e){
                if(e.target.nextElementSibling.className == "specialMore"){
                    $('#show'+index).css({'display':'block'})
                    $(e.target.nextElementSibling).addClass('specialHide')
                    $(e.target.nextElementSibling.nextElementSibling).removeClass('specialHide')
                }else{
                    $(e.target.nextElementSibling).removeClass('specialHide')
                    $(e.target.nextElementSibling.nextElementSibling).addClass('specialHide')
                    $('#show'+index).css({'display':'none'})
                }
            },
            getPatentByQuery(){
                let query = sessionStorage.getItem('searchVal');
                let params = qs.stringify({query:query,page:this.pageNum})
                axios.get(this.biz.serverUrl+"/piionee/transfer/es/getPatentByQuery?"+params).then((res)=>{
                    if(res.status == 200){
                       this.achievementArray = res.data.achievementArray;
                        this.pages = Math.ceil(res.data.numFound/8);
                        if(this.pages>100){
                            this.pages = 100
                        }
                    }else{
                        alert("请求失败")
                    }
                })
            },
            getPatentByQuery2(){
               let query = sessionStorage.getItem('searchVal');
                let params = qs.stringify({query:query,type:'patent',page:this.pageNum})
                axios.get(this.biz.serverUrl+"/piionee/transfer/es/getPatentByQuery?"+params).then((res)=>{
                    if(res.status == 200){
                       this.patentArray = res.data.patentArray;
                       this.patentArray.forEach((obj,ind)=>{
                           obj.keywordObject.keyword=obj.keywordObject.keyword.split(";");
                           if(obj.keywordObject.keyword.length>3){
                               obj.keywordObject.keyword.length = 3
                           }
                       })
                       this.pages = Math.ceil(res.data.numFound/8);
                       if(this.pages>100){
                            this.pages = 100
                        }
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
            getAchieveDel(id){
                sessionStorage.setItem('scientificId',id);
                this.$router.push(`/technical/scientificDetail`)
                bus.$emit('scientificDetail');
            },
        },
        mounted(){
            this.getPatentByQuery2();
            sessionStorage.setItem('classWord',1);
            sessionStorage.setItem('remarkShow',-1);
            bus.$on("classWord",()=>{
                this.show = true;
                this.getPatentByQuery2();
                sessionStorage.setItem('classWord',1);
                this.classWord = sessionStorage.getItem('classWord')
            })
        }
    }
</script>