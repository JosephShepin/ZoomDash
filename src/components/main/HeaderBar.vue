<template>
  <div class>
    <div class="title-row">
      <div class="title">{{getGreeting()}}</div>
      <div class="controls">
        <segmented-control
          :light="light"
          v-on:segmented-control-click="newClass()"
          :icons="[icons.faPlus]"
        />
        <!--<segmented-control
          :light="light"
          :greyed="greyed"
          v-on:segmented-control-click="changeInformation($event)"
          :icons="[icons.faClock, icons.faLink]"
        />-->
      </div>
    </div>
  </div>
</template>
<script>
import {
  faClock,
  faLink,
  faPlus,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import SegmentedControl from "../common/SegmentedControl.vue";

export default {
  components: {
    SegmentedControl
  },

  props: {
    greyed: { required: false, type: Boolean, default: false },
    light: { required: false, defualt: true }
  },
  methods: {
    getGreeting() {
      var today = new Date();
      var curHr = today.getHours();

      if (curHr < 12) {
        return "Good Morning";
      } else if (curHr < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    },
    newClass() {
      this.$emit("new-event");
    },
    changeInformation(event) {
      this.$emit("change-information", event);
    }
  },
  data: function() {
    return {
      icons: {
        faEyeSlash,
        faClock,
        faLink,
        faPlus
      }
    };
  }
};
</script>

<style  scoped>
.title {
  font-size: 40px;
  margin-left: -3px;
  font-weight: 500;
  padding-top: 5px;
  padding-bottom: 15px;
}

.title-row {
  display: flex;
  align-items: center;

  justify-content: space-between;
}

@media screen and (max-width: 500px) {
  .title-row {
    flex-direction: column;
    padding-bottom: 15px;
  }
}
</style>