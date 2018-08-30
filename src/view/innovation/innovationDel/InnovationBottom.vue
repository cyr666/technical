<template>
    <div class = "related_com">
        <div class = "searchList">
                <div class = "tableHead">
                    <span class = "Head1">企业</span>
                    <span class = "Head2">行业</span>
                    <span class = "Head3">关键技术</span>
                </div>
                <table>
                    <tr v-for="item in companyDelArray">
                        <td>
                            <img :src="item.logo" alt="" class = "comLogo" v-if="item.logo">
                            <img src="../../../assets/img/no_logo.png" alt="" class = "comLogo" v-else>
                        </td>
                        <td>
                            <dl>
                                {{item.name}}
                            </dl>
                            <dt>
                                {{item.introduction}}
                            </dt>
                        </td>
                        <td>
                            {{item.industry}}
                        </td>
                        <td>
                            <span v-for="obj in item.keyword">{{obj}}<em></em></span>
                        </td>
                        <td align="right">
                            <span @click="checkInnovationDel(item.id)">查看</span>
                        </td>
                    </tr>
                </table>
          </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.related_com{
    background: #fff;
    overflow: hidden;
    .searchList{
        box-sizing: border-box;
        margin-top: 5px;
        background: #fff;
        // box-shadow: 1px 0px 1px 0px rgba(232,234,235,1);
        .tableHead{
            width: 100%;
            height: 48px;
            box-sizing: border-box;
            padding-left: 4.4%;
            border-bottom: 1px solid #EAEDF1;
            .Head1,.Head2,.Head3{
                float: left;
                font-size: 13px;
                color: #7B8185;
                line-height: 48px;
            }
            .Head1{
                margin-left: 5%;
            }
            .Head2{
                margin-left: 31%;
            }
            .Head3{
                margin-left: 12%;
            }
        } 
        table{
            box-sizing: border-box;
            padding: 0 2%;
            border-bottom: 1px solid #EAEDF1;
            border-collapse: collapse;
            tr{
                width: 100%;
                height: 116px;
                border-bottom: 1px solid #EAEDF1;
                td{
                    .comLogo{
                        width:58px;
                        height: 58px;
                        border: 1px solid #eaedf1;
                        border-radius: 8px;
                    }
                }
                td:first-child{
                    width: 9%;
                    padding-left: 2%;
                }
                td:nth-child(2){
                    width: 32%;
                    dl{
                        font-size:16px;
                        font-family:"微软雅黑";
                        color:rgba(34,45,54,1);
                        line-height:24px;
                        font-weight: bold;
                    }
                    dt{
                        width: 80%;
                        margin-top: 5px;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    
                    
                }
                td:nth-child(3){
                    width:8%;
                    font-size:13px;
                    font-family:"微软雅黑";
                    color:rgba(57,69,78,1);
                    line-height:20px;
                }
                td:nth-child(4){
                    width:40%;
                    padding-left: 6%;
                    font-size:13px;
                    font-family:"微软雅黑";
                    color:rgba(57,69,78,1);
                    line-height:20px;
                    span{
                        box-sizing: border-box;
                        display: inline-block;
                        position: relative;
                        padding-right: 6px;
                        margin-right: 6px;
                        font-size: 13px;
                        color: #39454E;
                        em{
                        position: absolute;
                        display: inline-block;
                        width: 3px;
                        height: 3px;
                        border-radius: 1.5px;
                        background:rgba(49,60,69,1);
                        top:45%;
                        right: -2%;
                        }
                    }
                    span:last-child{
                        em{
                            background: #fff;
                        }
                    }
                }
                td:nth-child(5){
                    width: 12%;
                    padding-right: 2%;
                    span{
                        width: 30%;
                        display: inline-block;
                        padding: 6px 20%;
                        border:1px solid rgba(0,142,255,0.7);
                        border-radius: 2px;
                        font-size: 12px;
                        color: #008EFF;
                        cursor: pointer;
                        text-align: center;
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
            companyDelArrayInno(){
                return this.$store.state.innovationModule.companyDelArray
            }
        },
        data(){
            return{
                companyDelArray:[],
            }
        },
        methods:{
            checkInnovationDel(id){
                window.scrollTo(0,0)
                sessionStorage.setItem('companyDel',id);
                let companyDel = sessionStorage.getItem('companyDel')
                // this.$router.push(`/technical/InnovationDel`);
                Promise.all([this.$store.dispatch("getCompanyDetail",{id:companyDel})]).then(()=>{
                    this.$nextTick(()=>{
                        
                    })                        
                })  
                Promise.all([this.$store.dispatch("getCompanyDetail_patent",{id:companyDel,type:'application'})]).then(()=>{
                    this.$nextTick(()=>{
                        
                    })                        
                })   
            }
        },
        watch:{
            companyDelArrayInno(newVal,old){
                let companyDelArray = JSON.parse(sessionStorage.getItem('companyDelArray'));
                this.companyDelArray=companyDelArray;
            }
        },
        mounted(){
            setTimeout(()=>{
                let companyDelArray = JSON.parse(sessionStorage.getItem('companyDelArray'));
                this.companyDelArray=companyDelArray;
            },80)
        }
    }
</script>