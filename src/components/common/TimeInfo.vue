<template>
  <div class="time-info">
   
    <div class="tiny-week-days">
      <div
        v-for="(day ,i) in weekDays"
        :key="i"
        class="tiny-week-day"
        style="color:grey;"
        :class="{'highlighted': course.selectedDays[i]==1}"
      >{{day}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: { course: { required: true, type: Object } },
  data: function () {
    return {
      weekDays: ["M", "T", "W", "T", "F", "S", "S"],
    };
  },
};
</script>

<style scoped>
.tiny-week-days {
  /*padding-top: 5px;*/
  display: flex;
}

.time-info {
  padding-right:18px;
}

.tiny-week-day {
  padding-left: 5px;
}
.highlighted {
  color: #2e8cff !important;
}
.tiny-time-row{
  /*padding-top: 2px;*/
}
</style>
