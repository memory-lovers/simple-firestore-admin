<template>
  <section class="section">
    <div class="search-form-div">
      <SearchForm :loading="isSearch" @confirm="onConfirm" />
    </div>
    <hr />
    <div>
      <ResultList />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { SearchFormItem } from "~/types";

import SearchForm from "~/components/molecules/SearchForm.vue";
import ResultList from "~/components/organisms/ResultList.vue";

@Component({ components: { SearchForm, ResultList } })
export default class IndexPaage extends Vue {
  private isSearch: boolean = false;

  // ****************************************************
  // * computed
  // ****************************************************
  // ****************************************************
  // * methods
  // ****************************************************
  private onConfirm(item: SearchFormItem) {
    console.info(`onConfirm: item=${JSON.stringify(item, null, 2)}`);
  }
  // ****************************************************
  // * emit
  // ****************************************************
}
</script>


<style lang="scss" scoped>
// ****************************
// * Part
// ****************************
.search-form-div {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

// ****************************
// * Flex Layout
// ****************************
</style>
