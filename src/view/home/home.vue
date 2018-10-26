<template>
  <div class = "home">
      <!-- 头部 -->
      <div class = "header">

          <div class = "header-left">
                <div class = "header-left-logo"></div>
                <div class = "header-left-slogan">自助设备运营管理平台</div>
                <!-- <Dropdown class = "header-left-dropdown">
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem>豆汁儿</DropdownItem>
                        <Dropdown placement="right-start">
                            <DropdownItem>
                                北京烤鸭
                                <Icon type="ios-arrow-forward"></Icon>
                            </DropdownItem>
                            <DropdownMenu slot="list">
                                <DropdownItem>挂炉烤鸭</DropdownItem>
                                <DropdownItem>焖炉烤鸭</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                    </DropdownMenu>
                </Dropdown> -->
                <div class = "header-left-dropdown">北京</div>
          </div>
          <div class = "header-right">
            <div class = "header-right-search-con">
                <input placeholder="Enter text" style="width: auto" class = "header-right-search" />
            </div>
            <!-- <Icon type="ios-search-outline" slot = "suffix"/> -->
            <div class= "header-right-line"></div>
            <div class= "header-right-group">
                <div class= "header-right-group-icon"></div>
                <div class= "header-right-group-number">
                    {{
                        groupNumber
                    }}
                </div>
            </div>
            <div class= "header-right-Personal" @click = "logOut"></div>
          </div>
      </div>
      <div class = "body">
            <div class = "left-side-con">
                    <div :class = "[leftSideSelected == 'back-to-main'? 'left-side-selected' :'','item-con']" @click = "leftSideSelected = 'back-to-main'">
                        <div class = "back-to-main inside-item"></div>
                    </div>
                    <div :class = "[leftSideSelected == 'statistics'? 'left-side-selected' :'','item-con']" @click = "leftSideSelected = 'statistics'">
                        <div class = "statistics inside-item"></div>
                    </div>
                    <div :class = "[leftSideSelected == 'menu'? 'left-side-selected' :'','item-con']" @click = "leftSideSelected = 'menu'">
                        <div class = "menu inside-item"></div>
                    </div>
                    <div :class = "[leftSideSelected == 'briefcase'? 'left-side-selected' :'','item-con']" @click = "leftSideSelected = 'briefcase'">
                        <div class = "briefcase inside-item"></div>
                    </div>
                    <div :class = "[leftSideSelected == 'settings'? 'left-side-selected' :'','item-con']" @click = "leftSideSelected = 'settings'">
                        <div class = "settings inside-item"></div>
                    </div>
            </div>
            <div class = "left-menu-con">
                <div class = "menu-head">管理平台</div>
                <button class = "back">返回</button>
                <div class = "survey-menu-con menu-con">
                    <div class= "title-con">
                        <button class = "title" @click = "titleClicked">
                            <div :class = "[titleTrueClicked ? 'triangle-down' :'triangle-up']"></div>
                            <a class = "title-name">概况</a>
                        </button>
                    </div>
                    <a class = "menu-child" v-for = "(item,index) in surveyArr" :key = "index" v-show = "titleTrueClicked">
                        {{
                            item.name
                        }}
                    </a>
                </div>
                <div class = "order-management-menu-con menu-con">
                    <div class= "title-con">
                        <button class = "title" @click = "orderTitleClicked">
                            <div :class = "[orderTitleTrueClicked ? 'triangle-down' :'triangle-up']"></div>
                            <a class = "title-name">概况</a>
                        </button>
                    </div>
                    <a class = "menu-child" v-for = "(item,index) in surveyArr" :key = "index" v-show = "orderTitleTrueClicked">
                        {{
                            item.name
                        }}
                    </a>
                </div>
            </div>
      </div>
  </div>
</template>
<script>
import {signOut} from '@/api/user.js';
import baseConfig from '@/config/index';
const baseUrl = baseConfig.baseUrl.dev;
export default {
    data() {
        return {
            leftSideSelected     : 'menu',
            groupNumber          : 20,
            titleTrueClicked     : false,
            orderTitleTrueClicked: false,
            count                : 0,
            surveyArr            : [
                {
                    name: '概况1'
                },
                {
                    name: '概况2'
                },
                {
                    name: '概况3'
                },
                {
                    name: '概况4'
                },
                {
                    name: '概况5'
                }
            ]
        }
    },
    methods : {
        logOut() {
            signOut(baseUrl + 'user/sign_out_web').then(res => {
                console.log("res:::::::")
                console.log(res)
                console.log(res.data)
                if(res.status == 200 && res.data.code == 0) {
                    this.$Message.info({
                        content : '退出成功',
                        duration: 5,
                        closable: true
                    })
                    if(localStorage.getItem('Trinity-Token') != null) {
                        localStorage.removeItem('Trinity-Token');
                    }
                    this.$router.push({
                        name: 'login'
                    })
                }else{
                    this.$Message.error({
                        content : '退出失败',
                        duration: 5,
                        closable: true
                    })
                }
            }).catch(err => {
                console.log(err);
                this.$Message.error({
                    content : '网络异常，请联系管理员及时处理',
                    duration: 5,
                    closable: true
                })
            })
        },
       titleClicked() {
            ++this.count;
           if(this.count%2 >0) {
               this.titleTrueClicked = true
           }else {
               this.titleTrueClicked = false;
           }
       },
       orderTitleClicked() {
           ++this.count;
           if(this.count%2 >0) {
               this.orderTitleTrueClicked = true
           }else {
               this.orderTitleTrueClicked = false;
           }
       }
    }
}
</script>
<style lang="less" scoped>
.home {
    button {
        border-width: 0;
        outline     : none;
        background  : #DEDEDE;
        cursor      : pointer;
    }
    width: 100vw;
  .header{
    width           : 100vw;
    height          : 60px;
    background-color: #26303A;
    color           : #FFF;
    text-align      : center;
    display         : flex;
    flex-direction  : row;
    align-items     : center;
    padding         : 0 30px;
    justify-content : space-between;
    &-left {
        font-size     : 20px;
        display       : flex;
        flex-direction: row;
        align-items   : center;
        &-logo{
            width              : 55px;
            height             : 55px;
            background-image   : url('./../../assets/images/home/logo.png');
            background-size    : contain;
            background-position: center;
            @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                background-image: url('./../../assets/images/home/logo@2x.png');
            }
        }
        &-slogan {
            font-size: 28px;
            color    : #FFF;
            margin   : 16px;
        }
        &-dropdown {
            width                     : 124px;
            height                    : 36px;
            border-top-left-radius    : 18px;
            border-top-right-radius   : 18px;
            border-bottom-left-radius : 18px;
            border-bottom-right-radius: 18px;
            background                : rgba(255,255,255,0.3);
            color                     : #FFF;
            font-size                 : 16px;
            text-align                : center;
            line-height               : 36px;
        }
    }
    &-right{
        color         : green;
        display       : flex;
        flex-direction: row;
        align-items   : center;
        &-search {
            width                     : 240px !important;
            height                    : 36px;
            border-top-left-radius    : 18px;
            border-top-right-radius   : 18px;
            border-bottom-left-radius : 18px;
            border-bottom-right-radius: 18px;
            background                : rgba(255,255,255,0.3);
            color                     : #FFF;
            font-size                 : 16px;
            text-align                : left;
            text-indent               : 1em;
            line-height               : 36px;
            border                    : none;
            //去掉边框颜色
            outline: none;
        }
        &-line {
            width           : 1px;
            height          : 36px;
            background-color: #D8D8D8;
            margin          : 0 20px;
        }
        &-group {
            display       : flex;
            flex-direction: row;
            cursor        : pointer;
            &-icon {
                width              : 18px;
                height             : 20px;
                background-image   : url('./../../assets/images/home/Group3.png');
                background-size    : contain;
                background-position: center;
                @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                    background-image: url('./../../assets/images/home/Group3@2x.png');
                }
            }
            &-number {
                background   : #B32436;
                width        : 17px;
                height       : 17px;
                color        : #fff;
                font-size    : 12px;
                text-align   : center;
                line-height  : 17px;
                border-radius: 50%;
                position     : relative;
                left         : -10px;
                bottom       : 2px;
            }
        }
        &-Personal {
            width              : 22px;
            height             : 22px;
            cursor             : pointer;
            background-image   : url('./../../assets/images/home/Personal.png');
            background-size    : contain;
            background-position: center;
            @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                background-image: url('./../../assets/images/home/Personal@2x.png');
            }
        }
    }
  }
  .body {
      width         : 100vw;
      height        : 100vh;
      display       : flex;
      flex-direction: row;
        .left-side-con {
            width           : 50px;
            height          : 100vh;
            background-color: #08131E;
            text-align      : center;
            display         : flex;
            flex-direction  : column;
            justify-content : center;
            align-items     : center;
            .item-con {
                width           : 40px;
                height          : 40px;
                border-radius   : 20px;
                margin          : 2vh 0;
                background-color: #08131E;
                display         : flex;
                justify-content : center;
                align-items     : center;
                transform       : translateY(-500%);
                .inside-item {
                    width              : 24px;
                    height             : 24px;
                    cursor             : pointer;
                    background-size    : contain;
                    background-position: center;
                }
            }
            //被选中
            .left-side-selected {
                background: linear-gradient(180deg,rgba(59,165,178,1) 0%,rgba(72,168,218,1) 100%);
            }
            .back-to-main {
                background-image: url('./../../assets/images/home/Home.png');
                @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                    background-image: url('./../../assets/images/home/Home@2x.png');
                }
            }
            .statistics {
                background-image: url('./../../assets/images/home/Shares.png');
                @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                    background-image: url('./../../assets/images/home/Shares@2x.png');
                }
            }
            .menu{
                background-image: url('./../../assets/images/home/Notes.png');
                @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                    background-image: url('./../../assets/images/home/Notes@2x.png');
                }
            }
            .briefcase {
                background-image: url('./../../assets/images/home/Job.png');
                @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                    background-image: url('./../../assets/images/home/Job@2x.png');
                }
            }
            .settings {
                background-image: url('./../../assets/images/home/Settings.png');
                @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                    background-image: url('./../../assets/images/home/Settings@2x.png');
                }
            }
        }
        .left-menu-con {
            width           : 160px;
            height          : 100vh;
            background-color: #DEDEDE;
            text-align      : center;
            .menu-head {
                width        : 160px !important;
                height       : 60px;
                line-height  : 60px;
                text-align   : center;
                font-size    : 12px;width: 48px;
                font-size    : 12px;
                font-family  : PingFangSC-Medium;
                font-weight  : 500;
                color        : rgba(21,24,54,1);
                border-bottom: 1px solid rgba(66,160,186,0.49);
            }
            .back {
                width       : 160px;
                height      : 40px;
                line-height : 40px;
                text-align  : center;
                color       : #000;
                border-width: 0;
                outline     : none;
                background  : #DEDEDE;
                cursor      : pointer;
            }
            // container
            .menu-con {
                width           : 160px !important;
                overflow        : hidden;
                text-align      : left;
                font-size       : 12px;
                color           : #000;
                background-color: #DEDEDE;
            }
            .title-con {
                width      : 160px;
                height     : 40px;
                line-height: 40px;
                .title {
                    width          : 100%;
                    height         : 40px;
                    background     : #DEDEDE;
                    line-height    : 40px;
                    text-align     : center;
                    display        : flex;
                    flex-direction : row;
                    justify-content: left;
                    align-items    : center;
                    .title-name{
                        color: #000;
                    }
                    .triangle-up {
                            width       : 0px;
                            height      : 0px;
                            *width      : 7px;
                            *height     : 10px;
                            font-size   : 0;
                            line-height : 0;
                            overflow    : hidden;
                            border-width: 5px;
                            border-style: dashed dashed solid dashed;
                            border-color: transparent  transparent transparent #9B9B9B;
                            margin      : 3px 10px;
                    }
                    .triangle-down {
                            width       : 0px;
                            height      : 0px;
                            *width      : 7px;
                            *height     : 10px;
                            font-size   : 0;
                            line-height : 0;
                            overflow    : hidden;
                            border-width: 5px;
                            border-style: dashed dashed solid dashed;
                            border-color: #9B9B9B transparent  transparent transparent;
                            margin      : 3px 10px;
                    }
                    &-name {
                        height     : 12px;
                        line-height: 12px;
                    }
                }
                .title:link{
                    background-color: #48A8DA;
                }
                .title:visited{
                    background-color: #DEDEDE;
                    .triangle-down {
                            width       : 0px;
                            height      : 0px;
                            *width      : 7px;
                            *height     : 10px;
                            font-size   : 0;
                            line-height : 0;
                            overflow    : hidden;
                            border-width: 5px;
                            border-style: dashed dashed solid dashed;
                            border-color: #9B9B9B transparent  transparent transparent;
                            margin      : 3px 10px;
                    }
                    .title-name{
                        color: #FFF;
                    }
                }
                .title:hover{
                    background-color: #48A8DA;
                    color           : #FFF;
                    .triangle-up {
                            width       : 0px;
                            height      : 0px;
                            *width      : 7px;
                            *height     : 10px;
                            font-size   : 0;
                            line-height : 0;
                            overflow    : hidden;
                            border-width: 5px;
                            border-style: dashed dashed solid dashed;
                            border-color: transparent  transparent transparent #FFF;
                            margin      : 3px 10px;
                    }
                    .triangle-down {
                            width       : 0px;
                            height      : 0px;
                            *width      : 7px;
                            *height     : 10px;
                            font-size   : 0;
                            line-height : 0;
                            overflow    : hidden;
                            border-width: 5px;
                            border-style: dashed dashed solid dashed;
                            border-color: #fff transparent  transparent transparent;
                            margin      : 3px 10px;
                    }
                    .title-name{
                        color: #FFF;
                    }
                }
                .title:active{
                    background-color: #DEDEDE;
                    .triangle-down {
                            width       : 0px;
                            height      : 0px;
                            *width      : 7px;
                            *height     : 10px;
                            font-size   : 0;
                            line-height : 0;
                            overflow    : hidden;
                            border-width: 5px;
                            border-style: dashed dashed solid dashed;
                            border-color: blue transparent  transparent transparent;
                            margin      : 3px 10px;
                    }
                    .title-name{
                        color: #FFF;
                    }
                }
            }
            .menu-child {
                display      : block;
                font-size    : 12px;
                color        : #4A4A4A;
                text-align   : center;
                box-sizing   : border-box;
                padding      : 0 20px;
                width        : 100%;
                height       : 40px;
                line-height  : 40px;
                overflow     : hidden;
                white-space  : nowrap;
                text-overflow: ellipsis;
            }
            .menu-child:link {
                color           : #fff;
                background-color: #48A8DA;
            }
            .menu-child:visited {
                color           : #fff;
                background-color: #48A8DA;
            }
            .menu-child:hover {
                color           : #fff;
                background-color: #48A8DA;
            }
            .menu-child:active {
                color           : #fff;
                background-color: #48A8DA;
            }
        }
  }
}
</style>


