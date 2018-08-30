<template>
    <nav aria-label="Page navigation" style="text-align:center">
    <ul class="pagination">
        <li>
            <a href="javascript:;" @click="goPage(curPage==1?1:curPage-1)" aria-label="Previous" :class="{'noPoint':curPage==1}">
                <span aria-hidden="true"><i class="iconfont icon-jiantou"></i></span>
            </a>
        </li>
        <li v-for="page in showPageBtn" :class="{'active':page==curPage}">
            <a href="javascript:;" v-if="page" @click="goPage(page)">{{page}}</a>
            <a href="javascript:;" v-else>···</a>
        </li>
        <li>
            <a href="javascript:;" @click="goPage(curPage==pages?pages:curPage+1)" aria-label="Next" :class="{'noPoint':curPage==pages}">
                <span aria-hidden="true"><i class="iconfont icon-jiantou1"></i></span>
            </a>
        </li>
    </ul>
</nav>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .pagination{
        // margin:30px 0 40px 0;
        overflow: hidden;
        li{
            list-style: none;
            float: left;
        }
        a{
            margin-left:10px;
            border-radius: 2px;
            width:32px;            
            height:32px;
            text-align:center;
            // padding:0;
            line-height:34px;
            color:#8590A6;
            background:rgba(226,229,231,1) !important;
            float:left;
            text-decoration: none;
            &:hover{
                background-color:#fff !important;
            }
        }
    }
    .noPoint{
        color:#bbbbbb !important;
        background:#eeeeee !important;
        cursor:auto;
    }
    .active{
        a{
            // background-color:#00B8FC !important;
            background:rgba(0,142,255,1) !important;
            border:0;
            color:#ffffff;
            &:hover{
                background-color:#00B8FC !important;
            }
        }
    }

</style>

<script>
    import $ from 'jquery';
    import Vue from 'vue';
    import bus from '../store/bus';
    export default {
        data() {
            return {
                curPage:1
            };
        },

        props: {
            pages: {
                type: Number,
                default: 1
            }
        },
        components: {},
        computed: {
            showPageBtn() {
                let pageNum = this.pages;
                let index = this.curPage;
                let arr = [];
                if (pageNum <= 5) {
                    for (let i = 1; i <= pageNum; i++) {
                        arr.push(i)
                    }
                    return arr
                }
                if (index <= 2) return [1, 2, 3, 0, pageNum];
                if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum];
                if (index === 3) return [1, 2, 3, 4, 0, pageNum];
                if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
                return [1, 0, index - 1, index, index + 1, 0, pageNum];
            }
        },
        methods: {
            goPage(page) {
                if (page != this.curPage) {
                    this.curPage = page;
                    this.$emit('navpage', this.curPage);
                }else{
                    console.log('Already in the current page');
                }
            }
        },
        mounted() {
           bus.$on('firstPage',()=>{
               this.curPage = 1;
           })
        },
        watch: {
        }

    };
</script>
