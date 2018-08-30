<template>
    <div class = "Bar_con">
        <div class = "BarHead">
            <select v-model="select2" @change = "methodName">
                <option>最近一个月</option>
                <option>最近一周</option>
            </select>
        </div> 
        <div class = "BarBottom">
            <ul>
                <li v-for="item in navList" :key="item.id" @click="getCountry(item)" :class ="contury==item.id?'onlyStyle':''">{{item.name}}</li>
            </ul>
            <div id = "Pie"></div>  
        </div>
             
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .Bar_con{
        width: 100%;
        height: 533px;
        box-sizing: border-box;
        padding:0 0 57px 0;
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
            background: #fff;
            width: 100%;
            
            ul{ 
                box-sizing: border-box;
                padding-left: 6%;
                margin-top: 26px;
                width: 100%;
                height: 45px;
                // margin-top: 12px;
                border-bottom: 1px solid #E8EAEB;
                li{
                    list-style-type: none;
                    float: left;
                    margin-right: 5%;
                    width: 6%;
                    text-align: center;
                    line-height: 43px;
                    font-size: 13px;
                    color: #39454E;
                    cursor: pointer;
                }
                .onlyStyle{
                    border-bottom: 2px solid #008EFF
                }
            }
            #Pie{
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
                endTime:'',
                navList:[
                    {'id':0,'name':'中国'},
                    {'id':1,'name':'美国'},
                    {'id':2,'name':'日本'},
                    {'id':3,'name':'韩国'},
                    {'id':4,'name':'欧洲'},
                ],
                contury: 0,
            }
        },
        methods:{
            methodName(){
                if(this.select2 == "最近一个月"){
                    sessionStorage.setItem('time2','month');
                    let contury = sessionStorage.getItem('contury');
                    Promise.all([this.$store.dispatch("getFtermdistribution",{time:"month",country:contury})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }else{
                    sessionStorage.setItem('time2','week');
                    let contury = sessionStorage.getItem('contury');
                    Promise.all([this.$store.dispatch("getFtermdistribution",{time:"week",country:contury})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }
            },
            drawBar(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('Pie'));
                let PieArray = JSON.parse(sessionStorage.getItem('pieArray'));
                let names = sessionStorage.getItem('FtermName').split(",");
                var data = PieArray;
                let option = {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        // extraCssText:'width:200px;height:60px;',
                        formatter: function(data){
                            
                            let cnt = parseInt(data.data.keyword.length / 10);
                            let text = data.data.keyword.replace(/(\s*)/g,'').split(';')
                            let out = text[0]
                            let len = out.length;
                            for (var i = 1; i < text.length; i++) {
                                if (len > 10) {
                                    out += ".<br/>" + text[i]
                                    len = text[i].length
                                } else {
                                    out += "."+text[i]
                                    len += text[i].length
                                }
                            }
                            let str = data.data.name + '<hr/>'+out
                            return str
                            
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'middle',
                        itemWidth:12,
                        itemHeight:12,
                        right: '12%',
                        data: names,
                        icon: 'circle',
                        itemGap: 12,
                        textStyle:{
                            fontSize:12,
                            color:"#7b8185"
                        }
                    },
                    formatter:function(val){
                        let str = ""
                        if(val.length>10){
                            str += val.substr(0,10)+'\n'+val.substr(10);
                            return str
                        }else{
                            return val
                        }
                        
                    },//此语句是让legend 中的文字进行换行</span>
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['40%', '58%'],
                        color:['#05AAFF','#008EFF','#7152E5','#9C5BF4','#F96060','#FAA420','#FFD500','#78CD49'],
                        center: ['30%', '50%'],
                        // legendHoverLink: true,
                        label: {
                            normal: {
                                position: 'inside',
                                formatter: '{d}%',

                                textStyle: {
                                    color: '#fff',
                                    fontWeight: 'normal',
                                    fontSize: 12
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: data
                    }]
                };
                        
                chart.setOption(option)            
            },
            getCountry(item){
                this.contury = item.id;
                let time = sessionStorage.getItem('time2');
                if(item.id == 0){
                    sessionStorage.setItem('contury','CN');
                    Promise.all([this.$store.dispatch("getFtermdistribution",{time:time,country:"CN"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })   
                }
                if(item.id == 1){
                    sessionStorage.setItem('contury','US');
                    Promise.all([this.$store.dispatch("getFtermdistribution",{time:time,country:"US"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    }) 
                }
                if(item.id == 2){
                    sessionStorage.setItem('contury','JP');
                    Promise.all([this.$store.dispatch("getFtermdistribution",{time:time,country:"JP"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    }) 
                }
                if(item.id == 3){
                    sessionStorage.setItem('contury','KR');
                    Promise.all([this.$store.dispatch("getFtermdistribution",{time:time,country:"KR"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    }) 
                }
                if(item.id == 4){
                    sessionStorage.setItem('contury','EP');
                    Promise.all([this.$store.dispatch("getFtermdistribution",{time:time,country:"EP"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    }) 
                }
            }
        },
        mounted(){ 
            Promise.all([this.$store.dispatch("getFtermdistribution",{time:"week",country:"CN"})]).then(()=>{
                this.$nextTick(()=>{
                    this.drawBar();
                })                        
            })           
        }
    } 
</script>