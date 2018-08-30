<template>
    <div>
        <div class = "scientificDetail">
            <div class = "content">
                <div class = "con-left" :class = "{'bigBox':!topicShow}">
                    <div class = "box1">
                        <div class = "header">
                            <div class = "head-top">
                                <p>{{detailInfo.title}}</p>
                            </div>
                            <div class = "head-bottom" v-if = "detailInfo.topicArray">
                                <span>标签 : </span>
                                <span class = "topic" v-for = "item in detailInfo.topicArray" :key="item.id">{{item.value}}&nbsp;&nbsp;</span>
                            </div>
                        </div>
                        <div class = "mainBody" ref = "text">
                            <h3 v-if = "detailInfo.introduce"><strong>一</strong>、成果介绍</h3>
                            <div class = "introduce" v-html = "detailInfo.introduce"></div>
                            <h3 v-if = "detailInfo.technical_indicators"><strong>二</strong>、技术指标</h3>
                            <div class = "technical_indicators" v-html = "detailInfo.technical_indicators"></div>
                            <h3 v-if = "detailInfo.application_description"><strong>三</strong>、应用说明</h3>
                            <div class = "application_description" v-html = "detailInfo.application_description"></div>
                            <h3 v-if = "detailInfo.benefit_analysis"><strong>四</strong>、效益分析</h3>
                            <div class = "benefit_analysis" v-html = "detailInfo.benefit_analysis"></div>
                            <h3 v-if = "detailInfo.cooperation_mode"><strong>五</strong>、合作方式</h3>
                            <div class = "cooperation_mode" v-html = "detailInfo.cooperation_mode"></div>
                            <h3 v-if = "detailInfo.industry_field"><strong>六</strong>、所属行业领域</h3>
                            <div class = "industry_field" v-html = "detailInfo.industry_field"></div>
                        </div>
                    </div>
                    <div class = "box2">
                        <nav class = "nav" v-if = "navshow">
                            <ul class = "nav-ul">
                                <template v-for="(item,i) in navList">
                                    <li :class="{'active':i===active}" data-toggle="tab"  :key="item.id"  @click="tabClick(i+1)">
                                        <a >{{item}}</a>
                                    </li>
                                </template>
                            </ul>
                        </nav>
                        <div class="tab-content">
                            <div class="tab-pane fade in active" style="padding:0 20px;">
                                <!-- 推荐成果模板 -->
                                 <div v-for="item in achievementContent" :key="item.id" class="detail" v-if = "achievement" id = "li1">
                                    <img :src="item.cover" class="img" @click="scientific(item.id)"/>
                                    <div class="text">
                                        <div class="title" @click="scientific(item.id)">{{item.title}}</div>
                                        <p class="small-title">{{item.abstracts}}</p>
                                        <div class="base baseScientific">
                                            <img src="../../assets/img/jigou.png"/><span>{{item.institution}}</span>
                                            <img src="../../assets/img/teach.png"/><span v-for="i in item.mavinArray">{{i.name}}</span>
                                        </div>
                                    </div> 
                                </div>
                                <div v-if = "!haveAchieve" class = "message">暂无推荐成果！</div>
                                <!-- 推荐内参模板 -->
                                <div v-for="item in reportContent" class="detail" :key="item.id" v-if = "report" id = "li2">
                                    <img :src="item.cover" class="img" @click="referenceDetail(item.id)"/>
                                    <div class="text">
                                        <div class="title" @click="referenceDetail(item.id)">{{item.title}}</div>
                                        <div class="base">
                                            <div class = "base_left">
                                                <img :src="(item.author).avator"/><span>{{(item.author).position}}:</span>
                                                <!-- <img src="../assets/img/source@2x.png"/> -->
                                                <span>{{(item.author).name}}</span>
                                            </div>
                                            <div class = "base_right">
                                                <span class = "time">{{item.release_time}}</span>
                                            </div>                                           
                                        </div>
                                    </div>
                                </div>
                                <div v-if = "!haveReport" class = "message">暂无推荐内参！</div>
                                <!-- 相关动态模板 -->
                                <div v-for="item in newsContent" :key="item.id" class="detail" v-if = "news" id = "li3">
                                    <img :src="item.cover" class="img" @click="newsDetail(item.id)"/>
                                    <div class="text">
                                        <div class="title" @click="newsDetail(item.id)">{{item.title}}</div>
                                        <p class="small-title">{{item.abstracts}}</p>
                                        <div class="base basenews">
                                            <img src="../../assets/img/date@2x.png"/><span>{{item.release_time}}</span>
                                            <img src="../../assets/img/source@2x.png"/><span>{{item.source}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if = "!haveNews" class = "message">暂无相关动态！</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "con-right" v-if = "topicShow">
                    <div class="headline"><span class="border"></span>机构和团队</div>
                    <div class="team">
                        <div class="title">所属机构</div>
                        <div class="logo">
                            <img :src="institution.logo" class = "logo_pic"/>
                            <div class = "logoIntruc_con">
                                <p class = "logo_name">{{institution.school}}</p>
                                <p class = "logo_intruc">{{institution.department}}</p>
                            </div>
                        </div>
                        <div :class = "{showAll:show,'team_intruc':!show}" ref = "team_intruc">
                            {{institution.introduce}}
                        </div>
                        <div class="more" v-if="!show" @click="more"><img src="../../assets/img/Smore@2x.png"/>&nbsp;展开</div>
                        <div class="stop" v-if="show" @click="stop"><img src="../../assets/img/Sstop@2x.png"/> &nbsp;收起</div>
                    </div>
                    <div class = "research">
                        <div class="title">研究团队</div>
                        <ul class = "member_con">
                            <li v-for='item in mavinArray' :key="item.id">
                                <span class = "symbol">{{item.name}}</span>
                                <div class = "memberIntruc_con">
                                    <p class = "memberName">{{item.name}}</p>
                                    <p class = "memberMajor"><span v-for="topic in item.topicArray">{{topic.value}}&nbsp;</span></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="headline"><span class="border"></span>数据仪表盘</div>
                    <nav class="nav" v-if="dataShow">
                        <ul class="themeUl">
                            <li :class="{'active':i===activeThemUI}" v-for="(item,i) in theme" data-toggle="tab" :key = item.id
                            @click="changeTheme(item.id,i)">{{item.value}}</li>
                        </ul>
                    </nav>
                    <div class = "slideImg_con" v-if="picShow">
                        <div class="title">图片说明</div>
                        <swiper :options="swiperOption">
                            <swiper-slide class="slide1"  v-for="item in picArr" :key="item.id"><img :src="item" class = "swiperImg"/></swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </div>
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
                </div>
            </div>
        </div>
    </div>
</template>
<style style lang="less" rel="stylesheet/less" scoped>
    .scientificDetail{
        // margin-left:220px;
        height:100%;
        .content{
            padding:20px;
            overflow: hidden;
            .bigBox{
                width:100% !important;;
                padding-right:0 !important;;
            }
            .con-left{
                width:73%;
                float:left;
                padding-right:20px;
                .box1{
                    background:#fff;
                    padding:20px 20px 40px 20px;
                    .header{
                        border-bottom:1px solid #DDDDDD;
                        padding-bottom:14px;
                        overflow: hidden;
                        .head-top{
                            width:100%;
                            padding-right:20px;
                            p{
                                font-size:26px;
                                color:rgba(46,49,50,1);
                            }
                            span{

                            }
                        }
                        .head-bottom{
                            span{
                                font-size:14px;
                                color:#5F697D;
                            }
                        }
                    }
                     .mainBody{
                        margin-top: 20px;
                        padding:20px;
                        line-height:30px;
                        h3{
                            strong{
                                font-weight: normal
                            }
                        }
                    }
                }
                .box2{
                    margin-top:20px;
                    background:#fff;
                    .nav-ul{
                        width:100%;
                        height:50px;
                        line-height:50px;
                        list-style: none;
                        background:rgba(230,232,233,1);
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
                            padding:10px 0;
                            overflow: hidden;
                            border-bottom:1px solid #DDDDDD;
                            .img{
                                width:220px;
                                height:127px; 
                                float:left;
                                cursor:pointer;
                            }
                            .text{
                                // float:left;
                                // margin-left:20px;
                                margin-left:260px;
                                position:relative;
                                height:127px;
                                .title{
                                    font-size:22px;
                                    color:rgba(46,49,50,1);
                                    cursor:pointer;
                                }
                                .small-title{
                                    color:rgba(133,144,166,1);
                                    margin-top:5px;
                                }
                                .base{
                                    position:absolute;
                                    bottom:0;
                                    left:0;
                                    .base_left{
                                        float:left;
                                        img{
                                            width:34px;
                                            height:34px;
                                            border-radius: 17px;
                                            margin-right:5px;
                                        }
                                        span{
                                            font-size:12px;
                                            color:rgba(133,144,166,1);
                                            //margin-right:20px;
                                        }                                   
                                    }
                                    .base_right{
                                        float:left;
                                        font-size:12px;
                                        color:rgba(133,144,166,1);
                                        margin-left: 276px;
                                        margin-top: 10px;
                                    }                                   
                                }
                                .basenews{
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
                                }
                                .baseScientific{
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
                        .detail:first-child{
                           margin-top:10px;
                        }
                        .message{
                            box-sizing: border-box;
                            padding:20px;
                            text-align: center;
                            font-size:14px;
                        }
                    }
                }
            }
            .con-right{
                width:24%;
                float:left;
                box-sizing: border-box;
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
                .team{
                    box-sizing: border-box;
                    width:100%;
                    background:rgba(255,255,255,1);
                    .title{
                        box-sizing: border-box;
                        font-size:14px;
                        padding-left:8%;
                        height:45px;
                        line-height:45px;
                        color:#5F697D;
                        border-bottom:1px solid #eee;
                    }
                    .logo{
                        box-sizing: border-box;
                        padding:20px;
                        .logo_pic{
                            float:left;
                            width:80px;
                            height:70px; 
                        }
                        .logoIntruc_con{
                            box-sizing: border-box;
                            float:left;
                            width:50%;
                            margin-left:5%;
                            padding:12px 1%;
                            .logo_name{
                                width: 100%;
                                font-size:18px;
                                color:#2E3132;
                            }
                            .logo_intruc{
                                width: 100%;
                                font-size:13px;
                                line-height:28px;
                                color:#2E3132;
                            }
                        }
                    }
                    .team_intruc{
                        box-sizing: border-box;
                        width:100%;
                        height:40px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        padding:0 20px;
                        font-size:14px;
                        color:#5F697D;
                        text-indent: 2em;
                    } 
                    .showAll{
                        width:100%;
                        height:auto;
                        overflow: hidden;
                        padding:0px 19px;
                        font-size:14px;
                        color:#5F697D;
                        text-indent: 2em;
                    }
                    .more,.stop{
                        padding:10px 0;
                        cursor:pointer;
                        font-size:13px;
                        color:rgba(133,144,166,1);
                        text-align:center;
                        img{
                            width:18px;
                            height:10px;
                            margin-left:10px;
                        }
                    }                  
                }
                .research{
                    width: 100%;
                    height: auto; 
                    margin-top: 10px;
                    margin-bottom: 20px;
                    background: rgba(255,255,255,1);
                    .title{
                        box-sizing: border-box;
                        font-size:14px;
                        padding-left:8%;
                        height:45px;
                        line-height:45px;
                        color:#5F697D;
                        border-bottom:1px solid #eee;
                    }
                    .member_con{
                        box-sizing: border-box;
                        padding:10px 20px 0 20px;
                        overflow: hidden;
                        li{
                            height:auto;
                            box-sizing: border-box;
                            padding:10px 0;
                            border-bottom:1px dashed #E9EFF3 ;
                            list-style-type: none;
                            overflow: hidden;
                            .symbol{
                                float:left;
                                width:23px;
                                height:48px;
                                line-height:48px;
                                font-size:22px;
                                padding:0px 13px;
                                text-align: center;
                                background:#00A5FB;
                                color:#fff;
                                overflow: hidden;
                            }
                            .memberIntruc_con{
                                box-sizing: border-box;
                                width: 70%;
                                padding-left:5%;
                                height: auto;
                                float:left;
                                .memberName{
                                    width: 100%;
                                    font-size:16px;
                                    color:#2E3132
                                }
                                .memberMajor{
                                    width: 100%;
                                    font-size:12px;
                                    color:#5F697D;
                                }
                            }
                        }
                        li:last-child{
                            border:none
                        }
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
                        margin-right:3%;
                        margin-bottom:10px;
                    }
                    .active{
                        background:rgba(0,165,251,1);
                        color:#ffffff;
                    }
                }
                .slideImg_con{
                    box-sizing: border-box;
                    width:100%;
                    height:332px;
                    margin-bottom:20px;
                    background:rgba(255,255,255,1);
                    .title{
                        box-sizing: border-box;
                        font-size:14px;
                        padding-left:8%;
                        height:45px;
                        line-height:45px;
                        color:#5F697D;
                        border-bottom:1px solid #eee;
                    }
                    .swiperImg{
                        width:85%;
                        height:222px;
                        margin:20px;
                    }
                    .swiper-pagination{
                        top:93%;
                    }
                }
                .card{
                    background:#fff;
                    margin-bottom:20px;
                    .title{
                        height:50px;
                        line-height:50px;
                        color:rgba(95,105,125,1);
                        padding-left:8%;
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
            }
        }
    }
</style>
<script>
    import bus from '../../store/bus.js';
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default{
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return{
                active:0,
                activeThemUI:0,
                scientificId:'',
                detailInfo:{},
                navList:["推荐成果","推荐内参","相关动态"],//后台id=1：相关动态；id=2：推荐内参；id=3:推荐成果
                word:["一","二","三","四","五","六"],
                achievementContent:[],
                reportContent:[],
                newsContent:[],
                idFrom:1,
                topicShow:false,
                show:false,
                activeColor:'green',
                topicId:'',
                institution:{},
                mavinArray:[],
                picShow:false,
                mention:{},//柱状图
                tendency:{},//折线图
                analysis:{},//饼图
                picArr:[],
                dataShow:false,
                navshow:true,
                report:false,
                achievement:true,
                news:false,
                haveAchieve:true,
                haveReport:true,
                haveNews:true,
                mentionShow:true,//技术成果
                tendencyShow:true,//趋势预测
                analysisShow:true,//趋势预测饼图
                swiperOption: {
                    spaceBetween: 2,
                    loop: true,
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false
                    },
                    observer:true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper 
                    onSlideChangeEnd: function(swiper){ 
                    　　swiper.update();  
                        swiper.startAutoplay();
                    　　swiper.reLoop();  
                    }
                },
                oldId:''
            }
        },
        methods: {
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
                            data : this.tendency.date,
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
            scientificDetail(){
                this.scientificId = sessionStorage.getItem('scientificId');
                let that = this;
                $.ajax({
                    url: this.biz.serverUrl+'/piionee/transfer/getAchievementDetail',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id:this.scientificId,
                    },
                    success: (res) => {
                        if(res.status === 0){
                            this.oldId = res.id
                            this.detailInfo = res;
                            if(res.institution){
                                this.institution = res.institution
                            }
                            if(res.mavinArray && res.mavinArray.length > 0){
                                this.mavinArray = res.mavinArray;
                            }
                            this.navshow = false;
                            this.$nextTick(()=>{
                                that.navshow = true;
                                if(that.achievementContent && that.achievementContent.length >0){
                                    that.achievement = true;
                                    that.haveAchieve = true;
                                }else{
                                    that.achievement = false;
                                    that.haveAchieve = false;
                                }                                
                                that.report = false;
                                that.news = false;                                
                                that.haveReport = true;
                                that.haveNews = true;  
                            })
                            if(res.topicArray && res.topicArray.length >0){
                                this.topicShow = true;
                                this.topicId = res.topicArray[0].id;
                                sessionStorage.setItem('getTopicId',this.topicId)
                                // 刷新相关技术主题列表
                                this.dataShow = false;
                                setTimeout(()=>{
                                    this.dataShow = true;
                                },100);
                                this.theme = res.topicArray;
                                this.getTopicInfo();
                                this.getRecommand();
                            } else {
                                this.topicShow = false;
                            }
                        }
                    }
                })
            },
            ///piionee/getRecommand?id=1& (http://47.94.218.122:8085/piionee/getRecommandReport?id=1&rows=5)idFrom=2
            getRecommand(){
                this.scientificId = sessionStorage.getItem('scientificId');
                $.ajax({
                    url: this.biz.serverUrl + '/piionee/getRecommand',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id:this.oldId,
                        idFrom:this.idFrom
                    },
                    success: (res) => {
                        if(res.status === 0){                           
                            this.achievementContent = res.achievementArray;
                            this.reportContent = res.reportArray;
                            this.newsContent = res.newsArray;
                            if(this.idFrom === 1){
                                if(this.achievementContent && this.achievementContent.length > 0){
                                    this.achievement = true;
                                    this.report = false;
                                    this.news = false;
                                    this.haveAchieve = true;
                                    this.haveReport = true;
                                    this.haveNews = true;
                                }else{
                                    this.achievement = false;
                                    this.report = false;
                                    this.news = false;
                                    this.haveAchieve = false;
                                    this.haveReport = true;
                                    this.haveNews = true;
                                }
                            
                            }else if(this.idFrom === 2){
                                if(this.reportContent && this.reportContent.length > 0){
                                    this.achievement = false;
                                    this.report = true;
                                    this.news = false;
                                    this.haveAchieve = true;
                                    this.haveReport = true;
                                    this.haveNews = true;
                                }else{
                                    this.achievement = false;
                                    this.report = false;
                                    this.news = false;
                                    this.haveAchieve = true;
                                    this.haveReport = false;
                                    this.haveNews = true;
                                }
                            }else if(this.idFrom === 3){
                                if(this.newsContent && this.newsContent.length > 0){
                                    this.achievement = false;
                                    this.report = false;
                                    this.news = true;
                                    this.haveAchieve = true;
                                    this.haveReport = true;
                                    this.haveNews = true;
                                }else{
                                    this.achievement = false;
                                    this.report = false;
                                    this.news = false;
                                    this.haveAchieve = true;
                                    this.haveReport = true;
                                    this.haveNews = false;
                                }                    
                            }
                        }
                    }
                })
            },
            tabClick(id){
                this.active = id-1;
                this.idFrom = id;
                this.getRecommand();
            },
            more(){
                this.show = true;
            },
            stop(){
                this.show = false;
            },
            getActiveColor(){
                 function ranColor(){
                    return '#'+Math.floor(Math.random()*0xffffff).toString(16);
                };
                this.activeColor = ranColor();
            },
            changeTheme(id,i){
                this.activeThemUI = i;
                this.topicId = id;
                this.getTopicInfo()
            },
            getTopicInfo(){
                let id = sessionStorage.getItem('getTopicId');
                let that = this;
                $.ajax({
                    url: this.biz.serverUrl + '/piionee/getChartsByTopicId2',
                    type:'get',
                    dataType: 'json',
                    data: {
                        id: id
                    },
                    success: (res) => {
                        if(res.status === 0){
                            let date = [];
                            let value = [];
                            if(res.mentionArray && res.mentionArray.length > 0){
                                this.mentionShow = true;
                                res.mentionArray.forEach((obj) => {
                                    date.push(obj.year);
                                    value.push(obj.value);
                                });
                                // this.mention.date = date.sort(function(a,b){return a-b});
                                this.mention.date = date;
                                this.mention.value = value;
                                this.$nextTick(() => {
                                    this.drawBar();
                                });
                            }else{
                                this.mentionShow = false;
                            };
                            let tendencyDate = [];
                            let tendencyValue = [];
                            if(res.tendency_chart && res.tendency_chart.length > 0){
                                this.tendencyShow = true;
                                res.tendency_chart.forEach((obj) => {
                                    tendencyDate.push(obj.year);
                                    tendencyValue.push(obj.preValue)
                                });
                                this.tendency.date = tendencyDate.sort(function(a,b){return a-b});
                                this.tendency.value =tendencyValue;
                                this.$nextTick(() => {
                                    this.drawLine();
                                })
                            }else{
                                this.tendencyShow = false;
                            };
                            if(res.tendency_form && !this.isEmptyObject(res.tendency_form)){
                                this.analysisShow = true;
                                this.analysis = res.tendency_form;
                                this.$nextTick(() => {
                                    this.drawPie();
                                });
                            }else{
                                this.analysisShow = false;
                            };
                            if(res.pictureList && res.pictureList.length > 0){
                                this.picShow = true;
                                this.picArr = res.pictureList;
                            }else{
                                this.picShow = false; 
                            };
                        }
                    }
                })
            },
            isEmptyObject(obj){
                for(let key in obj){
                    return false;
                }
                return true;
            },
            referenceDetail(id){
                this.$router.push('./referenceDetail');
                sessionStorage.setItem('referenceId',id);
                bus.$emit('referenceDetail')
            },
            newsDetail(id){
                this.$router.push(`/newsDetail`);
                sessionStorage.setItem('newsId',id);
                bus.$emit('newsDetail');
            },
            scientific(id){
                this.$router.push(`/scientificDetail`);
                sessionStorage.setItem('scientificId',id);
                bus.$emit('scientificDetail');
            }
        },
        mounted(){
            window.scrollTo(0,0)
            this.scientificDetail();
            // this.getRecommand();
            this.getActiveColor();
            this.getTopicInfo();
            bus.$on('scientificDetail',()=>{
                window.scrollTo(0, 0);
                this.scientificDetail();
                this.show = false;
                // this.recommand();
                // this.navshow = false;
                setTimeout(()=>{
                    this.achievement = true;
                    this.report = false;
                    this.news = false;
                },100);
                bus.$emit('setSearchVal');                
            });
        },
        destroyed(){
            bus.$off();
        },
        watch:{
            detailInfo(){
                let that = this;
                this.$nextTick(() => {
                    let imgs = that.$refs.text.getElementsByTagName("img");
                    let img = Array.from(imgs);
                    let brs = that.$refs.text.getElementsByTagName("br");
                    let br = Array.from(brs);
                    let uls = that.$refs.text.getElementsByTagName("ul");
                    let ul = Array.from(uls);
                    let lis = that.$refs.text.getElementsByTagName("li");
                    let li = Array.from(lis);
                    let strongs = this.$refs.text.getElementsByTagName("strong");
                    let strong = Array.from(strongs);
                    strong.forEach(function(s,i){
                        s.innerHTML = that.word[i]
                    })
                    img.forEach(function(i){
                        i.style.cssText = "width:65%; height:65%; margin:20px 0 20px 100px; display:block"
                    });
                    br.forEach(function(b){
                        $(b).remove();
                    });
                    ul.forEach(function(ul){
                        ul.style.cssText = "padding-left:50px"
                    })
                    li.forEach(function(li){
                        let ps = li.getElementsByTagName("p");
                        let p =  Array.from(ps);
                        p.forEach(function(p){
                            p.style.cssText = "text-indent:0em"
                        })
                    })
                })
            }

        }
    }
</script>