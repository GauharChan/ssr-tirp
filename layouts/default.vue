<template>
  <div>
    <Header></Header>
    <nuxt />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/head";
import Footer from "@/components/foot";
export default {
  components: {
    Header,
    Footer
  },
  mounted(){
    console.log(this.$store.state.user);
  }
};
</script>
<style src="../assets/normalize.css"></style>
<style>
a {
  text-decoration: none;
  color: black;
}
input{
  outline: none;
  border: none;
}
</style>

