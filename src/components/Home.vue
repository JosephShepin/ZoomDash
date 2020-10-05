<template>
  <div class="home">
    <top-nav/>
    <div class="wrapper">
      <div class="spacer"></div>
      <div class="row1 miniwrapper">
        <div class style="margin-bottom: 30px; padding: 5px">
          <div>
            <div class="title">Welcome to ZoomDash</div>
            <br />
            <div class="subtitle">
              The easiest and most secure zoom-link organizer for students
            </div>
          </div>
          <br />
          <router-link class="routerLink" to="/app">
            <div
              class="round-button"
              @mouseenter="hover = true"
              @mouseleave="hover = false"
            >
              <div
                style="
                  transition: all 0.15s ease-in-out;
                  position: relative;
                  top: 8px;
                  right: -10px;
                  font-weight: 500;
                "
                :style="{ transform: hover ? 'scale(1.05)' : 'scale(1.0)' }"
              >
                Let's Go
              </div>
              <font-awesome-icon
                :style="{
                  transition: 'all 0.15s ease-in-out',
                  transform: hover ? 'translatex(4px) scale(1.1)' : '',
                }"
                style="position: relative; top: 7px; right: 10px"
                :icon="icons.faArrowRight"
                size="1x"
              />
            </div>
          </router-link>
<br>
          <br />
          <div class="" style="disply: flex">
            <img
              class=""
              style="padding-right: 20px"
              src="../static/windows.png"
              width="40"
            />
            <img
              class=""
              style="padding-right: 20px"
              src="../static/mac.png"
              width="40"
            />
            <img
              class=""
              style="padding-right: 20px"
              src="../static/browser.png"
              width="40"
            />
            <img
              class=""
              style="padding-right: 20px"
              src="../static/linux.png"
              width="40"
            />
          </div>
        </div>

        <br />
        <img class="img1" src="../static/img1.png" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div class="pane2">
        <br />
        <br />
        <div class="row1 miniwrapper">
          <div>
            <div class="title">Open Zoom Links Quickly</div>
            <br />
            <div class="subtitle">Join meetings conveniently with popups</div>
            <br />
            <ul>
              <li>Custom dates and times</li>
              <li>Automatic countdown timers</li>
              <li>Daily schedule</li>
            </ul>
          </div>
          <img class="img2" src="../static/img2.png" />
        </div>
      </div>
      <div class="pane3">
        <br />
        <br />
        <br />

        <div class="row1 miniwrapper">
          <div>
            <div class="title">Dark Mode</div>
            <br />
            <div style="color: #a6acaf; font-size: 20px">
              Live life in the dark with optional dark mode
            </div>
          </div>
          <img class="img3" src="../static/img3.png" />
        </div>
      </div>
    </div>
    <br />
    <div class="row1 miniwrapper">
      <git-card style="flex: 1;" />

      <div class="pane5" style="flex: 1;">
        <div style="padding: 10px; text-align: center">
          <br />
          <font-awesome-icon
            :icon="icons.faLock"
            size="4x"
            style="color: black; margin-bottom: 30px"
          />

          <div class="title">Secure And Private</div>
          <br />
          <div class="point">Only uses Local Storage</div>
          <div class="point">No login/signup</div>
          <div class="point">No databases or trackers</div>
        </div>

        <div class style="display: flex">
          <div class style="flex: 1; text-align: center"></div>
          <router-link class="routerLink" to="/privacy">
            <div
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
                Learn More
              </div>
            </div>
          </router-link>
          <div class style="flex: 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowRight,
  faClock,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import GitCard from "../components/cards/GitCard";
import TopNav from "./TopNav.vue";
export default {
  name: "Home",
  components: {
    TopNav,
    FontAwesomeIcon,
    GitCard,
  },
  data: function () {
    return {
      hover: false,

      icons: {
        faArrowRight,
        faClock,
        faLock,
      },
    };
  },
};
</script>

<style scoped>
@import "../css/home.css";

li {
  margin-left: -15px;
  padding-bottom: 30px;
  font-size: 20px;
}

.point {
  font-size: 20px;
  padding-bottom: 20px;
}
</style>