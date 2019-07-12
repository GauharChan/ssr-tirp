<template>
  <div>
    <el-carousel trigger="click" height="700px" :interval='2000' :autoplay="true" arrow="always">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <div class="banner" :style='`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;background-size:contain contain`'></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
        images:null
    };
  },
  mounted(){
    this.$axios({
      url:'/scenics/banners'
    })
    .then((res) => {
      if(res.status === 200){
        this.images = res.data.data
        // console.log(this.);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
};
</script>
<style lang='less' scoped>
    .banner{
        height: 700px;
        overflow-y: hidden;
    }
    .el-carousel{
        overflow: hidden;
    }
</style>