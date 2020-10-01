<template>
  <div id="myModal" class="modal">
    <div
      class="modal-content"
      :style="{
        background: light ? 'white' : '#373940',
        color: light ? 'black' : 'white',
      }"
    >
      <span class="close" @click="closeModal()">&times;</span>
      <div style="max-width: 485px; padding-left: 1px">
        <h1 class="modal-title" style>New Zoom</h1>
        <br />

        <div class="group" style="margin-top: -25px">
          <input
            :style="{ color: light ? 'black' : 'white' }"
            type="text"
            class="class-name-input"
            v-on:keyup="className = $event.target.value"
            required
            :value="className"
          />
          <span class="bar"></span>
          <label>Class Name</label>
        </div>
        <div class="group">
          <input
            :style="{ color: light ? 'black' : 'white' }"
            :value="zoomLink"
            type="text"
            class="zoom-link-input"
            v-on:keyup="zoomLinkKeyup($event.target.value)"
            required
          />
          <span class="bar"></span>
          <label>Zoom Link</label>
        </div>
      </div>
      <date-time-picker :light="light" v-on:time-change="updateTime($event)" :course="newClass" />
      <br />
      <div class style="display: flex">
        <div class style="flex: 1"></div>
        <div
          @click="done()"
          :style="{
            'background-color': isComplete
              ? '#2e8cff'
              : 'rgb(46, 140, 255,0.5)',
          }"
          class="create-btn"
        >
          <div class="button-label">Done</div>
        </div>
        <div class style="flex: 1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DateTimePicker from "../common/DateTimePicker.vue";

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
  components: {
    DateTimePicker
  },
  data: function() {
    return {
      timeComplete: true,
      isAm: true,
      className: "",
      zoomLink: "",
      hour: 12,
      minute: 0,
      selectedDays: [1, 1, 1, 1, 1, 0, 0]
    };
  },
  props: {
    light: { required: false, default: true },
    newClass: { required: true }
  },
  computed: {
    isComplete() {
      var atLeastOne = false;
      for (var x of this.selectedDays) {
        if (x == 1) {
          atLeastOne = true;
        }
      }
      return (
        this.className.length > 0 &&
        this.zoomLink.length > 0 &&
        this.timeComplete
      );
    }
  },
  methods: {
    zoomLinkKeyup(value) {
      this.zoomLink = value.toString().replace("#success", "");
    },

    updateTime(data) {
      this.selectedDays = data.selectedDays;
      this.hour = data.hour;
      this.minute = data.minute;
      this.isAm = data.isAm;
      this.timeComplete = data.isComplete;
    },
    done() {
      if (this.isComplete) {
        this.$emit("create-class", {
          name: this.className,
          link: this.zoomLink,
          selectedDays: this.selectedDays,
          hour: this.hour,
          minute: this.minute,
          isAm: this.isAm
        });
        this.className = "";
        this.zoomLink = "";
        this.selectedDays = [1, 1, 1, 1, 1, 0, 0];
        this.hour = 12;
        this.minute = 0;
        document.getElementById("myModal").style.display = "none";
      }
    },

    closeModal() {
      document.getElementById("myModal").style.display = "none";
    }
  }
};
</script>

<style >
.create-btn {
  height: 40px;
  width: 150px;
  border-radius: 7px;
  transition: all 0.15s ease-in-out;
}

.create-btn:hover {
  transform: scale(1.03);
}
</style>