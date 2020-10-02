<template>
  <div class="">
    <img :src="require(`../../static/${image}.png`)" width="50" />
    <br />
    <br />
    <div  style="font-size: 23px">{{ title }}</div>
        <p class="notes">{{notes}}</p>
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
        notes: { type: String , required: false, default:""},

    buttonLabel: { type: String },
  },
};
</script>

<style scoped>
.notes{
    width:100%;
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