<template>
    <div class = "Bar_con">
        <div class = "BarHead">
            <select v-model="select2" @change = "methodName">
                <option>最近一个月</option>
                <option>最近一周</option>
            </select>
            <select v-model="select1" @change = "methodProvince">
                <option v-for="item in provinceList" :key="item.id">{{item}}</option>
            </select>
        </div> 
        <div class = "BarBottom">
            <div class = "pie_con">
                <div id = "Pie"></div>  
            </div>    
            <div class = "relatedQiye_con">
                <div class = "head_con">
                    <img src = "../../assets/img/国内-相关企业@2x.png" class = "hotIcon"/>
                    <span class = "hot_word">相关创新主体</span>
                </div>               
                <div class = "relatedItem" v-for ="item in company" :key="item.id">
                    <div class ="company">{{item.name}}</div>
                    <div class = "keyWord_con">
                        <span class = "keyWord_item" v-for="obj in item.keyword">{{obj}}</span>
                    </div>
                </div>
            </div>        
        </div>
             
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .Bar_con{
        width: 100%;
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
                margin-left: 1%;
                box-sizing: border-box;
                padding-left: 1%;
            }
        } 
        .BarBottom{
            box-sizing: border-box;
            background: #fff;
            width: 100%;
            overflow: hidden;
            .pie_con{
                float: left;
                width: 50%;
                #Pie{
                    margin-top: 35px;
                    width:100%;
                    height:423px;               
                } 
            }
            .relatedQiye_con{
                float: right;
                margin: 40px 8% 0 0;
                width: 35%;
                height: 430px;
                overflow-y: auto;
                background:rgba(242,249,255,1);
                border-radius: 4px ; 
                box-sizing: border-box;
                padding: 20px 2% 0 2%;
                border: 1px solid #E1E7F3;
                .head_con{
                    margin-bottom: 10px;
                    .hotIcon{
                        width: 14px;
                        height: 14px;
                        vertical-align: middle;
                        margin-top: -2px;
                    }
                    .hot_word{
                        font-size: 14px;
                        color: #39454E;
                        font-weight: bold;
                    }
                }                
                .relatedItem{
                    box-sizing: border-box;
                    padding: 15px 0 10px 0;
                    border-bottom: 1px solid #E1E7F3;
                    .company{
                        font-size:13px;
                        color: #39454E;
                        line-height: 26px;
                    }
                    .keyWord_con{
                        .keyWord_item{
                            display: inline-block;
                            padding: 5px 3%;
                            margin:0 2% 10px 0;
                            color: #008EFF;
                            font-size: 13px;
                            background:rgba(0,142,255,0.15);
                            border-radius: 4px ; 
                        }
                    }
                }
                .relatedItem:last-child{
                    border: none;
                }
            }
            .relatedQiye_con::-webkit-scrollbar {/*滚动条整体样式*/
                width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 4px;
            }
            .relatedQiye_con::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px #e1e7f3;
                background: #D5D8D9;
            }
            .relatedQiye_con::-webkit-scrollbar-track {/*滚动条里面轨道*/
                border-radius: 0;
                background: #f2f9ff;
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
                select1:'全国',
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
                province:["北京","山西","内蒙古"],
                provinceList:[],
                company:[],
            }
        },
        methods:{
            methodName(){
                if(this.select2 == "最近一个月"){
                    sessionStorage.setItem('time7','month');
                }else{
                    sessionStorage.setItem('time7','week');
                }
                let time = sessionStorage.getItem('time7');
                let province1 = sessionStorage.getItem('province2');
                Promise.all([this.$store.dispatch("getchinaFterm",{time:time,province:province1})]).then(()=>{
                    this.$nextTick(()=>{
                        this.drawBar();
                        this.company = JSON.parse(sessionStorage.getItem('company'));
                    })                        
                }) 
            },
            methodProvince(){
                sessionStorage.setItem("province2",this.select1);
                let province2 = sessionStorage.getItem('province2');
                let time = sessionStorage.getItem('time7');
                Promise.all([this.$store.dispatch("getchinaFterm",{time:time,province:province2})]).then(()=>{
                    this.$nextTick(()=>{
                        this.drawBar();
                        this.company = JSON.parse(sessionStorage.getItem('company'));
                    })                        
                })
            },
            drawBar(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('Pie'));
                let F_termArray = JSON.parse(sessionStorage.getItem('chinaFtermArray'));
                let chinaFtermName = sessionStorage.getItem('chinaFtermName').split(",");
                var data = F_termArray;
                let option = {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: (data)=>{                           
                            sessionStorage.setItem('company',JSON.stringify(data.data.company))
                            this.company = JSON.parse(sessionStorage.getItem('company'));                           
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
                            let result = data.data.name+'<hr/>'+out
                            return result
                        }//"{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        top:'middle',
                        itemWidth:12,
                        itemHeight:12,
                        right: '5%',
                        data: chinaFtermName,
                        icon: 'circle',
                        itemGap: 12,
                        textStyle: {
                            fontSize:'12',
                            color: '#7b8185',
                        },
                    },
                    formatter:function(val){
                        let str = ""
                        if(val.length>11){
                            str += val.substr(0,11)+'\n'+val.substr(11);
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
                        center: ['35%', '50%'],
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
                this.contury = item.id
            },
        },
        mounted(){
            Promise.all([this.$store.dispatch("getchinaFterm",{time:"week"})]).then(()=>{
                this.$nextTick(()=>{
                    // console.log(123)
                    this.drawBar();
                    // let chinaF_term_List = JSON.parse(sessionStorage.getItem('chinaF_term_List'));
                    // this.chinaF_term_List = chinaF_term_List;
                    // let chinainstitutionArray = JSON.parse(sessionStorage.getItem('chinainstitutionArray'));
                    // this.chinainstitutionArray = chinainstitutionArray;
                    let provinceList = JSON.parse(sessionStorage.getItem('provinceList'));
                    this.provinceList = provinceList;
                    let company = JSON.parse(sessionStorage.getItem('company'));
                    this.company = company;
                })                        
            })
        }
    } 
</script>