<template>
  <div class="" style="font-family: 'Metropolis'; text-align: center;">
    <top-nav />
    <br />

    <div class="title">Install</div>
    <br />
    <div class="subtitle">
      Download and install dash on your computer or browser
    </div>

    <br />
    <br />
    <div
      class=""
      style="display: flex; justify-content: space-around; flex-wrap: wrap; max-width:1200px; margin:auto;"
    >
      <InstallCard
        class="col"
        buttonLabel="Open"
        notes="No download needed"
        title="Online"
        v-on:download="$router.push('app')"
        image="browser"
      />
      <InstallCard
        class="col"
        buttonLabel="Download"
        title="Mac"
        v-on:download="downloadMac()"
        image="mac"
      />

      <InstallCard
        class="col"
        v-on:download="downloadWin()"
        buttonLabel="Download"
        title="Windows"
        image="windows"
      />

      <!-- <InstallCard
        class="col"
        buttonLabel="Coming Soon"
        title="Linux"
        image="linux"
      /> -->
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import InstallCard from "./common/InstallCard.vue";
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
    InstallCard,
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
  methods: {
    downloadMac() {
      window.open(
        "https://storage.googleapis.com/zoomdashdownloads/Dash-macOS.zip"
      );
    },
    downloadWin() {
      window.open(
        "https://storage.googleapis.com/zoomdashdownloads/Dash-Win.zip"
      );
    },
  },
};
</script>

<style scoped>
@import "../css/home.css";

@font-face {
  font-family: "Metropolis";
  src: local("Metropolis"), url("../fonts/Metropolis-Medium.otf");
}

.col {
  box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.08);

  flex: 1 1 300px;
  padding: 15px 15px 20px 15px;
  border-radius: 10px;

  margin: 5px;
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


