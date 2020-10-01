<template>
  <div class="segmented-control" :style="{'background': greyed ?  (light ? '#e5e7e9' : '#2F3137')  :   (light ? '#e5e7e9' : '#202225')}">
    <div
      v-for="(icon,index) in icons"
      :key="index"
      class="segmented-control-option"
      @click="$emit('segmented-control-click',index)"
    >
      <font-awesome-icon
        :style="{'color': (greyed ? '#BFC9CA': (light ? 'black' : 'white'))}"
        :class="{'ungreyed' : !greyed}"
        style="padding: 13px 16px; position:relative; top:0px;"
        :icon="icon"
      />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  props: {
    light: {required: false, default: true},
    greyed: { required: false, type: Boolean, default: false },
    icons: { required: true },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped>
.segmented-control-divider {
  width: 1px;
  height: 40px;
}
.segmented-control-option {
  width: 50px;
  text-align: center;
  flex: 1;
  padding: 7px 0px;
}

.ungreyed {
  transition: 0.2s ease-in-out all;
}

.ungreyed:hover {
  transform: scale(1.109);
}

.segmented-control {
  transition: all 0.15s ease-in-out;
  margin-left: 8px;
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 8px;
}
</style>
