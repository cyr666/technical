<template>
    <div class = "innovationPie_con">
             
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
.innovationPie_con{
    float: right;
    box-sizing: border-box;
    overflow: hidden;
    width: 49%;
    background: #fff;
    .title{
        width: 100%;
        height: 50px;
        font-size: 14px;
        color: #7B8185;
        text-align: center;
        font-weight: bold;
        line-height: 50px;
        background:rgba(249,249,249,1);
        border:1px solid rgba(232,234,235,1);
    }
    .innovationPie_con{
        width: 100%;
        height: 366px;
        border: 1px solid #E8EAEB;
        border-top: none;
        #innovationPie{
            width: 100%;
            height: 366px;
            background: #fff;
            margin-bottom:20px;
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
            
        },
        data(){
            return{
                
            }
        },
        methods:{
            
        },
        watch:{
            
        },
        mounted(){
            
        }
    }
</script>