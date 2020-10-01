<template>
  <div class="" style=" font-family: 'Metropolis';">
    <top-nav />
    <br />

    <div style="margin: auto; max-width: 1000px">
      <div class style="font-size: 45px; margin: auto; text-align:center;">Privacy and Transparency</div>
      <br />
      <br />
      <div class="miniwrapper privacy-card" style="">
         <div style="padding: 3px; text-align: center; min-width: 300px">
        <img
          class=""
          style="width: 80px"
          src="../../src/static/gitLogo.png"
        />
        <img
          style="padding-left: 5px; position: relative; top: 2px; width: 80px"
          src="../../src/static/mitLogo.png"
        />
        <br />
        <br />
        <div class="title">Open sourced</div>
        <br />
        <div class="point" style="max-width:500px; margin: auto; line-height:1.4;">All of the code is publically available on github and MIT licensed</div>
      </div>
        <div class style="display: flex">
          <div class style="flex: 1; text-align: center"></div>
          <a
            style="text-decoration: none; color: #2e8cff"
            href="https://github.com/jshepin/ZoomDash"
            target="_blank"
            class="round-button"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
          >
            <div
              style="
                transition: all 0.15s ease-in-out;
                position: relative;
                top: 8px;
                font-weight: 500;
              "
              :style="{ transform: hover ? 'scale(1.05)' : 'scale(1.0)' }"
            >
              View on github
            </div>
          </a>
          <div class style="flex: 1"></div>
        </div>
      </div>

      <br />
      <div class="privacy-card">
        <div class="mini-title">
          We believe your data is yours, not ours for that reason, we do not
          store any of your data at all. It is all stored on your browser. To
          clear it out, change your cookie settings or clear your browsing data.
        </div>
      </div>

      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowRight,
  faLock,
  faLink,
  faQuestion,
  faRocket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import TopNav from "./TopNav.vue";
export default {
  components: {
    TopNav,
    FontAwesomeIcon,
  },
  data: function () {
    return {
      icons: {
        faArrowRight,
        faLock,
        faQuestion,
        faLink,
        faUser,
        faRocket,
      },
    };
  },
};
</script>

<style scoped>
@import "../css/home.css";

@font-face {
  font-family: "Metropolis";
  src: local("Metropolis"), url("../fonts/Metropolis-Medium.otf");
}

.privacy {
  padding: 5px;
  font-family: "Metropolis";
}
.privacy-card {
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin: auto;
  max-width: 700px;
}

.mini-title {
  font-size: 20px;
  line-height: 1.4;
}
.point {
  font-size: 21px;
  padding-bottom: 20px;
}
</style>


