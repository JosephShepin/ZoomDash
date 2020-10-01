<template>
  <div class="home">
    <top-nav />
    <div class="wrapper">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style="text-align:center; font-size:60px">404</div>
      <br />
      <div
        style="text-align:center; font-size:25px; max-width:700px; margin: auto; line-height:1.4"
      >Oops. you have reached a dead end, make sure you have inputted a valid link</div>
    </div>
  </div>
</template>


<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowRight,
  faClock,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import TopNav from "./TopNav.vue";
export default {
  name: "Home",
  components: {
    TopNav,
    FontAwesomeIcon
  },
  data: function() {
    return {
      hover: false,

      icons: {
        faArrowRight,
        faClock,
        faLock
      }
    };
  }
};
</script>

<style scoped>
@import "../css/home.css";
</style>