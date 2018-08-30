<template>
  <div class = "find_con">
    <div class = "find_top">
       <div class = "topFitst">
           <img src="../../assets/img/bg-蓝@2x.png" alt="" class="bgImg">
         <div class = "topHead">          
           <img src="../../assets/img/机构@2x.png" alt="" class = "topHead_img">
           <span class = "eng">institutions</span>
         </div>
         <p>顶尖科研机构</p>
         <h3>{{topNumber.institution_count}}</h3>
       </div>
       <div class = "topSecond">
           <img src="../../assets/img/bg-黄@2x.png" alt="" class="bgImg">
         <div class = "topHead">            
           <img src="../../assets/img/团队@2x.png" alt="" class = "topHead_img" style="width:15px;height:14px">
           <span class = "eng">team</span>
         </div>
         <p>科研创新团队</p>
         <h3>{{topNumber.team_count}}</h3>
       </div>
       <div class = "topThird">
           <img src="../../assets/img/bg-绿@2x.png" alt="" class="bgImg">
         <div class = "topHead">          
           <img src="../../assets/img/专家@2x.png" alt="" class = "topHead_img" style="width:15px;height:14px">
           <span class = "eng">experts</span>
         </div>
         <p>技术专家</p>
         <h3>{{topNumber.scholar_count}}</h3>
       </div>
       <div class = "topFoured">
           <img src="../../assets/img/bg-紫@2x.png" alt="" class="bgImg">
         <div class = "topHead">          
           <img src="../../assets/img/成果@2x.png" alt="" class = "topHead_img">
           <span class = "eng">results</span>
         </div>
         <p>重点技术成果</p>
         <h3>{{topNumber.achievement_count}}</h3>
       </div>
    </div>
    <div class ="find_middle1">
        <div class = "floatBox">
            <div class = "newWord">热门行业最新研究成果</div>
            <div class = "moreSecifitic" @click="goMoreSecifitic">更多>>查看全部成果</div>
        </div>
      
      <div class = "achievement_box">
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
                <div class = "searchDesc_con">
                    <span class = "searchDesc" @click="getInsDel(obj.institution.id)">{{obj.institution.name}}</span>
                </div>
                
                <span class = "specialName" v-for="item in obj.scholarArray" :key="item.id">{{item.name}}</span>
                <span class = "listItem_check" @click="getAchieveDel(obj.id)">查看</span>
            </div>
      </div>
    </div>
     <div class = "find_middle2">
        <div class = "newWord">热门行业最新专利（申请专利）</div>
        <div class = "main">
            <div class = "special_box">
                <div class = "tableHead2">
                    <span class = "Head1">专利名称</span>
                    <span class = "Head2">申请人</span>
                    <span class = "Head3">发明人</span>
                    <span class = "Head4">关键词</span>
                    <span class = "Head5">摘要</span>
                    <span class = "Head6">申请时间</span>
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
                        <!-- @click="showRemark(obj.id,$event)" -->
                        <!--  @click="clickImg(obj.id,$event)" @click="clickImgHide(obj.id,$event)" -->
                        <div class = "remark" @click="showRemark(obj.id,$event)">
                            <span>摘要</span>
                            <img src="../../assets/img/摘要-箭头-展开@2x.png" alt="" class = "specialMore">
                            <img src="../../assets/img/摘要-箭头-收起@2x.png" alt="" class = "specialMore specialHide" >
                        </div>  
                        <div class = "special_date">2017.10.09</div>                  
                    </div>
                    <!-- <div v-if="remarkShow == 2"></div> -->
                    <div class = "remorkText" :id="'show'+obj.id">
                        申请号：{{obj.patent_code}}<br/>
                        摘要：{{obj.abstract}}
                    </div>
                </div>
            </div>
        </div>
     </div>
    <div class = "find_bottom">
      <div class = "bottom_left">
        <div class ="bottomLefthead">
          <div class = "newWord">热门领域活跃机构</div>
          <span class = "moreIns" @click="getMoreIns">更多机构></span>
        </div>
        <div class ="bottom_leftMin">
          <div class ="leftMin" v-for="item in institutionArray" :key="item.id">
            <img :src="item.logo" alt="" class ="leftLogo" v-if="item.logo">
            <img src="../../assets/img/企业logo-默认@2x.png" class = "leftLogo" v-else/>
            <div class = "left_desc">
              <div class = "ins_name">{{item.name}}</div>
              <div class = "ins_direc">
                <span v-for="obj in item.researchList" :key="obj.id">{{obj}}<em></em></span>
              </div>
            </div>
            <span class = "left_check" @click="getInsDel(item.id)">查看</span>
          </div>
        </div>
      </div>
      <div class = "bottom_right">
        <div class ="bottomLefthead">
          <div class = "newWord">热门领域活跃专家</div>
          <span class = "moreIns" @click="getMoreScholar">更多专家></span>
        </div>
        <div class = "bottom_rightMin">
          <div class = "rightMin" v-for="item in scholarArray" :key="item.id">
            <div class = "right_left">
              <div class = "right_top">
                <span class = "people_name">{{item.name}}</span>
                <span class = "right_ins" @click="getInsDel(item.institution.id)">{{item.institution.name}}</span>
              </div>
              <div class = "ins_direc">
                  <span v-for="obj in item.researchList" :key="obj.id">{{obj}}<em></em></span>
              </div>
            </div>
            <span class = "right_check" @click="getScholar(item.id,item.name,item.institution.id)">查看</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.find_con{
  width: 100%;
  box-sizing: border-box;
  padding: 20px 2%;
  .find_top{
    width: 100%;
    overflow: hidden;
    .topFitst,.topSecond,.topThird,.topFoured{
      float: left;
      width: 23.5%;
      margin-right: 2%;
      position: relative; 
      .bgImg{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 153px;
      }
      .topHead{
        position: absolute;
        width: 100%;
        height: 36px;
        top:0;
        // z-index: 2;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        .topHead_img{
          width: 14px;
          height: 14px;
          margin: 11px 10%;
        }
        .eng{
          float: right;
          width: 37%;
          height: 36px;
          line-height: 36px;
          color: rgba(255,255,255,0.5);
          border-left: 1px solid rgba(255,255,255,0.3);
          text-align: center;
        }
      }
      p{
        position: absolute;
        font-size:12px;
        color:rgba(255,255,255,0.8);
        line-height:17px;
        margin: 110px 0 0 11%;
      }
      h3{
        position: absolute;
        font-size:24px;
        font-family:ArialMT;
        color:rgba(255,255,255,1);
        line-height:28px;
        margin: 75px 0 0 10%;
      }
    }
    .topFitst{
      height: 153px;
    //   background: url("../../assets/img/bg-蓝@2x.png");
      background-size: 100% 100%;
    }
    .topSecond{
      height: 153px;
    //   background: url("../../assets/img/bg-黄@2x.png");
      background-size: 100% 100%;
    }
    .topThird{
      height: 153px;
    //   background: url("../../assets/img/bg-绿@2x.png");
      background-size: 100% 100%;
    }
    .topFoured{
      margin-right: 0%;
      height: 153px;
    //   background: url("../../assets/img/bg-紫@2x.png");
      background-size: 100% 100%;
    }
  }
  .find_middle1{
    width: 100%;
    box-sizing: border-box;
    .floatBox{
        overflow: hidden;
        .newWord{
            box-sizing: border-box;
            padding-left: 0.5%;
            line-height: 16px;
            font-size: 16px;
            font-family: "微软雅黑";
            border-left: 3px solid RGBA(0, 142, 255, 1);
            color: #222D36;
            font-weight: bold;
            margin:26px 0 16px 0;
            float: left;
            overflow: hidden;
            width: 50%;            
        }
        .moreSecifitic{
            float: right;
            margin:26px 0 16px 0;
            font-size: 13px;
            color: #008eff;
            cursor: pointer;
        }
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
                margin-left: 16.6%;
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
            .achievementImg,.listItem_info,.searchDesc_con,.specialName,.listItem_check{
                float: left;
            }
            .achievementImg{
                width: 180px;
                height: 113px;
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
            .searchDesc_con{
                width: 20%;
                margin-left:6%;
                margin-top: 48px;
                .searchDesc{
                    font-size:13px;
                    color:rgba(0,142,255,1);
                    line-height:20px;                                        
                    cursor: pointer;
                }
                .searchDesc:hover{
                    border-bottom: 1px solid rgba(0,142,255,1);
                }
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
                width: 72px;
                height: 28px;
                text-align: center;
                line-height: 29px;
                border: 1px solid rgba(0,142,255,0.7);
                color: rgba(0,142,255,1);
                cursor: pointer;
                margin-top: 42px;
                border-radius: 2px;
            }
        }
    }
  }
  .find_middle2{
    width: 100%;
    box-sizing: border-box;
    .newWord{
        box-sizing: border-box;
        padding-left: 0.5%;
        line-height: 16px;
        font-size: 16px;
        font-family: "微软雅黑";
        border-left: 3px solid RGBA(0, 142, 255, 1);
        color: #222D36;
        font-weight: bold;
        margin:26px 0 16px 0;
    }
    .main{
        width: 100%;
        box-sizing: border-box;
        margin-top: 5px;
        background: #fff;
        box-shadow: 1px 0px 1px 0px rgba(232,234,235,1);
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
                .Head1,.Head2,.Head3,.Head4,.Head5,.Head6{
                    float: left;
                    font-size: 13px;
                    color: #7B8185;
                    line-height: 48px;
                }
                .Head2{
                    margin-left:26.8%;
                }
                .Head3{
                    margin-left:10%;
                }
                .Head4{
                    margin-left:10%;
                }
                .Head5{
                    margin-left:17%;
                }
                .Head6{
                    margin-left:10%;
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
                                padding: 6px 3%;
                                margin-right: 4%;
                                margin-bottom: 10px;
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
                        margin-left: 3%;
                    }
                    .keyWord{
                        width: 19%;
                        margin-left:8%;
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
                            // em{
                            //     position: absolute;
                            //     display: inline-block;
                            //     width: 3px;
                            //     height: 3px;
                            //     border-radius: 1.5px;
                            //     background:rgba(49,60,69,1);
                            //     top:47%;
                            //     right:-1%;
                            // }
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
                        float: left;
                        box-sizing: border-box;
                        padding-left:15px;
                        margin-left:1%;
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
                            width: 9px;
                            height:6px;
                            vertical-align: middle;
                            position: absolute;                        
                            top:11px;
                            right:15px;
                        }
                        .specialHide{
                            visibility: hidden;
                        }
                    } 
                    .special_date{
                        float: left;
                        width: 5%;
                        margin-top: 28px;
                        margin-left: 7%;
                        font-size:13px;
                        font-family:SourceHanSansCN-Regular;
                        color:rgba(57,69,78,1);
                        line-height:18px;
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
  .find_bottom{
    width: 100%;
    overflow: hidden;    
    .bottom_left,.bottom_right{
      float: left;
      width: 49%;
      .bottomLefthead{
        width: 100%;
        overflow: hidden;
        .newWord{
          float: left;
          box-sizing: border-box;
          padding-left: 1%;
          font-size: 16px;
          font-family: "微软雅黑";
          border-left: 3px solid RGBA(0, 142, 255, 1);
          color: #222D36;
          font-weight: bold;
          margin:26px 0 16px 0;
          line-height: 16px;
        }
        .moreIns{
          float: left;
          font-size:13px;
          color:rgba(0,142,255,1);
          line-height:20px;
          margin:26px 0 13px 5%;
          cursor: pointer;
        }
      }      
    }
    .bottom_left{
        margin-right: 2%;
      .bottom_leftMin{
        box-sizing: border-box;
        border-bottom: 1px solid #EAEDF1;
        .leftMin{
          box-sizing: border-box;
          padding: 20px 6%;
          width: 100%;
          height:127px;
          overflow: hidden;
          background: #fff;
          border-bottom: 1px solid #EAEDF1;
          .leftLogo,.left_desc,.left_check{
            float: left;
          }
          .leftLogo{
            width: 58px;
            height: 59px;
            margin-right: 5%;
          }
          .left_desc{
            width: 60%;
            .ins_name{
                font-size: 16px;
                color: #222D36;
                font-weight: bold;
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .ins_direc{
              margin-top: 10px;
              width: 100%;
              span{
                  box-sizing: border-box;
                  display: inline-block;
                  position: relative;
                  padding-right: 6px;
                  margin-right: 6px;
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
          }
          .left_check{
            float: right;
            display:inline-block;
            box-sizing: border-box;
            padding: 5px 3%;
            margin: 20px 0 20px 10%;
            border: 1px solid RGBA(0, 142, 255, 0.7);
            color: #008EFF;
            font-size: 12px;
            border-radius: 2px; 
            cursor: pointer;
          }
        }
      }
    }
    .bottom_right{
        margin-right: 0;
      .bottom_rightMin{
        box-sizing: border-box;
        border-bottom: 1px solid #EAEDF1;
        .rightMin{
          box-sizing: border-box;
          padding: 20px 6%;
          width: 100%;
          height:127px;
          overflow: hidden;
          background: #fff;
          border-bottom: 1px solid #EAEDF1;
          .right_left,.right_check{
            float: left;
          }
          .right_left{
            width: 70%;
            .right_top{
              .people_name{
                display: inline-block;
                font-size:16px;
                font-family:"微软雅黑";
                color:rgba(34,45,54,1);
                line-height:24px;
                font-weight: bold;
                margin-right: 5%;
              }
              .right_ins{
                display: inline-block;
                font-size:13px;
                color:rgba(0,142,255,1);
                line-height:20px;
                cursor: pointer;
              }
              .right_ins:hover{
                border-bottom: 1px solid #008EFF;
              }
            }
            .ins_direc{
              margin-top: 15px;
              width: 100%;
              span{
                  box-sizing: border-box;
                  display: inline-block;
                  position: relative;
                  padding-right: 6px;
                  margin-right: 6px;
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
          }
          .right_check{
              float: right;
              display:inline-block;
              box-sizing: border-box;
              padding: 5px 3%;
              margin: 20px 0 20px 10%;
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
        achievementArray(){
            return this.$store.state.findModule.achievementArray
        },
        patentArray(){
            return this.$store.state.findModule.patentArray
        },
        topNumber(){
            return this.$store.state.findModule.topNumber
        },
        scholarArray(){
            return this.$store.state.findModule.scholarArray
        },
        institutionArray(){
            return this.$store.state.findModule.institutionArray
        },
    },
    data(){
        return{
            achievementNum: "234",
            specialNum:"123",
            classWord1: sessionStorage.getItem('classWord1'),
            show: true,
            findremarkShow: sessionStorage.getItem("findremarkShow"),
            keyword:["水电试试","飒飒飒飒","三世啊","啊啊","啊啊啊啊啊啊啊"],
        }
    },
    methods:{
        changeShow(index){
            sessionStorage.setItem('classWord1',index)
            this.classWord1 = sessionStorage.getItem('classWord1');
            if(index == 1){
                this.show = true;
            }
            if(index == 2){
                this.show = false;
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
        clickImg(id,e){
            $('#show'+id).css({'display':'block'})
            $(e.target).addClass('specialHide')
            $(e.target.nextElementSibling).removeClass('specialHide')
        },
        clickImgHide(id,e){
            $('#show'+id).css({'display':'none'})
            $(e.target).addClass('specialHide');
            $(e.target.previousElementSibling).removeClass('specialHide')
            
            // 
        },
        goMoreSecifitic(){
            this.$router.push(`/technical/secientific`);
        },
        getInsDel(id){
            sessionStorage.setItem('institution_id',id)
            this.$router.push(`/technical/insDel`);
            sessionStorage.setItem('speName',"") 
            this.$store.dispatch('getInstitutionDetailAndScholar',{institution_id:id})                      
        },
        getScholar(id,name,insId){
            this.$router.push(`/technical/insDel`)
            sessionStorage.setItem("institution_id",insId);
            sessionStorage.setItem("scholarId",id);
            sessionStorage.setItem('speName',name)
            this.$store.dispatch('getSchDel',{institution_id:insId,scholar_id:id}) 
        },
        getAchieveDel(id){
            console.log(id)
            sessionStorage.setItem('scientificId',id);
            this.$router.push(`/technical/scientificDetail`)
            bus.$emit('scientificDetail');
        },
        getMoreScholar(){
            sessionStorage.setItem('current',3)
            this.$router.push(`/technical/special`)
        },
        getMoreIns(){
            this.$router.push('/technical/institution')
        }
    },
    mounted(){
        window.scrollTo(0,0)
        this.$store.dispatch("getFindPatentByQuery");
        this.$store.dispatch("getPatentByQuery2");
        this.$store.dispatch("getStatistics");
        this.$store.dispatch("getScholarByFilter");
        this.$store.dispatch("getInstitutionByFilter");
        sessionStorage.setItem('classWord1',1);
        sessionStorage.setItem('findremarkShow',-1);
    }
}
</script>