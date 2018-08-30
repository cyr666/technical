<template>
    <div class = "chainTop_con">
        <div class = "chainTop_head"></div>
        <div class = "head_main">
            <div class = "pie_con">
                <div id = "chainTop_pie"></div>
            </div>
            <div class = "top10_con">
                <nav>
                    <ul class = "top10_head">
                        <li>排名</li>
                        <li>企业名称</li>
                        <li>专利数量</li>
                    </ul>
                    <ul class = "top_main">
                        <li v-for="(item,index) in companyPieArray">
                            <span class = "num">{{index+1}}</span>
                            <span class = "comName" @click="checkInnovationDel(item.id)">{{item.name}}</span>
                            <span class = "applyNum1">{{item.paper_num}}</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.chainTop_con{
    box-sizing: border-box;
    overflow: hidden;
    .chainTop_head{
        height: 50px;
        background: #F9F9F9;     
        border:1px solid rgba(232,234,235,1);
    }
    .head_main{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        background: #fff;
        border:1px solid rgba(232,234,235,1);
        border-top: none;
        .pie_con{
            width: 60%;
            float: left;
            #chainTop_pie{
                width: 100%;
                height: 540px;
            }
        }
        .top10_con{
            box-sizing: border-box;
            padding-right: 5%;
            float: right;
            width: 40%;
            margin-top: 45px;
            nav{
                .top10_head{
                    overflow: hidden;
                    border-bottom:1px solid rgba(233,239,243,1); 
                    li{
                        float: left;
                        list-style: none;
                        font-size: 13px;
                        color: #7B8185;
                        line-height: 26px;
                    }
                    li:nth-child(2){
                        margin-left: 6%;
                    }
                    li:nth-child(3){
                        margin-left: 32%;
                    }
                }
                .top_main{
                    li{
                        list-style: none;
                        width: 100%;
                        height: 40px;
                        border-bottom: 1px solid rgba(233,239,243,1);
                        span{
                            display: inline-block;
                        }
                        .num{
                            width: 16px;
                            height: 16px;
                            margin-top: 12px;
                            background: #6DCEFF;
                            float: left;
                            font-size: 12px;
                            text-align: center;
                            color: #fff;
                            // line-height: 40px;
                        }
                        .comName{
                            float: left;
                            width: 39%;
                            line-height: 40px;
                            margin-left:9%;
                            font-size: 13px;
                            color: #39454E;
                            cursor: pointer;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                        }
                        .comName:hover{
                            color: #0080FF;
                        }
                        .applyNum1{
                            float: left;
                            font-size: 12px;
                            height: 12px;
                            line-height: 12px;
                            color: rgba(255,255,255,0.75);;
                            border-radius: 3px;
                            background: #008EFF;
                            margin:13px 0 0 8%;
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
        data(){
            return{
                height:[272,245,239,219,198,178,169,150,143,130],
                chainPieArray:[],
                children:[],
                companyPieArray:[],
                companyPieName:'',
            }
        },
        methods:{
            drawBar(){
                let that = this;
                let chart = this.$echarts.init(document.getElementById('chainTop_pie'));
                let option = {
                        color:['#05AAFF','#008EFF','#7152E5','#9C5BF4','#F96060','#FAA420','#FFD500','#78CD49'],
                        title : {
                            
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: (params)=>{
                                if(params.percent){
                                    let str = params.name + ':&nbsp;' + params.percent+'%';
                                    return str;
                                }                                
                            }
                        },
                        series: [
                            {
                                name:this.companyPieName,
                                type:'pie',
                                selectedMode: 'single',
                                radius: [0, '30%'],

                                label: {
                                    normal: {
                                        position: 'inner'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:this.chainPieArray,
                            },
                            {
                                name:this.companyPieName,
                                type:'pie',
                                radius: ['40%', '55%'],
                                label: {
                                    normal: {
                                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}}\n  园区企业数：{c}\n  占该产业链：{per|{d}%}',//
                                        backgroundColor: 'rgba(242,249,255,1)',
                                        borderColor: '#E9EFF3',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        // shadowBlur:3,
                                        // shadowOffsetX: 2,
                                        // shadowOffsetY: 2,
                                        // shadowColor: '#999',
                                        padding: [0, 7, 7,7],
                                        rich: {
                                            a: {
                                                color: '#828995',
                                                lineHeight: 22,
                                                align: 'center'
                                            },
                                            // abg: {
                                            //     backgroundColor: '#333',
                                            //     width: '100%',
                                            //     align: 'right',
                                            //     height: 22,
                                            //     borderRadius: [4, 4, 0, 0]
                                            // },
                                            hr: {
                                                borderColor: 'rgba(225,231,243,1)',
                                                width: '100%',
                                                borderWidth: 0.5,
                                                height: 0.1,
                                                // align: 'center'
                                            },
                                            b: {
                                                
                                                fontSize: 12,
                                                lineHeight: 22,
                                                align:'left',
                                                // marginLeft:'-50'
                                            },
                                            per: {
                                                color: '#FFF',
                                                backgroundColor: '#526370',
                                                padding: [2, 4],
                                                borderRadius: 2,
                                                align: 'left'
                                            }
                                        }
                                    }
                                },
                                data:this.children
                            }
                        ]
                    };
                    chart.on('click',(params)=>{
                        // chart.dispose()
                        chart = this.$echarts.init(document.getElementById('chainTop_pie'));
                        if(params.data.companyArray){
                            
                            params.data.selected = true;
                            console.log(params)
                            this.children = params.data.children;
                            sessionStorage.setItem('companyPieArray',JSON.stringify(params.data.companyArray))
                            let companyPieArray = JSON.parse(sessionStorage.getItem('companyPieArray'));
                            this.companyPieArray = companyPieArray;
                            sessionStorage.setItem('companyPieName',params.data.name)
                            let companyPieName = sessionStorage.getItem('companyPieName');
                            this.companyPieName = companyPieName;
                            this.drawBar();
                        }
                        
                        
                    })    
                   
                chart.setOption(option)
                         
            },
            setHeight1(){
                // let height = this.height;
                setTimeout(()=>{
                    let applyNums = Array.from($('.applyNum1'))
                    let max = $(applyNums[0])[0].innerHTML
                    
                    applyNums.forEach((val,ind)=>{
                        let del = $(val)[0].innerHTML;
                        $(val).css({'width':del/max*39+'%'})
                    })
                },100)
                
                
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
        },
        mounted(){
            window.scrollTo(0,0)
            Promise.all([this.$store.dispatch("getChainArray")]).then(()=>{
                this.$nextTick(()=>{
                    let chainPieArray = JSON.parse(sessionStorage.getItem('chainPieArray'));
                    // chainPieArray[0].selected=true;
                    // console.log(chainPieArray[0])
                    this.chainPieArray = chainPieArray;
                    sessionStorage.setItem('children',JSON.stringify(this.chainPieArray[0].children))
                    let children = JSON.parse(sessionStorage.getItem('children'))
                    this.children = children;
                    sessionStorage.setItem('companyPieArray',JSON.stringify(this.chainPieArray[0].companyArray))
                    let companyPieArray = JSON.parse(sessionStorage.getItem('companyPieArray'));
                    this.companyPieArray = companyPieArray;
                    sessionStorage.setItem('companyPieName',this.chainPieArray[0].name)
                    let companyPieName = sessionStorage.getItem('companyPieName');
                    this.companyPieName = companyPieName;
                    this.setHeight1();
                    this.drawBar();
                })                        
            })                
            
        }
    }
</script>