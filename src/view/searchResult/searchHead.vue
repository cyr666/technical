<template>
    <div class = "result_con">
        <div class = "relatedWord_con" v-if="relatedWordList.length>0">
            <p>相关领域</p>
            <div class = "relatedWord_item">
                <span v-for="item in relatedWordList">{{item}}</span>
            </div>
        </div>
        <div class = "clickWord_con">
            <span @click="changeRoute(1)" :class = "clickNum==1?'action':''">研究机构<em>({{queryStatics.institution_num}})</em></span>
            <span @click="changeRoute(2)" :class = "clickNum==2?'action':''">专家<em>({{queryStatics.scholar_num}})</em></span>
            <span @click="changeRoute(3)" :class = "clickNum==3?'action':''">成果<em>({{parseInt(queryStatics.achievement_num)+parseInt(queryStatics.patent_num)}})</em></span>
        </div> 
        <router-view></router-view>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
.result_con{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    .relatedWord_con{
        box-sizing: border-box;
        width: 100%;
        padding: 30px 2%;
        background: #fff;
        box-shadow: 0px 1px 2px 0px rgba(232,234,235,1) inset;
        p{
            font-size: 13px;
            line-height: 13px;
            color: #222D36;
            font-weight: bold;
            padding-left:0.5%;
            border-left: 3px solid #008EFF
        }
        .relatedWord_item{
            width: 100%;
            margin-top: 12px;
            span{
                display: inline-block;
                padding: 4px 12px;
                font-size: 13px;
                background:rgba(0,142,255,0.12);
                border-radius: 2px;
                color: #008EFF;  
                margin-right: 1%;
                cursor: pointer;
            }
        }
    }
    .clickWord_con{
        box-sizing: border-box;
        width: 100%;
        margin: 20px 0;
        padding: 0 2%;
        span{
            display: inline-block;
            padding: 8px 1.5%;
            margin-right: 1%;
            font-size: 13px;
            border-radius: 2px;
            cursor: pointer;
            em{
                color: #9DA9B2;
            }
        }
        .action{
            background: #526370;
            color: #fff;
        }
    }
}
    
</style>

<script>
    import qs from 'qs';
    import bus from '../../store/bus.js';
    import navigation from '../../components/pagination.vue'; 
    import axios from 'axios'; 
    export default {
        name: 'HelloWorld',
        components: {
            navigation,
        },
        computed:{
            queryStatics(){
                return this.$store.state.searchInsModule.queryStatics
            }
        },
        data(){
            return{
                relatedWordList:[],
                clickWord:["研究机构","专家","成果"],
                clickNum: sessionStorage.getItem('clickNum'),
            }
        },
        methods:{
            changeRoute(index){
                sessionStorage.setItem('clickNum',index)
                this.clickNum = sessionStorage.getItem('clickNum');
                if(index == 1){
                    this.$router.push(`/technical/searchResult/searchInstitution`)
                }
                if(index == 2){
                    this.$router.push('/technical/searchResult/searchSpecial')
                }
                if(index == 3){
                    this.$router.push('/technical/searchResult/searchAchievement');
                    bus.$emit("classWord")
                }
            },
            getRelatedWord(){
                axios.get(this.biz.serverUrl+"/piionee/transfer/es/getRelatedWord").then((res)=>{
                    if(res.status == 200){
                        this.relatedWordList = res.data.relatedWordList
                    }                
                })
            }
        },
        mounted(){
            window.scrollTo(0,0)
            this.getRelatedWord();
            bus.$on("changeClickNum",()=>{
                sessionStorage.setItem('clickNum',1);
                this.clickNum = sessionStorage.getItem('clickNum')
            })
            sessionStorage.setItem('clickNum',1);
            this.clickNum = sessionStorage.getItem('clickNum')
        }
    }
</script>