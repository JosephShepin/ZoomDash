<template>
  <div class="picker">
    <div class style="margin-top: 30px"></div>
    <div class="week-days">
      <div style="flex: 1" class></div>
      <div
        v-for="(day, i) in weekDays"
        :key="i"
        @click="toggleDay(i)"
        class="week-day"
        :class="{
          unselected: localCourse.selectedDays[i] != 1 && light,
          'unselected-dark': localCourse.selectedDays[i] != 1 && !light,
        }"
        :style="{
          borderColor:
            localCourse.selectedDays[i] == 1 ? '#2e8cff' : 'lightgrey',
        }"
      >
        <div class style="position: relative; top: 14px">{{ day }}</div>
      </div>
      <div class style="flex: 1"></div>
    </div>
    <div style="margin-top: 30px"></div>
    <div class></div>
    <div class style="display: flex">
      <div class style="flex: 1"></div>
      <div class style="display: flex; align-items: center">
        <div class="group">
          <input
            maxlength="2"
            v-on:keyup="hour = $event.target.value; emitTime();"
            class="input-small hour-input"
            style="width: 25px"
            type="text"
            min="1"
            :value="hour"
            max="12"
            required
            :style="{ color: light ? 'black' : 'white' }"
          />
          <span class="bar-small"></span>
          <label>Hr</label>
        </div>
        <div class style="margin: 4px; font-weight: bold">:</div>
        <div class="group">
          <input
            maxlength="2"
            :style="{ color: light ? 'black' : 'white' }"
            :value="minute"
            v-on:keyup="
              minute = $event.target.value;
              minuteEdited = true;
               emitTime();
            "
            class="input-small minute-input"
            min="1"
            max="59"
            style="width: 25px"
            type="text"
            required
          />
          <span class="bar-small"></span>
          <label>Min</label>
        </div>
      </div>
      <div
        class="am"
        :class="{
          unselected: isAm && light,
          'unselected-dark': isAm && !light,
        }"
        :style="{ 'border-color': isAm ? '#2e8cff' : 'lightgrey' }"
        @click="
          isAm = true;
          emitTime();
        "
      >
        <div style="position: relative; top: 7px; font-size: 16px">AM</div>
      </div>
      <div
        class="pm"
        :class="{
          unselected: isAm && light,
          'unselected-dark': isAm && !light,
        }"
        :style="{ 'border-color': !isAm ? '#2e8cff' : 'lightgrey' }"
        @click="
          isAm = false;
          emitTime();
        "
      >
        <div class style="position: relative; top: 7px; font-size: 16px">PM</div>
      </div>

      <div class style="flex: 1"></div>
    </div>
    <br />
  </div>
</template>
<script>
export default {
  props: {
    course: { required: false, type: Object },
    light: { required: false, default: true }
  },
  data: function() {
    return {
      minuteEdited: false,
      localCourse: this.course != null ? { ...this.course } : {},
      isComplete: true,
      isAm: this.course == null ? true : this.course.isAm,
      hour: this.course == null ? 12 : this.course.hour,
      minute: this.course == null ? 0 : this.course.minute,
      selectedDays:
        this.course == null ? [1, 1, 1, 1, 1, 0, 0] : this.course.selectedDays,
      weekDays: ["M", "T", "W", "T", "F", "S", "S"]
    };
  },

  computed: {
    complete() {
      return (
        this.hour > 0 &&
        this.hour <= 12 &&
        this.minute >= 0 &&
        this.minute < 60 &&
        this.minute.toString().length > 0 &&
        this.hour.toString().length > 0 &&
        this.localCourse.selectedDays.includes(1)
      );
    }
  },
  methods: {

    Unfocus() {
      if (this.hour < 1) {
        this.hour = 1;
        document.querySelector(".hour-input").value = "1";
      }
      alert(this.hour);
    },

    toggleDay(i) {
      var changed = [];
      var count = 0;
      for (var x of this.localCourse.selectedDays) {
        if (count == i) {
          changed.push(x == 1 ? 0 : 1);
        } else {
          changed.push(x);
        }
        count++;
      }

      this.localCourse.selectedDays = changed;
      this.emitTime();
    },

    hourUnfocus() {
      var hours = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ];
      if (!hours.includes(this.hour)) {
        this.hour = 12;
      }
    },
    hourKeyup(value) {
      this.hour = value;
      this.emitTime();
    },
    minuteKeyup(value) {
      this.minute = value;
      this.emitTime();
    },

    emitTime() {
      var s = this.complete;
      var min = this.minute;
      var hour = this.hour;
      //console.log(s);
      if (this.minute.toString() == "00") {
        min = 0;
      }
      console.log((this.minute.toString().length > 1))
        if ((this.minute.toString().length > 1) && (this.minute.toString().substring(0,1) == "0")) {
          console.log("YES")
        min = this.minute.toString() % 10;
      }
      min = parseInt(min);
      hour = parseInt(hour)


      this.$emit("time-change", {
        selectedDays: this.localCourse.selectedDays,
        hour: hour,
        minute: min,
        isAm: this.isAm,
        isComplete: s
      });
    }
  }
};
</script>

<style>


.pm {
  padding-left: 10px;
}
.pm,
.am {
  transition: 0.1s all ease-in-out;
  border: solid 1px;
  height: 28px;
  width: 28px;
  text-align: center;
  border-radius: 100px;
  margin-left: 5px;

  padding: 5px;
  position: relative;
}

.week-days {
  justify-content: space-between;
  padding-top: 15px;
  /* background: white; */
  display: flex;
}

.week-day {
  margin-right: 7px;
  text-align: center;
  width: 41px;
  height: 41px;
  border: 1px solid;
  border-radius: 90px;
  /* background: white; */
  transition: 0.1s all ease-in-out;
}

.unselected:hover {
  background: #e5e7e9;
}

.unselected-dark:hover {
  background: #202225;
}
</style>