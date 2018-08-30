<template>
    <div>
        <div class="newsDetail">
            <div class="content">
                <div class="con-left">
                    <div class="box">
                        <div class="header">
                            <p class="title">{{content.title}}</p>
                            <img src="../../assets/img/date@2x.png"/><span>{{content.release_time}}</span>
                            <img src="../../assets/img/source@2x.png"/><span>{{content.source}}</span>
                        </div>
                        <div class="text" ref="text" v-html="content.content"></div>
                    </div>
                </div>
                <div class="con-right" >
                    <div class="title">相关科技内参</div>
                    <ul class="con-ul"  v-if="referenceShow">
                        <li v-for="item in referenceList" class="con-li">
                            <a class="tip" @click="referenceClick(item.id)">{{item.title}}</a>
                            <div style="float:left">
                                <img style="width:28px;height:28px" :src="item.avator" class="img-circle"/>
                                <span>{{item.name}}</span>
                            </div>
                            <div class="time"><img src="../../assets/img/date@2x.png"/>{{item.release_time}}</div>
                        </li>
                    </ul>
                    <div v-if="!referenceShow" class="noContent">
                        无相关科技内参!
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.newsDetail{
    height:100%;
    .content{
        padding:20px 30px 40px 30px;
        overflow: hidden;
        .bigBox{
            width:100% !important;
            padding-right:0 !important;
        }
        .con-left{
            width:75%;
            float:left;
            padding-right:20px;
            .box{
                background:#fff;
                padding:20px 20px 0 20px;
                .header{
                    border-bottom:1px solid #DDDDDD;
                    padding-bottom:13px;
                    .title{
                        font-size:26px;
                        color:rgba(46,49,50,1);
                        margin-bottom:17px;
                    }
                    span{
                        font-size:12px;
                        color:rgba(133,144,166,1);
                        margin-right:20px;
                    }
                    img{
                        width:14px;
                        height:14px;
                        margin-right:5px;
                    }
                }
                .text{
                    padding:30px 0;
                    font-size:16px;
                    line-height:32px;
                }
            }
        }
        .con-right{
            width:23%;
            background:#fff;
            float:left;
            .title{
                height:50px;
                line-height:50px;
                color:rgba(95,105,125,1);
                padding-left:20px;
                border-bottom:1px solid #EEEEEE;
            }
            .con-ul{
                list-style: none;
                padding:0 20px;
                margin:0;
                .con-li{
                    padding:20px 0 18px 0;
                    border-bottom:1px dashed #CED3DB;
                    overflow: hidden;
                    .tip{
                        color:rgba(46,49,50,1);
                        font-size:16px;
                        margin-bottom:10px;
                        display:block;
                        cursor:pointer;
                        &:hover{
                            color:rgba(0,165,251,1);
                        }
                    }
                    span{
                        color:rgba(133,144,166,1);
                        font-size:12px;
                    }
                    .time{
                        float:right;
                        color:rgba(133,144,166,1);
                        font-size:12px;
                        margin-top:5px;
                        img{
                            width:14px;
                            height:14px;
                            margin-right:5px;
                        }
                    }
                }
                .con-li:last-child{
                    border:0;
                }
            }
            .noContent{
                padding:20px;
            }
        }
    }
}
</style>
<script>
    import bus from '../../store/bus.js';
    export default {
        name: 'app',
        components: {
        },
        data(){
            return {
                content:{},
                referenceList:[],
                referenceShow:false
            }
        },
        methods:{
            newsDetail(){
                let that = this;
                this.newsId = sessionStorage.getItem('newsId');
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/getNewsDetailsAndRelatedReport',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id:this.newsId,
                    },
                    success: (res) => {
                        let that = this;
                        if(res.status === 0){
                            this.content = res;
                            if(res.related_reportArray && res.related_reportArray.length >0){
                                this.referenceShow = true;
                                this.referenceList = res.related_reportArray;
                                this.referenceList.forEach((obj)=>{
                                    obj.name = obj.author.name;
                                    obj.avator = obj.author.avator;
                                });
                            } else {
                                this.referenceShow = false;
                            }
                        }
                    }
                })
            },
            referenceClick(id){
                this.$router.push(`/technical/referenceDetail`);
                sessionStorage.setItem('referenceId',id);
                bus.$emit('referenceDetail');
            }
        },
        mounted(){
            this.newsDetail();
            bus.$on('newsDetail',()=>{
                // 回到顶部
                window.scrollTo(0, 0);
                this.newsDetail();
                bus.$emit('setSearchVal');
            });
        },
        watch:{
            content(){
                let that = this;
                this.$nextTick(() => {
                    $('table').css({'border':'1px solid #DDDDDD','margin-bottom':'30px','width':'100%'});
                    $('tr').css('border-bottom','1px solid #DDDDDD');
                    $('tr td').css({'padding':'15px','border-right':'1px solid #DDDDDD'});
                    $('tr td:first-child').css({'width':'142px','text-align':'center'});
                    $('.text img').css('width','100%');
                    let ps = that.$refs.text.getElementsByTagName("p");
                    let imgs = that.$refs.text.getElementsByTagName("img");
                    let h3s = that.$refs.text.getElementsByTagName("h3");
                    let h2s = that.$refs.text.getElementsByTagName("h2");
                    let brs = that.$refs.text.getElementsByTagName("br");
                    let p = Array.from(ps);
                    let img = Array.from(imgs);
                    let h3 = Array.from(h3s);
                    let h2 = Array.from(h2s);
                    let br = Array.from(brs);
                    p.forEach(function(v){
                        v.style.textIndent = 2 + 'em';
                        if(v.innerHTML == "&nbsp;"){
                            $(v).remove();
                        }
                    });
                    img.forEach(function(i){
                        i.style.cssText = "width:65%; height:65%; margin:20px 0 20px 100px; display:block"
                    });
                    h3.forEach(function(h){
                        let h_ps = h.getElementsByTagName("p");
                        let h_p = Array.from(h_ps);
                        h_p.forEach(function(p){
                            p.style.textIndent = 0 + 'em';
                        })
                        h.style.cssText = "text-indent:0em; fontSize:18px; font-size:18px; font-weight:600";
                    });
                    br.forEach(function(b){
                       $(b).remove();
                    });
                    h2.forEach(function(h2){
                        h2.style.cssText = "font-size:18px; font-weight:bold"
                    });
                })
            }
        }
    }
</script>

