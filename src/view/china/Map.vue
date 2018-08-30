<template>
    <div class ="map_con">
        <div class = "mainBody_bottom">
            <div class = "comper">
                <!-- <p>全国专利数据分析周报</p>
                <div class = "time_con">
                    <img class = "time_img" src = "../assets/img/time.png"/>
                    <span class = "time_word">统计时间截至:</span>
                    <span class = "time_num">{{endTime}}</span>
                </div> -->
            </div>
            <div>
                <div class="card">
                    <div id="map"></div>
                    <!-- <div class = "data_source">
                        <span>数据来源:</span>
                        <span>{{clickEndTime}}申请专利</span>    
                    </div> -->
                </div>                            
                <div class="card2">
                    <ul class = "navlist">
                        <li>排名</li>
                        <li>地区</li>
                        <li>专利授权数量</li>
                    </ul>
                    <div class = "topItem">
                        <div class = "topArea">
                            <ul>
                                <li v-for="(item,i) in chinaAll.topArea" :key="item.id">
                                    <span class = "topNumber" :id='item.id'>{{i+1}}</span>
                                    <span class = "areaName" :id='item.id'>{{item.name}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class = "column_con">
                            <div id="column"></div>
                        </div>
                    </div>                               
                </div>
            </div>                    
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .map_con{
        .mainBody_bottom{
            width:100%;
            height:619px;
            margin-top:20px;
            background:#fff;
            box-sizing: border-box;
            padding:0 2%;
            border:1px solid rgba(232,234,235,1);
            // margin-bottom:40px;
            //overflow: hidden;
            .comper{
                width:100%;
                height:50px;
                // border-bottom:1px solid #EEEEEE;
                overflow: hidden;
                p{
                    float:left;
                    font-size:14px;
                    line-height:47px;
                    color:#2E3132;
                    border-bottom:3px solid #00A5FB;
                }
                .time_con{
                    float:right;
                    font-size:12px;
                    color:#9FA5B1;
                    box-sizing: border-box;
                    height:50px;
                    line-height:50px;
                    .time_img{
                        width:13px;
                        height:14px;
                        margin-top:-2px;
                    }
                }
            }
            .card{
                box-sizing: border-box;
                padding-top:30px;
                //padding-left:2%;
                width:55%;
                // padding-top:30px;
                float:left;
                #map{
                    width:100%;
                    height:500px;
                } 
                .data_source{
                    font-size:10px;
                    color:#9FA5B1;
                    height:20px;
                    line-height:20px;
                    text-align: left;
                }                      
            }
            .card2{
                position: relative;
                box-sizing: border-box;
                width:45%;
                padding-top:50px;
                //margin-left:5%;
                float:left;
                
                .navlist{
                    box-sizing: border-box;
                    width:90%;
                    height:44px;
                    border-bottom:1px solid #eee;
                    li{
                        list-style-type: none;
                        float:left;
                        height:49px;
                        line-height:49px;
                        margin-right:12.5%;
                        font-size:12px;
                        color:#8590A6;
                    }
                }
                .topItem{
                    position: relative;
                    top:0;
                    width:100%;
                    .topNum{
                        width:100%;
                        float:left;
                        position: absolute;
                        box-sizing: border-box;
                        padding-right: 10%;
                        ul{
                            width:100%;
                            box-sizing: border-box;
                            margin-top:-10px;
                            //padding-left: 10px;
                            li{
                                width:100%;
                                list-style-type: none;
                                line-height: 37px;
                                font-size:12px;
                                font-family: 'Arial';
                                color:#5F697D;
                                border-bottom: 1px solid #eee;
                                padding-left: 10px;
                                cursor: pointer;
                            }
                            li:hover{
                                background:#F4F8F9;
                            }
                        }
                    }
                    .topArea{
                        //position:absolute;
                        float:left;
                        //margin-left:10%;
                        width:100%;
                        //z-index: 2;
                        ul{
                            box-sizing: border-box;
                            margin-top:-10px;
                            //padding-left: 2%;
                            width:90%;
                            li{
                                width:100%;
                                list-style-type: none;
                                line-height: 38px;
                                font-size: 14px;
                                color:#5F697D;
                                border-bottom: 1px solid #eee;
                                // padding-left: 20px;
                                cursor: pointer;
                                span{
                                    display:inline-block;
                                }
                                .topNumber{
                                    margin-left:2%;
                                    width:16px;
                                    height: 16px;
                                    color: #fff;
                                    font-size:12px;
                                    text-align: center;
                                    line-height: 16px;
                                    font-family: Arial;
                                    background: #008EFF;
                                }
                                .areaName{
                                    font-size:14px;
                                    color:#5F697D;
                                    margin-left:11%;
                                }
                            }
                            li:nth-child(1) .topNumber{
                                background: #F96060;
                            }
                            li:nth-child(2) .topNumber{
                                background: #FAA420;
                            }
                            li:nth-child(3) .topNumber{
                                background: #FFD500;
                            }
                            li:hover{
                                background:#F4F8F9; 
                            }
                        } 
                    }
                    .column_con{
                        position: relative;
                        #column{
                            position: absolute;
                            left:25%;
                            top:-35px;
                            width:78%;
                            height:457px;
                            z-index: 0
                        }
                    }                           
                }                       
            }                                   
        }
    }
</style>

<script coped>
    import theme from '../../assets/js/china.js'
    export default{
        name: 'HelloWorld',
        components: {
           
        }, 
        computed:{
            chinaAll(){
                return this.$store.state.chinaModule
            }
        },
        data(){
            return{
                topArea:[],
                showmobileData:false,
                topicArray:[],
                relatedBusinessArray:[],
                mapProvinceArray:[],
                top10Name:[],
                top10Apply:[],
                top10Grant:[],
            }
        },
        methods:{
            drowMap(){
                let myChart = this.$echarts.init(document.getElementById('map'));
                let blueArr = [];
                this.$echarts.registerMap('zhongguo', theme);
                var geoCoordMap = {
                    "海南": [110.17, 19.92],
                    "河南": [113.700339, 34.751827],
                    "河北": [114.54095, 38.058913],
                    "湖北": [114.289984, 30.5942],
                    "广东": [113.293215, 23.102603],
                    "湖南": [113.03042, 28.188898],
                    "江西": [115.911671, 28.658012],
                    "黑龙江": [126.629804, 45.774197],
                    "四川": [102.112035, 30.630737],
                    "安徽": [117.321109, 31.850184],
                    "江苏": [118.8586,32.915],
                    "浙江": [120.498,29.0918],
                    "北京":[116.4551,40.2539],
                    "山东":[118.7402,36.4307],
                    "上海":[121.4648,31.2891],
                    "福建":[118.3008,25.9277],
                    "重庆":[107.7539,30.1904],
                    "山西":[112.4121,37.6611],
                    "天津":[117.4219,39.4189],
                    "香港":[114.1178,22.3242],
                    "澳门":[111.5547,22.1484],
                    "内蒙古":[108.6977,40.8408],
                    "新疆":[84.9023,42.148],
                    "陕西":[109.5996,35.7396],
                    "吉林":[125.7746,43.5938],
                    "贵州":[106.6113,26.9385],
                    "辽宁":[122.0438,41.0889],
                    "宁夏":[105.9961,37.3096],
                    "台湾":[120.0254,23.5986],
                    "广西":[107.7813,23.6426],
                    "云南":[101.0652,25.1807],
                    "甘肃":[101.8129,38.166],
                    "贵州":[106.6113,26.9385],
                    "台湾":[120.0254,23.5986],
                    "青海":[95.2402,35.4199],
                    "西藏":[87.8695,31.6846]
                }

                var data = this.mapProvinceArray 
                var max = 100000,
                    min = 900; // todo 
                var maxSize4Pin = 500,
                    minSize4Pin = 30;

                var convertData = function(data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value).concat(data[i].grant_num)
                            });
                        }
                    }
                    return res;
                };


                let option = {
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            if (typeof(params.value)[2] == "undefined") {
                                //return params.name + ' : ' + params.value;
                            } else {
                                return params.name + ' : '+ params.value[2]+"(申请)"+"<br/>"
                                    +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                    + params.value[3]+"(授权)";
                            }
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        y: 'bottom',
                        x: 'right',
                        data: ['sell_area'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 500,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'], // 文本，默认为数值文本
                        calculable: true,
                        seriesIndex: [1],
                        inRange: {
                            // color: ['#3B5077', '#031525'] // 蓝黑
                            // color: ['#ffc0cb', '#800080'] // 红紫
                            // color: ['#3C3B3F', '#605C3C'] // 黑绿
                            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                            color: ['#23074d', '#cc5333'] // 紫红
                            // color: ['#00467F', '#A5CC82'] // 蓝绿
                            // color: ['#1488CC', '#2B32B2'] // 浅蓝
                            // color: ['#00467F', '#A5CC82'] // 蓝绿
                            // color: ['#00467F', '#A5CC82'] // 蓝绿
                            // color: ['#00467F', '#A5CC82'] // 蓝绿
                            // color: ['#00467F', '#A5CC82'] // 蓝绿

                        }
                    },
                    geo: {
                        show: true,
                        map: 'zhongguo',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        roam:false,//禁止放大缩小
                        itemStyle: {
                            normal: {
                                areaColor: 'rgba(0,142,255,0.4)',
                                borderColor: '#fff',
                            },
                            emphasis: {
                                areaColor: '#2B91B7',
                            }
                        },
                        layoutCenter:['48%','50%'],
                        layoutSize:'110%'
                    },
                    series: [{
                            name: 'credit_pm2.5',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(data),
                            symbolSize: function(val) {
                                return val[2] / 5000;
                            },//蓝色光圈的大小
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: '#05C3F9'
                                }
                            }
                        },
                        {
                            type: 'map',
                            map: 'zhongguo',
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#3B5077',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7'
                                }
                            },
                            animation: false,
                            data: data
                        },
                        {
                            name: '点',//红色气泡的大小
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'pin',
                            symbolSize: function(val) {
                                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                                var b = minSize4Pin - a * min;
                                b = maxSize4Pin - a * max;
                                return a * val[2] + b;
                            },
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function(params) {
                                        if (typeof(params.value)[2] == "undefined") {
                                            //return params.name + ' : ' + params.value;
                                        } else {
                                            return params.value[2];//气泡上显示的数值 
                                        }
                                    },
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 9,
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#F62157', //标志颜色
                                }
                            },
                            zlevel: 6,
                            data: convertData(data),
                        },
                        {
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: convertData(data.sort(function(a, b) {
                                return b.value - a.value;
                            }).slice(0, 34)),
                            symbolSize: function(val) {
                                blueArr.push(val[2]);
                                if(val[2]/blueArr[0]*15 == 0){
                                    return 1
                                }else{
                                    return val[2]/blueArr[0]*15; 
                                }
                                                              
                                //console.log(blueArr)
                                //return Math.log(10+val[2])*2;
                                //return Math.pow(val[2],0.4)
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#05C3F9',
                                    shadowBlur: 10,
                                    shadowColor: '#05C3F9'
                                }
                            },
                            zlevel: 1
                        },

                    ]
                };
                myChart.setOption(option);
            },
            drowColumn(){
                let myChart = this.$echarts.init(document.getElementById('column'));
                let yAxisData = [];
                let option = {
                    title: {
                        
                    },
                    legend: {
                        left:"45%",
                        top:"1%",
                        itemWidth:12,
                        itemHeight:12,
                        
                        "data": [
                                {
                                "name": "申请专利",
                                "icon": "circle",
                               
                                "textStyle": {
                                    "color": "#39454e",
                                    "fontSize":12
                                },
                                },
                                {
                                "name": "授权专利",
                                "icon": "circle",
                                "textStyle": {
                                    "color": "#39454e",
                                    "fontSize":12
                                }
                                },
                                
                            ],
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        top:'7%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        //boundaryGap: [0,0.1],
                        show:false,
                        max:3500,
                    },
                    yAxis: {
                        type: 'category',
                        data: this.top10Name,
                        show:false,
                        max:8.7
                        //axisTick: {length:0},
                    },
                    series: [
                        {
                            name: '申请专利',
                            type: 'bar',
                            data: this.top10Apply,
                            barWidth: "28%",
                            itemStyle: {
                                "normal": {
                                    "color": {
                                    "colorStops": [
                                        {
                                        "offset": 0,
                                        "color": "#00A5FB"
                                        }
                                    ],
                                    "globalCoord": false
                                    }
                                }
                            },
                            label:{
                                normal:{
                                    show:true,
                                    position:'inside Top',
                                    textStyle:{
                                        color:'rgba(255,255,255,0.7)',
                                        fontSize:8,
                                        fontFamily:'Arial'
                                    }                                    
                                }
                            },
                        },
                        {
                            name: '授权专利',
                            type: 'bar',
                            data: this.top10Grant,
                            barWidth: "28%",
                            itemStyle: {
                                "normal": {
                                    "color": {
                                    "colorStops": [
                                        {
                                        "offset": 0,
                                        "color": "#7376E3"
                                        },
                                        
                                    ],
                                    "globalCoord": false
                                    }
                                }
                            },
                            label:{
                                normal:{
                                    show:true,
                                    position:'inside Top',
                                    textStyle:{
                                        color:'rgba(255,255,255,0.7)',
                                        fontSize:8
                                    }                                    
                                }
                            },
                            barGap: "0"
                        },
                    ]
                };
                myChart.setOption(option) 
            },
        },
        watch:{
            chinaAll(){
                this.drowMap();
                this.drowColumn();
            }
        },
        mounted(){
            Promise.all([this.$store.dispatch("getMapData")]).then(()=>{
                this.$nextTick(()=>{
                    let mapProvinceArray = JSON.parse(sessionStorage.getItem("mapProvinceArray"));
                    this.mapProvinceArray = mapProvinceArray;
                    let top10Name = sessionStorage.getItem("maptop10Name").split(",");
                    this.top10Name = top10Name
                    let top10Apply = sessionStorage.getItem("maptop10Apply").split(",");
                    this.top10Apply = top10Apply
                    let top10Grant = sessionStorage.getItem("maptop10Grant").split(",");
                    this.top10Grant = top10Grant
                    this.drowMap();
                    this.drowColumn();
                })                        
            })
        }
    }  
</script>