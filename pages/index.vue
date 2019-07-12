<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel trigger="click" height="700px" :interval="2000" :autoplay="true" arrow="always">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <div
          class="banner"
          :style="`background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat;background-size:contain contain`"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- Tab栏加搜索框 -->
    <main>
      <el-row type="flex" class="tab">
        <div>攻略</div>
        <!-- <div>酒店</div>
        <div>机票</div>-->
      </el-row>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: null
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    })
      .then(res => {
        if (res.status === 200) {
          this.images = res.data.data;
          // console.log(this.);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang='less' scoped>
.banner {
  height: 700px;
  overflow-y: hidden;
}
.el-carousel {
  overflow: hidden;
}
main {
  .tab {
    div {
      width: 50px;
      height: 50px;
      background: #bfa;
      text-align: center;
      line-height: 50px;
      &::after {
        content: "";
        display: block;
        width: 50px;
        height: 50px;
        background: #bfa;
        transform:translate(20px,6px) rotate(75deg) ;
        position: absolute;
        top:0px;
        left: -11px;
        z-index: -99999999;
      }
    }
  }
}
</style>