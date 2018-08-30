<template>
    <div class = "Bar_con">
        <div class = "BarHead">
            <div class = "tabButtn">
                <span class = "apply" :class="{'onlyStyle':action}" @click = "changeTab('发明专利申请')">发明专利申请</span><span class = "get"  :class="{'onlyStyle':!action}" @click = "changeTab('发明专利授权')">发明专利授权</span>
            </div>
            <select v-model="select2" @change = "methodName">
                <option>按月分析</option>
                <option>按周分析</option>
            </select>
        </div> 
        <div class = "BarBottom">
            <div id = "barCon"></div>  
            <div class = "time_com">
                <img class = "time_img" src = "../../assets/img/time.png" />
                <span class = "time_word">统计时间截至:</span>
                <span class = "time_num">{{deadLine}}(以国家知识产权局公示时间为准)</span>
            </div>
        </div> 
        <!-- <el-button type="danger">危险按钮</el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>           -->
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .Bar_con{
        width: 100%;
        box-sizing: border-box;
        border:1px solid rgba(232,234,235,1);
        // box-shadow: 0 0 1px #E8EAEB;
        .BarHead{
            box-sizing: border-box;
            padding: 0 40px;
            width: 100%;
            height: 50px;
            border-bottom:1px solid rgba(232,234,235,1);
            background:rgba(249,249,249,1);
            .tabButtn{
                float: left;
                margin-top: 10px;
                width:20%;
                height:28px;
                border: 1px solid #008EFF;
                border-radius: 100px;
                background: #fff;
                span{
                    display: inline-block;
                    width: 49%;
                    height: 28px;
                    text-align: center;
                    border-radius: 100px;
                    font-size: 13px;
                    color:rgba(82,99,112,1);
                    line-height:28px; 
                    cursor: pointer;
                }
                .get{
                    float:right;
                }
                .onlyStyle{
                    font-size: 13px;
                    background:rgba(0,142,255,1);
                    color: #fff;
                }
            }
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
            padding: 40px 0;
            background: #fff;
            #barCon{
                width:100%;
                height:320px;               
            } 
            .time_com{
                box-sizing: border-box;
                padding: 27px 0 0 3%;
                .time_img{
                    width:13px;
                    height:14px;
                    vertical-align: middle;
                    // margin-top:-2px;
                }
                .time_word,.time_num{
                    font-size: 11px;
                    color: #A7AFB6;
                }
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
                select2:"按周分析",
                action: true,
                endTime:'',
                deadLine:''
            }
        },
        methods:{
            methodName(){
                if(this.select2 == "按月分析"){
                    sessionStorage.setItem('globaltime','month');
                    let time = sessionStorage.getItem('globaltime')
                    let type = sessionStorage.getItem('type')
                    Promise.all([this.$store.dispatch("getPatentCount",{time:"month",type:type})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }else{
                    sessionStorage.setItem('globaltime','week');
                    let time = sessionStorage.getItem('globaltime')
                    let type = sessionStorage.getItem('type');
                    Promise.all([this.$store.dispatch("getPatentCount",{time:"week",type:type})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }
            },
            changeTab(item){
                if(item == "发明专利申请"){
                    sessionStorage.setItem('type','application');
                    let time = sessionStorage.getItem('globaltime')
                    this.action = true;
                    Promise.all([this.$store.dispatch("getPatentCount",{time:time,type:"application"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }
                if(item == "发明专利授权"){
                    sessionStorage.setItem('type','grant');
                    let time = sessionStorage.getItem('globaltime')
                    this.action = false;
                    Promise.all([this.$store.dispatch("getPatentCount",{time:time,type:"grant"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })  
                    })
                }
            },
            drawBar(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('barCon'));
                let china = sessionStorage.getItem('china').split(",");
                let japan = sessionStorage.getItem('japan').split(",");
                let korea = sessionStorage.getItem('korea').split(",");
                let america = sessionStorage.getItem('america').split(",");
                let europe = sessionStorage.getItem('europe').split(",");
                let time = sessionStorage.getItem('time').split(",");
                let option = {
                        color:['#7152E5','#008EFF','#78CD49','#FAA420','#F96060'],
                        title: {
                            
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            },
                            // formatter: (data)=>{
                            //     console.log(data)
                            // },
                        },
                        legend: {
                            left:"3%",
                            // top:"-1%",
                            "icon": "circle",                               
                            "textStyle": {
                                "color": "#7d838b",
                                "fontSize":10
                            }, 
                            data: [ 
                                {
                                    "name": "中国",
                                    
                                },{
                                    "name": "美国",
                            
                                },{
                                    "name": "韩国",
                                     
                                },{
                                    "name": "日本",
                                    
                                },{
                                    "name": "欧洲",
                                    
                                },],
                            x: 'left',
                            itemWidth:12,
                            itemHeight:12,
                            textStyle:{
                                fontSize: 13,
                                color: '#39454E'
                            }
                        },
                        grid: {
                            
                            left: '4%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: time,
                            axisTick: {
                                show: true,
                            },
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
                        }],
                        yAxis: [{
                            type: 'value',
                            min: 0,
                            max: sessionStorage.getItem('max')*1.2,
                            interval: parseInt((sessionStorage.getItem('max')*1.2)/5),
                            axisLabel: {
                                textStyle:{
                                    color:'#A7AFB6'
                                },
                                formatter: '{value}'
                            },
                            axisTick: {
                                show: false,
                            },
                            axisLine : {    // 轴线
                                show: false,
                            },
                            splitLine : {
                                show:true,
                                lineStyle: {
                                    color: '#EAEDF1',
                                }
                            }
                        }],
                        series: [
                        {
                            name: '中国',
                            type: 'bar',
                            data: china,
                            barWidth: "5%",
                            itemStyle: {                         
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[3, 3, 3, 3]
                                }
                            },
                            barGap: '45%'
                        }, {
                            name: '美国',
                            type: 'bar',
                            data: america,
                            barWidth: "5%",
                            itemStyle: {                         
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[3, 3, 3, 3]
                                }
                            },
                        }, {
                            name: '韩国',
                            type: 'bar',
                            data: korea,
                            barWidth: "5%",
                            itemStyle: {                         
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[3, 3, 3, 3]
                                }
                            },
                        }, {
                            name: '日本',
                            type: 'bar',
                            data: japan,
                            barWidth: "5%",
                            itemStyle: {                         
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[3, 3, 3, 3]
                                }
                            },
                        }, {
                            name: '欧洲',
                            type: 'bar',
                            data: europe,
                            barWidth: "5%",
                            itemStyle: {                         
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[3, 3, 3, 3]
                                }
                            },
                        }]
                    };
                   
                chart.setOption(option,true)          
            }
        },
        mounted(){
            sessionStorage.setItem('globaltime','week'); 
            sessionStorage.setItem('type','application');   
            Promise.all([this.$store.dispatch("getPatentCount",{time:'week',type:"application"})]).then(()=>{
                this.$nextTick(()=>{
                    this.drawBar();
                    let deadLine = sessionStorage.getItem('deadLine');
                    this.deadLine = deadLine
                })                        
            })       
        }
    } 
</script>