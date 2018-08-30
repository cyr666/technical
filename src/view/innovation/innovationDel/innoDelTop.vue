<template>
    <div class = "top_con">
        <img :src="companyObj.logo" alt="" class = "comLogo" v-if ="companyObj.logo">
        <img src="../../../assets/img/企业logo-默认@2x.png" alt="" class = "comLogo" v-else>
        <dl class = "top_right">
            <dd class ="companyName">{{companyObj.name}}</dd>
            <dl class = "companyContent">
                <dl class = "companyContent_left">
                    <dd class = "companyIns">
                        <img src="../../../assets/img/instruction.png" alt="" class="instruction_img"/>
                        <span class = "ins_word">简介:</span>
                        <div class = "company_instruction_con">
                            <span  v-if="companyObj.introduction" class = "company_instruction">{{companyObj.introduction}}<span v-if="showDel" class="del">详情></span></span>
                            <!-- <span v-if="showDel">详情</span> -->
                        </div>
                        
                        <!--<dd class = "companyIns" v-else>暂无简介</dd> -->
                    </dd>
                    
                    <dd class = "time_con">
                        <div class = "leftCon">
                            <img src="../../../assets/img/adress.png" class = "companyHangye"/>
                            <span class = "ins_word">公司地址:</span>
                            <span class = "company_address">{{companyObj.industry}}</span>
                        </div>
                        <!-- <div class = "rightCon">
                            <img src="../../../assets/img/成立日期@2x.png" class = "companyDate"/>
                            成立时间:
                            <span>{{companyObj.start}}</span>
                        </div> -->
                    </dd>
                    <dd class = "zhuce_con">
                        <div class = "zhuce_item">
                            <img src="../../../assets/img/timeOrigial.png" class = "zhuceTime_img"/>
                            <span class = "ins_word">注册时间:</span>
                            <span class = "zhuce_word">2002-02-28</span>
                        </div>
                        <div class = "zhuce_item">
                            <img src="../../../assets/img/many.png" class = "zhuceMoney_img"/>
                            <span class = "ins_word">注册资本:</span>
                            <span class = "zhuce_word">12759.8737万元</span>
                        </div>
                        <div class = "zhuce_item">
                            <img src="../../../assets/img/test.png" class = "zhucePingfen_img"/>
                            <span class = "ins_word">评分:</span>
                            <span class = "zhuce_word" style="color:#FAA420;font-size:20px">56</span>
                            <span class = "zongfen">共100分</span>
                        </div>
                    </dd>
                </dl>
                <dl class = "companyContent_center"></dl>
                <div id="leida" style="width:200px;height:200px"></div>
                <!-- <dl class = "companyContent_right">
                    
                </dl> -->
            </dl>    
        </dl>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
.top_con{
    box-sizing: border-box;
    padding: 24px 30px;
    background: #fff;
    overflow: hidden;
    .comLogo{
        float: left;
        width: 88px;
        height: 89px;
        border: 1px solid #eaedf1;
        border-radius: 8px;
    }
    .top_right{
        float: left;
        margin-left: 2%;
        width: 89%;
        .companyName{
            font-size:20px;
            font-family:"微软雅黑";
            color:#000;
            line-height:30px;
            margin-bottom: 15px;
        }
        .companyContent{
            width: 100%;
            height: 217px;
            box-sizing: border-box;
            padding-right: 30px;
            background:rgba(242,249,255,1);
            .companyContent_left{
                box-sizing: border-box;
                margin: 15px 20px;
                overflow: hidden;
                float: left;
                width: 65%;
                .ins_word{
                    // display: inline-block;
                    font-size:14px;
                    color:rgba(250,164,32,1);
                    line-height:28px;
                    // float: left; 
                }
                .companyIns{
                    position: relative;
                    margin-top: 18px;
                    height: 60px;
                    margin-bottom: 23px;
                    overflow: hidden;
                    .instruction_img{
                        width: 11px;
                        height: 13px;
                        margin:0 3px -2px 0;
                        // float: left;
                    }
                    .company_instruction_con{
                        position: relative;
                        left: 60px;
                        top: -23px;
                        .company_instruction{
                            display: inline-block;
                            width: 90%;
                            font-size:14px;
                            font-family:微软雅黑;
                            color:#39454E;
                            // white-space: pre-wrap;
                            .del{
                                color: #008EFF;
                                cursor: pointer;
                            }
                        }
                    }
                    
                }
                .time_con{
                    overflow: hidden;
                    font-size: 13px;
                    color:rgba(130,137,149,1);
                    margin-bottom: 23px;
                    .leftCon{
                        .companyHangye{
                            width: 12px;
                            height: 15px;
                            vertical-align: middle;
                            margin-top: -3px;
                        }
                        .company_address{
                            display: inline-block;
                            margin-left: 5px;
                            font-size: 14px;
                            font-family:微软雅黑;
                            color: #39454E;
                        }
                    }
                }
                .zhuce_con{
                    width: 100%;
                    overflow: hidden;
                    margin-bottom: 17px;
                    .zhuce_item{
                        float: left;
                        width: 33%;
                        .zhuceTime_img{
                            width: 12px;
                            height: 12px;
                        }
                        .zhuceMoney_img{
                            width: 13px;
                            height: 13px;
                        }
                        .zhucePingfen_img{
                            width: 14px;
                            height: 13px;
                        }
                        .zongfen{
                            font-size:11px;
                            color:rgba(130,137,149,1);
                        }
                        .zhuce_word{
                            font-size:14px;
                            color:rgba(57,69,78,1);
                        }
                    }
                    .zhuce_item:last-child{
                        box-sizing: border-box;
                        padding-left: 5%;
                    }
                }
            }
            .companyContent_center{
                float: left;
                width: 1px;
                height: 120px;
                margin: 50px 0;
                background: #B9DFFF;
            }
            #leida{
                float: right;
                // width: 200px;
                // height: 200px;
            }
            // .companyContent_right{
            //     float: right;
            //     // width: 27%;
            //     // height: 180px;
            //     // background: pink;
                
            // }
        }   
    }
}
</style>

<script>
    export default {
        name: 'HelloWorld',
        components: {
            
        },
        computed:{
            companyObjinnoTop(){
               return this.$store.state.innovationModule.companyObj
            }
        },
        data(){
            return{
                companyObj:{},
                showDel:false,
                style:{
                    color: "#008EFF",
                    cursor:"point"
                }
            }
        },
        methods:{
            drawLeida(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('leida'));
                var bigfonts = 12;
                var nsum = 800;
                var fontS = 14;
                var dataAxis = [];
                var radius = 120;
                var data = [{
                        "color": "#00a9ff",
                        "text": "选址",
                        "num": "134",
                        "percent": 10
                    },
                    {
                        "color": "#2ced99",
                        "text": "规划条件",
                        "num": "230",
                        "percent": 30
                    },
                    {
                        "color": "#fedb00",
                        "text": "用地",
                        "num": "136",
                        "percent": 12
                    },
                    {
                        "color": "#ff7200",
                        "text": "工程",
                        "num": "49",
                        "percent": 20
                    },
                    {
                        "color": "#00e4fe",
                        "text": "竣工",
                        "num": "360",
                        "percent": 30
                    }
                ]
                let option = {
                    radar: [{
                        indicator: data,
                        radius: radius,
                        startAngle: 126,
                        splitNumber: 4,
                        shape: 'circle',
                        name: {
                            formatter: function(value, indicator) {
                                var npercent = indicator.num;
                                var percent = npercent / nsum * 100;
                                return '{a|' + value + '}{b|\n10}{c|%}'

                            },
                            rich: {
                                a: {
                                    color: '#000',
                                    fontSize: 12,
                                },
                                b: {
                                    fontSize: bigfonts,
                                    fontFamily: 'AGENCYB',
                                    fontWidth: 'bold',
                                    color: 'yellow'
                                },
                                c: {
                                    fontSize: fontS,
                                    color: '#000'
                                }
                            },
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: 'rgba(6,222,249,0.06)',
                                shadowBlur: 10
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#0095B0'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#0095B0'
                            }
                        }
                    },
                    
                ],
                grid:{ // 控制图的大小，调整下面这些值就可以，
                        x: 10,
                        x2: 10,
                        y2: 10// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                series: [{
                    name: '雷达图',
                    type: 'radar',
                    symbolSize: 0,
                    areaStyle: {
                        normal: {
                            color: 'rgba(6, 222, 249,0.3)',
                        },

                        emphasis: {
                            color: 'rgba(6, 222, 249,0.5)',
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#f9d400',
                            type: 'solid',
                            width: 3
                        },
                        emphasis: {}
                    },
                    data: [{
                        value: [134, 230, 136, 49, 360],
                        label: {
                            show: 'true'
                        }
                    }]
                }, ]
                }
                chart.setOption(option);
                window.onresize = function(){
                    chart.resize(); 
                }; 
            },
            //获取字符串长度
            getStyLen(str){
                return str.replace(/[\u0391-\uFFE5]/g,"aa").length;
            }
        },
        watch:{
            companyObjinnoTop(newVal,old){
                let companyObj = JSON.parse(sessionStorage.getItem('companyObj'));
                this.companyObj = companyObj;
            }
        },
        mounted(){
            this.drawLeida();
            setTimeout(()=>{
                let companyObj = JSON.parse(sessionStorage.getItem('companyObj'));
                if(this.getStyLen(companyObj.introduction)>200){
                   companyObj.introduction = companyObj.introduction.slice(0,100)+"..."
                   this.showDel = true;
                    this.companyObj = companyObj;
                    
                }else{
                    this.companyObj = companyObj;
                }        
            },80)            
        }
    }
</script>