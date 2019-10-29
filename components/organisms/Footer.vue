<template>
  <footer class="footer is-fluid">
    <a class="footer-item" href="https://memory-lovers.com" target="_blank" rel="noopener">
      <span>Memory Lovers.</span>
    </a>
    <a
      class="footer-item"
      href="https://github.com/memory-lovers/simple-firestore-admin"
      target="_blank"
      rel="noopener"
    >
      <b-icon pack="fab" icon="github"></b-icon>
    </a>
    <a class="footer-item" href="https://twitter.com/MemoryLoverz" target="_blank" rel="noopener">
      <b-icon pack="fab" icon="twitter"></b-icon>
    </a>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
// ****************************
// * Part
// ****************************
.footer {
  padding: 6px 16px;
  text-align: right;
  font-size: 0.9rem;

  a {
    color: white;
    margin: 0 0.2rem;
  }
}
</style>