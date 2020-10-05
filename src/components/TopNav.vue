<template>
  <div
    class="topnav"
    style="transition: 0.15s ease-in-out all; height: 70px"
    :style="{ background: light ? '#ffffff' : '#2F3137' }"
  >
    <router-link class="routerLink" to="/" style="">
      <div class="logo">Dash</div>
    </router-link>
    <div v-if="showLeft">
      <router-link class="routerLink" to="/privacy" style="margin-top:-5px">
        <a :style="{ color: light ? 'black' : 'white' }">Privacy</a>
      </router-link>
        <router-link class="routerLink" to="/install" style="margin-top:-5px; margin-left:-10px;">
        <a :style="{ color: light ? 'black' : 'white' }">Install</a>
      </router-link>
    </div>
    <div class="topnav-right">
      <div v-if="showApp">
        <router-link class="routerLink" to="/app">
          <div class="round-button-filled">
            <div
              class="open"
              style="
                transition: all 0.15s ease-in-out;
                position: relative;
                top: 6px;
                right: -10px;
                font-weight: 500;
              "
            >Open</div>
            <font-awesome-icon
              style="position: relative; top: 7px; right: 10px"
              :icon="icons.faArrowRight"
              size="1x"
            />
          </div>
        </router-link>
      </div>
      <div v-else>
        <div @click="$emit('open-settings')">
          <segmented-control
            :light="light"
            style="margin-right: 23px; margin-top: 9px; "
            :icons="[icons.faCog]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAdjust, faArrowRight , faCog} from "@fortawesome/free-solid-svg-icons";
import SegmentedControl from "./common/SegmentedControl";
export default {
  components: {
    SegmentedControl,
    FontAwesomeIcon
  },
  props: {
    showApp: { required: false, default: true },
    light: { required: false, default: true },
    showLeft: { required: false, default: true }
  },
  data: function() {
    return {
      icons: {
        faCog,
        faAdjust,
        faArrowRight
      }
    };
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "Metropolis";
  src: local("Metropolis"), url("../fonts/Metropolis-Medium.otf");
}

#app {
  font-family: "Metropolis";
}
.content {
  box-shadow: 0px 0px 23px 1px rgba(0, 0, 0, 0.15);
  margin: 10px 10px;
  padding: 7px 10px;
  border-radius: 15px;
}

.row1 {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.row2 {
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-around;
}

.spacer {
  height: 150px;
}


.logo {
  margin-right: -15px;
  margin-top: -5px;
  font-size: 40px;
  font-weight: 500;
  color: #2e8cff;
}

.img1 {
  width: 500px;

  border-radius: 10px;
  box-shadow: 0px 0px 23px 1px rgba(0, 0, 0, 0.15);
}

@media only screen and (max-width: 1000px) {
  .img1 {
    width: 400px;
  }
}

.routerLink {
  color: #2e8cff;
  text-decoration: none;
}

a {
  transition: all 0.1s ease-in-out;
}

a:hover {
  transform: scale(1.01);
}

.round-button-filled {
  display: flex;
  align-content: center;
  justify-content: space-around;
  text-align: center;
  color: white;
  background: #2e8cff;
  width: 140px;
  border-radius: 40px;
  height: 30px;
  margin-right: -4px;
  margin-top:-3px;
  padding: 5px;
  transition: all 0.2s ease-in-out;
}

.round-button:hover {
  transform: scale(1.02);
}


.title {
  font-size: 45px;
  font-weight: 600;
}

.subtitle {
  font-size: 20px;
  color: grey;
}

.topnav{
  padding-top: 5px;
    margin: -8px;

}

.topnav a {
  float: left;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav-right {
  float: right;
}
</style>