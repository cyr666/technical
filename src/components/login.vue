<template>
    <div class="login">        
        <div class="login-left">
            <div class = "login-top">
                <div class="logo_img">
                    <img src="../assets/img/logo-qit.png" alt="" class = "blue_img" v-if="!logo_img">
                    <img src="../assets/img/logo-qit-blue.png" alt="" class = "blue_img" v-else>
                </div>
                <div class="nav-search">
                    <div :class="{'tab-selected': tab1}">
                        <a href="http://www.piionee.com/#/" class = "tabWord">首页</a>
                        <!--<router-link to="/websiteIndex">首页</router-link>-->
                    </div>
                    <div :class="{'tab-selected': tab2}">
                        <a href="http://www.piionee.com/#/product" class = "tabWord">产品</a>
                        <!--<router-link to="/product">产品</router-link>-->
                    </div>
                    <div :class="{'tab-selected': tab3}">
                        <a href="http://www.piionee.com/#/aboutUs" class = "tabWord">关于我们</a>
                        <!--<router-link to="/aboutUs">关于我们</router-link>-->
                    </div>
                    <div :class="{'tab-selected': tab4}">
                        <a href="http://www.piionee.com/#/Contact" class = "tabWord">联系我们</a>
                        <!--<router-link to="/Contact">联系我们</router-link>-->
                    </div>
                    <div :class="{'tab-selected': tab5}">
                        <a href="http://www.piionee.com/#/join" class = "tabWord">加入我们</a>
                        <!--<router-link to="/join">加入我们</router-link>-->
                    </div>
                </div>
            </div>
            <div class = "logo_model">
                <div class = "logoModel_left">
                    <div class = "login_logo_con">
                        <img src="../assets/img/login_logo_white.png" alt="" class = "login_logo">
                    </div>
                    <div class = "login_phone_con">
                        <img src="../assets/img/login_phone.png" alt="" class = "login_phone">
                    </div> 
                    <div class = "loginPhoneNum">010-88451901</div> 
                    <div class = "login_phone_con login_mail_con">
                        <img src="../assets/img/login_mail.png" alt="" class = "login_phone">
                    </div> 
                    <div class = "loginPhoneNum">business@piionee.com</div>                 
                </div>
                <div class = "logoModel_right">
                    <div class = "login_letter">登录</div>
                    <div class="userInput consoleTop">
                        <input type="text" placeholder="请输入用户名" v-model="username" @keyup.enter="userLogin" @focus="consoleOkShoe"/>
                        <!-- <img src = "../assets/img/ok.png" class = "adminOk" v-if ="ok"/> -->
                    </div>
                    <div class="userInput">
                        <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="userLogin"/>
                    </div>
                    <div class="tip" v-if="errorTip">{{tip}}</div>
                    <div class = "clickLogin" @click="userLogin">登录</div>
                </div>
            </div>
            <img src="../assets/img/newBG.jpg" class = "backgroundImg"/>
        </div>
        <div class="website-footer">
            <div class="container contact-information">
                <div class="info-list">
                    <div class="info-detail">
                        <img src="../assets/img/phone-1.png"/>
                        <h3>周一至周五 9:00-17:00</h3>
                        <p>010-88451901</p>
                    </div>
                </div>
                <div class="info-list" style="text-align:center">
                    <div class="info-detail">
                        <img src="../assets/img/postbox.png"/>
                        <h3 style="padding-top:8px;">电子邮箱</h3>
                        <p>business@piionee.com</p>
                    </div>
                </div>
                <div class="info-list" style="text-align:right">
                    <div class="info-detail">
                        <img src="../assets/img/community.png"/>
                        <h3 style="padding-top:8px;">加入社区</h3>
                        <ul>
                            <li><img src="../assets/img/facebook.png"/></li>
                            <li><img src="../assets/img/twitter.png"/></li>
                            <li><img src="../assets/img/weixin.png"/></li>
                            <li><img src="../assets/img/weibo.png"/></li>
                            <li><img src="../assets/img/in.png"/></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="container footer-about">
                <div class="address">
                    <img src="../assets/img/logo-footer.png"/>
                    <div>北京青核桃科技有限公司</div>
                    <p>地址：北京市昌平区龙域中心B座501</p>
                </div>
                <div class="nav">
                    <ul class="nav-ul">
                        <li class="nav-list">
                            <span @click="goRouter('websiteIndex')">首页</span>
                            <!--<ul>
                                <li>首页</li>
                            </ul>-->
                        </li>
                        <li class="nav-list">
                            <span @click="goRouter('product')">产品</span>
                            <ul>
                                <li>TacitKnow</li>
                                <li>π计划</li>
                                <li>科技内参</li>
                            </ul>
                        </li>
                        <li class="nav-list">
                            <span @click="goRouter('aboutUs')">关于我们</span>
                            <ul>
                                <li>我们是谁</li>
                                <li>我们的愿景</li>
                                <li>我们的价值观</li>
                                <li>我们的目标</li>
                            </ul>
                        </li>
                        <li class="nav-list">
                            <span @click="goRouter('Contact')">联系我们</span>
                            <ul>
                                <li>坐标位置</li>
                                <li>意见反馈</li>
                            </ul>
                        </li>
                        <li class="nav-list">
                            <span @click="goRouter('join')">加入我们</span>
                            <ul>
                                <li></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="QR-code">
                    <img src="../assets/img/code1.png"/>
                    <div>扫一扫，关注微信</div>
                </div>
            </div>
            <div class="container copyright">
                <p>Copyright © 2013-2018 Greenut. All Rights Reserved. 青核桃 版权所有 | 京公网安备 11010802020287</p>
            </div>
        </div>
    </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
    .login{
        width:100%;
        // height: 100%;
        .login-left{
            position: relative;
            width: 100%;
            // height: 1020px;
            .login-top{
                position:fixed;
                height: 60px;
                background: #ffffff;
                width: 100%;
                z-index:10;
                box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
                .logo_img{
                    float: left;
                    width: 50%;
                    height: 60px;
                    position: relative;
                    .blue_img{
                        width: 61px;
                        height: 34px;
                        position: absolute;
                        left: 50%;
                        top: 15px;
                    }
                }
                .nav-search{
                    float:left;
                    div {
                        float: left;
                        height:60px;
                        line-height: 60px;
                        margin-right:40px;
                        a {
                            color:rgba(69,69,69,1);
                            font-size: 16px;
                            text-decoration: none;
                            cursor:pointer;
                        }
                    }
                }
                .tab-selected {
                    border-bottom:4px solid rgba(0,184,252,1);
                    a {
                        color: rgba(0,184,252,1) !important;
                    }
                }
            }
            .backgroundImg{
                width: 100%;
                height: 100%;
            }
        }
        .logo_model {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            z-index: 5;
            width: 60%;
            height: 60%;
            // background: #ffffff;
            .logoModel_left{
                float: left;
                width: 60%;
                height: 100%;
                background:rgba(0,165,251,0.75);
                border-radius: 4px 0px 0px 4px ;
                .login_logo_con{
                    width: 155px;
                    height: 52px;
                    margin-top: 20%;
                    margin-left: 35%;
                    .login_logo{
                        width: 155px;
                        height: 52px;                    
                    } 
                }
                .login_phone_con{
                    width: 23px;
                    height: 23px;
                    margin-top: 15%;
                    margin-left: 48%;
                    .login_phone{
                        width: 23px;
                        height: 23px;
                    }
                }
                .login_mail_con{
                    margin-top: 5%;
                }
                .loginPhoneNum{
                    width: 100%;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    line-height: 28px;
                    opacity: 0.75;
                }
            }
            .logoModel_right{
                float: left;
                width: 40%;
                height: 100%;
                background:rgba(255,255,255,1);
                border-radius: 0px 4px 4px 0px ;
                .login_letter{
                    font-size: 5vh;
                    font-family: "微软雅黑";
                    color:rgba(0,165,251,1);
                    line-height:54px;
                    text-align: center;
                    margin-top: 28%; 
                }
                .userInput{
                    position: relative;
                    width: 60%;
                    border-bottom:1px solid #DDDDDD;
                    padding-top:3.7vh;
                    padding-bottom:10px;
                    margin-left: 20%;
                    input{
                        border:none;
                        outline:none;
                        line-height:26px;
                        font-size:16px;
                        padding:0;
                        height:15%;
                        width:100%;
                        text-align: center;
                    }
                    .adminOk{
                        position: absolute;
                        right: 0%;
                        top: 43%;
                        width: 13px;
                        height: 11px;
                    }
                    ::-webkit-input-placeholder {
                        color:rgba(166,174,177,1);
                        font-size:16px;
                    }
                }
                .tip{
                    position:absolute;
                    top:60%;
                    left:66.5%;
                    background: rgba(0, 0, 0, 0.75);
                    color: #ffffff;
                    font-size: 16px;
                    border-radius: 4px;
                    padding:9px 35px;
                }
                .consoleTop{
                    margin-top: 10%;
                }
                .clickLogin{
                    width: 60%;
                    height: 40px;
                    line-height: 40px;
                    background: rgba(0,165,251,1);
                    font-size: 18px;
                    color: #fff;
                    border-radius: 100px ;
                    text-align: center;
                    margin-left: 20%;
                    margin-top: 10%;
                    cursor: pointer;
                }
            }
        }
        .website-footer{
            box-sizing: border-box;
            padding: 0 7%;
            width:100%;
            background:rgba(47,48,52,1);
            p{
                margin:0;
            }
            .contact-information{
                padding:40px 0 20px 0;
                border-bottom:1px solid #555555;
                overflow: hidden;
                // background: red;
                .info-list{
                    width:33.3%;
                    float:left;
                    .info-detail{
                        text-align:center;
                        display:inline-block;
                    }
                }
                h3{
                    color:rgba(153,153,153,1);
                    font-size:14px;
                    margin:20px 0;
                }
                p{
                    font-size:24px;
                    color:#FFFFFF;
                }
                ul{
                    display:inline-block;
                    li{
                        float:left;
                        margin-right:15px;
                    }
                }
            }
            .footer-about{
                padding:40px 0 30px 0;
                .address{
                    float:left;
                    width:31%;
                    color:rgba(255,255,255,0.8);
                    div{
                        margin:22px 0 14px 0;
                    }
                }
                .nav{
                    float:left;
                    width:56%;
                    .nav-ul{
                        overflow:hidden;
                        .nav-list{
                            list-style-type: none;
                            float:left;
                            color:#FFFFFF;
                            margin-right:60px;
                            span{
                                cursor:pointer;
                            }
                            ul{
                                margin-top:10px;
                            }
                            li{
                                list-style-type: none;
                                color:rgba(255,255,255,0.6);
                                line-height:28px;
                            }
                        }
                    }
                }
                .QR-code{
                    float:left;
                    width:13%;
                    div{
                        text-align:center;
                        margin-top:10px;
                        color:rgba(153,153,153,1);
                    }
                }
            }
            .copyright{
                font-size:12px;
                color:rgba(255,255,255,0.5);
                padding-bottom:20px;
                padding-left:0;
            }
        }
        @media screen and (max-width: 997px) {
            .footer-about{
                .address,.nav,.QR-code{
                    float:none !important;
                    width:100% !important;
                    margin-bottom:20px;
                }
                .address{
                    text-align:center;
                }
            }
            .copyright{
                text-align:center;
            }

        }
        
    }
    @media screen and (min-width: 320px) and (max-width: 500px){
        .login-left{
            display:none;
        }
        .login-right{
            width:100% !important;
        }
    }
</style>
<script>
    import bus from '../store/bus.js';
    export default {
        components: {
        },
        data(){
            return {
                username:'',
                password:'',
                dialogshow:false,
                code:'',
                inputCode:'',
                numArr:[0,1,2,3,4,5,6,7,8,9,'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                    'N', 'O','P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i',
                    'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
                errorTip:false,
                tip:'',
                title:'',
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
                tab5: false,
                ok: false,
                logo_img: true,
            }
        },
        methods: {
            forgetPwd(){
                this.dialogshow = true;
                this.title = '您可以通过以下方式找回密码'
            },
            closeDialog(){
                this.dialogshow = false;
            },
            consoleOkShoe(){
                console.log("用户名")
                if(!this.username){
                    this.ok = false
                }
            },
            userLogin(){
                // 先验证验证码是否正确
                if(this.username){
                    $.ajax({
                        url: this.biz.serverUrl+'/piionee/sign',
                        type: 'get',
                        dataType: 'json',
                        data: {
                            account: this.username,
                            password:this.password
                        },
                        success: (res) => {
                            switch(res.signType){
                                case 0:
                                    sessionStorage.setItem('userName',this.username);
                                    this.$router.push(`/technical`);
                                    bus.$emit('bigData');
                                    sessionStorage.setItem('searchVal','');
                                    bus.$emit('setSearchVal');
                                    this.ok = true;
                                    break;
                                case 1:
                                    this.tip = '您输入的账号不存在！';
                                    this.errorTip = true;
                                    this.ok = false;
                                    setTimeout(()=>{
                                        this.errorTip = false;
                                    },2000);
                                    break;
                                case 2:
                                    this.dialogshow = true;
                                    this.title = '您的账号已过有效期，请联系我们续费。';
                                    this.ok = false;
                                    break;
                                case 3:
                                    this.dialogshow = true;
                                    this.title = '您的账号已过试用期，如需购买请联系我们。';
                                    this.ok = false;
                                    break;
                                case 4:
                                    this.tip = '您输入的密码有误！';
                                    this.errorTip = true;
                                    this.ok = true;
                                    setTimeout(()=>{
                                        this.errorTip = false;
                                    },2000);
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                } else {
                    this.tip = '请输入用户名！';
                    this.ok = false;
                    this.errorTip = true;
                    setTimeout(()=>{
                        this.errorTip = false;
                    },2000)
                }
            },
            getVerifedCode(){
                this.code = '';
                let codeLength = 4;
                for(let i = 0; i < codeLength; i++) {
                    let charIndex = Math.floor(Math.random() * 62);
                    this.code += this.numArr[charIndex];
                }
            },
            refresh(){
                this.getVerifedCode();
            },
            goRouter(val){
                if(val === 'websiteIndex'){
                    window.location.href = "http://www.piionee.com/#/"; 
                }
                if(val === 'product'){
                    window.location.href = "http://www.piionee.com/#/product";
                }
                if(val === 'aboutUs'){
                    window.location.href = "http://www.piionee.com/#/aboutUs";
                }
                if(val === 'Contact'){
                    window.location.href = "http://www.piionee.com/#/Contact";
                }
                if(val === 'join'){
                    window.location.href = "http://www.piionee.com/#/join";
                }
            },
            handleScroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if(scrollTop>60){
                    $(".login-top").css({"background":"rgba(0,0,0,0.5)"});
                    $(".tabWord").css({"color":"#fff"})
                    this.logo_img = false;
                }else{
                    $(".login-top").css({"background":"#fff"});
                    $(".tabWord").css({"color":"#000"})
                    this.logo_img = true;
                }
            }
        },
        mounted(){
            this.getVerifedCode();
            setInterval(()=>{
                this.getVerifedCode();
            },60000);
            sessionStorage.removeItem('userName');
            bus.$on('quit',()=>{
                this.username = '';
                this.password = '';
                this.inputCode = '';
                this.$router.go(0);
                this.getVerifedCode();
            })
            window.addEventListener('scroll', this.handleScroll)
        }
    }
</script>

