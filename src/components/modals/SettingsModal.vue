<template>
  <div id="SettingsModal" class="modal">
    <div class="settings-modal-content" :style="{'background': light ? 'white' : '#373940'}">
      <span class="close" @click="closeModal()">&times;</span>
      <div style="max-width:485px; padding-left:1px">
        <h1 class="modal-title">Settings</h1>
        <br>
        <div class="group" style="margin-top:-25px;">
          <input
            :style="{'color': light ? 'black' : 'white'}"
            type="text"
            class="class-name-input"
            v-on:keyup="localCourse.name = $event.target.value"
            required
            :value="localCourse.name"
          />
          <span class="bar"></span>
          <label>Class Name</label>
        </div>

        <div class="group">
          <input
            :style="{'color': light ? 'black' : 'white'}"
            :value="localCourse.link"
            type="text"
            class="zoom-link-input"
            v-on:keyup="zoomLinkKeyup($event.target.value)"
            required
          />
          <span class="bar"></span>
          <label>Zoom Link</label>
        </div>
      </div>
      <date-time-picker :light="light" :course="localCourse" v-on:time-change="updateTime($event)" />
      <br />
      <div class style="display:flex;">
        <div class style="flex:1;"></div>
        <div
          @click="save()"
          :style="{'background-color':isComplete? '#2ECC71' :'rgb(46, 204, 113,0.6)'}"
          class="big-btn"
        >
          <div class="button-label">Save</div>
        </div>
        <div
          @click="deleteClass()"
          style="background-color: #E74C3C; margin-left:7px"
          class="big-btn"
        >
          <div class="button-label">Delete</div>
        </div>

        <div class style="flex:1;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DateTimePicker from "../common/DateTimePicker.vue";

export default {
  components: {
    DateTimePicker,
  },
  props: {
    light: { required: false, default: true },
    course: { required: true, type: Object },
  },

  data: function () {
    return {
      localCourse: { ...this.course },
      weekDays: ["M", "T", "W", "T", "F", "S", "S"],
      timeComplete: true,
    };
  },

  computed: {
    isComplete() {
      return (
        this.timeComplete &&
        this.localCourse.link.length > 0 &&
        this.localCourse.name.length > 0
      );
    },
  },
  methods: {
    deleteClass() {
      if (
        confirm(
          "Are you sure you want to delete " + this.localCourse.name + "?"
        )
      ) {
        this.$emit("delete-class");
        this.closeModal();
      }
    },
    zoomLinkKeyup(value) {
      this.localCourse.link = value.toString().replace("#success", "");
      document.querySelector(".zoom-link-input").value = this.course.link;
    },

    updateTime(data) {
      this.localCourse.selectedDays = data.selectedDays;
      this.localCourse.hour = data.hour;
      this.localCourse.minute = data.minute;
      this.localCourse.isAm = data.isAm;
      this.timeComplete = data.isComplete;
    },

    save() {
      if (this.isComplete) {
        this.closeModal();
        this.$emit("save-settings", {
          name: this.localCourse.name,
          link: this.localCourse.link,
          selectedDays: this.localCourse.selectedDays,
          hour: this.localCourse.hour,
          minute: this.localCourse.minute,
          id: this.localCourse.id,
          isAm: this.localCourse.isAm,
        });
      }
    },

    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
<style >
.big-btn {
  height: 40px;
  width: 150px;
  border-radius: 7px;
  transition: all 0.15s ease-in-out;
}

.big-btn:hover {
  transform: scale(1.02);
}
</style>