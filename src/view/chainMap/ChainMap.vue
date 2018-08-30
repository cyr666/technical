<template>
    <div class = "chainMap_con">
        <div class = "chainMap_first">
            <div class = "first_word">产业情况</div>
            <div class = "address">
                区域：<span class = "shi">中关村科技园区</span>
            </div>
        </div>        
        <ChainTop></ChainTop>
        <ChainSecond></ChainSecond>
        <ChainZhexian></ChainZhexian>
        <ChainBottom></ChainBottom>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
.chainMap_con{
    box-sizing: border-box;
    padding: 0 2% 40px 2%;
    overflow: hidden;
    .chainMap_first{
        overflow: hidden;
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
        .address{
            width: 20%;
            margin-top: 30px;
            font-size:13px;
            float: right;
            text-align: right;
            overflow: hidden;
            span{
                display: inline-block;
                font-size:13px;
                font-family:"微软雅黑";
                line-height: 13px;
            }
            .shi{
                padding: 6px 10px;
                font-size: 13px;
                border-radius: 100px;
                background: #526370;
                color: #fff;
            }
            
        }
    }
    
}
</style>

<script scoped>
    import ChainTop from './ChainTop' 
    import ChainSecond from './ChainSecond' 
    import ChainZhexian from './ChainZhexian'
    import ChainBottom from './ChainBottom'
    
    export default {
        name: 'HelloWorld',
        components: {
            ChainTop,
            ChainSecond,
            ChainZhexian,
            ChainBottom,
        },
    }
</script>