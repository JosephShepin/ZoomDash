<template>
  <div class="main">
    <top-nav :showApp="true" :showLeft="true" />
    <br />
    <img
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      style="border-radius: 5px; width: 100%"
      :src="require(`../static/${name}.gif`)"
    />
  </div>
</template>
<script>
import TopNav from "./TopNav.vue";

export default {
  props: ["name"],
  components: {
    TopNav,
  },
};
</script>

<style scoped>
@import "../css/home.css";

.main {
  font-family: "Metropolis";
}
</style>
