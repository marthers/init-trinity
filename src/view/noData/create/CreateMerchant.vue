
<template>
    <div class="create">
        <div class = "box">
            <header class = "header">
                <div class = "left"></div>
                <div class="right">
                    编辑商户
                </div>
            </header>
            <div class = "first">
                <span v-if = "selectedMerchant.length > 0">
                    您已经选择{{selectedMerchant}}。
                </span>
                <span v-else>若已有上级商户，请选择您的上级商户。</span>
                <span class = "choose" @click = "chooseUpper">点此选择您的上级商户</span>
            </div>
            <div class = "id-con">
                <div class = "face-con">
                    <p class = "info">上传公司证照正面：</p>
                    <!-- <div class = "img-not-uploaded-box">
                        <div class = "img-not-uploaded"></div>
                    </div> -->
                    <img-upload @base64   = "corpBase64" @deleteBase64 = "deleteCorp" :modalTitle = "corpModalTitle" :uploadId   = "corpUploadId"></img-upload>
                </div>
                <!-- <div class = "face-con">
                    <p class = "info">证件反面照：</p>
                    <div class = "img-not-uploaded-box">
                        <div class = "img-not-uploaded"></div>
                    </div>
                </div> -->
            </div>
            <div class = "logo">
                <p class = "logo-title">公司Logo: </p>
                <!-- <div class = "img-not-uploaded-box">
                    <div class = "img-not-uploaded"></div>
                </div> -->
                <!-- <img-upload
                    @base64   = "logoBase64"
                    :modalTitle = "logoModalTitle"
                    :uploadId   = "logoUploadId">
                </img-upload> -->
                <img-upload @base64   = "logoBase64" @deleteBase64 = "deleteLogo" :modalTitle = "logoModalTitle" :uploadId   = "logoUploadId"></img-upload>
            </div>
            <div class = "con corp-name">
                <p class = "info">公司注册名称：</p>
                <input type="text" v-model="userName" class = "input" placeholder="公司注册名称"  maxlength = "20"/>
            </div>
            <div class = "con corp-id">
                <p class = "info">公司证照号码：</p>
                <input type="text" v-model="IDNumber" class = "input" placeholder="请输入公司证照号码"  maxlength = "20"/>
            </div>
            <div class = "con corp-id">
                <p class = "info">公司简要描述：</p>
                <!-- <input type="text" v-model="IDNumber" class = "input" placeholder="请输入公司简要描述"  maxlength = "20"/> -->
                <Input v-model="des" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入公司简要描述"/>
                <!-- <vue-editor v-model="content" @blur = "editorBlur" placeholder = "（选填）" :customToolbar = "customToolbar"></vue-editor> -->
            </div>
            <!-- <div class = "id-con">
                <div class = "face-con">
                    <p class = "info">上传公司证照正面：</p>
                    <div class = "img-not-uploaded-box">
                        <div class = "img-not-uploaded"></div>
                    </div>
                </div>
                <div class = "face-con">
                    <p class = "info">证件反面照：</p>
                    <div class = "img-not-uploaded-box">
                        <div class = "img-not-uploaded"></div>
                    </div>
                </div>
            </div> -->
            <!-- <div class = "con corp-id">
                <p class = "info">选择法人：</p>
                <RadioGroup v-model="superior" @on-change = "superiorChange">
                    <Radio label="platform">
                        <span>选择自己（默认）</span>
                    </Radio>
                    <Radio label="org">
                        <span>新建法人</span>
                    </Radio>
                </RadioGroup>
            </div> -->
            <footer>
                <div class = "back" @click.stop.prevent = "backToPerson">上一步</div>
                <div class = "next" @click = "toEditLegalPerson">下一步： 编辑法人信息</div>
            </footer>
        </div>

        <Modal
            v-model = "selectOrgShow"
            closable
            width='1000'
            @on-ok     = "selectOrgShow = false"
            footer-hide
            class-name = "create-modal">
            <join-in-org :JoinInOrgShow = "selectOrgShow" @chooseOrgBack = "chooseOrgBack" @superior-selected = "superiorSelected"></join-in-org>
        </Modal>
    </div>
</template>
<script>
// import { VueEditor } from "vue2-editor";
import ImgUpload from '@/components/ImgUpload';
import JoinInOrg from '@/components/JoinInOrg';
import {
    validateCName
} from '@/libs/validate.js';
export default {
    name: 'CreatePerson',
    data() {
        return {
            userName      : '',
            IDNumber      : '',
            logoModalTitle: '公司Logo',
            logoUploadId  : 'logoUploadId',
            des           : '',
            superior      : 'superior',
            selectOrgShow : false,
            corpBase64Data : '',//公司证照正面,
            corpModalTitle : '公司证照正面',
            corpUploadId : 'corpUploadId',
            selectedMerchant : '',
            // content : '',
            // customToolbar: [
            //     ["bold", "italic", "underline"],
            //     // [{ list: "ordered" }, { list: "bullet" }],
            //     // ["image", "code-block"]
            // ]
        }
    },
    components : {
        ImgUpload,
        JoinInOrg,
        // VueEditor
    },
    methods : {
        editorBlur(){
            console.log(this.content)
        },
        superiorSelected(selectedSuperior){
            console.log(`selectedSuperior=${selectedSuperior}`);
            this.selectedMerchant = selectedSuperior
        },
        chooseOrgBack() {
            this.selectOrgShow = false;
        },
        //选择上级商户
        chooseUpper() {
            this.selectOrgShow = true
            // this.$emit('merchant-select-upper')
        },
        backToPerson() {
            this.$emit('back-to-person')
        },
        toEditLegalPerson() {
            this.$emit('to-legal')
        },
        logoBase64(base64) {
            console.log('logoBase64_base64:');
            console.log(base64);
            this.logoBase64Data = base64;
        },
        superiorChange() {
            console.log(this.superior)
            // if(this.superior == 'org') {
            //     this.selectOrgShow = true
            // }else{
            //     this.selectOrgShow = false
            // }
        },
        corpBase64(base64) {
            console.log('corpBase64_base64:')
            console.log(base64);
            this.corpBase64Data = base64
        },
        deleteCorp() {
            this.corpBase64Data = ''
        },
        deleteLogo() {
            this.logoBase64Data = ''
        }
    }
}
</script>
<style>
.create-modal .ivu-modal{
    display : flex;
    justify-content : center;
    align-items : center;
}
.create-modal .ivu-modal .ivu-modal-content{
    width : 80vw !important;
    height : 90vh !important;
    overflow : hidden !important;
}
.create-modal .ivu-modal .ivu-modal-content .ivu-modal-body{
    width : 90% !important;
    height : 90% !important;
}
</style>
<style lang= "less" scoped>
.create{
    width  : 100%;
    height : 100%;
    padding: 2.5% 0 0 2.5%;
    color  : #4A4A4A;
    .box {
        width : 95%;
        height: 95%;
        .header {
            width          : 100%;
            height         : 36px;
            display        : flex;
            justify-content: left;
            align-items    : center;
            .left {
                width       : 4px;
                height      : 36px;
                background  : linear-gradient(180deg,rgba(67,170,246,1) 0%,rgba(63,128,247,1) 100%);
                margin-right: .625rem /* 10/16 */;
            }
            .right {
                max-width  : 200px;
                font-size  : 18px;
                height     : 36px;
                line-height: 36px;
                text-align : center;
            }
        }
        .logo {
            width          : 100%;
            height         : 96px;
            display        : flex;
            justify-content: left;
            flex-direction : row;
            align-items    : top;
            margin         : 20px 0;
            cursor         : pointer;
            margin-bottom  : 8vh;
            .logo-title {
                /* color       : #4A4A4A;
                font-size   : 14px;
                margin-right: 20px; */
                width       : 140px;
                height      : 20px;
                font-size   : 14px;
                font-family : PingFangSC-Medium;
                font-weight : 500;
                color       : rgba(74,74,74,1);
                line-height : 20px;
                text-align  : right;
                margin-right : 15px;
            }
            .img-not-uploaded-box {
                width        : 96px;
                height       : 96px;
                background   : rgba(255,255,255,0.2);
                border-radius: 6px;
                border       : 1px solid #DEDEDE;
                .img-not-uploaded {
                    width              : 64px;
                    height             : 60px;
                    background-size    : contain;
                    background-position: center;
                    background-image   : url('./../../../assets/images/noData/imgNotUploaded.png');
                    @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                        background-image: url('./../../../assets/images/noData/imgNotUploaded@2x.png');
                    }
                    margin: 18px 16px;
                }
            }
        }
        .first {
            width : 100%;
            height:36px;
            background:rgba(248,231,28,0.12);
            border:1px solid;
            font-size : 14px;
            text-align : left;
            line-height : 36px;
            text-indent : 1em;
            margin : 20px;
            .choose {
                color : #48A8DA;
                border-bottom :1px solid  #48A8DA;
                cursor : pointer;
            }
        }
        .id-con {
            margin-bottom  : 6vh;
            display        : flex;
            flex-direction : row;
            justify-content: left;
            align-items    : center;
            height         : 153px;
            max-width      : 100%;
            .face-con {
                display        : flex;
                flex-direction : row;
                justify-content: left;
                /* align-items    : center; */
                height      : 153px;
                margin-right: 45px;
                .info {
                    width      : 140px;
                    height     : 20px;
                    font-size  : 14px;
                    font-family: PingFangSC-Medium;
                    font-weight: 500;
                    color      : rgba(74,74,74,1);
                    line-height: 20px;
                    text-align : right;
                    margin-right : 15px;
                }
                .img-not-uploaded-box {
                    width        : 240px;
                    height       : 153px;
                    background   : rgba(255,255,255,0.2);
                    border-radius: 6px;
                    border       : 1px solid #DEDEDE;
                    cursor       : pointer;
                    .img-not-uploaded {
                        width              : 64px;
                        height             : 60px;
                        background-size    : contain;
                        background-position: center;
                        background-image   : url('./../../../assets/images/noData/imgNotUploaded.png');
                        @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                            background-image: url('./../../../assets/images/noData/imgNotUploaded@2x.png');
                        }
                        margin: 46.5px 88px;
                    }
                }
            }
        }

        .con {
            margin         : 4vh 0;
            display        : flex;
            flex-direction : row;
            justify-content: left;
            align-items    : center;
            height         : 36px;
            .info {
                width      : 140px;
                height     : 20px;
                font-size  : 14px;
                font-family: PingFangSC-Medium;
                font-weight: 500;
                color      : rgba(74,74,74,1);
                line-height: 20px;
                text-align : right;
                margin-right : 15px;
            }
            .input {
                width        : 240px;
                height       : 36px;
                background   : rgba(255,255,255,0.2);
                border-radius: 6px;
                border       : 1px solid #1CA1C6;
                font-size    : 12px;
                line-height  : 36px;
                text-align   : left;
                text-indent  : 2em;
                outline      : none;                   //去掉Chromefocus边框
            }
        }

        footer {
            display        : flex;
            flex-direction : row;
            justify-content: left;
            width          : 100%;
            height         : 36px;
            div {
                cursor       : pointer;
                height       : 100%;
                text-align   : center;
                line-height  : 36px;
                font-size    : 18px;
                border-radius: 4px;
            }
            .back {
                color : #4A4A4A;
                border: 1px solid #DEDEDE;
                width : 160px;
            }
            .next {
                border       : 1px solid rgba(72,168,218,1);
                background   : rgba(72,168,218,1);
                border-radius: 4px;
                color        : #fff;
                width        : 272px;
                margin-left  : 30px;
            }
        }
    }
}
</style>
