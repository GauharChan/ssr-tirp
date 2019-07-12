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
        <div class="post" @click="current = 1,$refs.inputFocus.focus()">攻略</div>
        <div class="hotel" @click="current = 2,$refs.inputFocus.focus()">酒店</div>
        <nuxt-link to="/air" class="air" @click="current = 1">机票</nuxt-link>
      </el-row>
      <el-input :placeholder="currentData" v-model="searchContent" ref="inputFocus" class="input-with-select">
        <el-button class="btn" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: null,
      searchContent: "",
      current: 1
    };
  },
  computed: {
    currentData() {
      return this.current == 1 ? "搜索城市" : "请输入城市搜索酒店";
    }
  },
  mounted() {
    this.$refs.inputFocus.focus();
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
  width: 400px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 999999999;
  // background-color: #bfa;
  .tab {
    overflow: hidden;
    .post,
    .hotel,
    .air {
      width: 50px;
      height: 50px;
      color: #fff;
      background: #4b5452;
      text-align: center;
      line-height: 50px;
      margin-right: 15px;
      cursor: pointer;

      &:after {
        content: "";
        display: block;
        width: 50px;
        height: 50px;
        background: #4b5452;
        transform: translate(7px, -43px) rotate(77deg);
        position: relative;
        z-index: -99999999;
      }
    }
  }
  .btn {
    background-color: #fff;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: rgb(149, 120, 151);
    // font-size: 16px;
  }
}
</style>