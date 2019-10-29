<template>
  <nav class="navbar header has-shadow is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item has-text-weight-bold" href="/">
        <span>Simple Firebase Admin</span>
      </a>

      <div class="navbar-burger" v-if="false">
        <span />
        <span />
        <span />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class ToolBar extends Vue {}
</script>