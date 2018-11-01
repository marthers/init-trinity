<template>
    <div class = "orgs-con" v-if = "JoinInOrgShow">
        <header class = "header">
            <div class = "left"></div>
            <div class="right">
                {{
                    title
                }}
            </div>
        </header>
        <Input 
            search 
            enter-button 
            v-model.trim = "searchContent"
            placeholder="搜索您想选择的商户关键字" 
            @on-enter = "searchEnter"
            @on-search = "searchEnter"
            @on-keyup = "searchContent=searchContent.replace(/(^\s+)|(\s+$)/g,'')"
            class = "search"/>
        <div class = "list-con">
            <div :class = "[index%2 == 0 ? 'single' : 'double',selectedIndex == index ? 'selected' : 'not-selected' ,'item-con']" v-for = "(item,index) in orgList" :key = "index" @click.stop.prevent = "selectedIndex = index">
                {{
                    item.name
                }}
            </div>
        </div>
        <footer>
            <div class = "back" @click.stop.prevent = "backToIndex">返回</div>
            <div class = "submit" @click = "submitChoose">确定</div>
        </footer>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          title : '',
          onlyChooseOrg : false,
          orgList : [
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              },
              {
                  name : 'sss回家看大厦的世界开始的机会'
              }
          ],
          selectedIndex : -1,
          searchContent : ''
      }
    },
    props : {
        JoinInOrgShow : {
            type : Boolean,
            default : true
        }
    },
    methods: {
        searchEnter() {
            console.log(`this.searchContent=${this.searchContent}`)
        },
        backToIndex() {
            this.$emit('chooseOrgBack')
            this.selectedIndex = -1;
            this.searchContent = ''
        },
        submitChoose() {
            console.log(`this.selectedIndex=${this.selectedIndex}`);
            if(this.selectedIndex != -1) {
                this.$emit('superior-selected',this.orgList[this.selectedIndex].name)
            }
            this.selectedIndex = -1;
            this.searchContent = ''
            this.$emit('chooseOrgBack')
        }
    },
    mounted() {
        this.onlyChooseOrg = true;
        if(this.onlyChooseOrg) {
            this.title = '选择加盟商户（平台和大商户）'
        }else{
            this.title = '选择加入商户（平台、大商户、商户所有'
        }
    }
  }
</script>
<style lang = "less" scoped>
.orgs-con {
    width : 100%;
    height : 100%;
    padding : 20px;
    .header {
        width          : 100%;
        height         : 36px;
        display        : flex;
        justify-content: left;
        align-items    : center;
        margin : 20px 0;
        .left {
            width       : 4px;
            height      : 36px;
            background  : linear-gradient(180deg,rgba(67,170,246,1) 0%,rgba(63,128,247,1) 100%);
            margin-right: .625rem /* 10/16 */;
        }
        .right {
            max-width  : 80%;
            font-size  : 18px;
            height     : 36px;
            line-height: 36px;
            text-align : center;
        }
    }
    .search {
        margin : 20px 0;
        .ivu-input-search{
            background-color : #48A8DA !important;
        }
    }
    .list-con {
        width : 100%;
        height : 80%;
        overflow : hidden;
        overflow-y : auto;
        border : 1px solid #DEDEDE;
        .item-con {
            width : 100%;
            height : 48px;
            line-height : 48px;
            text-align : left;
            text-indent : 60px;
            cursor : pointer;
            color : #4A4A4A;
        }
        /* .item-con:hover {
            background:rgba(72,168,218,1);
            color : #fff;
        } */
        .selected {
            background:rgba(72,168,218,1) !important;
            color : #fff !important;
        }
        .single {
            background : #FFF;
        }
        .double {
            background:rgba(222,222,222,0.2);
        }
    }
    .list-con::-webkit-scrollbar {/*滚动条整体样式*/
        width:6px;
        height:6px;
        background:rgba(222,222,222,1);
        border-radius:6px;
    }
    .list-con::-webkit-scrollbar-thumb {
        width:39px;
        /* height:6px; */
        background:rgba(72,168,218,1);
        border-radius:3px;
    }
    /*滚动条里面轨道*/
    .list-con::-webkit-scrollbar-track {
        width:6px;
        /* height:100%; */
        background:rgba(222,222,222,1);
        border-radius:6px;
    }

    footer{
        margin-top : 40px;
        width : 100%;
        height : 38px;
        justify-content : left;
        align-items : center;
        display : flex;
        flex-direction : row;
        div {
            width:160px;
            height:36px;
            line-height :36px;
            text-align : center;
            background:rgba(255,255,255,1);
            border-radius:4px;
            border:1px solid #DEDEDE;
            font-size : 18px;
            color : #4A4A4A;
            margin-right: 30px;
            cursor : pointer;
        }
        .submit {
            color : #FFF;
            background-color : #48A8DA;
        }
    }
}
</style>