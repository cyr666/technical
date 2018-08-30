<template>
  <div class = "institution_con">
      <div class = "top">
        <div class = "hotArea_con">
            <span class = "hotArea_letter">热门领域</span>
            <div class = "box">
                <span class = "hotArea_all" :class="{'hotArea_allOnly':allShow}" @click="getallShow">全部</span>
                <div class = "hotArea_item">
                    <div class = "item_con" v-for="item in hotArea" > 
                        <span class = "item" @click="getHotArea(1,$event)">{{item}}</span>                        
                    </div>
                </div>
            </div>
        </div>
        <div class = "Area_con">
            <span class = "hotArea_letter">所在地</span>
            <div class = "box">
                <span class = "hotArea_all" :class="{'hotArea_allOnly':unlimited}" @click="getunlimited">不限</span>
                <div class = "hotArea_item">
                    <div class = "area_con" v-for="item in Area"> 
                        <span class = "area"  @click="getArea(1,$event)">{{item}}</span>                        
                    </div>
                </div>
                <img src="../../assets/img/展开@2x.png" alt="" class = "moreIcon" v-if="moreShow" @click="more">
                <img src="../../assets/img/收起@2x.png" alt="" class = "moreIcon" v-else @click="stop">
            </div>
        </div>
      </div>
      <div class = "main">
          <p class = "result">共{{mesg}}个结果</p>
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
          </div>
        </div>
        <div style="float:right;margin:15px 2% 40px 0;">
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
        padding: 15px 2%;
        background: #fff;
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
                padding-bottom: 10px;
                margin-left: 3%;
                float:left;
                width: 91%;
                border-bottom: 1px dashed #E1E7EC;
                .hotArea_all{
                    float: left;
                    font-size: 13px;
                    font-family: "微软雅黑";
                    color: #008EFF;
                    background:rgba(0,142,255,0.12);
                    display: inline-block;
                    padding: 4px 12px;        
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
                    .item_con{
                        width: 12%;
                        position: relative;
                        box-sizing: border-box;
                        padding-top:4px;
                        float: left;
                        margin: 0 1% 5px 1%;
                        font-size: 13px;
                        color: #222D36;
                        background: #fff;                        
                        span{
                            padding: 6px 12px; 
                            border-radius: 2px;
                            cursor: pointer; 
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
            height: 50px;
            background: #fff;
            .hotArea_letter{
                margin-top:20px;
            }
            .box{
                position: relative;
                box-sizing: border-box;
                margin-top: 20px;
                margin-left: 4.3%;
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
                    margin-left: 1%;
                    .area_con{
                        width: 10%;
                        position: relative;
                        box-sizing: border-box;
                        padding-top:2px;
                        float: left;
                        margin: 0 1% 10px 1%;                        
                        font-size: 13px;
                        color: #222D36;
                        background: #fff;                                                
                        span{
                            padding: 6px 10px;
                            border-radius: 2px;
                            cursor: pointer;
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
                    top: 3px;
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
            padding-left: 0;
        }
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
                    margin-left: 4.5%;
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
            pages:1,
            pageNum:1,//当前页
            hotArea:["信息技术服务","人工智能","光电芯片"],
            Area:["北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京"],
            institutionArray:[],
            field:[],
            province:[],
        }
    },
    methods:{
        msgListView(curPage){
            window.scrollTo(0,0);
            this.pageNum = curPage;
            this.getInstitutionByFilter();
        },
        getFilterAbove(){
            axios.get(this.biz.serverUrl+"/piionee/transfer/es/getFilterAbove").then((res)=>{
                if(res.status == 200){
                    this.hotArea = res.data.fieldList;
                    this.Area = res.data.provinceList;
                }                
            })
        },
        getInstitutionByFilter(){
            let field = this.field;
            let province = this.province
            let params = qs.stringify({page:this.pageNum,field:field,province:province});
            axios.get(this.biz.serverUrl+"/piionee/transfer/es/getInstitutionByFilter?"+params).then((res)=>{
                if(res.status == 200){
                    this.institutionArray = res.data.institutionArray;
                    this.mesg = res.data.numFound;
                    this.pages = Math.ceil(res.data.numFound/8);
                    if(this.pages>100){
                        this.pages = 100
                    }
                }else{
                    alert("请求失败")
                }
            })
        },
        getallShow(){
            this.allShow = false;
            let arrs = Array.from($(".item"));
            arrs.forEach((val)=>{
                $(val).removeClass('itemOnly')
            });
            this.field = "";
            this.getInstitutionByFilter()
        },
        getunlimited(){
            this.unlimited = false;
            let arrs = Array.from($(".area"));
            arrs.forEach((val)=>{
                $(val).removeClass('itemOnly')
            });
            this.province = "";
            this.getInstitutionByFilter()
        },
        getHotArea(index,e){  
            let str = e.target.innerText
            let s = str.replace(/(^\s*)|(\s*$)/g, "");           
            let arrs = Array.from($(".item"));
            arrs.forEach((val)=>{
                $(val).removeClass('itemOnly')
            });
            $(e.target).addClass('itemOnly');
            this.field = s;
            this.getInstitutionByFilter()
            let count = 0
            let items = $(".item");
            let itemv = Array.from(items);
            itemv.forEach((v)=>{
                if(v.className !== "item"){
                    count ++;
                }
            })
            if(count == 0){
                this.allShow = false;
            }else{
                this.allShow = true;
            }
        },
        getArea(index,e){
            let str = e.target.innerText
            let s = str.replace(/(^\s*)|(\s*$)/g, ""); 
            let arrs = Array.from($(".area"));
            arrs.forEach((val)=>{
                $(val).removeClass('itemOnly')
            });
            $(e.target).addClass('itemOnly');
            this.province = s;
            this.getInstitutionByFilter()
            let count = 0
            let items = $(".area");
            let itemv = Array.from(items);
            itemv.forEach((v)=>{
                if(v.className !== "area"){
                    count ++;
                }
            })
            if(count == 0){
                this.unlimited = false;
            }else{
                this.unlimited = true;
            }
        },
        getInsDel(id){
            sessionStorage.setItem('institution_id',id)
            this.$router.push(`/technical/insDel`) ;
            sessionStorage.setItem('speName',"")           
            this.$store.dispatch('getInstitutionDetailAndScholar',{institution_id:id})         
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
            $('.Area_con').animate({height:'50px'});
        }
    },
    mounted(){
        window.scrollTo(0,0);
        this.getFilterAbove();
        this.getInstitutionByFilter();
    }
} 
</script>