<template>
  <div id="MainSettingsModal" class :style="{'color': light ? 'black' : 'white'}">
    <div class="settings-modal-content" :style="{'background': light ? 'white' : '#373940'}">
      <span class="close" @click="closeModal()">&times;</span>
      <div style="max-width:485px; padding-left:1px">
        <h1 class="modal-title">Settings</h1>
        <br />
        <div class="setting">Theme</div>
        <hr />
        <div @click="$emit('toggle')">
          <segmented-control style="width:50px; margin-left:0px;" :icons="[icons.faAdjust]" />
        </div>
        <br />
        <br />

        <div class="setting">Desktop Notifications</div>
        <hr />
        <p>Permission Status: {{permission.substring(0,1).toUpperCase() + permission.substring(1)}}</p>
        <div
          style="color:gray; padding-bottom:14px; margin-top:-10px; line-height:1.3"
        >{{permissionLabel}}</div>
        <div  style="display:flex; justify-content:flex-start; margin-top:-5px;">
          <div @click="test()" style="background-color:#2ECC71" class="big-btn">
            <div class="button-label">Test</div>
          </div>
          <div
            @click="checkPermission()"
            style="background-color:#2ECC71; margin-left:6px;"
            class="big-btn"
          >
            <div class="button-label">Check Again</div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import DateTimePicker from "../common/DateTimePicker.vue";
import SegmentedControl from "../common/SegmentedControl.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faClock,
  faLink,
  faPlus,
  faAdjust
} from "@fortawesome/free-solid-svg-icons";
export default {
  components: {
    FontAwesomeIcon,
    SegmentedControl
  },
  props: {
    light: { required: false, default: true }
  },

  data: function() {
    return {
      permission: "",
      permissionLabel: "",
      icons: {
        faAdjust
      }
    };
  },

  methods: {
    checkPermission() {
      this.$notification.requestPermission().then(s => (this.permission = s)); // Prints "granted", "denied" or "default"
    },

    test() {
      const notification = {
        title: "Congrats, it works",
        options: {
          body: "This is a test notification from zoomdash"
        },
        events: {
          onclick: () => {
            this.permissionLabel = "Test completed successfully";
          },
          onshow: () => {
            this.permissionLabel =
              "Check your desktop for the test notification and click it, if you don't see anything, make sure to allow notifications";
          }
        }
      };
      console.log("showing notification");
      this.$notification.show(
        notification.title,
        notification.options,
        notification.events
      );
    },

    closeModal() {
      this.$emit("close-modal");
    }
  },

  mounted() {
    this.checkPermission();
  }
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