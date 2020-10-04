<template>
<div class="" style="flex-basis: 150px;">
    <img :src="require(`../../static/${image}.png`)" width="50" />
    <br />
    <br />

    <div style="font-size: 23px">{{ title }}</div>
    <p class="notes">{{ notes }}</p>
    <br />

    <div v-if="image == 'mac' || image == 'windows'">
      <div @click="router.push('gif/'+image)">
        <img
          @mouseenter="hover = true"
          @mouseleave="hover = false"
          style="border-radius: 5px; width: 100%"
          :src="require(`../../static/${image}.gif`)"
        />
        <div class="view-full" :style="{ opacity: hover ? '1' : '0.6' }">
          View Full
        </div>
      </div>
    </div>

    <br />
    <div @click="$emit('download')" class="round-button-small">
      <div
        style="
          transition: all 0.15s ease-in-out;
          position: relative;
          top: 5px;
          font-weight: 500;
        "
      >
        {{ buttonLabel }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: { type: String },
    title: { type: String },
    notes: { type: String, required: false, default: "" },
    buttonLabel: { type: String },
  },
  data: function () {
    return {
      hover: false,
    };
  },
  methods:{
  
  }
};
</script>

<style scoped>
.view-full {
  transition: all 0.15s ease-in-out;
  padding-top: 8px;
  color: grey;
}
.notes {
  width: 100%;
  font-size: 17px;
  line-height: 1.3;
}
.round-button-small {
  max-width: 120px;
  margin: auto;
  display: flex;
  align-content: center;
  justify-content: space-around;
  text-align: center;
  border: 2px solid #2e8cff;
  /* width: 100px; */
  border-radius: 40px;
  height: 25px;
  padding: 5px 10px;
  transition: all 0.2s ease-in-out;
}
</style>