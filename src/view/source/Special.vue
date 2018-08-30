<template>
  <div class = "special_con">
      <div class = "top">
        <div class = "hotArea_con">
            <span class = "hotArea_letter">热门领域</span>
            <div class = "box">
                <span class = "hotArea_all" :class="{'hotArea_allOnly':allShow}" @click="getallShow">全部</span>
                <div class = "hotArea_item">
                    <div class = "item_con" v-for="item in hotArea" >
                        <span class = "item" @click="getHotArea(1,$event)">{{item}}</span> 
                        
                        <!-- <img src="../../assets/img/删除@2x.png" alt="" class = "closeIcon hotAreaIcon" >  -->
                        </div>
                </div>
            </div>
        </div>
        <div class = "Area_con">
            <span class = "hotArea_letter">所在地</span>
            <div class = "box">
                <span class = "hotArea_all" :class="{'hotArea_allOnly':unlimited}" @click="getunlimited">不限</span>
                <div class = "hotArea_item">
                    <div class = "area_contain" v-for="item in Area"> 
                        <span class = "area"  @click="getArea(1,$event)">{{item}}</span>
                        <!-- <img src="../../assets/img/删除@2x.png" alt="" class = "closeIcon areaIcon">  -->
                    </div>
                </div>
                <img src="../../assets/img/展开@2x.png" alt="" class = "moreIcon" v-if="moreShow" @click="more">
                <img src="../../assets/img/收起@2x.png" alt="" class = "moreIcon" v-else @click="stop">
            </div>
        </div>
        <div class = "insClass_con">
            <span class = "hotArea_letter">机构性质</span>
            <div class = "box">
                <span class = "hotArea_all" :class="{'hotArea_allOnly':insClassShow}" @click="getShowInsClass">全部</span>
                <div class = "hotArea_item">
                    <div class = "insClass_item" v-for="item in insClass" @click="getinsClass(1,$event)"> 
                        {{item}}
                        <!-- <img src="../../assets/img/删除@2x.png" alt="" class = "closeIcon insClassIcon">  -->
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class = "main">
          <p class = "result">共{{mesg}}个结果</p>
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
                <div class ="nameCon">
                    <span class = "special_name">{{item.name}}</span>
                </div>                   
                <h3 class = "listItem_name"><span @click="getInsDel(item.institution.id)" class="insname">{{item.institution.name}}</span></h3>                
                <div class = "search_direc">
                    <span v-for="obj in item.researchList" :key="obj.id">{{obj}}&nbsp;<em></em></span>
                </div>
                <span class = "special_num">{{item.paper_num}}</span>
                <span class = "listItem_check"><span @click="getScholar(item.id,item.name,item.institution.id)">查看</span></span>
            </div> -->
            <div style="float:right;margin:30px 2% 40px 0;">
                <navigation
                    v-if="pages !==0"
                    :pages="pages"
                    @navpage="msgListView">
                </navigation>
            </div>
          </div>
      </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.special_con{
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
                    margin-top: 5px;
                    margin-left: 1%;
                    .item_con{
                        width: 12%;
                        position: relative;
                        box-sizing: border-box;
                        float: left;
                        margin: 0 1% 10px 1%;                       
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
            height: 55px;
            background: #fff;
            .hotArea_letter{
                margin-top:20px;
            }
            .box{
                position: relative;
                box-sizing: border-box;
                margin-top: 20px;
                margin-left: 4.1%;
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
                    margin-top: 3px;
                    .area_contain{
                        width: 10%;
                        position: relative;
                        box-sizing: border-box;
                        float: left;
                        margin: 0 1% 15px 1%;
                        font-size: 13px;
                        color: #222D36;
                        background: #fff;                                                
                        .area{                        
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
        .insClass_con{
            background: #fff;
            overflow: hidden;
            margin-top: 5px;
            .hotArea_letter{
                margin-top:20px;
            }
            .box{
                box-sizing: border-box;
                padding-top: 15px;
                margin-left: 3%;
                border-top: 1px dashed #E1E7EC;
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
                    overflow: hidden;
                    margin-left: 1%;
                    .insClass_item{
                        position: relative;
                        box-sizing: border-box;
                        float: left;
                        margin: 0 4% 0 1%;
                        padding: 4px 12px;
                        font-size: 13px;
                        color: #222D36;
                        background: #fff;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                    .itemOnly{
                        background:rgba(0,142,255,0.12);
                        color: #008EFF;
                    }
                }
            } 
        } 
    }
    .main{
        width: 100%;
        box-sizing: border-box;
        padding: 15px 2%;
        .result{
            font-size: 13px;
            color: #5D6870;
            height: 26px;
            line-height: 26px;
            padding-left: 1%;
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
                    margin-left: 6%;
                }
                .Head3{
                    margin-left: 24%;
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
                insClassShow: false,
                moreShow:true,
                mesg:"",
                pages:1,
                pageNum:1,//当前页
                hotArea:["信息技术服务","人工智能","光电芯片"],
                Area:["北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京","北京"],
                insClass:["高校","研究所","其他"],
                scholarArray:[],
                field:"",
                province:"",
                inClass:"",
            }
        },
        methods:{
            msgListView(curPage){
                window.scrollTo(0,0)
                this.pageNum = curPage;
                this.getScholarByFilter();
            },
            getFilterAbove(){
                axios.get(this.biz.serverUrl+"/piionee/transfer/es/getFilterAbove").then((res)=>{
                    if(res.status == 200){
                        this.hotArea = res.data.fieldList;
                        this.Area = res.data.provinceList;
                        this.insClass = res.data.institution_natureList;
                    }                
                })
            },
            getScholarByFilter(){
                let field = this.field;
                let province = this.province;
                let nature = this.inClass
                let params = qs.stringify({page:this.pageNum,field:field,province:province,nature:nature})
                
                axios.get(this.biz.serverUrl+"/piionee/transfer/es/getScholarByFilter?"+params).then((res)=>{
                    if(res.status == 200){
                        console.log(res)
                        this.mesg = res.data.numFound;
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
            getallShow(){
                this.allShow = false;
                let arrs = Array.from($(".item"));
                arrs.forEach((val)=>{
                    $(val).removeClass('itemOnly')
                });
                this.field = "";
                this.getScholarByFilter()
            },
            getunlimited(){
                this.unlimited = false;
                let arrs = Array.from($(".area"));
                arrs.forEach((val)=>{
                    $(val).removeClass('itemOnly')
                });
                this.province = "";
                this.getScholarByFilter()
            },
            getShowInsClass(){
                this.insClassShow = false;
                let arrs = Array.from($(".insClass_item"));
                arrs.forEach((val)=>{
                    $(val).removeClass('itemOnly')
                });
                this.inClass = "";
                this.getScholarByFilter()
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
                this.getScholarByFilter()
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
                this.getScholarByFilter()
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
            getinsClass(index,e){
                let str = e.target.innerText
                let s = str.replace(/(^\s*)|(\s*$)/g, "");
                let arrs = Array.from($(".insClass_item"));
                arrs.forEach((val)=>{
                    $(val).removeClass('itemOnly')
                });
                $(e.target).addClass('itemOnly');
                this.inClass = s;
                this.getScholarByFilter()
                let count = 0
                let items = $(".insClass_item");
                let itemv = Array.from(items);
                itemv.forEach((v)=>{
                    if(v.className !== "insClass_item"){
                        count ++;
                    }
                })
                if(count == 0){
                    this.insClassShow = false;
                }else{
                    this.insClassShow = true;
                }
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
                // console.log(name)
            },
            getInsDel(id){
                sessionStorage.setItem('institution_id',id)
                this.$router.push(`/technical/insDel`)
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
                $('.Area_con').animate({height:'55px'});
            }
        },
        mounted(){
            window.scrollTo(0,0)
            this.getFilterAbove();
            this.getScholarByFilter();
        }
    }
</script>