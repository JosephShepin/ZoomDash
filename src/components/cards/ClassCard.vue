<template>
  <div class>
    <div v-if="timeLabel.length > 1">
      <div v-if="timeLabel.indexOf('~') > -1">
        <p style="margin-bottom: 11px">Meeting started {{ timeLabel.replaceAll("~","") }} ago</p>
      </div>
      <div v-else>
        <p style="margin-bottom: 11px">Meeting starting in {{ timeLabel }}</p>
      </div>
    </div>
    <div class="card">
      <div class="class-row">
        <div style>
          <div class="name-col">
            <div
              class="class-name"
              style="
                position: relative;
                top: 7px;
                transition: all 0.15s ease-in-out;
              "
              :style="{
                'text-decoration': done ? 'line-through' : 'none',
                color: done ? 'gray' : light ? '#2c3e50' : 'white',
              }"
            >
              {{ course.name }}
            </div>
            <div
              class
              style="
                padding-top: 10px;
                padding-left: 2px;
                color: #bdc3c7;
                font-size: 13px;
              "
            >
              {{ course.hour }}:{{ course.minute > 10 ? "" : "0"
              }}{{ course.minute }} {{ course.isAm ? "AM" : "PM" }}
            </div>
          </div>
        </div>

        <div class="info fadeIn" style="height: 55px">
          <div
            class
            style="
              display: flex;
              padding-top: 7px;
              align-items: center;
              align-content: center;
              align-content: center;
            "
          >
            <!--<div class v-if="viewType==1">-->
            <TimeInfo :course="course" />

            <div
              @click="setConfirm(true)"
              @mouseenter="hover = true"
              @mouseleave="hover = false"
              class="launch-row"
            >
              <div
                class="launch-button"
                :style="{ transform: hover ? 'scale(1.05)' : 'scale(1.0)' }"
              >
                Launch
              </div>
              <font-awesome-icon
                :style="{
                  transform: hover ? 'translatex(4px) scale(1.1)' : '',
                }"
                style="flex: 1; color: #2e8cff"
                class="launch-arrow"
                :icon="icons.faArrowRight"
              />
            </div>

            <!--</div>-->
            <!--<div v-else-if="viewType==0" class>-->
            <!--</div>-->
            <!--<div v-else class></div>-->

            <font-awesome-icon
              @click="openSettings()"
              class="settings-icon"
              :style="{ color: light ? '#34495E' : 'white' }"
              :icon="icons.faEllipsisV"
            />
            <settings-modal
              :light="light"
              :style="{ display: showModal ? 'block' : 'none' }"
              v-on:delete-class="deleteClass()"
              v-on:close-modal="showModal = false"
              v-on:save-settings="saveSettings($event)"
              :course="course"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="timeLabel.length > 1">
      <div class="divider"></div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TimeInfo from "../common/TimeInfo";
import SettingsModal from "../modals/SettingsModal";
import { faArrowRight, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
export default {
  data: function () {
    return {
      hover: false,
      icons: {
        faEllipsisV,
        faArrowRight,
      },
      showModal: false,
    };
  },

  props: {
    done: { required: false, default: false },
    light: { required: false, default: true },
    timeLabel: { required: false, type: String },
    course: { required: true, type: Object },
    viewType: { required: false, type: Number, default: 0 },
  },

  components: {
    SettingsModal,
    TimeInfo,
    FontAwesomeIcon,
  },

  methods: {
    saveSettings(data) {
      this.$emit("save-settings", {
        name: data.name,
        link: data.link,
        selectedDays: data.selectedDays,
        hour: data.hour,
        minute: data.minute,
        id: this.course.id,
        isAm: data.isAm,
      });
    },
    deleteClass(event) {
      this.$emit("delete-class", this.course.id);
    },

    openSettings() {
      this.showModal = true;
    },

    setConfirm(value) {
      this.$emit("launch-confirm", this.course);
    },

    getDate() {
      var today = new Date();
      var month = today.getMonth();
      var day = today.getDate();
      var year = today.getFullYear();
      return Date.parse(
        `${month + 1}/${day}/${year} ${this.hour}:${this.minute} ${
          c.isAm ? "AM" : "PM"
        }`
      );
    },
  },
};
</script>