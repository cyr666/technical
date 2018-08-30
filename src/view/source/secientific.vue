<template>
    <div>
        <div class = "scientific">
            <div class = "content">
                <!-- <div class = "institution_letter_con">
                    <span class = "blueSpan" @click="returnClick">科技转移服务</span>
                    <span class = "graySpan">>科技成果</span>
                </div> -->
                <div class = "hotArea_con">
                    <span class = "hotArea_letter">热门领域:</span>
                    <span style = "margin-right:2%">全部<em style = "color:#9FA7B9">({{count}})</em></span>
                    <span v-for="item in fieldArray" :key="item.id" class = "themui" :id ="item.id" @click="topicClick(item.cursor)"><span class="themeuiName">{{item.name}}</span><em style = "color:#9FA7B9">({{item.num}})</em></span>
                </div>
                <div class = "institutionList_letter">科技成果</div>
                <div class = "box">                    
                    <!-- <nav class = "nav" v-if="navShow">
                        <ul class = "nav-ul">
                           <template v-for="(item,i) in navList">
                                <li :class="{'active':i===0}" data-toggle="tab"  :key="item.id" @click="tabClick(item.id)">
                                    <a href="" >{{item.value_zh}}</a>
                                </li>
                            </template>
                        </ul>
                    </nav> -->
                    <div class="tab-content">
                        <div class="tab-pane fade in active" style="padding:0 20px;">
                            <div v-for="item in newsContent" class="detail" :key="item.id">
                                <img :src="item.cover" class="img" @click="scientificDetail(item.old_achievement_id)"/>
                                <div class="text">
                                    <div class="title" @click="scientificDetail(item.old_achievement_id)">{{item.title}}</div>
                                    <p class = "clickIns" @click="getInstitutionDetail(item.institution.id)">{{item.institution.name}}</p>
                                    <p class="small-title">{{item.abstracts}}</p>
                                    <div class="base">
                                        <!-- <img src="../assets/img/jigou.png"/><span>{{item.institution}}</span> -->
                                        <img  style = "margin-top:-5px" src="../../assets/img/teach.png"/>
                                        <span v-for = "a in item.scholarArray" :key="a.id">
                                            {{a.name}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    .scientific {
        // margin-left:220px;
        height:100%;
        .content {
            padding:20px 30px 0 30px;
            .institution_letter_con{
                margin-bottom: 18px;
                .blueSpan{
                    font-size: 14px;
                    color: #00A5FB;
                    cursor: pointer;
                }
                .graySpan{ 
                    font-size: 14px;
                    color: #2E3132
                }
            }
            .hotArea_con{
                box-sizing: border-box;
                width: 100%;
                padding: 20px 2%;
                margin-bottom: 20px;
                background: #fff;
                box-shadow: 0 0 10px #ccc;
                .hotArea_letter{
                    line-height:28px;
                    font-size: 14px;
                    color: #9097A5;
                    margin-right: 2%;
                }
                .themui{
                    line-height: 28px;
                    font-size: 14px;
                    margin-right: 2%;
                    cursor: pointer;
                }
                .only{
                    color: #1292FA;
                }
                .themui:hover{
                    color: #1292FA;
                }
            } 
            .institutionList_letter{
                box-sizing: border-box;
                margin: 31px 0 18px 0;
                padding-left: 5px;
                border-left: 3px solid #008EFF;
                font-size: 16px;
                line-height: 16px;
                color: #000000;
                font-family: SourceHanSansCN-Regular,"微软雅黑";
            }
            .box{
                background:#fff;
                border-radius: 2px;
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
                                font-size:22px;
                                color:rgba(46,49,50,1);
                                cursor:pointer;
                            }
                            .small-title{
                                color:rgba(133,144,166,1);
                                margin-top:10px;
                            }
                            .base{
                                position:absolute;
                                top:134px;
                                left:0;
                            }
                            img{
                                width:14px;
                                height:14px;
                                margin-right:5px;
                            }
                            span{
                                font-size:12px;
                                color:rgba(133,144,166,1);
                                margin-right:20px;
                            }
                            .clickIns{
                                margin: 10px 0;
                                font-size: 14px;
                                color: rgba(0,165,251,1);
                                text-decoration: underline;
                                cursor: pointer;
                            }
                        }
                        &:hover{
                            background:rgba(247,249,249,1);
                            .title{
                                color:rgba(0,165,251,1);
                            }
                        }
                    }
                    .detail:last-child{
                        border:0;
                    }
                }
            }
        }
    }
</style>
<script>
    import bus from '../../store/bus.js';
    import navigation from '../../components/pagination.vue';

    export default{
        name: 'app',
        components: {
            navigation
        },
        data(){
            return {
                navList:[],
                pages:0,//总页数
                pageNum:1,//当前页
                flag:0,
                newsContent:[],
                query:'',
                navShow:false,
                fieldArray:[],
                count:0,
                id:'',
            }
        },
        methods:{
            msgListView(curPage){
                console.log(curPage)
                this.pageNum = curPage;
                // if(this.flag === 0){
                //     this.getNewsList();
                // } else if(this.flag === 1) {
                //     this.getSearchNewsList();
                // }
                this.getNewsList();
                window.scrollTo(0, 0);
            },
            returnClick(){
                this.$router.push(`/technologyTransform`)
            },
            // getNewsCategory(){
            //     $.ajax({
            //         url: this.biz.serverUrl+'/piionee/getAchievementType',
            //         type: 'get',
            //         dataType: 'json',
            //         data: {},
            //         success: (res) => {
            //             if(res.status === 0){
            //                 this.navList = res.achievementTypeArray;
            //                 this.categoryId = this.navList[0].id;
            //                 this.pageNum = 1;
            //                 this.getNewsList();
            //             }
            //         }
            //     })
            // },
            getInstitutionDetail(id){
                console.log(id)
                sessionStorage.setItem('institutionId',id);
                // sessionStorage.setItem("navList",this.navList);
                this.$router.push('/institutionDetail');
                // bus.$emit('getNavList');
                bus.$emit('getInstitutionDetail');
            },
            getNewsList(){
                let val = sessionStorage.getItem('achieveSearchList');
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/transfer/getAchievementByQuery',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        query: val,
                        page:this.pageNum,
                        rows:8
                    },
                    success: (res) => {
                        if(res.status === 0){
                            this.pages = Math.ceil(res.numFound / 8);
                            this.newsContent = res.achievementArray;
                            this.flag = 0;
                            console.log(res)
                        }
                    }
                })
            },
            getSearchNewsList(){
                this.query = sessionStorage.getItem('searchVal');
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/transfer/getAchievementByQuery',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        query:this.query,
                        page:this.pageNum,
                        field_id: this.id,
                        rows:8
                    },
                    success: (res) => {
                        if(res.status === 0){
                            this.pages = Math.ceil(res.numFound / 8);
                            this.newsContent = res.achievementArray;
                            this.flag = 1;
                        }
                    }
                })
            },
            topicClick(id){
                this.id = id;
                this.pageNum = 1;
                let themeuiNames = document.getElementsByClassName("themeuiName");
                let themeuiName = Array.from(themeuiNames);
                let themuis = document.getElementsByClassName("themui");
                let themui = Array.from(themuis);
                var searchVal = $(themeuiName[id])[0].innerHTML;
                sessionStorage.setItem('achieveSearchList',searchVal);
                themui.forEach((val,ind)=>{
                    $(val).removeClass("only")
                })
                $(themui[id]).addClass('only')
                this.getNewsList();
            },
            scientificDetail(id){
                console.log(id)
                sessionStorage.setItem('scientificId',id);
                this.$router.push(`/technical/scientificDetail`)
                bus.$emit('scientificDetail');
            },
        /********************************获取热词********************************/
            getTopicArray(){
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/transfer/getEachFieldNum',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id:3
                    },
                    success: (res) => {
                        if(res.status === 0){
                            console.log(res)
                            this.fieldArray = res.fieldArray;
                            var count = 0;
                            res.fieldArray.forEach((obj)=>{
                                count+=obj.num
                            });
                            this.count = count;
                        }
                    }
                })
            }
        },
        mounted(){
            sessionStorage.getItem('achieveSearchList','');
            this.getTopicArray();
            this.navShow = true;
            this.getNewsList();
            // bus.$on('scientificLoad',()=>{
            //     this.navShow = false;
            //     setTimeout(()=>{
            //         this.navShow = true;
            //     },100);
            //     this.getNewsCategory();
            //     window.scrollTo(0, 0);
            // });
            // bus.$on("getNewsList",()=>{
            //     this.getNewsList();
            // });
            bus.$on("firstPage",()=>{
                this.pageNum = 1;
                sessionStorage.setItem('achieveSearchList','');
                let themuis = document.getElementsByClassName("themui");
                let themui = Array.from(themuis);
                themui.forEach((val,ind)=>{
                    $(val).removeClass("only")
                })
                this.getNewsList();
            })
            bus.$on('scientificListLoad',()=>{
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