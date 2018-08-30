<template>
    <div class = "Bar_con">
        <div class = "BarHead">
            <!-- <div class = "tabButtn">
                <span class = "apply" :class="{'onlyStyle':action}" @click = "changeTab('研究机构')">研究机构</span><span class = "get"  :class="{'onlyStyle':!action}" @click = "changeTab('企业')">企业</span>
            </div> -->
            <select v-model="select2" @change = "methodName">
                <option>最近一个月</option>
                <option>最近一周</option>
            </select>
        </div> 
        <div class = "BarBottom">
            <ul>
                <li v-for="item in navList" :key="item.id" @click="getCountry(item)" :class ="contury==item.id?'onlyStyle':''">{{item.name}}</li>
            </ul>
            <div class = "echarts_con">
                <div class = "top_con">
                    <div class = "top_item" :class="top==index?'top_only':''" v-for ="(item,index) in institutionArray" :key="item.id" @click="changeIns(item.id,index)">
                        <span class = "top_num">{{index+1}}</span>
                        <span class = "top_name">{{item.name}}</span>
                    </div>
                </div>
                <div class = "Pie_con">
                    <div id = "circle"></div>
                </div>                  
                <div class = "hotArea_con">
                    <div class = "headCon">
                        <img src = "../../assets/img/大数据-热门领域@2x.png" class = "hotIcon"/>
                        <span class = "hot_word">热门领域</span>
                    </div>  
                    <div class = "hotareaItem" v-for="(item,index) in F_term_List" :key="item.id">
                        <span class = "Fterm" ref= "Fterms">{{item}}<span class = "shengluehao"></span></span>
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
        border:1px solid rgba(232,234,235,1);
        .BarHead{
            box-sizing: border-box;
            padding: 0 4%;
            width: 100%;
            height: 50px;
            background:rgba(249,249,249,1);
            border-bottom:1px solid rgba(232,234,235,1);
            .tabButtn{
                float: left;
                margin-top: 10px;
                width:12%;
                height:28px;
                border: 1px solid #008EFF;
                border-radius: 100px;
                background: #fff;
                span{
                    display: inline-block;
                    height: 28px;
                    text-align: center;
                    border-radius: 100px;
                    font-size: 13px;
                    color:rgba(82,99,112,1);
                    line-height:28px; 
                    cursor: pointer;
                }
                .apply{
                    width: 60%;
                }
                .get{
                    float:right;
                    width: 40%;
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
            padding: 12px 0 40px 0;
            background: #fff;
            ul{ 
                box-sizing: border-box;
                padding-left: 4%;
                margin-top: 12px;
                width: 100%;
                height: 45px;
                border-bottom: 1px solid #E8EAEB;
                li{
                    list-style-type: none;
                    float: left;
                    margin-right: 2%;
                    width: 3%;
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
            .echarts_con{
                width: 100%;
                box-sizing: border-box;
                padding: 40px 0 0px 3%;
                overflow: hidden;
                .top_con{
                    float: left;
                    width: 20%;
                    height: 445px;
                    background:rgba(242,249,255,1);
                    border-radius: 4px ; 
                    border: 1px solid #E8EAEB;
                    .top_item{
                        box-sizing: border-box;
                        padding:0px 0 0 10%;
                        height: 43px;
                        
                        cursor: pointer;
                        .top_num{
                            display: inline-block;
                            float: left;
                            margin-top: 13px;
                            width: 16px;
                            height: 16px;
                            font-size: 12px;
                            color: #fff;
                            text-align: center;
                            line-height: 16px;
                            background: #008EFF;
                        }
                        .top_name{
                            display: inline-block;
                            float: left;
                            margin-left: 3%;
                            font-size: 13px;
                            color: #39454E;
                            line-height: 43px;
                            width: 80%;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .top_item:nth-child(1) .top_num{
                        background: #F96060;
                    }
                    .top_item:nth-child(2) .top_num{
                        background: #FAA420;
                    }
                    .top_item:nth-child(3) .top_num{
                        background: #FFD500;
                    }
                    .top_only{
                        .top_name{
                            color:#008EFF;
                        }                       
                        background: #fff;
                    }
                }
                .Pie_con{
                    float: left;
                    width: 50%;
                    #circle{                   
                        width:100%;
                        height:430px;               
                    } 
                }
                .hotArea_con{
                    float: right;
                    margin-right: 3%;
                    width: 25%;
                    height: 445px;
                    overflow-y: auto;
                    box-sizing: border-box;
                    padding: 20px 2% 10px 2%;
                    border: 1px solid #E1E7F3;
                    background: rgba(242,249,255,1);
                    border-radius: 4px ;
                    .headCon{
                        margin-bottom: 20px;
                        .hotIcon{
                            width: 11px;
                            height: 15px;
                            vertical-align: middle;
                            // margin-bottom: 21px;
                        }
                        .hot_word{
                            font-size: 14px;
                            color: #39454E;
                            font-weight: bold;
                        }
                    }
                    .hotareaItem{
                        box-sizing: border-box;
                        margin-bottom: 10px;
                        width: 100%;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        color: #008EFF; 
                        // position: relative;
                        .Fterm{
                            display: inline-block;
                            box-sizing: border-box;
                            padding: 5px 8px;
                            background:rgba(0,142,255,0.15);
                            font-size: 13px;
                            // 
                            height: 27px;
                            color: #008EFF;
                            border-radius: 4px ;                            
                        }
                        // a:after{
                        //     content:"...";
                        //     position: absolute;
                        //     right: 3px;
                        //     top: 30px;
                        // }
                    }

                }
                .hotArea_con::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 3%;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 4px;
                }
                .hotArea_con::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    border-radius: 5px;
                    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    background: #D5D8D9;
                }
                .hotArea_con::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    border-radius: 0;
                    background: rgba(0,0,0,0.1);
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
                select2:"最近一周",
                action: true,
                max: 5000,
                endTime:'',
                top: 0,
                navList:[
                    {'id':0,'name':'中国'},
                    {'id':1,'name':'美国'},
                    {'id':2,'name':'日本'},
                    {'id':3,'name':'韩国'},
                    {'id':4,'name':'欧洲'},
                ],
                contury: 0,
                F_term_List:[],
                institutionArray:[],
            }
        },
        methods:{
            methodName(){
                this.top = 0;
                if(this.select2 == "最近一个月"){
                    sessionStorage.setItem('time4','month');
                    let contury = sessionStorage.getItem('contury2');
                    // let id = sessionStorage.getItem('comid');
                    Promise.all([this.$store.dispatch("get_hot_institution_distribution",{time:"week",country:contury,id:""})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                            let F_term_List = JSON.parse(sessionStorage.getItem('F_term_List'));
                            this.F_term_List = F_term_List;
                            let institutionArray = JSON.parse(sessionStorage.getItem('institutionArray'));
                            this.institutionArray = institutionArray;
                        })                        
                    }) 
                }else{
                    sessionStorage.setItem('time4','week');
                    let contury = sessionStorage.getItem('contury2');
                    Promise.all([this.$store.dispatch("get_hot_institution_distribution",{time:"week",country:contury,id:""})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                            let F_term_List = JSON.parse(sessionStorage.getItem('F_term_List'));
                            this.F_term_List = F_term_List;
                            let institutionArray = JSON.parse(sessionStorage.getItem('institutionArray'));
                            this.institutionArray = institutionArray;
                        })                        
                    }) 
                }
            },
            changeTab(item){
                this.top = 0;
                if(item == "研究机构"){
                    this.action = true;
                }
                if(item == "企业"){
                    this.action = false;
                }
            },
            changeIns(id,index){
                this.top = index;
                sessionStorage.setItem('comid',id);
                let comid = sessionStorage.getItem('comid');
                let contury = sessionStorage.getItem('contury2');
                let time = sessionStorage.getItem('time4');
                Promise.all([this.$store.dispatch("get_hot_institution_distribution",{time:time,country:contury,id:comid})]).then(()=>{
                    this.$nextTick(()=>{
                        this.drawBar();
                        let F_term_List = JSON.parse(sessionStorage.getItem('F_term_List'));
                        this.F_term_List = F_term_List;
                        let institutionArray = JSON.parse(sessionStorage.getItem('institutionArray'));
                        this.institutionArray = institutionArray;
                    })                        
                }) 
            },
            getCountry(item){
                this.top = 0;
                this.contury = item.id;
                let time = sessionStorage.getItem('time4');
                // let id = sessionStorage.getItem('comid');
                if(item.id == 0){
                    sessionStorage.setItem('contury2','CN');
                }
                if(item.id == 1){
                    sessionStorage.setItem('contury2','US');
                }
                if(item.id == 2){
                    sessionStorage.setItem('contury2','JP');
                }
                if(item.id == 3){
                    sessionStorage.setItem('contury2','KR');
                }
                if(item.id == 4){
                    sessionStorage.setItem('contury2','EP');
                }
                let country = sessionStorage.getItem('contury2');
                Promise.all([this.$store.dispatch("get_hot_institution_distribution",{time:time,country:country,id:''})]).then(()=>{
                    this.$nextTick(()=>{
                        this.drawBar();
                        let F_term_List = JSON.parse(sessionStorage.getItem('F_term_List'));
                        this.F_term_List = F_term_List;
                        let institutionArray = JSON.parse(sessionStorage.getItem('institutionArray'));
                        this.institutionArray = institutionArray;
                        setTimeout(()=>{
                            this.chef()
                        },10)
                    })                        
                }) 
            },
            drawBar(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('circle'));
                let level_2_ipcArray = JSON.parse(sessionStorage.getItem('level_2_ipcArray'))
                let option = {
                        color:['#05AAFF','#008EFF','#7152E5','#9C5BF4','#F96060','#FAA420','#FFD500','#78CD49'],
                        tooltip: {
                            trigger: 'item',
                            formatter: (data)=>{
                                let text = data.name.split('；')
                                let out = text[0];
                                let len = text.length;
                                for(var i = 1;i<len;i++){
                                    out+='<br/>'+text[i]
                                }
                                return out
                            },

                        },
                        series: [
                            {
                                name:'',
                                type:'pie',
                                hoverAnimation: false,
                                legendHoverLink:false,
                                radius: ['40%', '40%'],
                                color: ['#915872', '#3077b7', '#9a8169', '#3f8797','#5b8144','#307889','#9c6a79'],
                                center: ['35%', '80%'],
                                label: {
                                    normal: {
                                        position: 'inner',
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    },
                                
                                },
                                tooltip: {
                                    show:false,                               
                                },
                            },
                            {
                                name:'',
                                type:'pie',
                                radius: ['40%', '55%'],
                                label: {
                                    normal: {
                                        formatter: (data)=>{
                                            let out = data.name.substr(0,8)+'...';
                                            return out                                                                             
                                        }
                                    },
                            
                                },
                                data:level_2_ipcArray
                            }
                        ]
                    };
                chart.setOption(option)            
            },
            chef(){
                // console.log("火狐")
                // let screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
                // let hotAreacon_width = screenWidth*0.86*0.18;
                // console.log(hotAreacon_width)
                // let Fterms = this.$refs.Fterms;
                // Fterms.forEach((v)=>{
                //     console.log($(v)[0].clientWidth);
                //     $(v).width("")
                //     if($(v)[0].clientWidth>208){
                //         console.log($(v))
                //         // $(v)[0].children.innerHTML="..."
                //         $(v).css({"width":"100%","height":"24px","overflow":"hidden","white-space":"nowrap","text-overflow":"ellipsis",})
                //     }
                // })
            },
        },
        mounted(){
            Promise.all([this.$store.dispatch("get_hot_institution_distribution",{time:"week",country:'CN'})]).then(()=>{
                this.$nextTick(()=>{
                    this.drawBar();
                    let F_term_List = JSON.parse(sessionStorage.getItem('F_term_List'));
                    this.F_term_List = F_term_List;
                    let institutionArray = JSON.parse(sessionStorage.getItem('institutionArray'));
                    this.institutionArray = institutionArray;
                    setTimeout(()=>{
                        this.chef()
                    },10)
                    
                });                  
            })
        }
    } 
</script>