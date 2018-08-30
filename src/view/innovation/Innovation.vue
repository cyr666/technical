<template>
  <div class = "institution_con">
      <div class = "top">
        <div class = "hotArea_con">
            <span class = "hotArea_letter">产业链</span>
            <div class = "box">
                <span class = "hotArea_all" :class="{'hotArea_allOnly':allShow}" @click="getallShow">全部</span>
                <div class = "hotArea_item">
                    <div class = "item" v-for="item in chainArray" @click="getHotArea(item.id,$event)"> 
                        <span class="itemChild">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class = "Area_con" v-if ="children.length>0&&showSecond==true">
            <!-- <span class = "hotArea_letter">所在地</span> -->
            <div class = "box">
                <span class = "hotArea_all" :class="{'hotArea_allOnly':unlimited}" @click="getunlimited">全部</span>
                <div class = "hotArea_item">
                    <div class = "area" v-for="item in children" @click="getArea(item.id,$event)"> 
                        <span class="areaChild">{{item.name}}</span>
                    </div>
                </div>
                <img src="../../assets/img/展开@2x.png" alt="" class = "moreIcon" v-if="moreShow" @click="more">
                <img src="../../assets/img/收起@2x.png" alt="" class = "moreIcon" v-else @click="stop">
            </div>
        </div>
      </div>
        <div class = "main">
            <p class = "result">共{{numFound}}个结果</p>
            <div class = "searchList" v-if="companyArray.length>0">
                <div class = "tableHead">
                    <span class = "Head1">企业</span>
                    <span class = "Head2">行业</span>
                    <span class = "Head3">关键技术</span>
                </div>
                <table>
                    <tr v-for="item in companyArray">
                        <td>
                            <img :src="item.logo" alt="" class = "comLogo" v-if="item.logo">
                            <img src="../../assets/img/企业logo-默认@2x.png" alt="" class = "comLogo" v-else>
                        </td>
                        <td>
                            <dl>
                                {{item.name}}
                            </dl>
                            <dt>
                                {{item.introduction}}
                            </dt>
                        </td>
                        <td>
                            {{item.industry}}
                        </td>
                        <td>
                            <span v-for="obj in item.keyword">{{obj}}<em></em></span>
                        </td>
                        <td align="right">
                            <span @click="checkInnovationDel(item.id)">查看</span>
                        </td>
                    </tr>
                </table>
          </div>
            <div class = "noresult" v-else>
                <img src="../../assets/img/Loading.gif" alt="" class = "noResultImg">
                <!-- <div class= "noResultWord">暂无搜索结果</div> -->
            </div>
        </div>
        <div style="float:right;margin:20px 2% 40px 0;">
            <navigation
                v-if="pages !==0"
                :pages="pages"
                @navpage="msgListView">
            </navigation>
        </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.institution_con{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;   
    .top{
        box-sizing: border-box;
        padding: 25px 30px 10px 30px;
        background: #fff;
        box-shadow: 0px 1px 2px 0px rgba(232,234,235,1) inset;
        .hotArea_letter{
            float: left;
            font-size: 13px;
            color: #7B8185;
            line-height: 26px;
            margin-top: 3px;
        }
        .hotArea_con{
            overflow: hidden;
            background: #fff;
            .box{
                box-sizing: border-box;
                margin-left: 3%;
                float:left;
                width: 91%;
                .hotArea_all{
                    float: left;
                    font-size: 13px;
                    font-family: "微软雅黑";
                    color: #008EFF;
                    background:rgba(0,142,255,0.12);
                    display: inline-block;
                    padding: 4px 12px;
                    margin-right: 1%;        
                    border-radius: 2px;
                    cursor: pointer;            
                }
                .hotArea_allOnly{
                    color: #222D36!important;
                    background: #fff!important;
                }
                .hotArea_item{
                    box-sizing: border-box;
                    float: left;
                    width: 85%;
                    overflow: hidden;
                    margin-left: 1%;
                    .item{
                        position: relative;
                        box-sizing: border-box;
                        width: 16%;
                        height: 30px;
                        float: left;
                        margin: 0 0% 5px 0%;
                        font-size: 13px;
                        color: #222D36;
                        background: #fff;                       
                        cursor: pointer;
                        .itemChild{
                            display: inline-block;
                            padding: 4px 12px;
                            border-radius: 2px;
                        }
                    }
                    .itemOnly{
                        background:rgba(0,142,255,0.12);
                        color: #008EFF;
                    }
                }
            }   
        } 
        .Area_con{
            overflow: hidden;
            height: 59px;
            background: #fff;
            .hotArea_letter{
                margin-top:20px;
            }
            .box{
                position: relative;
                box-sizing: border-box;
                padding-bottom: 10px;
                padding-top: 20px;
                margin-left: 6.5%;
                float:left;
                width: 91%;
                border-top: 1px dashed #E1E7EC;
                .hotArea_all{
                    float: left;
                    font-size: 13px;
                    font-family: "微软雅黑";
                    color: #008EFF;
                    background:rgba(0,142,255,0.12);
                    display: inline-block;
                    padding: 4px 12px; 
                    margin-right: 1%;       
                    border-radius: 2px;
                    cursor: pointer;               
                }
                .hotArea_allOnly{
                    color: #222D36!important;
                    background: #fff!important;
                }
                .hotArea_item{
                    box-sizing: border-box;
                    float: left;
                    width: 85%;
                    // overflow: hidden;
                    margin-left: 1%;
                    .area{
                        width:16%;
                        position: relative;
                        box-sizing: border-box;                        
                        float: left;
                        margin: 0 0% 5px 0%;                        
                        font-size: 13px;
                        color: #222D36;
                        background: #fff;                        
                        cursor: pointer;
                        .areaChild{
                            display: inline-block;
                            padding: 5px 10%;
                            border-radius: 2px;
                        }
                    }
                    .itemOnly{
                        background:rgba(0,142,255,0.12);
                        color: #008EFF;
                    }
                }
                .moreIcon{
                    position: absolute;
                    width: 16px;
                    height: 17px;
                    top: 27px;
                    right: 0;
                    cursor: pointer;
                }
            }
        }  
    }
    .main{
        width: 100%;
        box-sizing: border-box;
        padding: 15px 30px;
        .result{
            font-size: 13px;
            color: #5D6870;
            height: 26px;
            line-height: 26px;
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
        .searchList{
            box-sizing: border-box;
            margin-top: 5px;
            background: #fff;
            // box-shadow: 1px 0px 1px 0px rgba(232,234,235,1);
            .tableHead{
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
                    margin-left: 5.5%;
                }
                .Head2{
                    margin-left: 30.5%;
                }
                .Head3{
                    margin-left: 14%;
                }
            } 
            table{
                box-sizing: border-box;
                padding: 0 30px;
                border-collapse: collapse;
                width: 100%;
                tr{
                    width: 100%;
                    height: 116px;
                    border-bottom: 1px solid #EAEDF1;
                    td{
                        .comLogo{
                            width:58px;
                            height: 59px;
                            border: 1px solid #eaedf1;
                            border-radius: 8px;
                        }
                    }
                    td:first-child{
                        width: 9%;
                        padding-left: 30px;
                    }
                    td:nth-child(2){
                        width: 32%;
                        padding-left: 5px;
                        dl{
                            font-size:16px;
                            font-family:"微软雅黑";
                            color:rgba(34,45,54,1);
                            line-height:24px;
                            margin-bottom: 10px;
                            font-weight: bold;
                        }
                        dt{
                            width: 80%;
                            margin-top: 5px;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                        
                        
                    }
                    td:nth-child(3){
                        width:8%;
                        font-size:13px;
                        font-family:"微软雅黑";
                        color:rgba(57,69,78,1);
                        line-height:20px;
                    }
                    td:nth-child(4){
                        width:40%;
                        padding-left: 8%;
                        font-size:13px;
                        font-family:"微软雅黑";
                        color:rgba(57,69,78,1);
                        line-height:20px;
                        span{
                            box-sizing: border-box;
                            display: inline-block;
                            position: relative;
                            padding-right: 8px;
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
                            right: -1px;
                            }
                        }
                        span:last-child{
                            em{
                                background: #fff;
                            }
                        }
                    }
                    td:nth-child(5){
                        width: 12%;
                        padding-right: 30px;
                        span{
                            width: 72px;
                            height: 28px;
                            display: inline-block;
                            text-align: center;
                            line-height: 28px;                            
                            border:1px solid rgba(0,142,255,0.7);
                            border-radius: 2px;
                            font-size: 12px;
                            color: #008EFF;
                            cursor: pointer;
                        }
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
    import remove from '../array.js'
    export default {
        name: 'HelloWorld',
        components: {
            navigation,
        },
    data(){
        return{
            allShow:false,
            unlimited:false,
            moreShow:true,
            mesg:"",
            pages:0,
            pageNum:1,//当前页
            institutionArray:[],
            field:[],
            // province:[],
            //创新主体
            chainArray:[],
            showSecond:false,
            children:[],
            companyArray:[],
            numFound:''
        }
    },
    methods:{
        msgListView(curPage){
            this.pageNum = curPage;
            this.handleAjax(curPage);
        },
        getallShow(){
            this.allShow = false;
            this.showSecond = false;
            let arrs = Array.from($(".itemChild"));
            arrs.forEach((val)=>{
                $(val).removeClass('itemOnly')
            });
            this.field = "";
            sessionStorage.setItem('companyId',"");
            this.handleAjax(1)
        },
        getunlimited(){
            this.unlimited = false;
            let arrs = Array.from($(".areaChild"));
            arrs.forEach((val)=>{
                $(val).removeClass('itemOnly')
            });
            let id = sessionStorage.getItem('companyId').substring(0,1);
            sessionStorage.setItem('companyId',id);
            this.handleAjax()
            
            
        },
        getHotArea(id,e){  
            this.showSecond = true;
            this.getunlimited();
            sessionStorage.setItem("companyId",id); 
            let companyId = sessionStorage.getItem('companyId') ;       
            let str = e.target.innerText
            let s = str.replace(/(^\s*)|(\s*$)/g, "");           
            let arrs = Array.from($(".itemChild"));
            arrs.forEach((val)=>{
                $(val).removeClass('itemOnly')
            });
            $(e.target).addClass('itemOnly');
            this.field = s;
            Promise.all([this.$store.dispatch("getChanyelian",{id:companyId})]).then(()=>{
                this.$nextTick(()=>{
                    let children = JSON.parse(sessionStorage.getItem('children'));
                    this.children = children;
                })                        
            })
            this.handleAjax();
            let count = 0
            let items = $(".itemChild");
            let itemv = Array.from(items);
            itemv.forEach((v)=>{
                if(v.className !== "itemChild"){
                    count ++;
                }
            })
            if(count == 0){
                this.allShow = false;
            }else{
                this.allShow = true;
            }
        },
        getArea(id,e){
            let str = e.target.innerText
            let s = str.replace(/(^\s*)|(\s*$)/g, ""); 
            let arrs = Array.from($(".areaChild"));
            arrs.forEach((val)=>{
                $(val).removeClass('itemOnly')
            });
            $(e.target).addClass('itemOnly');
            this.province = s;
            sessionStorage.setItem("companyId",id);   
            this.handleAjax();
            let count = 0
            let items = $(".areaChild");
            let itemv = Array.from(items);
            itemv.forEach((v)=>{
                if(v.className !== "areaChild"){
                    count ++;
                }
            })
            if(count == 0){
                this.unlimited = false;
            }else{
                this.unlimited = true;
            }
        },
        handleAjax(page){
            let companyId = sessionStorage.getItem('companyId')
            Promise.all([this.$store.dispatch("getCompany",{id:companyId,rows:8,page:page})]).then(()=>{
                this.$nextTick(()=>{
                    let companyArray = JSON.parse(sessionStorage.getItem('companyArray'));
                    this.companyArray = companyArray;
                    let numFound = sessionStorage.getItem('numFound');
                    this.pages =  Math.ceil(numFound/8);                  
                    if(numFound){
                        this.numFound = numFound;
                    }else{
                        this.numFound = 0;
                    }
                })                        
            })    
        },
        checkInnovationDel(id){
            sessionStorage.setItem('companyDel',id);
            let companyDel = sessionStorage.getItem('companyDel')
            this.$router.push(`/technical/InnovationDel`);
            Promise.all([this.$store.dispatch("getCompanyDetail",{id:companyDel})]).then(()=>{
                this.$nextTick(()=>{
                    
                })                        
            })  
            Promise.all([this.$store.dispatch("getCompanyDetail_patent",{id:companyDel,type:'application'})]).then(()=>{
                this.$nextTick(()=>{
                    
                })                        
            })              
            // this.$store.dispatch('getInstitutionDetailAndScholar',{institution_id:id})         
        },
        more(){
            this.moreShow = false; 
            let  curHeight = $('.Area_con').outerHeight();
            $('.Area_con').height('auto');
            let autoHeight = $('.Area_con').outerHeight();
            $('.Area_con').height(curHeight).animate({height:autoHeight},300); 
        },
        stop(){
            this.moreShow = true; 
            let  curHeight = $('.Area_con').outerHeight();
            $('.Area_con').animate({height:'60px'});
        }
    },
    mounted(){
        window.scrollTo(0,0);
        // this.getFilterAbove();
        // this.getInstitutionByFilter();
        sessionStorage.setItem('companyId',"");
        let companyId = sessionStorage.getItem('companyId');
        Promise.all([this.$store.dispatch("getChanyelian")]).then(()=>{
            this.$nextTick(()=>{
                let chainArray = JSON.parse(sessionStorage.getItem('chainArray'));
                this.chainArray = chainArray;
                                
            })                        
        });
        this.handleAjax(1)
    }
   } 
</script>