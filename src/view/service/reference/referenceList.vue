<template>
    <div class = "referenceList_con">
        <nav>
            <span @click = "goRouter">科技分析></span>
            <span style = "font-size: 14px;color: rgb(120, 130, 151);;">{{navList}}</span>
        </nav>
        <h4>科技内参</h4>
        <div class = "listBox">
            <div class = "list_con" v-for="obj in referenceList" :key="obj.id">
                <img :src="obj.cover" alt="" class = "list_img" @click="referenceDetail(obj.id)"/>
                <div class = "list_right">
                    <div class = "header" @click="referenceDetail(obj.id)">{{obj.title}}</div>
                    <div class = "intruction">{{obj.abstracts}}</div>
                    <div class = "footer">
                        <img src="../../../assets/img/special.png" alt="" class="list_icon">
                        <span class = "list_name">{{obj.name}}</span>
                    </div>
                </div>
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
    .referenceList_con{
        box-sizing:border-box;
        padding: 0 1.5%;
        nav{
            box-sizing: border-box;
            padding: 20px 0 20px 0;
            span:first-child{
                font-size: 14px;
                color: #00a5fb;
                cursor: pointer;
            }
        }
        h4{
            font-size: 18px;
            font-family: "微软雅黑";
            color: #000;
            box-sizing: border-box;
            padding-left: 0.8%;
            border-left: 3px solid #00a5fb;
            line-height: 18px;
        }
        .listBox{
            box-sizing: border-box;
            padding: 0px 4%;
            background: #fff;
            margin-top: 18px;
            .list_con{
                box-sizing: border-box;
                padding: 30px 0 22px 0;
                overflow: hidden;
                border-bottom: 2px solid #E9EFF3;
                .list_img{
                    float: left;
                    width: 262px;
                    height: 180px;
                    cursor: pointer;
                }
                .list_img:hover{
                    opacity: 0.75;
                }
                .list_right{
                    position: relative;
                    float: left;
                    width: 70%;
                    margin-left: 3%;
                    height: 188px;
                    .header{
                        font-size: 20px;
                        color: #222D36;
                        font-family: "微软雅黑";
                        cursor: pointer;
                        margin-top: -5px;
                    }
                    .header:hover{
                        color: #008EFF;
                    }
                    .intruction{
                        font-size: 14px;
                        color: #727C90;
                        margin-top: 20px;
                    }
                    .footer{
                        position: absolute;
                        left: 0;
                        bottom: 5px;
                        width: 100%;
                        overflow: hidden;
                        .list_icon{
                            width: 12px;
                            height: 13px;
                            margin-right: 1%;
                            margin-top: -3px;
                        }
                        .list_name{
                            font-size: 14px;
                            color: #788297
                        }
                    }                    
                }
                &:hover{
                    background:rgba(242,249,255,1);
                    .header{
                        color: #008EFF;
                    }
                }
            }
            .list_con:last-child{
                border-bottom: none;
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
        return{
            navList:"",
            pages:0,//总页数
            pageNum:1,//当前页
            referenceList:[],
        }
    },
    methods:{
        goRouter(){
            this.$router.push(`/referenceAll/reference`);
        },
        msgListView(curPage){
           this.pageNum = curPage;
           this.getSearchreferenceList();
        },
        getSearchreferenceList(){
            window.scrollTo(0,0)
            let referenceId = sessionStorage.getItem('referenceId');
            $.ajax({
                url: this.biz.serverUrl+'/piionee/getReportByQuery',
                type: 'get',
                dataType: 'json',
                data: {
                    query:"",
                    id:referenceId,
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
                        // this.flag = 1;
                    }
                }
            })
        },
        referenceDetail(id){
            this.$router.push(`/technical/referenceDetail`);
            sessionStorage.setItem('referenceId',id);
            bus.$emit('referenceDetail');
        }
    },
    mounted(){
        this.navList = sessionStorage.getItem("referenceNav")
        this.getSearchreferenceList();
        bus.$on("getMoreData",(id)=>{
            bus.$emit('firstPage');
            this.getSearchreferenceList()
        })
    }
}
</script>
