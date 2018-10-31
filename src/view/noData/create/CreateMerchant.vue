
<template>
    <div class="create">
        <div class = "box">
            <header class = "header">
                <div class = "left"></div>
                <div class="right">
                    编辑商户
                </div>
            </header>
            <div class = "id-con">
                <div class = "face-con">
                    <p class = "info">上传公司证照正面：</p>
                    <div class = "img-not-uploaded-box">
                        <div class = "img-not-uploaded"></div>
                    </div>
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
                <img-upload
                                          @base64   = "logoBase64"
                                        :modalTitle = "logoModalTitle"
                                        :uploadId   = "logoUploadId">
                </img-upload>
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
            <div class = "con corp-id">
                <p class = "info">选择上级：</p>
                <RadioGroup v-model="superior" @on-change = "superiorChange">
                    <Radio label="platform">
                        <Icon type="logo-apple"></Icon>
                        <span>运营平台（默认）</span>
                    </Radio>
                    <Radio label="org">
                        <Icon type="logo-android"></Icon>
                        <span>加入已有组织</span>
                    </Radio>
                </RadioGroup>
            </div>
            <footer>
                <div class = "back" @click.stop.prevent = "backToPerson">上一步</div>
                <div class = "next" @click = "toEditLegalPerson">下一步： 编辑法人信息</div>
            </footer>
        </div>

        <Modal
            title   = "Title"
            v-model = "selectOrgShow"
            closable
            @on-ok     = "selectOrgShow = false"
            class-name = "vertical-center-modal">
            <Input search enter-button placeholder="Enter something..." />
            <div></div>
        </Modal>
    </div>
</template>
<script>
import ImgUpload from '@/components/ImgUpload'
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
            selectOrgShow : false
        }
    },
    components : {
        ImgUpload
    },
    methods : {
        backToPerson() {
            this.$emit('back-to-person')
        },
        toEditLegalPerson() {
            this.$emit('to-legal')
        },
        logoBase64(base64) {
            console.log('logoBase64_base64:');
            console.log(base64)
        },
        superiorChange() {
            console.log(this.superior)
            if(this.superior == 'org') {
                this.selectOrgShow = true
            }
            const p = new Promise((resolve,reject) => {
                resolve(1);
                reject(2);
                resolve(3)
            })
            p.then(res => {
                console.log(`res:${res}`)
            }).catch(err => {
                console.log(`err=${err}`)
            })
        }
    }
}
</script>
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
