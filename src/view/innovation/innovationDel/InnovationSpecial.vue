<template>
    <div class = "special_con">
        <div class = "title">企业最新专利</div>
        <div class = "speciaMain">
            <div class = "tabButtn">
                <span class = "apply" :class="{'onlyStyle':action}" @click = "changeTab('申请')">申请</span><span class = "get"  :class="{'onlyStyle':!action}" @click = "changeTab('授权')">授权</span>
            </div>
            <div class = "main">
                <div class = "special_box">
                    <div class = "tableHead2">
                        <span class = "Head1">专利名称</span>
                        <span class = "Head2">发明人</span>
                        <span class = "Head3">关键词</span>
                        <span class = "Head4">申请时间</span>
                    </div>
                    <div class = "specialList_con" v-for="(item,index) in InnopatentArray">
                        <div class = "special_list" >
                            <div class = "first_con">
                                <div class = "special_name">{{item.title}}</div>
                                <div class = "mainWord">
                                    <span>{{item.F_term}}</span>
                                </div>
                            </div>
                            
                            <div class = "special_people">{{item.date}}</div>
                            <div class = "keyWord">
                                <span class = "F_term" v-for="obj in item.keywordList">{{obj}}<em></em></span>
                                <!-- <span v-for="item in keyword">{{item}}</span>    obj.id,$event -->
                            </div>
                            <!-- <span class = "classSpecial">{{item.patent_code}}</span> -->
                            
                            <div class = "remark"  @click="showRemark(index,$event)">
                                <span>摘要</span>
                                <img src="../../../assets/img/摘要-箭头-展开@2x.png" alt="" class = "specialMore">
                                <img src="../../../assets/img/摘要-箭头-收起@2x.png" alt="" class = "specialMore specialHide">
                            </div> 
                            <div class = "special_date">{{item.date}}</div>                   
                        </div>
                        <!-- <div v-if="remarkShow == 2"></div> :id="'show'+obj.id-->
                        <div class = "remorkText" :id="'show'+index">  
                            申请号：{{item.patent_code}}<br/>
                            摘要：{{item.abstracts}}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.special_con{
    .title{
        width: 100%;
        height: 50px;
        font-size: 14px;
        color: #7B8185;
        text-align: center;
        line-height: 50px;
        background:rgba(249,249,249,1);
        border:1px solid rgba(232,234,235,1);
    }
    .speciaMain{
        background: #fff;
        box-sizing: border-box;
        padding-top: 30px;
        .tabButtn{            
            width:12%;
            height:28px;
            border: 1px solid #008EFF;
            border-radius: 100px;
            background: #fff;
            margin-left: 2%;
            span{
                display: inline-block;
                width: 49%;
                height: 28px;
                text-align: center;
                border-radius: 100px;
                font-size: 13px;
                color:rgba(82,99,112,1);
                line-height:28px; 
                cursor: pointer;
            }
            .get{
                float:right;
            }
            .onlyStyle{
                font-size: 13px;
                background:rgba(0,142,255,1);
                color: #fff;
            }
        }
        .main{
            width: 100%;
            box-sizing: border-box;
            margin-top: 10px;
            background: #fff;
           
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
                        margin-left:30%;
                    }
                    .Head3{
                        margin-left:9%;
                    }
                    .Head4{
                        margin-left:37%;
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
                            margin-left: 8%; 
                            margin-top: 28px;
                            width: 12%;
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
                            margin-left: 2%;
                        }
                        .keyWord{
                            width: 19%;
                            margin-left:1%;
                            margin-top: 28px;
                            span{
                                font-size:13px;
                                font-family:"微软雅黑";
                                color:rgba(57,69,78,1);
                                line-height:20px;
                            }
                            .F_term{
                                position: relative;
                                display: inline-block;
                                padding-right: 8px;
                                margin-right: 8px;
                                em{
                                    position: absolute;
                                    display: inline-block;
                                    width: 3px;
                                    height: 3px;
                                    border-radius: 1.5px;
                                    background:rgba(49,60,69,1);
                                    top:47%;
                                    right:-1%;
                                }
                            }
                            .F_term:last-child{
                                em{
                                    background: #fff;
                                }
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
                            margin-left: 8%;
                            box-sizing: border-box;
                            // padding: 6px 2%;
                            // text-align: center;

                            border: 1px solid #008EFF;
                            border-radius: 2px;
                            margin-top: 25px;
                            cursor: pointer;
                            span{
                                display: inline-block;
                                margin-left: 15px;
                                font-size: 13px;
                                color: #008EFF;
                                line-height: 28px;
                            }
                            .specialMore{
                                position: absolute;
                                width: 9px;
                                height:6px;
                                vertical-align: middle;
                                top:10px;
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
                            margin-left: 8%;
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
}
</style>
<script>
    export default{
        name: 'HelloWorld',
        components: {
        }, 
        computed:{
            patentArray(){
                return this.$store.state.innovationModule.patentArray
            }            
        },
        data(){
            return{
                action: true,
                InnopatentArray:[],
            }
        },
        methods:{
            changeTab(item){
                let companyDel = sessionStorage.getItem('companyDel')
                if(item=="申请"){
                    this.action = true;
                    Promise.all([this.$store.dispatch("getCompanyDetail_patent",{id:companyDel,type:'application'})]).then(()=>{
                        this.$nextTick(()=>{
                            
                        })                        
                    })  
                }else{
                    this.action = false;
                    Promise.all([this.$store.dispatch("getCompanyDetail_patent",{id:companyDel,type:'grant'})]).then(()=>{
                        this.$nextTick(()=>{
                            
                        })                        
                    })  
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
        },
        watch:{
            patentArray(newpatentArray,old){
                sessionStorage.setItem('innoPatentArray',JSON.stringify(newpatentArray));
                this.InnopatentArray = JSON.parse(sessionStorage.getItem('innoPatentArray'))
            }
        },
        mounted(){
            setTimeout(()=>{
                this.InnopatentArray = JSON.parse(sessionStorage.getItem('innoPatentArray'))
            },100)
        }
    }
</script>