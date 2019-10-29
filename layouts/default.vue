<template>
  <div class="main-container">
    <ToolBar />

    <section class="main-content">
      <nuxt />
    </section>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import ToolBar from "~/components/organisms/ToolBar.vue";
import Footer from "~/components/organisms/Footer.vue";

@Component({ components: { ToolBar, Footer } })
export default class extends Vue {}
</script>

<style lang="scss" scoped>
html,
body {
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
}

.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>