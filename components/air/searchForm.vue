<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="searchForm.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="searchForm.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="searchForm.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      searchForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // 封装请求城市
    searchCity(value, cb, city, code) {
      // 如果输入为空，则不请求
      if (value.trim().length <= 0) return;
      // 请求输入对应的数据
      this.$axios({
        url: "airs/city",
        params: { name: value }
      }).then(res => {
        // 解构得到数据
        const { data } = res.data;
        let temp = [];
        if (data.length <= 0) {
          let obj = {};
          obj.value = "您输入搜索的城市名有误";
          temp.push(obj);
          this.searchForm[city] = "";
        } else {
          temp = data.map((e, i) => {
            // element中的远程搜索的匹配的列表是根据value属性这个关键字遍历显示value属性的值的，所以必须是e.value
            e.value = e.name.replace("市", "");
            return e;
          });
          this.searchForm[city] = temp[0].value;
          this.searchForm[code] = temp[0].sort;
        }
        cb(temp);
      });
    },

    // 封装选择列表城市
    listCity(item, city, code) {
      if (item.value === "您输入搜索的城市名有误") {
        this.searchForm[city] = "";
      } else {
        this.searchForm[city] = item.value;
        this.searchForm[code] = item.sort;
      }
    },

    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("该功能暂时还没开通，请敬请期待！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).catch(() => {});
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      // 调用封装好的搜索城市方法
      this.searchCity(value, cb, "departCity", "departCode");
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      // 调用封装好的搜索城市方法
      this.searchCity(value, cb, "destCity", "destCode");
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // 调用封装好的列表选择城市方法
      this.listCity(item, "departCity", "departCode");
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      // 调用封装好的列表选择城市方法
      this.listCity(item, "destCity", "destCode");
    },

    // 确认选择日期时触发
    handleDate(value) {
      // 调用原型链上的$moment对象,moment插件
      let time = this.$moment(value).format("YYYY-MM-DD");
      this.searchForm.departDate = time;
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.searchForm;
      this.searchForm.departCity = destCity;
      this.searchForm.destCity = departCity;
      this.searchForm.departCode = destCode;
      this.searchForm.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      if (!this.searchForm.departCity.trim()) {
        this.$message.warning("请输入出发城市");
      } else if (!this.searchForm.destCity.trim()) {
        this.$message.warning("请输入到达城市");
      } else if (!this.searchForm.departDate.trim()) {
        this.$message.warning("请输入出发时间");
      }else{
        let item = this.searchForm
        // 把数据存到本地
        // 首先拿本地的数据（如果有的话）
        let local = JSON.parse(localStorage.getItem('airs')) || []
        local.unshift(item)
        let arr = JSON.stringify(local)
        localStorage.setItem('airs',arr)
        // 跳转到flights
        this.$router.push(`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`)
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
