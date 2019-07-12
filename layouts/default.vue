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
  }
};
</script>
<style src="../assets/normalize.css"></style>
<style>
a {
  text-decoration: none;
  color: black;
}
</style>

