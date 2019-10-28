<template>
  <section class="section">
    <div class="search-form-div">
      <SearchForm :loading="loading" @confirm="onConfirm" />
    </div>
    <hr />
    <div>
      <ResultList
        :identifer="identifer"
        :items="items"
        :hasNext="hasNext"
        :loading="loading"
        @load="loadData"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { SearchFormItem, SearchResult, ResultData } from "~/types";

import SearchForm from "~/components/molecules/SearchForm.vue";
import ResultList from "~/components/organisms/ResultList.vue";

@Component({ components: { SearchForm, ResultList } })
export default class IndexPaage extends Vue {
  private loading: boolean = false;
  private items: ResultData[] = [];
  private req: SearchFormItem | null = null;
  private hasNext: boolean = false;
  private identifer: number = 0;

  // ****************************************************
  // * computed
  // ****************************************************

  // ****************************************************
  // * methods
  // ****************************************************
  private async onConfirm(request: SearchFormItem) {
    console.info(`onConfirm: request=${JSON.stringify(request, null, 2)}`);
    try {
      this.loading = true;
      const res = await this.$axios.post("/api/search", request);

      this.items = res.data.result;
      this.req = request;
      this.hasNext = res.data.result.length > 0;

      this.identifer += 1;
    } catch (error) {
      console.error(`Error: ${error}`, error);
    } finally {
      this.loading = false;
    }
  }
  private async loadData() {
    console.info(`loadData`);
    try {
      this.loading = true;

      if (!this.hasNext || !this.req) return;

      const last = this.items[this.items.length - 1];
      const order = this.req.orderField;
      const lastId = !!order ? last.data[order] : last.id;
      const param = Object.assign({}, this.req, { lastId: lastId });

      const res = await this.$axios.post("/api/search", param);
      console.info(`res=${JSON.stringify(res, null, 2)}`);

      this.items.push(...res.data.result);
      this.hasNext = res.data.result.length > 0;
    } catch (error) {
      console.error(`Error: ${error}`, error);
    } finally {
      this.loading = false;
    }
  }
}
</script>


<style lang="scss" scoped>
.search-form-div {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
