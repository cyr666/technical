<template>
  <div class="navBox">
      <nav>
        <div class = "firstModel_con">
            <li class = "firstModel_title">科技大数据&nbsp;&nbsp;&nbsp;&nbsp;<span>—————</span></li>
            <li  :class = "current == 5?'action':''" @click="goRouter(5)">
                <img src="../assets/img/nav_icon_全球_pass@2x.png" alt="" v-if="current == 5">
                <img src="../assets/img/nav_icon_全球@2x.png" alt="" v-else> 全球科技
            </li>
            <li  :class = "current == 6?'action':''" @click="goRouter(6)">
                <img src="../assets/img/nav_icon_国内_pass@2x.png" alt="" v-if="current == 6">
                <img src="../assets/img/nav_icon_国内@2x.png" alt="" v-else> 国内科技
            </li>
            <li :class = "current == 4?'action':''" @click="goRouter(4)">
                <img src="../assets/img/nav_icon_科技分析_pass@2x.png" style="width:15px;height:16px" alt="" v-if="current == 4">
                <img src="../assets/img/nav_icon_科技分析@2x.png" alt="" v-else> 科技内参
            </li>
        </div>
        <div class = "firstModel_con">
            <li class = "firstModel_title">产业技术&nbsp;&nbsp;&nbsp;&nbsp;<span>————</span></li>
            <li :class = "current == 7?'action':''" @click="goRouter(7)">
                <img src="../assets/img/nav_icon_产业地图_pass@2x.png" style="width:15px;height:16px" alt="" v-if="current == 7">
                <img src="../assets/img/nav_icon_产业地图@2x.png" alt="" v-else> 产业地图
            </li>
            <li :class = "current == 8?'action':''" @click="goRouter(8)">
                <img src="../assets/img/nav_icon_创新主体_pass@2x.png" style="width:15px;height:16px" alt="" v-if="current == 8">
                <img src="../assets/img/nav_icon_创新主体@2x.png" alt="" v-else> 创新主体
            </li>
            <li :class = "current == 9?'action':''" @click="goRouter(9)">
                <img src="../assets/img/nav_icon_科技动态_pass@2x.png" style="width:15px;height:16px" alt="" v-if="current == 9">
                <img src="../assets/img/nav_icon_科技动态@2x.png" alt="" v-else> 产业动态
            </li>
        </div>
        <div class = "firstModel_con">
            <li class = "firstModel_title">科研资源&nbsp;&nbsp;&nbsp;&nbsp;<span>————</span></li>
            <li :class = "current == 1?'action':''" @click="goRouter(1)"> 
                <img src="../assets/img/nav_icon_发现_pass@2x.png" style="width:16px;height:16px" alt="" v-if="current == 1">
                <img src="../assets/img/nav_icon_发现@2x.png" alt="" v-else> 发现
            </li>
            <li :class = "current == 2?'action':''" @click="goRouter(2)">
                <img src="../assets/img/nav_icon_科研机构_pass@2x.png"  style="width:16px;height:16px" alt="" v-if="current == 2">
                <img src="../assets/img/nav_icon_科研机构@2x.png" alt="" v-else> 科研机构
            </li>
            <li :class = "current == 3?'action':''" @click="goRouter(3)">
                <img src="../assets/img/nav_icon_专家_pass@2x.png" style="width:16px;height:16px" alt="" v-if="current == 3">
                <img src="../assets/img/nav_icon_专家@2x.png" alt="" v-else> 科研人才
            </li>
        </div>
        <footer>
            <div class = "phone_word">客服电话</div>
            <div class = "phone_num">010-88450901</div>
            <div class = "line"></div>
            <div class = "footerlogo_con">
                <img src="../assets/img/foot_logo@2x.png" alt="" class = "footerImg">
                <span @click="returnOffice">返回青核桃</span>
            </div>
        </footer>
      </nav>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
.navBox{
    position: relative;
    // overflow-y: auto;
    padding: 25px 0 0 0;;
    box-sizing: border-box;
    position:fixed;
    width: 14%;
    height: 100%;
    top:50px;
    left:0;
    background: #333742;
  nav{
    width: 100%;
    height: 100%;
    .firstModel_con{
        margin-bottom: 20px;
        .firstModel_title{
            width:100%;
            height: 24px;
            list-style: none;
            font-size: 12px;
            line-height: 24px;
            color: #5D6870;
            span{
                color: #3F454F;
            }
        }
        li{
            box-sizing: border-box;
            width: 100%;
            height: 35px;
            padding: 0 10%;
            list-style: none;
            font-size: 14px;
            line-height: 35px;
            color: #98A4AD;
            border-left: 3px solid #333742;
            cursor: pointer;
            span{
                display: inline-block;
            }
            img{
                width:15px;
                height: 16px;
                margin-top: -2px;
                margin-right: 5%;
                vertical-align: middle;
            }
        }
        .action{
            color: #fff;
            border-left: 3px solid #008EFF;
            background: #24272E;
        }
    }
    footer{
        position: fixed;
        bottom: 20px;
        left: -8%;
        box-sizing: border-box;
        width: 30%;
        height: 30px;
        padding: 0 10%;
        // margin: 75px 0 0 2%;
        // border-bottom: 1px solid #59636B;
        .phone_word,.phone_num{
            height: 18px;
            font-size: 12px;
            color: #59636B;
        }
        .line{
            width: 100%;
            margin: 5px 0;
            border-bottom: 1px solid #59636B;
        }
        .footerlogo_con{
            margin-top:8px;
            .footerImg{
                float: left;
                width: 29px;
                height: 17px;
                margin-right: 6%;
            }
            span{
                float: left;
                font-size: 12px;
                color: #59636B;
                cursor: pointer;
            }
        }
    } 
  }
}
</style>
<script>
  export default {
    name: 'HelloWorld',
    components: {
  },
    data(){
      return{
          current: sessionStorage.getItem('current')
      }
    },
    methods:{
        goRouter(index){
            sessionStorage.setItem('current',index)
            this.current = sessionStorage.getItem('current');
            if(index == 1){
                this.$router.push(`/technical/find`)
            }
            if(index == 2){
                this.$router.push(`/technical/institution`)
            }
            if(index == 3){
                this.$router.push(`/technical/special`)
            }
            if(index == 4){
                this.$router.push(`/technical/reference`)
            }
            if(index == 5){
                this.$router.push(`/technical/global`)
            }
            if(index == 6){
                this.$router.push(`/technical/china`)
            }
            if(index == 7){
                this.$router.push(`/technical/ChainMap`)
            }
            if(index == 8){
                this.$router.push(`/technical/innovation`)
            }
            if(index == 9){
                this.$router.push(`/technical/dynamic`)
            }
        },
        returnOffice(){

        }
    },
    watch:{
        current(newValue,old){
            // console.log(newValue)
        }
    },
    mounted(){
        if(sessionStorage.getItem('current')){
            this.current = sessionStorage.getItem('current');
        }else{
            sessionStorage.setItem('current',5);
            this.current = 5;
        }        
    }
}
</script>