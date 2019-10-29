<template>
  <section class="section">
    <div class="search-form-div">
      <SearchForm :loading="loading" @confirm="onConfirm" />
    </div>
    <hr />
    <div>
      <div class="notification is-danger" v-if="!!error">
        <button class="delete" @click="error = ''"></button>
        <span>{{error}}</span>
      </div>
      <ResultList
        :identifer="identifer"
        :items="items"
        :hasNext="hasNext"
        :loading="loading"
        @load="loadData"
        @edit="onClickEdit"
        @del="onClickDel"
      />
    </div>

    <b-modal
      :active.sync="modalEditActive"
      has-modal-card
      aria-role="dialog"
      aria-modal
      :can-cancel="!loading"
    >
      <ModalEdit
        :item="modalEditItem"
        :error="modalEditError"
        :loading="loading"
        @confirmEdit="edit"
      />
    </b-modal>

    <b-modal
      :active.sync="modalDeleteActive"
      has-modal-card
      aria-role="dialog"
      aria-modal
      :can-cancel="!loading"
    >
      <ModalDelete
        :item="modalDeleteItem"
        :error="modalDeleteError"
        :loading="loading"
        @confirmDelete="del"
      />
    </b-modal>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { UpdateRequest, DeleteRequest, SelectRequest, DocData } from "~/types";

import SearchForm from "~/components/molecules/SearchForm.vue";
import ResultList from "~/components/organisms/ResultList.vue";
import ModalEdit from "~/components/organisms/ModalEdit.vue";
import ModalDelete from "~/components/organisms/ModalDelete.vue";

@Component({ components: { SearchForm, ResultList, ModalEdit, ModalDelete } })
export default class IndexPaage extends Vue {
  private loading: boolean = false;
  private items: DocData[] = [];
  private req: SelectRequest | null = null;
  private hasNext: boolean = false;
  private identifer: number = 0;
  private error: string = "";

  // modalEdit
  private modalEditActive: boolean = false;
  private modalEditItem: object = {};
  private modalEditError: string = "";

  // modalDelete
  private modalDeleteActive: boolean = false;
  private modalDeleteItem: object = {};
  private modalDeleteError: string = "";

  // ****************************************************
  // * computed
  // ****************************************************

  // ****************************************************
  // * methods: onClick
  // ****************************************************
  private async onConfirm(request: SelectRequest) {
    console.info(`onConfirm: request=${JSON.stringify(request, null, 2)}`);
    try {
      this.loading = true;

      const res = await this.$axios.post("/api/select", request);

      if (!res.data || !res.data.result) return;
      // set response
      this.items = res.data.result;
      this.req = request;
      this.hasNext = res.data.result.length > 0;
      this.error = "";

      // reset ResultList
      this.identifer += 1;
    } catch (error) {
      if (!!error.response) {
        console.error(`Error: ${error.response.data.msg}`, error.response);
        this.error = `${error.response.data.msg}`;
      } else {
        console.error(`Error: ${error}`, error);
        this.error = `${error}`;
      }
    } finally {
      this.loading = false;
    }
  }

  private async onClickEdit(item: any) {
    console.info(`onClickEdit: item=${JSON.stringify(item, null, 2)}`);
    this.modalEditActive = true;
    this.modalEditItem = item;
    this.modalEditError = "";
  }

  private async onClickDel(item: any) {
    console.info(`onClickDel: item=${JSON.stringify(item, null, 2)}`);
    this.modalDeleteActive = true;
    this.modalDeleteItem = item;
    this.modalDeleteError = "";
  }

  // ****************************************************
  // * methods
  // ****************************************************
  private async loadData() {
    console.info(`loadData`);
    try {
      this.loading = true;

      if (!this.hasNext || !this.req) return;

      const last = this.items[this.items.length - 1];
      const param = Object.assign({}, this.req, { lastItem: last });

      const res = await this.$axios.post("/api/select", param);

      if (!res.data || !res.data.result) return;
      this.items.push(...res.data.result);
      this.hasNext = res.data.result.length > 0;
      this.error = "";
    } catch (error) {
      if (!!error.response) {
        console.error(`Error: ${error.response.data.msg}`, error.response);
        this.error = `${error.response.data.msg}`;
      } else {
        console.error(`Error: ${error}`, error);
        this.error = `${error}`;
      }
    } finally {
      this.loading = false;
    }
  }

  private async edit(request: UpdateRequest) {
    console.info(`edit: ${JSON.stringify(request, null, 2)}`);
    if (!request.collection || !request.docId) return;

    let res;
    try {
      this.loading = true;
      res = await this.$axios.post("/api/delete", request);

      // apply changes
      const index = this.items.findIndex(v => v.id === request.docId);
      request.param.forEach(v => {
        this.items[index].data[v.field] = v.value;
      });

      this.modalEditActive = false;
      this.modalEditError = "";
    } catch (error) {
      if (!!error.response) {
        console.error(`Error: ${error.response.data.msg}`, error.response);
        this.modalEditError = `${error.response.data.msg}`;
      } else {
        console.error(`Error: ${error}`, error);
        this.modalEditError = `${error}`;
      }
    } finally {
      this.loading = false;
    }
  }

  private async del(request: DeleteRequest) {
    console.info(`del: ${JSON.stringify(request, null, 2)}`);
    if (!request.collection || !request.docId) return;

    let res;
    try {
      this.loading = true;
      res = await this.$axios.post("/api/delete", request);

      // apply changes
      const index = this.items.findIndex(v => v.id === request.docId);
      this.items.splice(index, 1);

      this.modalDeleteActive = false;
      this.modalDeleteError = "";
    } catch (error) {
      if (!!error.response) {
        console.error(`Error: ${error.response.data.msg}`, error.response);
        this.modalDeleteError = `${error.response.data.msg}`;
      } else {
        console.error(`Error: ${error}`, error);
        this.modalDeleteError = `${error}`;
      }
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
