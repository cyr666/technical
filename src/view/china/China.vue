<template>
    <div class = "china_con">
        <div class = "first_word">全国专利申请分布概览({{chinaDeadLine}})</div>
        <Top></Top>
        <div class = "first_word second_word">全国专利数据分析({{chinaDeadLine}})</div>
        <Map></Map>
        <div class = "first_word second_word">科研学术机构及产业界科研重点</div>
        <ChinaPie></ChinaPie>
        <div class = "first_word second_word">活跃科研学术机构及产业界科研重点</div>
        <Footer></Footer>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .china_con{
        box-sizing: border-box;
        padding: 30px 2%;
        .first_word{
            box-sizing: border-box;
            padding-left: 0.5%;
            margin-bottom: 17px;
            height:16px; 
            font-size:16px;
            font-weight: bold;
            color: #3c3c3c;
            border-left: 3px solid #008EFF;
            line-height: 16px;
        }
        .second_word{
            margin-top: 30px;
        }
    }
</style>

<script scoped>
    import Top from './Top'
    import Map from './Map'
    import ChinaPie from './ChinaPie'
    import Footer from './Footer'

    export default{
        name: 'HelloWorld',
        components: {
           Top,
           Map,
           ChinaPie,
           Footer
        },
        computed:{
            chinaDeadLine(){
                return this.$store.state.chinaModule.chinaDeadLine;
            }
        },
        data(){
            return{
            }
        }, 
        
        mounted(){
            window.scrollTo(0,0)
        }
  }
</script>