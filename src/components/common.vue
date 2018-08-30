<template>
  <div class="box">
      <div class = "header">
        <img src="../assets/img/Group@2x.png" alt="" class = "logoImg">
        <!-- <span class="first_span">计划</span> -->
        <span class = "second_span">提供最有价值的科技情报</span>
        <div class = "input_contain">
          <input type="text" v-model = "search" class = "box-input" id = "input" placeholder="关键词、技术、行业、院校、研究机构..." @keyup.enter="searchResult"/>
          <i class="input-icon" @click="searchResult"></i>
        </div>
        
        <div class = "logout" :class="{'only':onlyShow}" @click ="quite" @mouseover="slide" @mouseout="over">
          <img src="../assets/img/icon_退出@2x.png" alt="" v-if = "quit">
          <img src="../assets/img/icon_退出_pass@2x.png" alt="" v-else> 退出
        </div>
      </div>
      <Nav></Nav>
      <router-view class = "allRoute"></router-view>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
.box{
  .header{
    box-sizing: border-box;
    padding: 0 3%;
    width: 100%;
    height: 50px;
    background: #fff;
    // text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0px 1px 2px 0px #e8eaeb;
    .logoImg{
      margin-left:5px;
      margin-top: 10px;
      float: left;
      width: 95px;
      height: 34px;
    }
    .second_span{
      float: left;
    }
    .second_span{
      box-sizing: border-box;
      padding-left: 10px;
      border-left: 1px solid #eee;
      width: 150px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      color: #5C6373;
      margin-top: 19px;
      margin-left: 3.7%;
    }
    .input_contain{
      float: left;
      width: 40%;
      margin-left: 10%;
      position: relative;
      .box-input{
        box-sizing: border-box;
        padding-left: 1%;
        width: 100%;
        height: 28px;
        color: #222d36;
        border-radius: 20px;
        border: 1px solid #E1E7EC;
        margin-top: 10px;        
        outline: none;
      }
      ::-webkit-input-placeholder {
          color:rgba(167,175,182,1);
      }
      .input-icon{
          width:15px;
          height:14px;
          background:url(../assets/img/search@2x.png) no-repeat;
          background-size:15px 14px;
          position:absolute;
          top:17px;
          right:15px;
          cursor:pointer;
      }
    }
    
    .logout{
      float: right;
      font-size: 13px;
      color: #9DA9B2;
      margin-top: 15px;
      cursor: pointer;
      img{
        width: 14px;
        height: 14px;
        margin-top: -3px;
        vertical-align: middle;
      }
    }
    .only{
      color: #008EFF;
    }
  }
  .allRoute{
    margin-left: 14%;
    margin-top: 50px;
    width: 86%;
  }
}
</style>
<script> 
  import bus from '../store/bus.js'; 
  import Nav from "./nav.vue"
  export default {
    name: 'HelloWorld',
    components: {
      Nav,
  },
    data(){
      return{
        quit:true,
        onlyShow: false,
        search:""
      }
    },
    methods:{
      quite(){
        this.$router.push(`/`);
      },
      slide(){
        this.quit = false;
        this.onlyShow = true;
      },
      over(){
        this.quit = true;
        this.onlyShow = false;
      },
      searchResult(){
        if(this.search){
          sessionStorage.setItem('searchVal',this.search);
          if(this.$route.name=='searchInstitution'){
             this.$store.dispatch('getInstitutionByFilter',{query:this.search})
            console.log(123)
          }else{
            this.$router.push(`/technical/searchResult`);
            this.$store.dispatch('getInstitutionByFilter',{query:this.search})
          }
            bus.$emit("changeClickNum")
        }else{
          alert("请输入您要查找的内容")
        }        
      }
    },
    mounted(){
      // this.test()
    }
}
</script>