<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm :insure="insure"></OrderForm>

      <!-- 侧边栏 -->
      <!-- <OrderAside></OrderAside> -->
    </el-row>
  </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm";
// import OrderAside from "@/components/air/OrderAside.vue";
export default {
  components: {
    OrderForm,
    // OrderAside
  },
  data() {
    return {
      insure:[]
    }
  },
  mounted(){
    const {id,seat_xid} = this.$route.query
    this.$axios({
      url:`airs/${id}`,
      params:{
        seat_xid
      }
    })
    .then((res) => {
      this.insure = res.data.insurances
    })
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>