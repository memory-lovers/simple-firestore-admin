<template>
  <div class="main-container">
    <ToolBar />

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import ToolBar from "~/components/organisms/ToolBar.vue";

@Component({ components: { ToolBar } })
export default class extends Vue {
  // ****************************************************
  // * computed
  // ****************************************************
  // ****************************************************
  // * methods
  // ****************************************************
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>
