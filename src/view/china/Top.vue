<template>
    <div class = "top_con">
        <div class = "topItem" v-for="(item,index) in ipcArray" :key = "item.id">
            <div class = "item_top" >
                <div class = "item_first">
                    <img :src ="require(`../../assets/img/${item.img}.png`)" class = "itemIcon"/>
                    <span class = "item_keyword">{{item.name}}</span>
                </div>
                <div class = "itemNum">{{item.count}}</div>
                <!-- <div class = "item_third">
                    <img src = "../../assets/img/color-03-增加@2x.png" class = "thirdIcon" v-if="item.type=='+'"/>
                    <img src = "../../assets/img/color-02-减少@2x.png" class = "thirdIcon" v-else/>
                    比上周<span v-if="item.type=='+'">增加</span><span v-else>减少</span><span>{{item.change}}</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .top_con{
        width: 100%;
        box-sizing: border-box;
        border:1px solid rgba(232,234,235,1);
        padding: 60px 0 20px 0;
        background: #fff; 
        overflow: hidden;
        .topItem{
            float: left;
            width: 25%;
            text-align: center;
            margin-bottom: 40px;
            .item_first{
                .itemIcon{
                    width: 15px;
                    height: 15px;
                    vertical-align: middle;
                    margin-top: -3px;
                } 
                .item_keyword{
                    display: inline-block;
                    font-size: 13px;
                    color: #39454E;
                }   
            } 
            .itemNum{
                box-sizing: border-box;
                padding: 10px 0;
                font-size: 36px;
                font-family: Arial, Helvetica, sans-serif;
                color: #008EFF;
                border-right: 2px solid #EAEDF1;
                margin-left: 3%;
            }   
            .item_third{
                font-size: 12px;
                color: #828995;
                .thirdIcon{
                    width: 7px;
                    height: 13px;
                    vertical-align: middle;
                    margin-top: -3px;
                    margin-left: 3%;
                }
            }              
        }
        .topItem:nth-child(4) .itemNum,.topItem:nth-child(8) .itemNum{
            border: none;
        }
        .topItem:nth-child(2) .itemNum{
            color: #78CD49;
        }
        .topItem:nth-child(3) .itemNum{
            color: #F96060;
        }
        .topItem:nth-child(4) .itemNum{
            color: #05AAFF;
        }
        .topItem:nth-child(5) .itemNum{
            color: #7152E5;
        }
        .topItem:nth-child(6) .itemNum{
            color: #FAA420;
        }
        .topItem:nth-child(7) .itemNum{
            color: #9C5BF4;
        }
        .topItem:nth-child(8) .itemNum{
            color: #FFD400;
        }
    }
</style>

<script scoped>
    export default{
        name: 'HelloWorld',
        components: {
           
        }, 
        computed:{
            ipcArray(){
                return this.$store.state.chinaModule.ipcArray;
            }
        },
        data(){
            return{
                type:"正",
            }
        }
   }
</script>