<template>
    <div>
        <div class="dynamic">
            <div class="content">
                <div class="box">
                    <nav class="nav" v-if="navShow">
                        <ul class="nav-ul">
                            <template v-for="(item,i) in navList">
                                <li :class="{'active':i===active}" @click="tabClick(item.id,i)" data-toggle="tab">
                                    <a href="#" >{{item.value_zh}}</a>
                                </li>
                            </template>
                        </ul>
                    </nav>
                    <div class="tab-content">
                        <div class="tab-pane fade in active" style="padding:0 20px;">
                            <div v-for="item in newsContent" class="detail">
                                <img :src="item.cover" class="img" @click="newsDetail(item.id)"/>
                                <div class="text">
                                    <div class="title" @click="newsDetail(item.id)">{{item.title}}</div>
                                    <p class="small-title">{{item.abstracts}}</p>
                                    <div class="base">
                                        <img src="../../assets/img/date@2x.png"/><span>{{item.release_time}}</span>
                                        <img src="../../assets/img/动态来源@2x.png" style="width:9px;height:13px;"/><span>{{item.source}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="newsContent.length===0" class="noResult">
                    <img src="../../assets/img/Loading.gif"/>
                    <!-- <p>没有搜索到相关内容~</p> -->
                </div>
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
.dynamic{
    height:100%;
    .content{
        padding:20px 30px 0 30px;
        .box{
            background:#fff;
            border-radius: 2px;
            .nav-ul{
                width:100%;
                height:50px;
                line-height:50px;
                list-style: none;
                background:#F9F9F9;
                border-radius: 2px 2px 0 0;
                margin-bottom:0;
                li{
                    float:left;
                    padding:0 24px;
                    cursor:pointer;
                    a{
                        text-decoration: none;
                        color:rgba(95,105,125,1);
                    }
                }
                .active{
                    background:#fff;
                    a{
                        color:rgba(0,165,251,1);
                    }
                }
            }
            .tab-content{
                .detail{
                    padding:22px 0;
                    overflow: hidden;
                    border-bottom:1px solid #DDDDDD;
                    .img{
                        width:260px;
                        height:150px;
                        float:left;
                        margin-right:20px;
                        cursor:pointer;
                    }
                    .text{
                        //float:left;
                        //margin-left:20px;
                        margin-left:280px;
                        position:relative;
                        height:150px;
                        .title{
                            font-size:20px;
                            color:rgba(46,49,50,1);
                            cursor:pointer;
                        }
                        .small-title{
                            color:#39454E;
                            margin-top:16px;
                            font-size: 14px;
                        }
                        .base{
                            position:absolute;
                            bottom:0;
                            left:0;
                        }
                        img{
                            width:14px;
                            height:14px;
                            vertical-align: middle;
                            margin-right:5px;
                            margin-top: -1px;
                        }
                        span{
                            font-size:12px;
                            color:#828995;
                            margin-right:20px;
                        }
                    }
                    &:hover{
                        background:rgba(242,249,255,1);
                        .title{
                            color:#008EFF;
                        }
                    }
                }
                .detail:last-child{
                    border:0;
                }
            }
        }
        .noResult{
            text-align:center;
            margin-top:100px;
            img{
                width:124px;
                height:124px;
            }
            p{
                color:rgba(95,105,125,1);
                margin-top:30px;
            }
        }
    }
}
</style>
<script>
    import bus from '../../store/bus.js';
    import navigation from '../../components/pagination.vue';

    export default {
        name: 'app',
        components: {
            navigation,
        },
        data(){
            return {
                pages:0,//总页数
                pageNum:1,//当前页
                navList:[],
                newsContent:[],
                navShow:false,
                query:'',
                flag:0,
                active:0
            }
        },
        methods:{
            msgListView(curPage){
                this.pageNum = curPage;
                if(this.flag === 0){
                    this.getNewsList();
                } else if(this.flag === 1) {
                    this.getSearchNewsList();
                }
                window.scrollTo(0, 0);
            },
            tabClick(id,i){
                this.active = i;
                this.categoryId = id;
                this.pageNum = 1;
                bus.$emit('firstPage');
                this.getNewsList();
            },
            getNewsCategory(){
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/getNewsType',
                    type: 'get',
                    dataType: 'json',
                    data: {},
                    success: (res) => {
                        if(res.status === 0){
                            this.navList = res.newsTypeArray;
                            this.categoryId = this.navList[0].id;
                            this.pageNum = 1;
                            this.getNewsList();
                        }
                    }
                })
            },
            getNewsList(){
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/getNewsByType',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id:this.categoryId,
                        page:this.pageNum,
                        rows:10
                    },
                    success: (res) => {
                        if(res.status === 0){
                            this.pages = Math.ceil(res.numFound / 10);
                            this.newsContent = res.newsArray;
                            this.flag = 0;
                        }
                    }
                })
            },
            getSearchNewsList(){
                this.query = sessionStorage.getItem('searchVal');
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/getNewsByQuery_solr',
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
                            this.newsContent = res.newsArray;
                            this.flag = 1;
                        }
                    }
                })
            },
            newsDetail(id){
                this.$router.push(`/technical/NewsDel`);
                sessionStorage.setItem('newsId',id);
                bus.$emit('newsDetail');
            }
        },
        mounted(){
            window.scrollTo(0,0)
            this.getNewsCategory();
            this.navShow = true;
            bus.$on('dynamicLoad',()=>{
                this.navShow = false;
                setTimeout(()=>{
                    this.navShow = true;
                },100);
                this.getNewsCategory();
                window.scrollTo(0, 0);
            });
            bus.$on('dynamicListLoad',()=>{
                this.navList = [];
                this.newsContent = [];
                this.navShow = false;
                this.pageNum = 1;
                bus.$emit('firstPage');
                this.getSearchNewsList();
                bus.$emit('setSearchVal');
            })
        }
    }
</script>

