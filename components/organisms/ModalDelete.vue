<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">DELETE</p>
    </header>
    <section class="modal-card-body">
      <div class="notification is-danger" v-if="!!error">
        <button class="delete"></button>
        <span>{{ error }}</span>
      </div>

      <div>Are you sure you want to delete it?</div>

      <div class="preview-item">
        <pre>{{ previewItem }}</pre>
      </div>

      <div class="preview-item">
        <pre>{{ previewPath }}</pre>
      </div>
    </section>

    <footer class="modal-card-foot">
      <b-button :loading="loading" @click="$parent.close()">Close</b-button>
      <b-button type="is-danger" :loading="loading" @click="onClickConfirm">Delete</b-button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
import { ResultData, DeleteRequest } from "~/types";

@Component
export default class ModalDelete extends Vue {
  @Prop({ required: true }) item!: ResultData;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: "" }) error!: string;

  // ****************************************************
  // * computed
  // ****************************************************
  private get previewItem() {
    return JSON.stringify(this.item.data, null, 2);
  }
  private get previewPath() {
    return `collection("${this.item.collection}").doc("${this.item.id}").delete()`;
  }
  // ****************************************************
  // * methods
  // ****************************************************
  // ****************************************************
  // * emit
  // ****************************************************
  @Emit("confirmDelete")
  private onClickConfirm(): DeleteRequest {
    return {
      collection: this.item.collection,
      docId: this.item.id
    };
  }
}
</script>

<style lang="scss" scoped>
// ****************************
// * Part
// ****************************
.preview-item {
  margin-top: 1rem;
  max-height: 30vh;
  overflow: hidden;
  pre {
    height: 100%;
    max-height: 30vh;
    overflow: scroll;
  }
}

.modal-card-foot {
  justify-content: flex-end;
}
</style>