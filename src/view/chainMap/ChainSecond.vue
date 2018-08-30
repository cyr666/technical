<template>
    <div class = "chainSecond_con">
        <div class = "second_con">
            <div class = "first_word">各产业链技术创新分析</div>
            <select v-model="select1" @change="change()" class = "selectMobel">
                <option v-for="item in chainArray" :value="item">{{item.name}}</option>
            </select>
        </div>
        <div class = "second_main">
            <div class = "chainTop_head">{{tableHeadName}}产业发展态势</div>
            <div class = "chain_bottom">
                <div class = "pie_con">
                    <div id = "chainTop_bar"></div>
                </div>
                <div class = "top_con">
                    <div class = "headCon">
                        <img src = "../../assets/img/国内-相关企业@2x.png" class = "hotIcon"/>
                        <span class = "hot_word">全国该产业龙头企业</span>
                    </div> 
                    <div class = "top_item"  v-for ="(item,index) in chainCompanyArray" @click="changeChain(item.id,index)">
                        <span class = "top_num">{{index+1}}</span>
                        <span class = "top_name" @click="checkInnovationDel(item.id)"><span class="top_nameitem">{{item.name}}</span></span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.chainSecond_con{
    .second_con{
        width: 100%;
        overflow: hidden;
        background:#f3f4f6;
        height: 60px;
        .first_word{
            float: left;
            box-sizing: border-box;
            padding-left: 0.5%;
            margin-top: 30px;
            margin-bottom: 17px;
            height:16px; 
            font-size:16px;
            font-weight: bold;
            color: #3c3c3c;
            border-left: 3px solid #008EFF;
            line-height: 16px;
        }
        .selectMobel{
            float: right;
            width:178px;
            height:28px; 
            background:rgba(255,255,255,1);
            border-radius: 2px ;
            border:1px solid #008EFF; 
            margin-top: 20px;
            // z-index:9;
            // margin-left: 56%;
            color:#008EFF;
        }
    }
    .second_main{
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        .chainTop_head{
            height: 50px;
            background: #F9F9F9;
            border:1px solid rgba(232,234,235,1);
            font-size: 14px;
            line-height: 50px;
            text-align: center;
            font-weight: bold;
            color: #7B8185;
        }
        .chain_bottom{
            width: 100%;
            overflow: hidden;
            background: #fff;
            box-sizing: border-box;
            padding: 40px 2% 10px 2%; 
            border:1px solid rgba(232,234,235,1);
            border-top: none;
            .pie_con{
                float: left;
                width: 56%;
                height:450px; 
                margin-left: 5%;
                #chainTop_bar{
                    width: 100%;
                    height: 450px;
                    margin-top: 0px;
                    
                }               
            }
            .top_con{
                float: left;
                width: 30%;
                margin-left: 3.5%;
                // height: 434px;
                background:rgba(242,249,255,1);
                border-radius: 4px ; 
                border: 1px solid #E8EAEB;
                box-sizing: border-box;
                padding:20px 2% 10px 2%;
                .headCon{
                    margin-bottom: 18px;                    
                    .hotIcon{
                        width: 14px;
                        height: 14px;
                        vertical-align: middle;
                        // margin-bottom: 21px;
                    }
                    .hot_word{
                        font-size: 14px;
                        color: #39454E;
                        font-weight: bold;
                    }
                }
                .top_item{ 
                    box-sizing: border-box;                   
                    height: 36px;
                    border-left: 3px solid rgba(242,249,255,1);
                    cursor: pointer;
                    .top_num{
                        display: inline-block;
                        float: left;
                        margin-top: 9px;
                        width: 16px;
                        height: 16px;
                        font-size: 12px;
                        color: #fff;
                        text-align: center;
                        line-height: 16px;
                        background: #6DCEFF;
                    }
                    .top_name{
                        box-sizing: border-box;
                        display: inline-block;
                        float: left;
                        margin-left: 3%;
                        font-size: 13px;
                        color: #39454E;
                        line-height: 35px;
                        width: 80%;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        cursor: pointer;
                        
                        .top_nameitem{

                        }
                        .top_nameitem:hover{
                            color: #008EFF;
                            border-bottom: 1px solid #008EFF;
                        }
                    }
                    
                }
                .top_item:nth-child(2) .top_num{
                    background: #F96060;
                }
                .top_item:nth-child(3) .top_num{
                    background: #FAA420;
                }
                .top_item:nth-child(4) .top_num{
                    background: #FFD500;
                }
                .top_only{
                    border-left: 3px solid #F96060;
                    background: #fff;
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
            chainNAME(){
                return this.$store.state.ChainModule.chainNAME
            }
        },
        data(){
            return{
                select1:{id:1,name:'新能源汽车'},
                institutionArray:[],
                chainArray:[],
                chinaChainArray:[],
                chinaYear:[],
                chinaValue:[],
                parkValue:[],
                chainCompanyArray:[],
                tableHeadName:'新能源汽车产业',
            }
        },
        methods:{
            drawBar(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('chainTop_bar'));
                let option = {
                        color:['#008EFF','#7158E2'],
                        title : {
                            
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['全国','本园区'],
                            x: 'left',
                            itemWidth:12,
                            itemHeight:12,
                            icon: "circle",
                        },
                        toolbox: {
                            show : false,                            
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                data : this.chinaYear,
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
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
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
                            }
                        ],
                        series : [
                            {
                                name:'全国',
                                type:'bar',
                                data:this.chinaValue,
                                
                            },
                            {
                                name:'本园区',
                                type:'bar',
                                data:this.parkValue,
                                
                            }
                        ]
                    };

                   
                chart.setOption(option,true)          
            },
            change(){
               this.start(this.select1) 
            },
            changeChain(id,index){
                // this.top = index;
                sessionStorage.setItem('comid',id);
                let comid = sessionStorage.getItem('comid');
                let contury = sessionStorage.getItem('contury2');
                let time = sessionStorage.getItem('time4');
                // Promise.all([this.$store.dispatch("get_hot_institution_distribution",{time:time,country:contury,id:comid})]).then(()=>{
                //     this.$nextTick(()=>{
                //         this.drawBar();
                //         let F_term_List = JSON.parse(sessionStorage.getItem('F_term_List'));
                //         this.F_term_List = F_term_List;
                //         let institutionArray = JSON.parse(sessionStorage.getItem('institutionArray'));
                //         this.institutionArray = institutionArray;
                //     })                        
                // }) 
            },
            start(item){
                this.$store.state.ChainModule.chainID = item.id;
                this.$store.state.ChainModule.chainNAME = item.name;
                this.$store.commit('handleGetInsOrsol',item)
                sessionStorage.setItem('chainID',item.id);
                sessionStorage.setItem('chainNAME',item.name);
                let chainid = sessionStorage.getItem('chainID')
                Promise.all([this.$store.dispatch("getChainAnalysis",{id:chainid})]).then(()=>{
                    this.$nextTick(()=>{
                        let chinaChainArray = JSON.parse(sessionStorage.getItem('chinaChainArray'))
                        this.chinaChainArray = chinaChainArray;
                        let parkChainArray = JSON.parse(sessionStorage.getItem('parkChainArray'))
                        this.parkChainArray = parkChainArray;
                        let chinaYear = [];
                        let chinaValue = [];
                        let parkValue = [];
                        this.chinaChainArray.forEach((val,ind)=>{
                            chinaYear.push(val.year);
                            chinaValue.push(val.value)
                        })
                        this.chinaYear = chinaYear;
                        this.chinaValue = chinaValue
                        this.parkChainArray.forEach((val,ind)=>{
                            parkValue.push(val.value)
                        })
                        this.parkValue = parkValue
                        let chainCompanyArray = JSON.parse(sessionStorage.getItem('chainCompanyArray'))
                        this.chainCompanyArray = chainCompanyArray;
                        this.drawBar();
                    })                        
                })
            },
            checkInnovationDel(id){
                sessionStorage.setItem('companyDel',id);
                let companyDel = sessionStorage.getItem('companyDel')
                this.$router.push(`/technical/InnovationDel`);
                Promise.all([this.$store.dispatch("getCompanyDetail",{id:companyDel})]).then(()=>{
                    this.$nextTick(()=>{
                        
                    })                        
                })  
                Promise.all([this.$store.dispatch("getCompanyDetail_patent",{id:companyDel,type:'application'})]).then(()=>{
                    this.$nextTick(()=>{
                        
                    })                        
                })              
                // this.$store.dispatch('getInstitutionDetailAndScholar',{institution_id:id})         
            },
            handleScroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop>550){
                    $('.second_con').css({'position':'fixed','top':'50px','z-index':'9'})
                    $('.selectMobel').css({'float':'left','margin-left':'56%'})
                }else{
                    $('.second_con').css({'position':'relative','top':'','z-index':''})
                    $('.selectMobel').css({'float':'right','margin-left':'0%'})
                }
            },
        },
        watch:{
            chainNAME(newVal,old){
                this.tableHeadName = newVal
            }
        },
        mounted(){
            Promise.all([this.$store.dispatch("getChanyelian")]).then(()=>{
                this.$nextTick(()=>{
                   let chainArray = JSON.parse(sessionStorage.getItem('chainArray').replace(/产业链/g,''));
                    // let chainArray = JSON.parse(sessionStorage.getItem('chainArray'))
                    this.chainArray = chainArray;
                    sessionStorage.setItem('firstAJAX',JSON.stringify(this.chainArray[0]))
                    let item = JSON.parse(sessionStorage.getItem('firstAJAX'))
                    this.start(item);
                })                        
            })
             window.addEventListener('scroll', this.handleScroll)
            
        }
    }
</script>