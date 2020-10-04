<template>
  <div class="main" >
    <top-nav :showApp="true" :showLeft="true" />
    <br>
    <div v-if="name == 'mac'">
      <div class="">
        <h1 style="margin-bottom: 10px; margin-top:-10px;">macOS download</h1>
        <br>
        <div class="step">1. Unzip Folder</div>
        <div class="step">2. Right Click > Open and cancel</div>
        <div class="step">3. Right Click Again > Open > Open</div>
        <div class="step">4. Drag icon into desktop or dock</div>
      </div>
    </div>
    <div v-else>
      <div class="">
        <h1 style="margin-bottom: 10px; margin-top:-10px;">Windows download</h1>
        <br>
        <div class="step">1. Unzip Folder</div>
        <div class="step">2. Open "Dash-Win" folder</div>
        <div class="step">3. Open "Dash" application</div>
        <div class="step">4. More info > run anyway"</div>
        <div class="step">5. Right click on application > create shortcut"</div>
        <div class="step">6. Drag shortcut onto desktop or task bar"</div>
        <i>Note: Make sure not to delete the original unzipped folder to keep app data</i>
      </div>
    </div>

    <br />
    <img
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      style="border-radius: 5px; width: 100%; max-width:1000px;"
      :src="require(`../static/${name}.gif`)"
    />
  </div>
</template>
<script>
import TopNav from "./TopNav.vue";

export default {
  props: ["name"],
  components: {
    TopNav,
  },
};
</script>

<style scoped>
@import "../css/home.css";

.main {
  font-family: "Metropolis";
  text-align: center;
}
.step {
  padding-bottom: 10px;
  font-size: 17px;
}
</style>
