<template>
    <div class = "scss-func">
        <div class = "child"></div>
    </div>
</template>
<script>
  export default {
      
  }
</script>
<style lang = "scss" scoped>
@function vh($height) {
    @return ($height/1080*100) + vh;
}
@function vw($width) {
    @return ($width/1920*100) + vw;
}
.scss-func{
    width : vw(800);
    height : vh(800);
    background : green;
    display : flex;
    justify-content : center;
    align-items: center;
    .child {
        width : vw(400);
        height : vh(400);
        background : pink;
    }
}
</style>