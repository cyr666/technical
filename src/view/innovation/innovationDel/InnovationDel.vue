<template>
    <div class = "innoDel_con">
        <Top></Top>
        <div class = "innoDel_main">
            <div class = "tecnolagy"> 
                <InnovationBar></InnovationBar>
                <InnovationPie></InnovationPie>
            </div>
            <InnovationSpecial></InnovationSpecial>
            <div class = "first_word">相关企业</div>
            <InnovationBottom></InnovationBottom>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
.innoDel_con{
    .innoDel_main{
        box-sizing: border-box;
        padding: 0 2% 40px 2%;
        overflow: hidden;
        .first_word{
            clear: both;
            width:100%;
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
        .tecnolagy{
            overflow: hidden;
            margin: 22px 0 30px 0;
        }
    }
}
</style>

<script>
    import Top from './innoDelTop' 
    import InnovationBar from './InnovationBar'
    import InnovationPie from './InnovationPie'
    import InnovationSpecial from './InnovationSpecial'
    import InnovationBottom from './InnovationBottom'
    
    
    export default {
        name: 'HelloWorld',
        components: {
            Top,
            InnovationBar,
            InnovationPie,
            InnovationSpecial,
            InnovationBottom
        },
        mounted(){
            window.scrollTo(0,0)
        }
    }
</script>