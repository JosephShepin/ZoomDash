<template>
  <div class="pane4">
    <div class="">
      <br />
      <div style="padding: 3px; text-align: center; min-width: 300px">
        <img
          class=""
          style="width: 80px"
          src="../../../src/static/gitLogo.png"
        />
        <img
          style="padding-left: 5px; position: relative; top: 2px; width: 80px"
          src="../../../src/static/mitLogo.png"
        />
        <br />
        <br />
        <div class="title">Open sourced</div>
        <br />
        <div class="point">Built by students, for students</div>
        <div class="point">MIT Licensed</div>

        <br />
      </div>
      <div class style="display: flex">
        <div class style="flex: 1; text-align: center"></div>
        <a
          style="text-decoration: none; color: #2e8cff"
          href="https://github.com/jshepin/ZoomDash"
          target="_blank"
          class="round-button"

        >
          <div
            style="
              transition: all 0.15s ease-in-out;
              position: relative;
              top: 8px;
              font-weight: 500;
            "
          >
            View on github
          </div>
        </a>
        <div class style="flex: 1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../../src/css/home.css";

.point {
  font-size: 20px;
  padding-bottom: 20px;
}
</style>