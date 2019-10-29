<template>
  <div>
    <div>
      <b-field label="Collection">
        <b-input v-model="collection" size="is-small"></b-input>
      </b-field>

      <b-field label="Where">
        <b-field grouped>
          <b-input v-model="whereField" size="is-small"></b-input>

          <b-select v-model="whereOp" size="is-small">
            <template v-for="op in whereOps">
              <option :value="op" :key="op">{{op}}</option>
            </template>
          </b-select>

          <InputFieldType v-model="whereValue" :type="whereType" />

          <b-select v-model="whereType" size="is-small">
            <template v-for="type in fieldTypes">
              <option :value="type" :key="type">{{type}}</option>
            </template>
          </b-select>
        </b-field>
      </b-field>

      <b-field label="OrderBy">
        <b-field grouped>
          <b-input v-model="orderField" size="is-small"></b-input>
          <b-select v-model="orderType" size="is-small">
            <template v-for="type in orderTypes">
              <option :value="type" :key="type">{{type}}</option>
            </template>
          </b-select>
        </b-field>
      </b-field>

      <b-field>
        <p class="control btn-search">
          <b-button :loading="loading" :disabled="loading" @click="onClear">Clear</b-button>
          <b-button
            type="is-primary"
            :loading="loading"
            :disabled="loading"
            @click="onConfirm"
          >Search</b-button>
        </p>
      </b-field>
    </div>
    <div class="form-preview">{{ preview }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "nuxt-property-decorator";
import { SelectRequest } from "~/types";
import { WHERE_OP, ORDER_TYPE, FIELD_TYPE } from "~/src/enums";
import InputFieldType from "~/components/atom/InputFieldType.vue";
import { strFieldValue } from "~/src/FieldValueHelper";

@Component({ components: { InputFieldType } })
export default class SearchForm extends Vue {
  @Prop({ default: false }) loading!: boolean;

  private whereOps: WHERE_OP[] = [WHERE_OP.EQ, WHERE_OP.LT, WHERE_OP.GT];
  private orderTypes: ORDER_TYPE[] = [ORDER_TYPE.ASC, ORDER_TYPE.DESC];
  private fieldTypes: FIELD_TYPE[] = [
    FIELD_TYPE.STR,
    FIELD_TYPE.NUM,
    FIELD_TYPE.BOOL
  ];

  private collection: string = "";
  private whereField: string = "";
  private whereOp: WHERE_OP = WHERE_OP.EQ;
  private whereValue: string = "";
  private whereType: FIELD_TYPE = FIELD_TYPE.STR;

  private orderField: string = "";
  private orderType: ORDER_TYPE | null = null;

  // ****************************************************
  // * computed
  // ****************************************************
  private get preview() {
    let preview = `collection("${this.collection}")`;
    if (!!this.whereField && !!this.whereValue) {
      const val = strFieldValue(this.whereType, this.whereValue);
      preview += `where("${this.whereField}", "${this.whereOp}", ${val})`;
    }
    if (!!this.orderField && !!this.orderType) {
      preview += `orderBy("${this.orderField}", "${this.orderType}")`;
    }
    return preview;
  }
  // ****************************************************
  // * methods
  // ****************************************************
  private onConfirm() {
    if (!this.loading) this.emitConirm();
  }

  private onClear() {
    this.collection = "";
    this.whereField = "";
    this.whereOp = WHERE_OP.EQ;
    this.whereValue = "";
    this.whereType = FIELD_TYPE.STR;

    this.orderField = "";
    this.orderType = null;
  }

  // ****************************************************
  // * emit
  // ****************************************************
  @Emit("confirm")
  private emitConirm(): SelectRequest {
    const item: SelectRequest = { collection: this.collection };

    if (!!this.whereField && !!this.whereValue) {
      item.whereField = this.whereField;
      item.whereOp = this.whereOp;
      item.whereValue =
        this.whereType === FIELD_TYPE.NUM
          ? Number(this.whereValue)
          : this.whereValue;
    }

    if (!!this.orderField && !!this.orderType) {
      item.orderField = this.orderField;
      item.orderType = this.orderType;
    }

    return item;
  }
}
</script>

<style lang="scss" scoped>
// ****************************
// * Part
// ****************************
.btn-search {
  text-align: right;
}

.form-preview {
  background-color: lightgray;
  margin: 1rem 0.2rem;
  padding: 0.5rem;
}

// ****************************
// * Flex Layout
// ****************************
</style>