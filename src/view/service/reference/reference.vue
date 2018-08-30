<template>
    <div>
        <div class="reference">
            <div class="content">
                <div class="con-list" v-for="item in referenceClass" v-if="flag===0" :id="item.type.id">
                    <div class="classification">
                        <div class="title">{{item.type.value_zh}}</div>
                        <div class="english"><span>—————</span>{{item.type.value_en}}<span>—————</span></div>
                    </div>
                    <ul class="list-show" :class="item.type.id">
                        <li v-for="obj in item.reportArray" class="list-li">
                            <div class="label">内参</div>
                            <img :src="obj.cover" class="img" @click="referenceDetail(obj.id)"/>
                            <div class="listDetail">
                                <div class = "text_con">
                                    <div class="text" @click="referenceDetail(obj.id)">{{obj.title}}</div>
                                </div>
                                <div class="mess">
                                    <div style="overflow: hidden;margin-bottom:10px">
                                        <span style="float:left;color:rgba(133,144,166,1);">{{obj.author.position}}</span>
                                        <span style="float:right;color:rgba(133,144,166,1);">{{obj.release_time}}</span>
                                    </div>
                                    <img class="touxiang img-circle" :src="obj.author.avator" v-if="obj.author.avator"/>
                                    <span>{{obj.author.name}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="more" @click="more(item.type.id)" v-if="item.reportArray.length >4"
                         :id="item.type.id+'show'">点击查看更多<img src="../../../assets/img/more@2x.png"/>
                    </div>
                    <div class="stop" @click="stop(item.type.id)" :id="item.type.id+'stop'">
                        收起<img src="../../../assets/img/stop@2x.png"/></div>
                </div>
                <div class="con-list" v-if="flag===1">
                    <ul class="list-show" v-if="referenceList.length >0">
                        <li v-for="obj in referenceList" class="list-li">
                            <div class="label">内参</div>
                            <img :src="obj.cover" class="img" @click="referenceDetail(obj.id)"/>
                            <div class="listDetail">
                                <div class = "text_con">
                                    <div class="text" @click="referenceDetail(obj.id)">{{obj.title}}</div>
                                </div>
                                
                                <div class="mess">
                                    <div style="overflow: hidden;margin-bottom:10px">
                                        <span style="float:left;color:rgba(133,144,166,1);">{{obj.author.position}}</span>
                                        <span style="float:right;color:rgba(133,144,166,1);">{{obj.release_time}}</span>
                                    </div>
                                    <img class="touxiang img-circle" :src="obj.author.avator" v-if="obj.author.avator"/>
                                    <span>{{obj.author.name}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div v-if="referenceList.length===0" class="noResult">
                        <img src="../../../assets/img/noResult@2x.png"/>
                        <p>没有搜索到相关内容~</p>
                    </div>
                </div>
                <navigation
                    v-if="pages !==0"
                    :pages="pages"
                    @navpage="msgListView">
                </navigation>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.reference{
    // margin-left: 14%;
    // margin-top: 50px;
    box-sizing:border-box;
    padding: 20px 30px;
    .content{
        .con-list{
            padding-top:40px;
            .classification{
                text-align:center;
                margin-bottom:20px;
                .title{
                    font-size:24px;
                    font-family:MicrosoftYaHei-Bold;
                    color:#008EFF;
                    margin-bottom:10px;
                }
                .english{
                    font-size:18px;
                    font-family:ArialMT;
                    color:#5D6870;
                    span{
                        margin:0 20px;
                    }
                }
            }
            .list-show{
                overflow: hidden;
                list-style: none;
                height:350px;
                margin-bottom:20px;
                li{
                    float:left;
                    width:23.5%;
                    // padding-right:20px;
                    margin-bottom:20px;
                    margin-right: 2%;
                    position:relative;
                    .label{
                        position:absolute;
                        text-align: center;
                        top:0;
                        right:0px;
                        width:50px;
                        height:28px;
                        background:rgba(234,67,53,1);
                        color:rgba(255,255,255,1);
                        line-height:28px;
                        padding:0;
                        border-radius: 0;
                    }
                }
                li:nth-child(4){
                    margin: 0;
                }
                .img{
                    width:100%;
                    //height:100%;
                    height:190px;
                    cursor:pointer;
                }
                .listDetail{
                    width: 100%;
                    background:#fff;
                    height:167px;
                    margin-top: -3px;
                    .text_con{
                        height: 74px;
                        box-sizing: border-box;
                        padding: 15px 20px;
                        border-bottom:1px solid #EEEEEE;
                        .text{
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp:2;
                            -webkit-box-orient: vertical;
                            // height: 54px;
                            // width: 100%;
                            font-size:16px;
                            line-height: 24px;
                            // color:rgba(46,49,50,1);
                            // border-bottom:1px solid #EEEEEE;
                            // padding:15px 20px;
                            box-sizing: border-box;
                            cursor:pointer;
                            &:hover{
                                color:rgba(41,180,252,1);
                            }
                        }
                    }
                    
                    .mess{
                        padding:13px 20px 20px 20px;
                        img{
                            margin-right:8px;
                            vertical-align: middle;
                        }
                        .touxiang{
                            width:28px;
                            height:28px;
                        }
                        .img-circle{
                            border-radius:50%;
                        }
                    }
                }
            }
            .noResult{
                text-align:center;
                margin-top:100px;
                img{
                    width:197px;
                    height:166px;
                }
                p{
                    color:rgba(95,105,125,1);
                    margin-top:30px;
                }
            }
            .stop{
                display:none;
                margin-bottom:3px;

            }
            .more,.stop{
                cursor:pointer;
                font-size:16px;
                color:rgba(133,144,166,1);
                text-align:center;
                img{
                    width:14px;
                    height:8px;
                    margin-left:10px;
                }
            }
        }
    }
}

</style>
<script>
    import bus from '../../../store/bus.js';
    import navigation from '../../../components/pagination.vue';
    export default {
        name: 'app',
        components: {
            navigation
        },
        data(){
            return {
                referenceClass:[],
                pages:0,//总页数
                pageNum:1,//当前页
                referenceList:[],
                flag:0,
                nav:""
            }
        },
        methods:{
            more(id){
                // $('.'+id).height(740);
                // $('#'+id +'show').css('display','none');
                // $('#'+id +'stop').css('display','block');
                sessionStorage.setItem("referenceId",id);
                if(id==0){
                    this.nav = "最新内参"
                }else if(id == 1){
                    this.nav = "热点科技"
                }else if(id == 2){
                    this.nav = "重大科技"
                }
                sessionStorage.setItem("referenceNav",this.nav)
                this.$router.push('/technical/referenceList');
                setTimeout(function(){
                    bus.$emit("getMoreData")
                },100)
            },
            stop(id){
                $('html,body').animate({scrollTop:$('#'+id).offset().top}, 800);
                setTimeout(()=>{
                    $('.'+id).height(350);
                    $('#'+id +'show').css('display','block');
                    $('#'+id +'stop').css('display','none');
                },500);
            },
            // 左侧边栏点击jump到指定的分类位置
            jumpTo(id){
                if(this.flag === 0){
                    $('html,body').animate({scrollTop:$('#'+id).offset().top}, 500);
                }
            },
            msgListView(curPage){
                this.pageNum = curPage;
                this.getSearchreferenceList();
                window.scrollTo(0, 0);
            },
            referenceArr(){
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/getReportByType',
                    type: 'get',
                    dataType: 'json',
                    data: {},
                    success: (res) => {
                        if(res.status === 0){
                            this.referenceClass = res.typeReportArray;
                            this.flag = 0;
                        }
                    }
                })
            },
            getSearchreferenceList(){
                // this.query = sessionStorage.getItem('searchVal');
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/getReportByQuery_solr',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        query:this.query,
                        page:this.pageNum,
                        rows:10
                    },
                    success: (res) => {
                        if(res.status === 0){
                            this.pages = Math.ceil(res.numFound / 10);
                            this.referenceList = res.reportArray;
                            this.referenceList.forEach((obj)=>{
                                obj.name = obj.author.name;
                                obj.avator = obj.author.avator;
                            });
                            this.flag = 1;
                        }
                    }
                })
            },
            referenceDetail(id){
                this.$router.push(`/technical/referenceDetail`);
                sessionStorage.setItem('referenceId',id);
                bus.$emit('referenceDetail');
            },
            // goReferenceSearch(){
            //     this.$router.push(`/referenceAll/referenceSearch`);  
            //     bus.$emit('referenceListLoad');
            // }
        },
        mounted(){
            window.scrollTo(0,0)
            this.referenceArr();
            let searchType = sessionStorage.getItem('searchType');
            // if(searchType === 'search'){
            //     this.getSearchreferenceList();
            // } else if(searchType === 'click'){
            //     this.referenceArr();
            // }
            // 当在科技动态时直接跳到科技内参的二级导航
            let anchorId = sessionStorage.getItem('anchorId');
            if(anchorId){
                this.referenceList = [];
                this.pages = 0;
                this.referenceArr();
                setTimeout(()=>{
                    this.jumpTo(anchorId);
                },500);
                sessionStorage.removeItem('anchorId');
            }
            //
            bus.$on('referenceLoad',(id)=>{
                if(id){
                    // 跳转到二级目录
                    this.referenceList = [];
                    this.pages = 0;
                    this.referenceArr();
                    setTimeout(()=>{
                     this.jumpTo(id);
                    },200);
                } else {
                    this.referenceList = [];
                    this.pages = 0;
                    this.referenceArr();
                    window.scrollTo(0, 0);
                }
            });
            // bus.$on("goReferenceSearch",()=>{
            //     this.goReferenceSearch()
            // })
            /*bus.$on('anchor',(id)=>{
                this.jumpTo(id);
            })*/
        }
    }
</script>

