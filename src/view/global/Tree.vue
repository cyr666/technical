<template>
    <div class = "Bar_con">
        <div class = "BarHead">
            <!-- <div class = "tabButtn">
                <span class = "apply" :class="{'onlyStyle':action}" @click = "changeTab('研究机构')">研究机构</span><span class = "get"  :class="{'onlyStyle':!action}" @click = "changeTab('企业')">企业</span>
            </div> -->
            <select v-model="select2" @change = "methodName">
                <option>最近一个月</option>
                <option>最近一周</option>
            </select>
        </div> 
        <div class = "BarBottom">
            <ul>
                <li v-for="item in navList" :key="item.id" @click="getCountry(item)" :class ="contury==item.id?'onlyStyle':''">{{item.name}}</li>
            </ul>
            <div class = "echarts_con">
                <div class = "tree_con">
                    <div id = "treeCon"></div>
                </div>                  
                <div class = "hotArea_con">
                    <img src = "../../assets/img/大数据-热门领域@2x.png" class = "hotIcon"/>
                    <span class = "hot_word">热门领域</span>
                    <div class = "areaItem" v-for="item in hotFiledArray" :key="item.id">
                        <span class = "Fterm">{{item.name}}</span>
                        <div class = "insItem" v-for="obj in item.company" :key="obj.id">
                            <img src="../../assets/img/大数据-机构@2x.png" class = "insIcon"/>
                            <span class = "insName">{{obj.name}}</span>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
             
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .Bar_con{
        width: 100%;
        box-sizing: border-box;
        border:1px solid rgba(232,234,235,1);
        .BarHead{
            box-sizing: border-box;
            padding: 0 4%;
            width: 100%;
            height: 50px;
            background:rgba(249,249,249,1);
            border-bottom:1px solid rgba(232,234,235,1);
            .tabButtn{
                float: left;
                margin-top: 10px;
                width:12%;
                height:28px;
                border: 1px solid #008EFF;
                border-radius: 100px;
                background: #fff;
                span{
                    display: inline-block;
                    height: 28px;
                    text-align: center;
                    border-radius: 100px;
                    font-size: 13px;
                    color:rgba(82,99,112,1);
                    line-height:28px; 
                    cursor: pointer;
                }
                .apply{
                    width: 60%;
                }
                .get{
                    float:right;
                    width: 40%;
                }
                .onlyStyle{
                    font-size: 13px;
                    background:rgba(0,142,255,1);
                    color: #fff;
                }
            }
            select{
                float: right;
                width:130px;
                height:28px; 
                background:rgba(255,255,255,1);
                border-radius: 2px ;
                border:1px solid #E1E1E1; 
                margin-top: 10px;
                color:rgba(123,129,133,1);
            }
        } 
        .BarBottom{
            box-sizing: border-box;
            padding: 12px 0 40px 0;
            background: #fff;
            ul{ 
                box-sizing: border-box;
                padding-left: 4%;
                margin-top: 12px;
                width: 100%;
                height: 45px;
                border-bottom: 1px solid #E8EAEB;
                li{
                    list-style-type: none;
                    float: left;
                    margin-right: 2%;
                    width: 3%;
                    text-align: center;
                    line-height: 43px;
                    font-size: 13px;
                    color: #39454E;
                    cursor: pointer;
                }
                .onlyStyle{
                    border-bottom: 2px solid #008EFF
                }
            }
            .echarts_con{
                width: 100%;
                box-sizing: border-box;
                padding: 40px 40px 0px 40px;
                overflow: hidden;
                .tree_con{
                    float: left;
                    width: 60%;
                    // padding-left: 1%; 
                    // box-sizing: border-box;
                    #treeCon{                   
                        width:100%;
                        height:386px;               
                    } 
                }
                .hotArea_con{
                    float: left;
                    margin-left: 5%;
                    width: 32%;
                    height: 386px;
                    overflow-y: auto;
                    box-sizing: border-box;
                    padding: 20px 2% 0 2%;
                    border: 1px solid #E1E7F3;
                    background: rgba(242,249,255,1);
                    border-radius: 4px ;
                    .hotIcon{
                        width: 11px;
                        height: 15px;
                        vertical-align: middle;
                    }
                    .hot_word{
                        font-size: 14px;
                        color: #39454E;
                        font-weight: bold;
                    }
                    .areaItem{
                        box-sizing: border-box;
                        padding: 21px 0;
                        border-bottom: 1px solid #E1E7F3;
                        .Fterm{
                            display: inline-block;
                            box-sizing: border-box;
                            padding: 5px 3%;
                            background:rgba(0,142,255,0.15);
                            font-size: 13px;
                            color: #008EFF;
                            border-radius: 4px ; 
                        }
                        .insItem{
                            margin-top:13px;
                            .insIcon{
                                width: 11px;
                                height: 11px;
                                vertical-align: middle;
                            }
                            .insName{
                                font-size: 12px;
                                color: #828995;
                            }
                        }
                    }
                    .areaItem:last-child{
                        border: none;
                    }
                }
                .hotArea_con::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 4px;
                }
                .hotArea_con::-moz-scrollbar{
                    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 4px;
                }
                .hotArea_con::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    border-radius: 5px;
                    -webkit-box-shadow: inset 0 0 5px #e1e7f3;
                    background: #D5D8D9;
                }
                .hotArea_con::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                    border-radius: 0;
                    background: #f2f9ff;
                }
            }
            
        }            
    }
</style>

<script scoped>
    export default{
        name: 'HelloWorld',
        components: {
        }, 
        data(){
            return{
                select2:"最近一周",
                action: true,
                max: 5000,
                endTime:'',
                navList:[
                    {'id':0,'name':'中国'},
                    {'id':1,'name':'美国'},
                    {'id':2,'name':'日本'},
                    {'id':3,'name':'韩国'},
                    {'id':4,'name':'欧洲'},
                ],
                contury: 0,
                hotFiledArray:[],
            }
        },
        methods:{
            methodName(){
                if(this.select2 == "最近一个月"){
                    sessionStorage.setItem('time3','month');
                    let contury = sessionStorage.getItem('contury1');
                    Promise.all([this.$store.dispatch("get_2_ipc_distribution",{time:"month",country:contury})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }else{
                    sessionStorage.setItem('time3','week');
                    let contury = sessionStorage.getItem('contury1');
                    Promise.all([this.$store.dispatch("get_2_ipc_distribution",{time:"week",country:contury})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                        })                        
                    })
                }
            },
            changeTab(item){
                if(item == "研究机构"){
                    this.action = true;
                }
                if(item == "企业"){
                    this.action = false;
                }
            },
            getCountry(item){
                this.contury = item.id;
                let time = sessionStorage.getItem('time3');
                if(item.id == 0){
                    sessionStorage.setItem('contury1','CN');
                    Promise.all([this.$store.dispatch("get_2_ipc_distribution",{time:time,country:"CN"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                            let hotFiledArray = JSON.parse(sessionStorage.getItem('hotFiledArray'));
                            this.hotFiledArray = hotFiledArray
                        })                        
                    })   
                }
                if(item.id == 1){
                    sessionStorage.setItem('contury1','US');
                    Promise.all([this.$store.dispatch("get_2_ipc_distribution",{time:time,country:"US"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                            let hotFiledArray = JSON.parse(sessionStorage.getItem('hotFiledArray'));
                            this.hotFiledArray = hotFiledArray
                        })                        
                    }) 
                }
                if(item.id == 2){
                    sessionStorage.setItem('contury1','JP');
                    Promise.all([this.$store.dispatch("get_2_ipc_distribution",{time:time,country:"JP"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                            let hotFiledArray = JSON.parse(sessionStorage.getItem('hotFiledArray'));
                            this.hotFiledArray = hotFiledArray
                        })                        
                    }) 
                }
                if(item.id == 3){
                    sessionStorage.setItem('contury1','KR');
                    Promise.all([this.$store.dispatch("get_2_ipc_distribution",{time:time,country:"KR"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                            let hotFiledArray = JSON.parse(sessionStorage.getItem('hotFiledArray'));
                            this.hotFiledArray = hotFiledArray
                        })                        
                    }) 
                }
                if(item.id == 4){
                    sessionStorage.setItem('contury1','EP');
                    Promise.all([this.$store.dispatch("get_2_ipc_distribution",{time:time,country:"EP"})]).then(()=>{
                        this.$nextTick(()=>{
                            this.drawBar();
                            let hotFiledArray = JSON.parse(sessionStorage.getItem('hotFiledArray'));
                            this.hotFiledArray = hotFiledArray
                        })                        
                    }) 
                }
            },
            AddBR(text) {
                let l = text.length;
                if(l==0){
                    return ""
                }
                let mod = l % 10;
                let line = parseInt(l / 10);
                if (mod > 3) {
                    line++;
                }
                let cnt = parseInt(l / line);
                if ((l % line) > 0) cnt++;

                let out = text[0];
                let len = out.length;
                for (var i = 1; i < l; i++) {
                    if (len > cnt) {
                        out += "<br>"
                        out += text[i]
                        len = text[i].length
                    } else {
                        out += text[i]
                        len += text[i].length;
                    }
                }
                return out;
            },
            drawBar(){
                let ipcArray = JSON.parse(sessionStorage.getItem('treeArray'));
                let that = this;
                let chart = this.$echarts.init(document.getElementById('treeCon'));
                var struct_colors = [
                    '#05AAFF','#008EFF','#7152E5','#9C5BF4','#F96060','#FAA420','#FFD500','#78CD49'
                ];
                var RICH = {
                    name: {
                        color: '#fdfa3e',
                        fontSize: 18,
                        lineHeight: 18
                    },
                    basic: {
                        color: '#fff',
                        fontSize: 14,
                        lineHeight: 14
                    }
                };
                var info2 = {
                    'children': ipcArray
                };
                var structs_datas = [];
                var formatUtil = this.$echarts.format;

                function format_struct_data(children, structs_datas) {
                    // 添加每个单位的颜色
                    for (var prop in children) {
                        var index = Math.floor(Math.random() * 20);
                        var value = 1;
                        if (children[prop].asset_num !== 0) {
                            value = children[prop].asset_num;
                        }
                        var tmp = {
                            name: children[prop].name,
                            manage: children[prop].manage,
                            children: [],
                            asset_num: children[prop].asset_num,
                            value: value
                        }
                        format_struct_data(children[prop].children, tmp.children);
                        if (tmp.children.length === 0) {
                            delete tmp.children;
                        }
                        structs_datas.push(tmp);
                        // return structs_datas;

                    }

                }

                function showMenu(param) {
                    // 可在此处添加右击操作内容
                    var event = param.event;
                    var pageX = event.offsetX;
                    var pageY = event.offsetY;
                }
                format_struct_data(info2.children, structs_datas);
                let option = {
                        color:['#05AAFF','#008EFF','#7152E5','#9C5BF4','#F96060','#FAA420','#FFD500','#78CD49'],
                        title: {
                                    text: '',
                                    subtext: '',
                                    left: 'leafDepth'
                                },
                                grid: {
                                    left: '0%',
                                    top:'0%',
                                    right: '0%',
                                    bottom: '0%',
                                    containLabel: true
                                },
                                tooltip: {
                                    clickable:false,
                                    formatter: function(info) {
                                        var asset_num = info.data.asset_num;
                                        var name = info.name;
                                        return [
                                            '<h4>' + name + '</h4>',
                                            '<div>资产数量：' + asset_num + '</div>',
                                        ].join('\n');
                                        // return [
                                        //     '{name|' + name + '}',
                                        //     '{basic| 资产数量：' + asset_num + '}',
                                        // ].join('\n');
                                    },
                                    // rich: RICH, tooltip不支持富文本

                                },

                                series: [{
                                    name: 'Fterm',
                                    type: 'treemap',
                                    visibleMin: 100,
                                    size: ['100%','100%'],
                                    // data: format_struct_data(info2.children, structs_datas),
                                    data: structs_datas,
                                    leafDepth: 1,
                                    roam:false,
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'insideTopLeft',
                                            formatter: function(a) {
                                                return '{name|' + a.name + '}' + "\n\n" + "数量 : " + a.data.asset_num ;

                                            },
                                            textStyle: {
                                                // color: '',  label的字体颜色
                                                fontSize: '14',
                                                // fontWeight: 'bold'
                                            },
                                            rich: RICH,

                                        },
                                    },
                                    levels: [{
                                        itemStyle: {
                                            normal: {
                                                borderWidth: 0,
                                                gapWidth: 1,
                                                borderColor:'#fff'
                                            }
                                        }
                                    }, {
                                        itemStyle: {
                                            normal: {
                                                gapWidth: 1,
                                                borderColor:'#fff'
                                            }
                                        }
                                    }],
                                    breadcrumb: {
                                        show: true,
                                        // "height": 22,
                                        left: "10%",
                                        top: "0%",
                                        emptyItemWidth: 25,
                                        itemStyle: {
                                            normal: {
                                                color: "#008EFF",
                                                borderColor: "rgba(13,25,33,0)",
                                                borderWidth: 0.5,
                                                shadowColor: "rgba(150,150,150,0)",
                                                shadowBlur: 0,
                                                shadowOffsetX: 0,
                                                shadowOffsetY: 0,
                                                textStyle: {
                                                    color: "#fff",
                                                    //fontWeight: 'bold'
                                                }
                                            },
                                            emphasis: {
                                                textStyle: {}
                                            }
                                        }
                                    },
                                }]
                }
                chart.setOption(option)           
                // document.oncontextmenu = function() {
                //     return false;
                // };
                // chart.on('contextmenu', showMenu);
            }
            // drawBar(){
            //     let that = this;
            //     let chart = this.$echarts.init(document.getElementById('treeCon'));
            //     let ipcArray = JSON.parse(sessionStorage.getItem('treeArray'));
            //     let option = {
            //             color:['#7152E5','#008EFF','#78CD49','#FAA420','#F96060','#05AAFF','#9C5BF4','#FFD500'],
            //             tooltip : {
            //                 trigger: 'item',
            //                 formatter: (data)=>{
            //                     let text = data.name.split('；')
            //                     let out = that.AddBR(text[0]);
            //                     let len = text.length;
            //                     for(var i = 1;i<len;i++){
            //                         if(text[i].length>10){
            //                             //let str =text[i].substr(0,10)+'<br/>'+ text[i].substr(10);
            //                             //out+='<br/>'+str
            //                             out += ";<br/>" + that.AddBR(text[i])
            //                         }else{
            //                             out+=';<br/>'+text[i]
            //                         }                                  
            //                     }
            //                     return out
            //                 },
            //             },
                        
            //             series : [
            //                 {
            //                     type:'treemap',
            //                     width:'100%',
            //                     height:'100%',
            //                     roam:false,
            //                     nodeClick:false,
            //                     levels:[{
            //                         itemStyle: {
            //                             normal: {
            //                                 gapWidth:1
            //                             }
            //                         }
            //                     }],
            //                     // center: ['60%', '50%'],
            //                     breadcrumb:{
            //                         show:false
            //                     },
            //                     label:{
            //                         normal:{
            //                             show:true,
            //                             position:[10,10]
            //                         }
            //                     },
            //                     itemStyle: {
            //                         normal: {
            //                             show: true,
            //                             textStyle:{
            //                                 color:'#fff',
            //                                 fontSize:16,
            //                             },
            //                             borderWidth: 1,
            //                             borderColor: '#fff'
            //                         },
            //                         emphasis: {
            //                             label: {
            //                                 show: true
            //                             }
            //                         }
            //                     },
            //                     data:ipcArray,
            //                 }
            //             ]
            //         }; 
            //     chart.setOption(option)            
            // }
        },
        mounted(){
            Promise.all([this.$store.dispatch("get_2_ipc_distribution",{time:"week",country:'CN'})]).then(()=>{
                this.$nextTick(()=>{
                    this.drawBar();
                    let hotFiledArray = JSON.parse(sessionStorage.getItem('hotFiledArray'));
                    this.hotFiledArray = hotFiledArray
                })                        
            })
        }
    } 
</script>