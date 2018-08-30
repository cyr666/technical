<template>
    <div class = "Bar_con">
        <div class = "BarHead">
            <select v-model="select2" @change = "methodName">
                <option>最近一个月</option>
                <option>最近一周</option>
            </select>
        </div> 
        <div class = "BarBottom">
            <div id = "callery"></div>  
        </div>
             
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .Bar_con{
        width: 100%;
        height: 533px;
        box-sizing: border-box;
        border:1px solid rgba(232,234,235,1);
        background: #fff;
        .BarHead{
            box-sizing: border-box;
            padding: 0 4%;
            width: 100%;
            height: 50px;
            background:rgba(249,249,249,1);
            border-bottom:1px solid rgba(232,234,235,1);
            select{
                float: right;
                width:130px;
                height:28px; 
                background:rgba(255,255,255,1);
                border-radius: 2px ;
                border:1px solid #E1E1E1; 
                margin-top: 10px;
                color:rgba(123,129,133,1);
            }
        } 
        .BarBottom{
            box-sizing: border-box;
            padding: 47px 3% 47px 3%;
            background: #fff;
            width: 100%;
            // height: 300px;
            #callery{
                width:100%;
                height:400px;               
            } 
        }            
    }
</style>

<script scoped>
    export default{
        name: 'HelloWorld',
        components: {
        }, 
        data(){
            return{
                select2:"最近一周",
                max: 5000,
                endTime:'',
            }
        },
        methods:{
            methodName(){
                if(this.select2 == "最近一个月"){
                    sessionStorage.setItem('time1','month');
                    Promise.all([this.$store.dispatch("getDistribution",{time:"month"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }else{
                    sessionStorage.setItem('time1','week');
                    Promise.all([this.$store.dispatch("getDistribution",{time:"week"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }
            },
            drawBar(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('callery'));
                let ipc_max = JSON.parse(sessionStorage.getItem('ipc_max'));
                let china = sessionStorage.getItem('china1').split(",");
                let japan = sessionStorage.getItem('japan1').split(",");
                let korea = sessionStorage.getItem('korea1').split(",");
                let america = sessionStorage.getItem('america1').split(",");
                let europe = sessionStorage.getItem('europe1').split(",");
                let option = {
                        color:['#7152E5','#008EFF','#78CD49','#FAA420','#F96060'],
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            // extraCssText:'width:200px;height:60px;',
                            formatter: function(data){
                                let str = '';
                                
                                for (var i=0;i<data.value.length;i++){
                                    str += ipc_max[i].text+':'+data.value[i]+'<br/>'
                                }
                                str = str.replace(/加热；/g,"加热；<br/>&nbsp;&nbsp;&nbsp;&nbsp;");
                                return str;
                                
                            }
                        },
                        legend: {
                            show: true,
                            icon: 'circle',
                            itemWidth: 12,
                            itemHeight: 12,
                            y: "-5",
                            x: 'left',
                            textStyle: {
                                fontSize: 13,
                                color: '#39454E'
                            },
                            data: ['中国', '美国','韩国','日本','欧洲'],

                        },
                        grid:{
                            top:'20'
                        },
                        radar: [{
                            indicator: ipc_max,
                            textStyle: {
                                fontSize: 13,
                                color: 'red'
                            },
                            center: ['50%', '53%'],
                            radius: 150,
                            startAngle: 90,
                            splitNumber: 4,
                            shape: 'circle',
                            name: {
                                formatter: (value)=>{
                                    value = value.replace(/\S{6}/g,function(match){
                                        return match + '\n'
                                    })
                                    return value
                                },
                                textStyle: {
                                    fontSize: 12,
                                    color: '#A3A7AA',
                                    lineHeight: 14,
                                }
                            },
                            splitArea: {
                                areaStyle: {
                                    color: ['transparent',
                                        'transparent)', 'rgba(114, 172, 209, 0)',
                                        'transparent', 'rgba(114, 172, 209, 0)'
                                    ],
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'green'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#E8EAEB'
                                }
                            }
                        }, ],
                        series: [{
                            name: '雷达图',
                            type: 'radar',
                            itemStyle: {
                                emphasis: {
                                    lineStyle: {
                                        width: 4
                                    }
                                }
                            },
                            data: [{
                                name: '中国',
                                value: china,
                                symbolSize: 2.5,
                                itemStyle: {
                                    normal: {
                                        // borderColor: 'rgba(245, 166, 35, 1)',
                                        borderWidth: 2.5,
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        opacity: 0.5
                                    }
                                }
                            }, {
                                name: '美国',
                                value: america,
                                symbolSize: 2.5,
                                itemStyle: {
                                    normal: {
                                        // borderColor: 'rgba(19, 173, 255, 1)',
                                        borderWidth: 2.5,
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        opacity: 0.5
                                    }
                                }
                            },{
                                name: '韩国',
                                value: korea,
                                symbolSize: 2.5,
                                itemStyle: {
                                    normal: {
                                        // borderColor: 'rgba(19, 173, 255, 1)',
                                        borderWidth: 2.5,
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        opacity: 0.5
                                    }
                                }
                            },{
                                name: '日本',
                                value: japan,
                                symbolSize: 2.5,
                                itemStyle: {
                                    normal: {
                                        // borderColor: 'rgba(19, 173, 255, 1)',
                                        borderWidth: 2.5,
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        opacity: 0.5
                                    }
                                }
                            },{
                                name: '欧洲',
                                value:europe,
                                symbolSize: 2.5,
                                itemStyle: {
                                    normal: {
                                        // borderColor: 'rgba(19, 173, 255, 1)',
                                        borderWidth: 2.5,
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        opacity: 0.5
                                    }
                                }
                            }]
                        }, ]
                    };
                        
                chart.setOption(option)            
            }
        },
        mounted(){  
            sessionStorage.setItem('time1','week');
            Promise.all([this.$store.dispatch("getDistribution",{time:'week'})]).then(()=>{
                this.$nextTick(()=>{
                    this.drawBar();
                })                        
            })            
        }
    } 
</script>