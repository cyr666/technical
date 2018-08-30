<template>
    <div class = "global_con">
       <div class = "first_word">科技创新活跃度对比分析</div>
       <Bar></Bar>
       <div class = "middle_con">
           <div class = "left_con">
               <div class = "first_word">科研产出类别分布</div>
               <Callery></Callery>
           </div>
           <div class = "right_con">
               <div class = "first_word">科研重心分布</div>
               <Pie></Pie>
           </div>
       </div>
        <div class = "middle2_con">
            <div class = "first_word">科研学术机构及产业界科研重点</div>
            <Tree></Tree>
        </div>
        <div class = "bottom_con">
            <div class = "first_word">活跃科研学术机构及产业界科研重点</div>
            <Bottom></Bottom>
        </div>
    </div> 
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .global_con{
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
        .middle_con{
            width: 100%;
            overflow: hidden;
            margin-top: 30px;
            .first_word{
                box-sizing: border-box;
                padding-left: 1%;
            }
            .left_con{
                float: left;
                width: 49%;                
            }
            .right_con{
                float: right;
                width: 49%;
            }
        }
        .middle2_con{
            width: 100%;
            overflow: hidden;
            margin-top: 30px;
        }
        .bottom_con{
            .first_word{
                margin-top: 30px;
            }
        }
    }
</style>

<script scoped>
  import Bar from './Bar';
  import Callery from './Callery'
  import Pie from './Pie'
  import Tree from './Tree'
  import Bottom from './Bottom'
  
  export default{
        name: 'HelloWorld',
        components: {
            Bar,
            Callery,
            Pie,
            Tree,
            Bottom
        },
        mounted(){
            window.scrollTo(0,0)
        } 
  }
</script>