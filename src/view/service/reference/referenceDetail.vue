<template>
    <div>
        <div class="referenceDetail">
            <div class="content">
                <div class="con-left" :class="{'bigBox':!topicShow}">
                    <div class="box1">
                        <div class="header">
                            <div class="head-left">
                                <p>{{detailInfo.title}}</p>
                                <img src="../../../assets/img/date@2x.png"/><span>{{detailInfo.release_time}}</span>
                                <img src="../../../assets/img/copyright@2x.png"/><span>版权所有，请勿传播和转载</span>
                                <a :href="detailInfo.pdf_url" download v-if="detailInfo.pdf_url !==''" target="_blank">
                                    <img src="../../../assets/img/download@2x.png"/>下载PDF</a>
                            </div>
                            <div class="head-right">
                                <div class="person-detail">
                                    <img :src="author.avator" class="img-circle" v-if="author.avator"/>
                                    <div class="text">
                                        <p>{{author.position}}</p>
                                        <div>{{author.name}}</div>
                                    </div>
                                </div>
                                <div class="checked" v-if="author.brief">{{author.brief}}</div>
                            </div>
                        </div>
                        <div class="mainBody" v-html="detailInfo.content">
                        </div>
                    </div>
                    <div class="box2" v-if="recommended.length !==0">
                        <div class="title">推荐阅读</div>
                        <div class="recommend">
                            <ul>
                                <li v-for="item in recommended">
                                    <p><a @click="recommendedClick(item.id)">{{item.title}}</a></p>
                                    <div style="float:left">
                                        <img class="avator img-circle" :src="item.author.avator"/>
                                        <span>{{item.author.name}}</span>
                                    </div>
                                    <div class="time"><img src="../../../assets/img/date@2x.png"/>{{item.release_time}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="con-right" v-if="topicShow">
                    <div class="headline"><span class="border"></span>相关技术主题</div>
                    <nav class="nav" v-if="relatedShow">
                        <ul class="themeUl">
                            <li :class="refTab==i?'active':''" v-for="(item,i) in theme" data-toggle="tab"
                            @click="changeTheme(item.id,i)">{{item.value}}</li>
                        </ul>
                    </nav>
                    <div class="card achievements" v-if="mentionShow">
                        <div class="title">技术成果</div>
                        <div id="bar-graph"></div>
                    </div>
                    <div class="card" v-if="tendencyShow">
                        <div class="title">趋势预测</div>
                        <div id="line"></div>
                    </div>
                    <div class="card tendency" v-if="analysisShow">
                        <div class="title">趋势预测</div>
                        <div style="padding-top:30px;">
                            <div id="pie"></div>
                            <div class="saturated">饱和值<span>{{analysis.saturated_value}}</span>篇</div>
                            <div style="text-align:center">
                                <div style="overflow: hidden;padding-bottom:20px;display:inline-block">
                                    <div class="tendency-left">
                                        <p>{{analysis.halfLife_time}}</p>
                                        <span>半衰期</span>
                                    </div>
                                    <div class="tendency-right">
                                        <p>{{analysis.saturated_year}}</p>
                                        <span>饱和年份</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card famousScholar" v-if="scholarShow">
                        <div class="title">知名学者</div>
                        <div class="box">
                            <ul class="scholar">
                                <li v-for="(item,i) in scholar">
                                    <i class="number">{{i+1}}</i>
                                    <span>{{item.name}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="headline" v-if="dynamicShow"><span class="border"></span>相关动态</div>
                    <div class="card dynamic" v-if="dynamicShow">
                        <div class="title">科技动态</div>
                        <div class="box">
                            <ul class="dynamic-ul">
                                <li v-for="(item,i) in dynamic">
                                    <div class="problem" @click="dynamicClick(item.id)">{{item.title}}</div>
                                    <img src="../../../assets/img/date@2x.png"/><span>{{item.release_time}}</span>
                                    <img src="../../../assets/img/copyright@2x.png"/><span>{{item.source}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.referenceDetail{
    // margin-left:220px;
    height:100%;
    .content{
        padding:20px 30px;
        overflow: hidden;
        .bigBox{
            width:100% !important;
            padding-right:0 !important;
        }
        .con-left{
            width:74%;
            float:left;
            padding-right:20px;
            .box1{
                background:#fff;
                padding:20px 20px 40px 20px;
                .header{
                    border-bottom:1px solid #DDDDDD;
                    padding-bottom:14px;
                    overflow: hidden;
                    .head-left{
                        box-sizing: border-box;
                        float:left;
                        width:73%;
                        // padding-right:20px;
                        p{
                            font-size:26px;
                            color:rgba(46,49,50,1);
                            margin-bottom: 10px;
                        }
                        span{
                            margin-right:30px;
                            font-size:12px;
                            color: #8590a6;
                        }
                        img{
                            width:14px;
                            height:14px;
                            margin-right:4px;
                            vertical-align: middle;
                        }
                        a{
                            font-size:12px;
                            color:rgba(46,49,50,1);
                            cursor:pointer;
                            &:hover{
                                color:rgba(0,165,251,1);
                            }
                        }
                    }
                    .head-right{
                        width:20%;
                        float:right;
                        padding-left:20px;
                        border-left:1px solid #DDDDDD;
                        .person-detail{
                            overflow: hidden;
                            img{
                                float:left;
                                width:60px;
                                height:60px;
                                margin-right:10px;
                            }
                            .img-circle{
                                border-radius: 50%;
                            }
                            .text{
                                float:left;
                                p{
                                    font-size:12px;
                                    color:rgba(133,144,166,1);
                                }
                                div{
                                    font-size:16px;
                                    color:rgba(46,49,50,1);
                                }
                            }
                        }
                        .checked{
                            margin-top:14px;
                            border:1px solid #00A5FB;
                            color:rgba(41,180,252,1);
                            font-size:12px;
                            padding:4px 10px;
                        }

                    }
                }
                .mainBody{
                    //background: rgba(242,251,255,1);
                    margin-top: 40px;
                    padding:20px;
                    line-height:30px;
                }

            }
            .box2{
                margin-top:20px;
                background:#fff;
                .title{
                    height:50px;
                    line-height:50px;
                    color:rgba(95,105,125,1);
                    padding-left:20px;
                    border-bottom:1px solid #EEEEEE;
                }
                .recommend{
                    padding:0 20px;
                    ul{
                        list-style: none;
                        li{
                            padding:20px 0;
                            border-bottom:1px dashed #CED3DB;
                            overflow: hidden;
                            p{
                                margin-bottom: 10px;
                                a{
                                    font-size:16px;
                                    color:rgba(46,49,50,1);
                                    cursor:pointer;
                                    &:hover{
                                        color:rgba(0,165,251,1);
                                    }
                                }

                            }
                            .avator{
                                width:28px;
                                height:28px;
                            }
                            .img-circle{
                                border-radius: 50%;
                                vertical-align: middle;
                            }
                            span{
                                font-size:12px;
                                color:rgba(133,144,166,1);
                            }
                            .time{
                                font-size:12px;
                                color:rgba(133,144,166,1);
                                float:right;
                                margin-top:5px;
                                img{
                                    width:14px;
                                    height:14px;
                                    vertical-align: bottom;
                                    margin-right:4px;
                                }
                            }
                        }
                        li:last-child{
                            border:0;
                        }
                    }
                }
            }
        }
        .con-right{
            width:24%;
            float:left;
            .headline{
                font-size:18px;
                color:rgba(46,49,50,1);
                margin-bottom:20px;
                .border{
                    width:3px;
                    height:18px;
                    float:left;
                    background:rgba(0,165,251,1);
                    margin-top:4px;
                    margin-right:6px;
                }
            }
            .themeUl{
                list-style: none;
                overflow: hidden;
                li{
                    float:left;
                    padding:5px 12px;
                    font-size:12px;
                    color:rgba(95,105,125,1);
                    background:rgba(220,228,231,1);
                    border-radius: 100px;
                    cursor:pointer;
                    margin-right:10px;
                    margin-bottom:10px;
                }
                .active{
                    background:rgba(0,165,251,1);
                    color:#ffffff;
                }
            }
            .card{
                background:#fff;
                margin-bottom:20px;
                .title{
                    height:50px;
                    line-height:50px;
                    color:rgba(95,105,125,1);
                    padding-left:20px;
                    border-bottom:1px solid #EEEEEE;
                }
                #bar-graph{
                    width:100%;
                    height:200px;
                }
                #line{
                    width:100%;
                    height:200px;
                }
                #pie{
                    width:100%;
                    height:120px;
                }
            }
            .tendency{
                p{
                    margin:0;
                }
                .saturated{
                    text-align:center;
                    margin:15px 0 0 0;
                    font-size:12px;
                    color:rgba(133,144,166,1);
                    margin-bottom:30px;
                    span{
                        font-size:18px;
                        color:rgba(133,144,166,1);
                        font-family:Arial-BoldMT !important;
                        margin:0 5px;
                    }
                }
                .tendency-left{
                    float:left;
                    padding-right:30px;
                    border-right:1px solid #DDDDDD;
                }
                .tendency-right{
                    float:left;
                    padding-left:30px;
                }
                .tendency-left,.tendency-right{
                    text-align:center;
                    p{
                        font-size:20px;
                        color:rgba(246,92,99,1);
                    }
                    span{
                        font-size:12px;
                        color:rgba(133,144,166,1);
                    }
                }
            }
            .famousScholar{
                .box{
                    padding:30px 0 20px 20px;
                    .scholar{
                        list-style: none;
                        li{
                            margin-bottom:20px;
                            .number{
                                width:14px;
                                height:14px;
                                line-height:14px;
                                text-align:center;
                                color:#FFFFFF;
                                background:#F65C63;
                                float:left;
                                margin-top:2px;
                                margin-right:6px;
                            }
                        }
                    }
                }
            }
            .dynamic{
                .box{
                    padding:0 20px;
                    .dynamic-ul{
                        list-style: none;
                        li{
                            padding:20px 0;
                            border-bottom:1px dashed #DDDDDD;
                            span{
                                font-size:12px;
                                color:rgba(133,144,166,1);
                                margin-right:20px;
                            }
                            img{
                                width:14px;
                                height:14px;
                                vertical-align: middle;
                                margin-right:4px;
                            }
                            .problem{
                                font-size:16px;
                                color:rgba(46,49,50,1);
                                margin-bottom:18px;
                                cursor:pointer;
                                &:hover{
                                    color:rgba(0,165,251,1);
                                }
                            }
                        }
                        li:last-child{
                            border:0;
                        }
                    }
                }
            }
        }
    }
}
</style>
<script>
    import bus from '../../../store/bus.js';
    // import navWebsite from '../components/nav.vue';
    // import headerWebsite from '../components/header.vue';
    export default {
        name: 'app',
        components: {
            // navWebsite,
            // headerWebsite
        },
        data(){
            return {
                theme:[],
                scholar:[],
                dynamic:[],
                recommended:[],
                referenceId:'',
                topicId:'',
                detailInfo:{},
                author:{},
                mention:{},
                tendency:{},
                analysis:{},
                relatedShow:false,
                topicShow:false,
                mentionShow:false,// 技术成果
                tendencyShow:false,// 趋势预测
                scholarShow:false,// 知名学者
                dynamicShow:false,//科技动态
                analysisShow:false,
                refTab:0,
            }
        },
        methods:{
            drawBar(){
                let chart = this.$echarts.init(document.getElementById('bar-graph'));
                let barOption = {
                    color: ['#29B4FC'],
                    tooltip : {
                        trigger: 'axis',
                        formatter: function(params) {
                            return params[0].value + '篇-' + params[0].name +'年'
                        }
                    },
                    grid: {
                        top:'3%',
                        left: '1%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.mention.date,
                            axisLine:{show:false},
                            axisTick:{show:false}
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            show:false
                        }
                    ],
                    series : [
                        {
                            type:'bar',
                            barWidth: '60%',
                            data:this.mention.value
                        }
                    ]
                };
                chart.setOption(barOption);
            },
            drawLine(){
                let chart = this.$echarts.init(document.getElementById('line'));
                let lineOption = {
                    grid: {
                        top:'3%',
                        left: '1%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            axisLine:{show:false},
                            axisTick:{show:false},
                            data : this.tendency.date
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            show:false
                        }
                    ],
                    series : [
                        {
                            name:'',
                            type:'line',
                            smooth: false,
                            areaStyle: {normal: {
                                color:'rgba(251,180,74,0.3)'
                            }},
                            lineStyle:{
                                normal:{
                                    color:'rgba(251,180,74,1)',
                                    width:4
                                }
                            },
                            symbolSize:0,
                            data:this.tendency.value
                        }
                    ]
                };
                chart.setOption(lineOption);
            },
            drawPie(){
                let chart = this.$echarts.init(document.getElementById('pie'));
                let dataStyle = {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                };
                let placeHolderStyle = {
                    normal: {
                        color: 'rgba(246,92,99,0.3)',//未完成的圆环的颜色
                    },
                    emphasis: {
                        color: 'rgba(246,92,99,0.7)'//未完成的圆环的颜色
                    }
                };
                let pieOption = {
                    title: [{
                        text: this.analysis.mentions_count,
                        left: '49%',
                        top: '32%',
                        textAlign: 'center',
                        textBaseline: 'middle',
                        textStyle: {
                            color: 'rgba(246,92,99,1)',
                            fontWeight: 'normal',
                            fontSize: 24
                        }
                    }, {
                        text: '增长因子'+ this.analysis.increase_factor,
                        left: '49%',
                        top: '53%',
                        textAlign: 'center',
                        textBaseline: 'middle',
                        textStyle: {
                            color: 'rgba(133,144,166,1)',
                            fontWeight: 'normal',
                            fontSize: 12
                        }
                    }],
                    series: [{
                        type: 'pie',
                        radius: [56, 60],
                        itemStyle: dataStyle,
                        hoverAnimation: false,
                        data: [{
                            value: this.analysis.mentions_count,
                        }, {
                            value: this.analysis.saturated_value-this.analysis.mentions_count,
                            itemStyle: placeHolderStyle
                        }]
                    }]
                };
                chart.setOption(pieOption);
            },
            referenceDetail(){
                this.referenceId = sessionStorage.getItem('referenceId');
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/getReportDetails',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id:this.referenceId,
                    },
                    success: (res) => {
                        if(res.status === 0){
                            this.detailInfo = res;
                            if(res.author){
                                this.author = res.author;
                            }
                            if(res.topicArray && res.topicArray.length >0){
                                this.topicShow = true;
                                this.topicId = res.topicArray[0].id;
                                // 刷新相关技术主题列表
                                this.relatedShow = false;
                                setTimeout(()=>{
                                    this.relatedShow = true;
                                },100);

                                this.theme = res.topicArray;
                                this.getCharts();
                            } else {
                                this.topicShow = false;
                            }
                        }
                    }
                })
            },
            recommand(){
                this.referenceId = sessionStorage.getItem('referenceId');
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/getRecommandReport',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id:this.referenceId,
                    },
                    success: (res) => {
                        if(res.status === 0){
                            this.recommended = res.reportArray;
                            // 科技动态
                            if(res.newsArray && res.newsArray.length >0){
                                this.dynamicShow = true;
                                this.dynamic = res.newsArray;
                            } else {
                                this.dynamicShow = false;
                            }
                        }
                    }
                })
            },
            changeTheme(id,i){
                this.refTab = i;
                this.topicId = id;
                this.getCharts();
            },
            getCharts(){
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/get5ChartsByTopicId',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id:this.topicId,
                    },
                    success: (res) => {
                        if(res.status === 0){
                            // 技术成果
                            let date = [];
                            let value = [];
                            if(res.mentionArray && res.mentionArray.length >0){
                                this.mentionShow = true;
                                res.mentionArray.forEach((obj)=>{
                                    date.push(obj.year);
                                    value.push(obj.value);
                                });
                                this.mention.date = date;
                                this.mention.value = value;
                                this.$nextTick(() => {
                                    this.drawBar();
                                });
                            } else {
                                this.mentionShow = false;
                            }
                            // 趋势预测
                            let tendencyDate = [];
                            let tendencyValue = [];
                            if(res.tendency_chart && res.tendency_chart.length >0){
                                this.tendencyShow = true;
                                res.tendency_chart.forEach((obj)=>{
                                    tendencyDate.push(obj.year);
                                    tendencyValue.push(obj.preValue);
                                });
                                this.tendency.date = tendencyDate;
                                this.tendency.value = tendencyValue;
                                this.$nextTick(() => {
                                    this.drawLine();
                                });
                            } else {
                                this.tendencyShow = false;
                            }
                            // 趋势预测-表格
                            if(res.tendency_form && !this.isEmptyObject(res.tendency_form)){
                                this.analysisShow = true;
                                this.analysis = res.tendency_form;
                                this.$nextTick(() => {
                                    this.drawPie();
                                });
                            } else {
                                this.analysisShow = false;
                            }
                            // 知名学者
                            if(res.MavinArray && res.MavinArray.length >0){
                                this.scholarShow = true;
                                this.scholar = res.MavinArray;
                            } else {
                                this.scholarShow = false;
                            }
                        }
                    }
                })
            },
            dynamicClick(id){
                this.$router.push(`/newsDetail`);
                sessionStorage.setItem('newsId',id);
                bus.$emit('newsDetail');
            },
            recommendedClick(id){
                this.referenceId = id;
                sessionStorage.setItem('referenceId',id);
                this.referenceDetail();
                this.recommand();
                $('html,body').animate({scrollTop:0}, 500);
                //window.scrollTo(0,0);
            },
            isEmptyObject(obj){
                for(let key in obj){
                    return false;
                }
                return true;
            }
        },
        mounted(){
            this.referenceDetail();
            this.recommand();
            bus.$on('referenceDetail',()=>{
                window.scrollTo(0, 0);
                this.referenceDetail();
                this.recommand();
                bus.$emit('setSearchVal');
            });
        }
    }
</script>

