<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Update</p>
    </header>
    <section class="modal-card-body">
      <div class="notification is-danger" v-if="!!error">
        <button class="delete"></button>
        <span>{{error}}</span>
      </div>

      <div class="preview-item">
        <pre>{{previewItem}}</pre>
      </div>

      <div class="update-form">
        <template v-for="(data, index) in dataList">
          <b-field :key="index">
            <b-field grouped>
              <b-autocomplete
                v-model="data.field"
                open-on-focus
                :data="filteredFields(data.field)"
                size="is-small"
                @select="val => onSelectField(data, val)"
              />

              <InputFieldType v-model="data.value" :type="data.type" />

              <b-select v-model="data.type" size="is-small">
                <template v-for="type in fieldTypes">
                  <option :value="type" :key="type">{{type}}</option>
                </template>
              </b-select>

              <p class="control">
                <b-button
                  type="is-info"
                  outlined
                  size="is-small"
                  icon-right="plus"
                  :disabled="index < dataList.length  - 1"
                  @click="addRow()"
                ></b-button>
              </p>
              <p class="control">
                <b-button
                  type="is-danger"
                  outlined
                  size="is-small"
                  icon-right="close"
                  :disabled="dataList.length <= 1"
                  @click="delRow(index)"
                ></b-button>
              </p>
            </b-field>
          </b-field>
        </template>
      </div>

      <div>
        <pre>{{previewUpdate}}</pre>
      </div>
    </section>

    <footer class="modal-card-foot">
      <b-button :loading="loading" @click="$parent.close()">Close</b-button>
      <b-button type="is-primary" :loading="loading" @click="onClickConfirm">Confirm</b-button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "nuxt-property-decorator";
import {
  UpdateParam,
  ResultData,
  UpdateRequest,
  UpdateParamData
} from "~/types";
import { FIELD_TYPE } from "~/src/enums";

import InputFieldType from "~/components/atom/InputFieldType.vue";
import { strFieldValue, findFieldType } from "~/src/FieldValueHelper";

const flatten = require("flat");
const DEFAUT_ITEM: UpdateParamData = {
  field: "",
  value: "",
  type: FIELD_TYPE.STR
};

@Component({ components: { InputFieldType } })
export default class ModalEdit extends Vue {
  @Prop({ required: true }) item!: ResultData;
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: "" }) error!: string;

  private dataList: UpdateParam = [Object.assign({}, DEFAUT_ITEM)];
  private flattenData = flatten(this.item.data);

  private fieldTypes: FIELD_TYPE[] = [
    FIELD_TYPE.STR,
    FIELD_TYPE.NUM,
    FIELD_TYPE.BOOL
  ];

  // ****************************************************
  // * computed
  // ****************************************************
  private get previewItem() {
    if (!this.item) return "";
    else return JSON.stringify(this.item.data, null, 2);
  }

  private get previewUpdate() {
    let str = `collection("${this.item.collection}").doc("${this.item.id}").update({\n`;
    this.dataList.forEach(v => {
      str += `    "${v.field}": ${strFieldValue(v.type, v.value)}\n`;
    });
    str += "});";
    return str;
  }

  private filteredFields(val: string) {
    if (!this.item) return [];
    return Object.keys(this.flattenData).filter(option => {
      return option.toLowerCase().indexOf(val.toLowerCase()) >= 0;
    });
  }
  // ****************************************************
  // * methods
  // ****************************************************
  private addRow() {
    this.dataList.push(Object.assign({}, DEFAUT_ITEM));
  }

  private delRow(index: number) {
    this.dataList.splice(index, 1);
  }

  // ****************************************************
  // * methods: onClick
  // ****************************************************
  private onClickConfirm() {
    if (!!this.item) this.sendConfirmEdit();
  }

  private onSelectField(data: UpdateParamData, selected: string) {
    console.info(`onSelectField: selected=${selected}`);
    if (selected in this.flattenData) {
      const selectedData = this.flattenData[selected];
      data.type = findFieldType(selectedData);
      this.$nextTick(() => (data.value = selectedData));
    }
  }

  // ****************************************************
  // * emit
  // ****************************************************
  @Emit("confirmEdit")
  private sendConfirmEdit(): UpdateRequest {
    return {
      collection: !!this.item ? this.item.collection : "",
      docId: !!this.item ? this.item.id : "",
      param: this.dataList.map(v => {
        if (v.type === FIELD_TYPE.NUM) v.value = Number(v.value);
        return v;
      })
    };
  }

  // ****************************************************
  // * watch
  // ****************************************************
  @Watch("item")
  private onChangeItem() {
    this.item.collection = "books"
    this.dataList = [Object.assign({}, DEFAUT_ITEM)];
    this.flattenData = flatten(this.item.data);
  }
}
</script>

<style lang="scss" scoped>
// ****************************
// * Part
// ****************************
.update-form {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.preview-item {
  max-height: 30vh;
  overflow: hidden;
  pre {
    height: 100%;
    max-height: 30vh;
    overflow: scroll;
  }
}

// ****************************
// * Flex Layout
// ****************************
</style>