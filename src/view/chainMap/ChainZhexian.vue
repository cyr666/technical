<template>
    <div class = "chainSecond_con">
        <!-- <div class = "second_con">
            <div class = "first_word">园区产业链分布情况</div>
            <select v-model="select1">
                <option>各产业链技术创新分析</option>
            </select>
        </div> -->
        <div class = "third_main">
            <div class = "chainTop_head">{{tableHeadName}}产业发展态势</div>
            <div class = "chain_bottom">
                <div class = "top10_con">
                    <nav>
                        <ul class = "top10_head">
                            <li>排名</li>
                            <li>地区</li>
                            <li>企业数量(家)</li>
                        </ul>
                        <ul class = "top10_main">
                            <li v-for="item in zheList" :key="item.id" @click="handleChangle(item.id)" :class="clickId==item.id?'OnlyStyle':''">
                                <span class = "num">{{item.id+1}}</span>
                                <span class = "comName">{{item.name}}</span>
                                <div class = "applyNum">
                                    <em>{{item.value}}</em>
                                    <span class = "culum"></span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class = "pie_con">
                    <div class = "Top10comName">{{topName}}龙头企业</div>
                    <div id = "chainTop_zhexian"></div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.chainSecond_con{
    .second_con{
        overflow: hidden;
        .first_word{
            float: left;
            box-sizing: border-box;
            padding-left: 0.5%;
            margin-top: 20px;
            margin-bottom: 17px;
            height:16px; 
            font-size:16px;
            font-weight: bold;
            color: #3c3c3c;
            border-left: 3px solid #008EFF;
            line-height: 16px;
        }
        select{
            float: right;
            width:178px;
            height:28px; 
            background:rgba(255,255,255,1);
            border-radius: 2px ;
            border:1px solid #E1E1E1; 
            margin-top: 30px;
            color:rgba(123,129,133,1);
        }
    }
    .third_main{
        box-sizing: border-box;
        overflow: hidden;
        margin-top: 30px;
        .chainTop_head{
            height: 50px;
            background: #F9F9F9;
            border:1px solid rgba(232,234,235,1);
            font-size: 14px;
            line-height: 50px;
            text-align: center;
            color: #7B8185;
            font-weight: bold;
        }
        .chain_bottom{
            width: 100%;
            overflow: hidden;
            background: #fff;
            box-sizing: border-box;
            padding: 40px 2%;
            border:1px solid rgba(232,234,235,1);
            border-top: none;
            .pie_con{
                float: left;
                width: 52%;
                height:380px;
                margin-left: 6%;
                .Top10comName{
                    padding-left: 1%;
                    border-left:3px solid #008EFF;
                    font-size:14px;
                    font-family:"微软雅黑";
                    color:rgba(34,45,54,1);
                    font-weight: bold;
                    line-height: 14px;
                    margin: 30px 0 0 3%;
                } 
                #chainTop_zhexian{
                    width: 100%;
                    height: 380px;
                    margin-top: 30px;
                }               
            }
            .top10_con{
                box-sizing: border-box;
                float: left;
                width: 30%;
                margin-left: 6%;
                background:rgba(242,249,255,1);
                border-radius:4px;
                border:1px solid rgba(232,234,235,1);
                // margin-top: 45px;
                nav{
                    .top10_head{
                        box-sizing: border-box;
                        padding: 10px 10%;
                        overflow: hidden;
                        li{
                            float: left;
                            list-style: none;
                            font-size: 13px;
                            color: #7B8185;
                            line-height: 26px;
                        }
                        li:nth-child(2){
                            margin-left: 10%;
                        }
                        li:nth-child(3){
                            margin-left: 12%;
                        }
                    }
                    .top10_main{
                        li{
                            list-style: none;
                            width: 100%;
                            height: 42px;
                            box-sizing: border-box;
                            padding-left: 11%;
                            span{
                                display: inline-block;
                            }
                            .num{
                                float: left;
                                font-size: 13px;
                                color: #39454E;
                                width: 16px;
                                height: 16px;
                                line-height:16px;
                                text-align: center;
                                margin-top: 13px;                                
                                background: #6DCEFF;
                                color: #fff;
                            }
                            .comName{
                                float: left;
                                width: 19%;
                                line-height: 42px;
                                margin-left:12%;
                                font-size: 13px;
                                color: #39454E;
                                cursor: pointer;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            // .comName:hover{
                            //     color: #0080FF;
                            // }
                            .applyNum{
                                float: left;
                                font-size: 12px;
                                width: 60%;
                                border-radius: 3px;
                                margin-top: 12px;
                                em{
                                    display: inline-block;
                                    color: #000;
                                    width: 20%;
                                    text-align: right;
                                }
                                .culum{
                                    background: #008EFF;
                                    height: 10px;
                                }
                               
                            }
                        }
                        .OnlyStyle{
                            background:rgba(0,142,255,0.1); 
                            .comName{
                                color: rgba(0,142,255,1)
                            }                            
                        }
                        li:nth-child(1) .num{
                            background: #F96060;
                        }
                        li:nth-child(2) .num{
                            background: #FAA420;
                        }
                        li:nth-child(3) .num{
                            background: #FFD500;
                        }
                        // li:nth-child(1) .num{
                        //     width: 16px;
                        //     height: 16px;
                        //     background: #F96060;
                        //     color: #fff;
                        //     font-size: 12px;
                        //     line-height: 16px;
                        // }
                    }
                }
            }
        }
        
    }
}
</style>
<script scoped>
    export default {
        name: 'HelloWorld',
        components: {
            
        },
        computed:{
            chainID(){
                return this.$store.state.ChainModule.chainID
            },
            chainNAME(){
                console.log(this.$store.state.ChainModule.chainNAME)
                return this.$store.state.ChainModule.chainNAME
            }
        },
        data(){
            return{
                select1:'各产业链技术创新分析',
                institutionArray:[],
                height:[272,245,239,219,198,178,169,150,143,130],
                ChainProvinceArray:[],
                zheList:[],
                year_all:[],
                No1_company:[],
                No2_company:[],
                No3_company:[],
                legend:[],
                topName:"",
                tableHeadName:'',
                clickId:0,
            }
        },
        methods:{
            drawBar(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('chainTop_zhexian'));
                let option = {
                        color: ['#F96060', '#FAA420','#78CD49'],
                        //title: {
                        //    text: '报警次数'
                        //},
                        tooltip: {
                            trigger: 'axis',
                            // formatter: "{b} <br> 合格率: {c}%"
                        },
                        legend: {
                            data:this.legend,
                            x: '3%',
                            top:'-5',
                            itemWidth:12,
                            itemHeight:12,
                            icon: "circle",
                            textStyle: {
                                fontSize:'12',
                                // color: '#7b8185',
                            },
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            // // top: '-30',
                            bottom: '1%',
                            top:'80',
                            containLabel: true
                        },
                        calculable: true, 
                        xAxis: {
                            type: 'category',
                            // name: '日期',
                            boundaryGap: false,
                            data:this.year_all,
                            axisLabel: {
                                textStyle:{
                                    color:'#A7AFB6'
                                }
                            },
                            axisLine: {  
                        　　　　 show:true,
                                lineStyle:{
                                    color:'#EAEDF1',
                                }
                        　　 },
                        },
                        yAxis: {
                            type: 'value',
                            name: '专利数量',
                            nameTextStyle:{
                                fontSize:'11',
                                color:'#A7AFB6'
                            },
                            // normal:{
                            //     name: '专利申请数量',
                            //     textStyle:{
                            //         color: '#EAEDF1'
                            //     }
                            // },
                            axisLine : {    // 轴线
                                show: false,
                            },
                            splitLine : {
                                show:true,
                                lineStyle: {
                                    color: '#EAEDF1',
                                }
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                textStyle:{
                                    color:'#A7AFB6'
                                },
                                formatter: '{value}'
                            },
                            splitNumber:5
                        },

                        series: [
                             
                            {
                                name:this.legend[0],
                                type:'line',
                                // stack: '总量',
                                data:this.No1_company,
                                
                            },
                            {
                                name:this.legend[1],
                                type:'line',
                                // stack: '总量',
                                data:this.No2_company,
                                
                            },
                            {
                                name:this.legend[2],
                                type:'line',
                                // stack: '总量',
                                data:this.No3_company,
                                // data:[30,40,60]
                            },
                          ]
                  };                   
                chart.setOption(option,true)          
            },
            handleChangle(id){
                this.clickId = id;
                this.changeZhexian(id)
            },
            setHeight(){
                let height = [];
                setTimeout(()=>{
                    let ems = Array.from($('.applyNum em'));
                    ems.forEach((val,ind)=>{
                        height.push(parseInt($(val)[0].innerHTML))
                    })
                    let applyNums = Array.from($('.culum'))                    
                    applyNums.forEach((val,ind)=>{
                        $(val).css({'width':height[ind]/height[0]*60+'%'})
                    })
                },100)
                
                
            },
            changeZhexian(id){
                let ChainProvinceArray = JSON.parse(sessionStorage.getItem('ChainProvinceArray'));
                this.ChainProvinceArray = ChainProvinceArray;
                let zheList = [];
                this.ChainProvinceArray.forEach((val,ind)=>{
                    zheList.push({
                        id:ind,
                        name:val.name,
                        value:val.count
                    })
                })
                this.zheList = zheList;
                this.year_all = this.ChainProvinceArray[id].year_all;
                this.No1_company = this.ChainProvinceArray[id].No1_company;
                this.No2_company = this.ChainProvinceArray[id].No2_company;
                this.No3_company = this.ChainProvinceArray[id].No3_company;
                let legend = [];
                this.ChainProvinceArray[id].companyArray.forEach((val)=>{
                    legend.push(val.name)
                })
                this.topName = this.zheList[id].name
                this.legend = legend;
                setTimeout(()=>{
                    this.drawBar();
                },100)
            }
        },
        watch:{
            chainID(newVal,old){
                setTimeout(()=>{
                    this.clickId = 0;
                    this.changeZhexian(0)
                },100)
                
            },
            chainNAME(newVal,old){                
                this.tableHeadName = newVal;                
            }
        },
        mounted(){
            this.setHeight();
            Promise.all([this.$store.dispatch("getChainAnalysis",{id:""})]).then(()=>{
                this.$nextTick(()=>{
                    let chinaChainArray = JSON.parse(sessionStorage.getItem('chinaChainArray'))
                    this.changeZhexian(0);
                    this.drawBar();
                })                        
            })
        }
    }
</script>