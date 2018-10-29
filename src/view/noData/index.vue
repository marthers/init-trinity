<template>
    <div class = "nodata-index">
        <div class = "con" @click.stop.prevent = "twoClicked('join')">
            <div class = "icon join"></div>
            <div class = "word">申请加入已有组织</div>
        </div>
        <div class = "con" @click.stop.prevent = "twoClicked('create')">
            <div class = "icon create"></div>
            <div class = "word">创建新组织</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NoDataIndex',
    data() {
        return {

        }
    },
    methods : {
        twoClicked(type) {
            console.log(`type=${type}`)
            this.$emit('two-clicked',type)
        }
    }
}
</script>
<style lang= "less" scoped>
.nodata-index{
    width           : 100%;
    height          : 100%;
    border          : 10px inset blueviolet;
    display         : flex;
    justify-content : center;
    align-items     : center;
    flex-direction  : column;
    background-color: #fff;
    .con {
        width          : 384px;
        height         : 98px;
        background     : rgba(255,255,255,1);
        border-radius  : 12px;
        border         : 1px solid #DEDEDE;
        margin         : 20px;
        overflow       : hidden;
        display        : flex;
        justify-content: left;
        align-items    : center;
        flex-direction : row;
        cursor         : pointer;
        .icon {
            width              : 60px;
            height             : 60px;
            background-size    : contain;
            background-position: center;
            margin             : 0 30px;
        }
        .join {
            background-image: url('./../../assets/images/noData/joinOrg.png');
            @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                background-image: url('./../../assets/images/noData/joinOrg@2x.png');
            }
        }
        .create {
            background-image: url('./../../assets/images/noData/createOrg.png');
            @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
                background-image: url('./../../assets/images/noData/createOrg@2x.png');
            }
        }
        .word {
            font-size : 16px;
            color     : #505050;
            text-align: left;
            max-width : 300px;
        }
    }
}
</style>
