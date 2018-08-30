<template>
    <div class = "innovationBar_con">
        <div class = "tabNav">
            <li class = "tab onlyStyle" @click="jump(1)">
                <span>产业布局</span>
            </li>
            <li class = "tab" @click="jump(2)">
                <span>技术布局</span>
            </li>
            <li class = "tab" @click="jump(3)">
                <span>创新团队</span>
            </li>
            <li class = "tab" @click="jump(4)">
                <span>专利分析</span>
            </li>
        </div>
        <div class = "tab_con">
            <div id = "li1">chanye</div>
            <div id = "li2">jishu</div>
            <div id = "li3">chuangxin</div>
            <div id = "li4">zhuanli</div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
.innovationBar_con{
    position: relative;
    float: left;
    box-sizing: border-box;
    width: 60%;
    background: rgba(242,249,255,1);
    border: 1px solid rgba(232,234,235,1); 
    .tabNav{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        background: rgba(249,249,249,1);
        border-bottom: 1px solid rgba(232,234,235,1);
        li{
            float: left;
            width: 116px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-right: 1px solid rgba(232,234,235,1); 
            list-style: none;
            color: #39454E;
            cursor: pointer;
            
        }
        .onlyStyle{
            background: #fff;
            color: #008EFF;
        }
    }
    .tab_con{
        #li1,#li2,#li3,#li4{
            height: 200px;
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
            handleScrollJump(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop>344){
                    $('.tabNav').css({'position':'fixed','top':'50px','z-index':'9','width':'49.5%','margin-left':'15.65%','border':'1px solid rgba(232,234,235,1)'})
                }else{
                    $('.tabNav').css({'position':'static','margin-left':'0','width':'100%','border':'none','border-bottom':'1px solid rgba(232,234,235,1)'})
                }
            },
            jump(id){
               $('html,body').animate({scrollTop:$('#li'+id).offset().top-150}, 800); 
               const lis = Array.from($(".tab"));
               lis.forEach((val,ind)=>{
                   $(val).removeClass("onlyStyle");
               })
               $(lis[id-1]).addClass("onlyStyle")
            }
        },
        watch:{
            
        },
        mounted(){
            window.addEventListener('scroll', this.handleScrollJump)
            
        }
    }
</script>