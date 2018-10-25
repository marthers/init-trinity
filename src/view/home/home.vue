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
            <input placeholder="Enter text" style="width: auto" class = "header-right-search" />
            <Icon type="ios-search-outline" slot = "suffix"/>
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
      <!-- 最右侧 -->
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
  </div>
</template>
<script>
import {signOut} from '@/api/user.js';
import baseConfig from '@/config/index';
const baseUrl = baseConfig.baseUrl.dev;
export default {
    data() {
        return {
            leftSideSelected: 'menu',
            groupNumber     : 20
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
        // personalClicked() {
        //     const content = `<Button type="primary" @click = "logOut">退出登录</Button>
        //                     <h2>Personal</h2>
        //     `;
        //     this.$Modal.info({
        //         title  : '用户个人中心',
        //         content: content
        //     });
        // }
    }
}
</script>
<style lang="less" scoped>
.home {
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
            width              : 60px;
            height             : 60px;
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
        &-search {
            width                     : 240px;
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
  .left-side-con {
    width           : 5vw;
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
}
</style>


