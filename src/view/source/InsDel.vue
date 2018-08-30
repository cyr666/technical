<template>
    <div class = "InsDel_con">
        <div class = "success_con" v-if="insDelShow">
            <div class = "insBox">
                <div class = "insDirec">{{insDel.Ins_name}}</div>
                <div class = "insMain" ref="insMain">
                    <div style="background: #ccc">
                        <img :src="insDel.Ins_logo" alt="" class = "ins_logo" v-if="insDel.Ins_logo">
                        <img src="../../assets/img/resultIns.png" alt="" class = "ins_logo" v-else>
                    </div>
                    <div class = "insText" v-html="insDel.introduction" v-if="insDel.introduction"></div>
                    <div class = "insText" v-else>暂无简介!</div>
                </div>
                <div class = "footer" v-if="show" @click="clickMore">
                    <img src="../../assets/img/机构详情-展开@2x.png" alt="" class = "more_img"><span class = "clickMore">展开</span>
                </div>
                <div class = "footer" v-if="moreStop" @click="clickStop">
                    <img src="../../assets/img/机构详情-收起@2x.png" alt="" class = "more_img"><span class = "clickMore">收起</span>
                </div>
            </div>
            <div class = "specialBox">
                <div class = "insSpecial">机构专家分布</div>
                <div class = "insSpecialBox">
                    <div class = "specialDirec">
                        <span class = "direc_word">研究方向</span>
                        <div class = "Direc_con">
                            <span  v-for="(item,index) in insDel.researchList" :key="index" :class="direc==index?'onlyStyle1':''" @click="handleInsDire(item,index)">{{item}}</span>
                        </div>
                        <div class = "InsImg_con">
                            <img src="../../assets/img/展开@2x.png" alt="" class = "InsMore_img" v-if ="moreShow" @click="ClickMoreIns">
                            <img src="../../assets/img/收起@2x.png" alt="" class = "InsMore_img" v-else  @click ="ClickStopIns" >
                        </div> 
                    </div>
                    <div class = "specialName_con">
                        <span class = "name_word">专家</span>
                        <div class = "specialName">
                            <div class = "name_con" :class="specialName==index?'onlyStyle2':''" v-for="(item,index) in insDel.scholarArray" :key="index" @click="handleScolar(index,item.id,item.name)">
                                <img src="../../assets/img/专家-pass.png" alt="" class = "special_icon" v-if="specialName==index">
                                <img src="../../assets/img/专家-nor.png" alt="" class = "special_icon" v-else>
                                <span class = "spename">{{item.name}}</span>
                            </div>
                            <div class = "InsImg_con">
                                <img src="../../assets/img/展开@2x.png" alt="" class = "InsMore_img" v-if ="SpeMoreShow" @click="ClickMoreSpe">
                                <img src="../../assets/img/收起@2x.png" alt="" class = "InsMore_img" v-else  @click ="ClickStopSpe" >
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            <div class = "scolarDel_con">
                <div class = "scolarDel_word">{{speName}}-专家详情</div>
                <div class = "scolarDel_box">
                    <div class = "FB" v-if="insDel.scholarObject.introduction">
                        <div class = "scolar_instruc">
                            <img src="../../assets/img/专家简介@2x.png" alt="" style="width: 17px; height: 18px">
                            专家简介
                        </div>
                    </div>
                    <div class = "scolarDesc" v-if="insDel.scholarObject.introduction!=null">{{insDel.scholarObject.introduction}}</div>
                    <div class = "FB">
                        <div class = "scolar_instruc">
                            <img src="../../assets/img/研究方向@2x.png" alt="" style="width: 17px; height: 17px">
                            研究方向
                        </div>
                    </div>
                    <div class ="scolar_direc"><span v-for="item in insDel.scholarObject.researchList" :key="item">{{item}}</span></div>
                    <div class = "FB">
                        <div class = "scolar_instruc" style="width:5%">
                            <img src="../../assets/img/论文@2x.png" alt="" style="width: 17px; height: 17px">
                            论文
                        </div>
                    </div>
                    <div class = "aticle_con">
                        <div class = "table_head">
                            <span class = "aticle_title">标题</span>
                            <span class = "aticle_time">时间</span>
                        </div>
                        <div class = "table" v-for="item in insDel.scholarObject.paperArray" :key="item.id">
                            <span class = "aticle_name">{{item.title}}</span>
                            <span class = "aticle_date">{{item.time}}</span>
                        </div>
                    </div>
                    <!-- <div class = "FB">
                        <div class = "scolar_instruc" style="width:5%">
                            <img src="../../assets/img/专利证书 2@2x.png" alt="" style="width: 17px; height: 18px">
                            专利
                        </div>
                    </div>
                    <div class = "specialOnly_con">
                        <div class = "table_head">
                            <span class = "specialOnly_title">专利名称</span>
                            <span class = "specialOnly_time">申请时间</span>
                            <span class = "specialOnly_code">公开号</span>
                            <span class = "specialOnly_apply">授权专利/申请专利</span>
                        </div>
                        <div class = "table">
                            <span class = "specialOnly_name"></span>
                            <span class = "specialOnly_date"></span>
                            <span class = "specialOnly_num"></span>
                            <span class = "specialOnly_gave"></span>
                        </div>
                        <div class = "table"></div>
                    </div> -->
                    <div class = "FB" v-if="insDel.scholarObject.contact.phone || insDel.scholarObject.contact.mail">
                        <div class = "scolar_instruc">
                            <img src="../../assets/img/联系方式@2x.png" alt="" style="width: 17px; height: 18px">
                            联系方式
                        </div>
                    </div>
                    <div class = "scolar_phone" v-if="insDel.scholarObject.contact.phone || insDel.scholarObject.contact.mail">
                        <div class="phone" v-if="insDel.scholarObject.contact.phone">
                            <span>电话:</span>
                            <span>{{insDel.scholarObject.contact.phone}}</span>
                        </div>
                        <div class="email" v-if="insDel.scholarObject.contact.mail">
                            <span>邮箱:</span>
                            <span>{{insDel.scholarObject.contact.mail}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class = "noresult" v-else>
            <img src="../../assets/img/Loading.gif" alt="" class = "noResultImg">
            <!-- <div class= "noResultWord">暂无搜索结果</div> -->
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.InsDel_con{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 2%;
    .success_con{
        .insBox{
            position: relative;
            width: 100%;
            box-sizing: border-box;
            .insDirec{
                box-sizing: border-box;
                padding-left: 1%;
                border-left: 3px solid #008EFF;
                font-size:14px;
                font-family:"微软雅黑";
                color:rgba(34,45,54,1);
                line-height:14px;
                margin: 0 0 12px 0;
            }
            .insMain{
                width: 100%;
                // height:290px;
                overflow: hidden;
                box-sizing: border-box;
                padding: 30px 4% 40px 4%;
                background: #fff;
                .insText{
                    text-indent:2em;
                    font-size:14px;
                    font-family:"微软雅黑";
                    color:rgba(57,69,78,1);
                    line-height:28px;
                    .para{
                        text-indent: 2em!important;
                        margin-bottom: 20px;
                    }
                }
                .ins_logo{
                    float: right;
                    width: 162px;
                    height: 162px;
                    right: 0;
                    top: 0;
                    vertical-align: middle;
                    margin-left: 2%;
                }
            }
            .footer{
                position: absolute;
                bottom: 0px;
                // top:10px;
                width: 100%;
                height: 46px;
                font-size: 16px;
                line-height: 46px;
                text-align: center;
                background: #F9F9F9;
                opacity: rgba(255,255,255,0.3);
                .more_img{
                    width: 17px;
                    height: 10px;
                    margin-right:8px;
                    cursor: pointer;
                }
                .clickMore{
                    font-size: 14px;
                    color: #8590A6;
                    cursor: pointer;
                }
            }
        }
        .specialBox{
            width: 100%;
            box-sizing: border-box; 
            .insSpecial{
                box-sizing: border-box;
                padding-left: 1%;
                border-left: 3px solid #008EFF;
                font-size:14px;
                font-family:"微软雅黑";
                color:rgba(34,45,54,1);
                line-height:14px;
                margin: 30px 0 12px 0;
            }
            .insSpecialBox{
                width: 100%;
                box-sizing: border-box;
                padding: 30px 3%;
                background: #fff;
                .specialDirec{
                    position: relative;
                    overflow: hidden;
                    .direc_word,.Direc_con{
                        float: left;
                    }
                    .direc_word{
                        display: inline-block;
                        margin-top: 6px;
                        width: 10%;
                        font-size: 13px;
                        color:rgba(123,129,133,1);
                    }
                    .Direc_con{
                        box-sizing: border-box;
                        padding: 5px 0 20px 0;
                        width: 90%;
                        height: 45px;
                        overflow: hidden;
                        border-bottom: 1px dashed #E1E7EC;
                        span{
                            display: inline-block;
                            padding: 4px 12px;
                            margin-bottom: 20px;
                            font-size: 13px;
                            color: #7B8185;
                            margin-right: 2%;
                            background:rgba(238,242,243,1);
                            cursor: pointer;
                        }
                        .onlyStyle1{
                            color:rgba(0,142,255,1);
                            background:rgba(0,142,255,0.12);
                        }                    
                    }
                    .InsImg_con{
                    position: absolute;
                    right: 0%;
                    top: 6px;
                    .InsMore_img{
                        width: 18px;
                        height: 18px;
                        z-index: 10;
                        cursor: pointer;
                    }
                }
                }
                .specialName_con{
                    position: relative;
                    overflow: hidden;
                    .name_word,.specialName{
                        float: left;
                    }
                    .name_word{
                        display: inline-block;
                        margin-top: 26px;
                        width: 10%;
                        font-size: 13px;
                        color:rgba(123,129,133,1);
                    }
                    .specialName{
                        width: 90%;
                        height:45px;
                        margin-top: 23px;
                        overflow: hidden;
                        .name_con{
                            float: left;
                            box-sizing: border-box;
                            padding: 4px 12px;
                            margin-right: 2%;
                            margin-bottom: 20px;
                            font-size: 13px;
                            color:rgba(123,129,133,1);
                            background:rgba(238,242,243,1);
                            cursor: pointer;
                            .special_icon{
                                width: 14px;
                                height: 12px;
                            }
                        }
                        .onlyStyle2{
                            color:rgba(0,142,255,1);
                            background:rgba(0,142,255,0.12);
                        }
                        .InsImg_con{
                            position: absolute;
                            right: 0%;
                            top: 26px;
                            .InsMore_img{
                                width: 18px;
                                height: 18px;
                                z-index: 10;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
        .scolarDel_con{
            width: 100%;
            box-sizing: border-box;
            .scolarDel_word{
                box-sizing: border-box;
                padding-left: 1%;
                border-left: 3px solid #008EFF;
                font-size:14px;
                font-family:"微软雅黑";
                color:rgba(34,45,54,1);
                line-height:14px;
                margin: 30px 0 12px 0;
            }
            .scolarDel_box{
                width: 100%;
                box-sizing: border-box;
                padding: 0 2%;
                background: #fff;
                .FB{
                    width: 100%;
                    height: 55px;
                    padding-top: 15px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #E8EAEB;
                    .scolar_instruc{
                        width: 7%;
                        font-size:13px;
                        color:rgba(34,45,54,1);
                        line-height: 37px;
                        border-bottom: 2px solid #008EFF;
                        img{
                            vertical-align: middle;
                            margin-top: -3px;
                        }
                    }
                }
                .scolarDesc{
                    box-sizing: border-box;
                    padding: 35px 4%;
                }
                .scolar_direc{
                    padding: 41px 2% 0px 2%;
                    span{
                        display: inline-block;
                        padding: 2px 12px;
                        margin-right: 2%;
                        margin-bottom:15px;
                        font-size:13px;
                        font-family:"微软雅黑";
                        color:rgba(130,137,149,1);
                        line-height:20px;
                        background:rgba(238,242,243,1);
                        border-radius: 100px;
                        border: 1px solid #E3E3E3;
                    }
                }
                .aticle_con{
                    box-sizing: border-box;
                    padding: 35px 4% 60px 4%;
                    margin-bottom: 20px;
                    .table_head{
                        border-bottom: 1px solid #E8EAEB;
                        // margin-top: 35px;
                        .aticle_title,.aticle_time{
                            display: inline-block;
                            font-size:13px;
                            font-family:"微软雅黑";
                            color:rgba(123,129,133,1);
                            line-height:26px;
                        }
                        .aticle_title{
                            margin-left: 3%;
                        }
                        .aticle_time{
                            margin-left: 80%;
                        }
                    }
                    .table{
                        height: 58px;
                        border-bottom: 1px solid #E8EAEB;
                        box-sizing: border-box;
                        padding: 0 3%;
                        .aticle_name,.aticle_date{
                            display: inline-block;
                            line-height: 58px;
                            font-size: 13px;
                            color:rgba(57,69,78,1);
                        }
                        .aticle_name{
                            width:70%;
                        }
                        .aticle_date{
                            width: 10%;
                            margin-left: 18%;
                        }
                    }
                    .table:nth-child(even){
                        background:rgba(249,249,249,1); 
                    }
                }
                .specialOnly_con{
                    box-sizing: border-box;
                    padding: 35px 4%;
                    .table_head{
                        border-bottom: 1px solid #E8EAEB;
                        // margin-top: 35px;
                        .specialOnly_title,.specialOnly_time,.specialOnly_code,.specialOnly_apply{
                            display: inline-block;
                            font-size:13px;
                            font-family:"微软雅黑";
                            color:rgba(123,129,133,1);
                            line-height:26px;
                        }
                    }
                    .table{
                        height: 58px;
                        border-bottom: 1px solid #E8EAEB;
                        box-sizing: border-box;
                        padding: 0 3%;
                        .specialOnly_title,.aticle_date{
                            display: inline-block;
                            line-height: 58px;
                            font-size: 13px;
                            color:rgba(57,69,78,1);
                        }
                    }
                    .table:nth-child(even){
                        background:rgba(249,249,249,1); 
                    }
                }
                .scolar_phone{
                    box-sizing: border-box;
                    padding: 35px 4%;
                    .phone,.email{
                        display: inline-block;
                        margin-right: 3%;
                        font-size: 14px;
                        color:rgba(57,69,78,1);
                    }
                }
            }
        }
    }
    .noresult{
        width: 100%;
        box-sizing: border-box;
        padding-top: 100px;
        text-align: center;
        .noResultImg{
            width: 124px;
            height: 124px;
        } 
        .noResultWord{
            
        }
    }
}
</style>
<script>
import qs from 'qs';
import bus from '../../store/bus.js'; 
import axios from 'axios';
export default {
    name: 'HelloWorld',
    components: {
    },
    computed:{
        insDel(){
            return this.$store.state.insDelModule
        },
        count(){
            return this.$store.state.insDelModule.count
        },
        count1(){
            return this.$store.state.insDelModule.count1
        },
        scholarArrayTest(){
            return this.$store.state.insDelModule.scholarArray
        }
    },
    data(){
        return{
            show: false,
            moreStop: false,
            direc: sessionStorage.getItem('direc'),
            specialName: sessionStorage.getItem('specialName'),
            moreShow:true,
            stopShow:false,
            SpeMoreShow: true,
            SpeStopShow: false,
            speName:'',
            insDelShow: false,
        }
    },
    methods:{
        clickMore(){
            this.show = false;
            this.moreStop = true;
            let  curHeight = $('.insMain').outerHeight();
            $('.insMain').outerHeight('auto');
            let autoHeight = $('.insMain').outerHeight();
            $('.insMain').outerHeight(curHeight).animate({height:autoHeight},300);
        },
        clickStop(){
            this.show = true;
            this.moreStop = false;
            $('.insMain').animate({height:'230'});
        },
    /**************************控制专家和研究方向的样式***/
        
        ClickMoreIns(){
            this.moreShow = false;
            this.stopShow = true;
            let  curHeight = $('.Direc_con').outerHeight();
            $('.Direc_con').outerHeight('auto');
            let autoHeight = $('.Direc_con').outerHeight();
            $('.Direc_con').outerHeight(curHeight).animate({height:autoHeight},300);
        },
        ClickStopIns(){
            this.moreShow = true;
            this.stopShow = false;
            $('.Direc_con').animate({height:'45'});
        },
        ClickMoreSpe(){
            this.SpeMoreShow = false;
            this.SpeStopShow = true;
            let  curHeight = $('.specialName').outerHeight();
            $('.specialName').outerHeight('auto');
            let autoHeight = $('.specialName').outerHeight();
            $('.specialName').outerHeight(curHeight).animate({height:autoHeight},300);
        },
        ClickStopSpe(){
            this.SpeMoreShow = true;
            this.SpeStopShow = false;
            $('.specialName').animate({height:'45'});
        },
        handleInsDire(item,index){    
            sessionStorage.setItem('direc',index);
            sessionStorage.setItem('research',item);
            let institution_id = sessionStorage.getItem('institution_id')
            this.direc = sessionStorage.getItem('direc');
            this.$store.dispatch('changeResearch',{research:item,institution_id:institution_id})
            // bus.$emit("changeResearch")
        },
        handleScolar(index,id,name){
            window.scrollTo(0,530)
            sessionStorage.setItem('specialName',index);
            sessionStorage.setItem('scholarId',id);
            let institution_id = sessionStorage.getItem('institution_id')
            let research = sessionStorage.getItem("research");
            let scholar_id = sessionStorage.getItem("scholarId");
            this.specialName = sessionStorage.getItem('specialName');
            Promise.all([this.$store.dispatch("getScholarObject",{institution_id:institution_id,scholar_id:scholar_id})]).then(()=>{
                this.$nextTick(()=>{
                    this.speName = name
                })                        
            })            
        },
        /*获得机构专家的详情*/
    },
    watch:{
        count(val,oldVal){//普通的watch监听
            this.direc = 0;
            this.specialName = 0;
            this.insDelShow = true;
            setTimeout(()=>{
                if($('.insMain').outerHeight()>210){
                    $('.insMain').outerHeight(230);
                    $('.insMain').attr("overflow","hidden");
                    let paras =  Array.from($('.para'));
                    paras.forEach((val)=>{
                        $(val).css({"margin-bottom":"20px"})
                    })
                    this.show = true;
                } 
                if(sessionStorage.getItem('speName')){
                    window.scrollTo(0,530)
                    let specialNames = $(".spename");
                    let specialName = Array.from(specialNames);
                    specialName.forEach((val,ind)=>{
                        if(val.innerHTML == sessionStorage.getItem('speName')){
                            sessionStorage.setItem('specialName',ind);
                            this.specialName = sessionStorage.getItem('specialName');
                            this.speName = sessionStorage.getItem('speName')
                        }else{
                        }
                    })
                }     
            },1)                                 
        },
        count1(){
            this.specialName = 0;
        },
        scholarArrayTest(newVal,old){
            this.speName = newVal[0].name
        },
        insDel(newVal,old){
            
        },
    },
    mounted(){
        window.scrollTo(0,0)
    }
}
</script>
