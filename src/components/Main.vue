<template >
  <div class="main">
    <top-nav
      :showApp="false"
      :showLeft="false"
      :light="light"
      v-on:toggle="light = !light"
      v-on:open-settings="mainSettingsModal = true"
    />

    <div id="app" style>
      <!-- <p>all classes {{ classes }}</p>
      <p>sorted classes {{ sortedClasses }}</p>
      <p>done classes {{ doneClasses }}</p>
      <p>Today classes {{ todayClasses }}</p>
      <p>future classes {{ futureClasses }}</p>
      <p>ordered classes {{ orderedClasses }}</p> -->
      <main-settings-modal
        v-on:toggle="light = !light"
        :light="light"
        v-on:close-modal="mainSettingsModal = false"
        :style="{ display: mainSettingsModal ? 'block' : 'none' }"
      />
      <div
        class="background-block"
        :style="{
          'background-color': light ? '#ffffff' : '#2F3137',
          color: light ? '#2c3e50' : 'white',
        }"
      />
      <br />
      <add-modal
        :light="light"
        :newClass="defaultClass"
        v-on:create-class="createClass($event)"
      />
      <div class style="margin: 5px 15px">
        <div
          v-if="!confirm"
          class="large-card"
          :style="{
            'background-color': light ? '#ffffff' : '#373940',
            color: light ? '#2c3e50' : 'white',
          }"
        >
          <HeaderBar
            :light="light"
            :greyed="
              classes.length == 0 || (todayView && todayClasses.length == 0)
            "
            v-on:new-event="newClass()"
          />
          <div class style="margin-top: -8px">
            <div v-if="classes.length > 0">
              <div v-if="classes.length > 0">
                <div class style="display: flex">
                  <div
                    class="time-label"
                    @click="todayView = true"
                    :style="{ color: label1Color }"
                  >
                    Today
                  </div>
                  <div
                    style="margin-left: 3px"
                    class="time-label"
                    :style="{ color: label2Color }"
                    @click="todayView = false"
                  >
                    All
                  </div>
                </div>
              </div>
            </div>
            <div v-if="classes.length == 0">
              <br />
              <img
                class="image-center"
                width="50"
                :src="require(`../static/${getImage()}`)"
              />
              <br />
              <div class="welcome">Welcome, get started by adding a class</div>

              <br />
            </div>
            <div
              v-else-if="
                classes.length > 0 && todayClasses.length == 0 && todayView
              "
            >
              <br />

              <img
                class="image-center"
                width="50"
                :src="require(`../static/${getImage()}`)"
              />
              <br />

              <div class="welcome">All clear, nothing upcoming today</div>

              <br />
            </div>
            <div v-for="c in todayView ? todayClasses : classes" :key="c.id">
              <class-card
                :timeLabel="
                  todayClasses.includes(c)
                    ? dateDifference(convertToDate(c), c)
                    : nothingLabel
                "
                :course="c"
                :light="light"
                v-on:launch-confirm="
                  selectedCourse = $event;
                  launchConfirm();
                "
                v-on:delete-class="deleteClass($event)"
                v-on:save-settings="saveSettings($event)"
              />
            </div>
            <div v-for="c in todayView ? doneClasses : []" :key="'done' + c.id">
              <class-card
                :done="true"
                :timeLabel="
                  todayClasses.includes(c)
                    ? dateDifference(convertToDate(c), c)
                    : nothingLabel
                "
                :course="c"
                :light="light"
                v-on:launch-confirm="
                  selectedCourse = $event;
                  launchConfirm();
                "
                v-on:delete-class="deleteClass($event)"
                v-on:save-settings="saveSettings($event)"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <div
            @click="openZoom()"
            class="confirm-div-circle"
            :style="{
              background: light ? 'white' : '#373940',
              color: light ? 'black' : 'white',
            }"
          >
            <div class="confirm-div">
              <div class style="font-size: 35px; padding: 6px 0px">
                {{
                  todayClasses.includes(selectedCourse)
                    ? dateDifference(
                        convertToDate(selectedCourse),
                        selectedCourse
                      )
                    : nothingLabel
                }}
              </div>

              <div class="confirm">{{ selectedCourse.name }}</div>

              <div
                class
                style="
                  font-size: 15px;
                  text-align: center;
                  color: grey;
                  padding: 10px 0px;
                "
              >
                {{ dateString() }}
              </div>
              <br />
              <div class="join-meeting">
                <div
                  class
                  style="position: relative; top: 12px; font-size: 17px"
                >
                  Join Meeting
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div
            class="dismiss"
            @click="confirm = false"
            :style="{ color: light ? 'gray' : 'white' }"
          >
            Dismiss
          </div>
        </div>
      </div>
    </div>

    <p style="display: none">{{ count }}</p>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import HeaderBar from "./main/HeaderBar.vue";
import AddModal from "./modals/AddModal.vue";
import SettingsModal from "./modals/SettingsModal.vue";
import ClassCard from "./cards/ClassCard.vue";
import TopNav from "./TopNav.vue";
import MainSettingsModal from "./modals/MainSettingsModal.vue";

class Class {
  constructor(name, link, selectedDays, hour, minute, isAm, id) {
    this.name = name;
    this.link = link;
    this.selectedDays = selectedDays;
    this.hour = hour;
    this.minute = minute;
    this.isAm = isAm;
    this.id = id;
  }
}
export default {
  name: "Main",
  data: function () {
    return {
      nothingLabel: "",
      mainSettingsModal: false,
      light: true,
      showNotification: true,
      last: [],
      todayView: true,
      count: 0,
      interval: null,
      selectedCourse: new Class("", "", [1, 1, 1, 1, 1, 0, 0], 12, 0, true, 0),
      confirm: false,
      icons: {
        faTimes,
      },
      classes: [],
      defaultClass: new Class("", "", [1, 1, 1, 1, 1, 0, 0], 12, 0, true, 0),
    };
  },
  components: {
    ClassCard,
    AddModal,
    MainSettingsModal,
    SettingsModal,
    HeaderBar,
    FontAwesomeIcon,
    TopNav,
  },
  destroyed() {
    clearInterval(this.interval);
  },

  computed: {
    label1Color() {
      if (this.todayView) {
        return "#2e8cff";
      } else {
        return "#909497";
      }
    },

    label2Color() {
      if (!this.todayView) {
        return "#2e8cff";
      } else {
        return "#909497";
      }
    },

    orderedClasses() {
      var s = this.count;
      return this.todayClasses.concat(this.futureClasses);
    },
    sortedClasses() {
      this.classes.sort((a, b) =>
        this.convertToDate(a) == this.convertToDate(b)
          ? 0
          : this.convertToDate(a) > this.convertToDate(b)
          ? 1
          : -1
      );
      return this.classes;
    },

    todayClasses() {
      var s = this.count;
      var todayClasses = [];
      for (var x of this.sortedClasses) {
        if (
          this.dateDifference(this.convertToDate(x), x).substring(0, 1) != "-"
        ) {
          if (new Date().getDay() == 0) {
            //if sunday
            if (x.selectedDays[6] == 1) {
              //if selected
              todayClasses.push(x);
            }
          } else {
            //its not sunday
            if (x.selectedDays[new Date().getDay() - 1] == 1) {
              todayClasses.push(x);
            }
          }
        }
      }
      return todayClasses;
    },

    doneClasses() {
      var s = this.count;

      var doneClasses = [];
      for (var x of this.sortedClasses) {
        if (
          this.dateDifference(this.convertToDate(x), x).substring(0, 1) == "-"
        ) {
          if (new Date().getDay() == 0) {
            //if sunday
            if (x.selectedDays[6] == 1) {
              //if selected
              doneClasses.push(x);
            }
          } else {
            //its not sunday
            if (x.selectedDays[new Date().getDay() - 1] == 1) {
              doneClasses.push(x);
            }
          }
        }
      }

      return doneClasses;
    },

    futureClasses() {
      var futureClasses = [];

      for (var x of this.sortedClasses) {
        if (new Date().getDay() == 0 && x.selectedDays[6] != 1) {
          //if selected
          futureClasses.push(x);
        } else if (x.selectedDays[new Date().getDay() - 1] == 1) {
          futureClasses.push(x);
        } else if (
          this.dateDifference(this.convertToDate(x), x).substring(0, 1) == "-"
        ) {
          futureClasses.push(x);
        }
      }
      return futureClasses;
    },
  },
  watch: {
    classes: {
      handler() {
        localStorage.setItem("classes", JSON.stringify(this.classes));
      },
      deep: true,
    },
    light: {
      handler() {
        localStorage.setItem("light-mode", JSON.stringify(this.light));
      },
      deep: true,
    },
  },

  mounted() {
    this.initializeCountdown();
    if (localStorage.getItem("classes") != null) {
      this.classes = JSON.parse(localStorage.getItem("classes"));
    }
    if (localStorage.getItem("light-mode") != null) {
      this.light = JSON.parse(localStorage.getItem("light-mode"));
    }

    this.defaultClass.id = this.generateId();
  },

  methods: {
    getImage() {
      var today = new Date();
      var curHr = today.getHours();

      if (curHr < 18) {
        return this.light ? "sun-light.png" : "sun-dark.png";
      } else {
        return this.light ? "moon-light.png" : "moon-dark.png";
      }
    },

    dateDifference(end, c) {
      var now = new Date();
      var total = end - now;

      var totalD = Math.abs(Math.floor(total / 1000));

      var years = Math.floor(totalD / (365 * 60 * 60 * 24));
      var months = Math.floor(
        (totalD - years * 365 * 60 * 60 * 24) / (30 * 60 * 60 * 24)
      );
      var days = Math.floor(
        (totalD - years * 365 * 60 * 60 * 24 - months * 30 * 60 * 60 * 24) /
          (60 * 60 * 24)
      );
      var hours = Math.floor(
        (totalD -
          years * 365 * 60 * 60 * 24 -
          months * 30 * 60 * 60 * 24 -
          days * 60 * 60 * 24) /
          (60 * 60)
      );
      var minutes = Math.floor(
        (totalD -
          years * 365 * 60 * 60 * 24 -
          months * 30 * 60 * 60 * 24 -
          days * 60 * 60 * 24 -
          hours * 60 * 60) /
          60
      );
      var seconds = Math.floor(
        totalD -
          years * 365 * 60 * 60 * 24 -
          months * 30 * 60 * 60 * 24 -
          days * 60 * 60 * 24 -
          hours * 60 * 60 -
          minutes * 60
      );

      var D = days < 1 ? "" : days + " Days ";
      var H = hours < 1 ? "" : hours + ":";
      var I = minutes < 1 ? "" : minutes + ":";
      var S = seconds < 1 ? "" : seconds + " ";
      var H = hours > 0 ? `${hours}:` : "";
      var I = `${minutes < 10 && hours > 0 ? "0" : ""}${minutes}:`;
      var S = `${seconds < 10 ? "0" : ""}${seconds}`;

      if (days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
        this.selectedCourse = c;
        this.launchConfirm();

        if (this.showNotification) {
          const notification = {
            title: "Join " + c.name,
            options: {
              body: "Click to open zoom",
            },
            events: {
              onerror: function () {
                console.log("Custom error event was called");
              },
              onclick: () => {
                this.confirm = false;
                window.open(c.link);
                console.log("Custom click event was called");
              },
              onshow: function () {
                console.log("Custom show event was called");
              },
            },
          };
          console.log("showing notification");
          this.$notification.show(
            notification.title,
            notification.options,
            notification.events
          );
          this.showNotification = false;
        } else {
        }
        return "OPEN";
      }
      this.showNotification = true;
      if (end < now) {
        // return ""
        return "-";
      }

      if (totalD < 60 * 15) {
        return D + H + I + S;
      } else {
        return "";
      }
    },

    dateString() {
      return `${this.selectedCourse.hour}:${
        this.selectedCourse.minute.toString().length == 1 ? "0" : ""
      }${this.selectedCourse.minute} ${this.selectedCourse.isAm ? "AM" : "PM"}`;
    },

    openZoom() {
      this.confirm = false;
      window.open(this.selectedCourse.link);
    },

    launchConfirm() {
      this.confirm = true;
    },

    convertToDate(c) {
      var today = new Date();
      var month = today.getMonth();
      var day = today.getDate();
      var year = today.getFullYear();
      return Date.parse(
        `${month + 1}/${day}/${year} ${c.hour}:${c.minute} ${
          c.isAm ? "AM" : "PM"
        }`
      );
    },
    stopCountdown() {
      clearInterval(this.interval);
    },

    initializeCountdown() {
      this.stopCountdown();
      this.interval = setInterval(() => {
        this.count > 1 ? this.count-- : this.count++;
      }, 1000);
    },

    saveSettings(data) {
      this.$set(
        this.classes,
        this.idToIndex(data.id),
        new Class(
          data.name,
          data.link,
          data.selectedDays,
          data.hour,
          data.minute,
          data.isAm,
          data.id
        )
      );
    },

    deleteClass(c) {
      this.$delete(this.classes, this.idToIndex(c));
    },

    idToIndex(i) {
      var classIndex = 100;

      var count = 0;
      for (var x of this.classes) {
        if (x.id == i) {
          classIndex = count;
        }
        count += 1;
      }
      return classIndex;
    },
    createClass(data) {
      this.classes.push(
        new Class(
          data.name,
          data.link,
          data.selectedDays,
          data.hour,
          data.minute,
          data.isAm,
          this.generateId()
        )
      );
      if (this.todayClasses.length == 0) {
        this.todayView = false;
      }
    },

    generateId() {
      var ids = [];
      for (var x of this.classes) {
        ids.push(x.id);
      }
      var largest = 0;
      for (var x of ids) {
        if (x > largest) {
          largest = x;
        }
      }
      return largest + 1;
    },

    newClass() {
      document.getElementById("myModal").style.display = "block";
    },
  },
};
</script>

<style>
@import "../css/main.css";
@font-face {
  font-family: "Metropolis";
  src: local("Metropolis"), url("../fonts/Metropolis-Medium.otf");
}

.main {
  font-family: "Metropolis";
}
.image-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>


<style  >
</style>