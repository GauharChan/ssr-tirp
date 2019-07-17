<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in listData" :key="index" :data="item"></FlightsItem>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";

export default {
  data() {
    return {
      // 请求回来的机票数据
      flightsList: [],
      pageSize: 5,
      pageIndex: 1,
      total: 0,
      // 实际渲染的数据
      listData:[]
    };
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted() {
    this.$axios({
      url: "airs",
      params: this.$route.query
    }).then(res => {
      this.flightsList = res.data.flights;
      this.total = res.data.total;
      this.init();
    });
  },
  methods: {
    //   改变页面条数
    handleSizeChange(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.init()
    },
    //   改变页码数
    handleCurrentChange(val) {
      this.pageIndex = val
      this.init()
    },
    init() {
      //  第一页  0-5 条数据    第二页  5-10条数据
      const start = (this.pageIndex - 1) * this.pageSize
      const end = start + this.pageSize
      this.listData = this.flightsList.slice(start, end);
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>