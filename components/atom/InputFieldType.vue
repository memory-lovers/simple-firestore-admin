<template>
  <b-input
    v-if="type === FIELD_TYPE.STR"
    :key="FIELD_TYPE.STR"
    :value="value"
    @input="onChangeValue"
    size="is-small"
    expanded
  />

  <b-input
    v-else-if="type === FIELD_TYPE.NUM"
    :key="FIELD_TYPE.NUM"
    type="number"
    :value="value"
    @input="onChangeValue"
    size="is-small"
    expanded
  />

  <b-select
    v-else-if="type === FIELD_TYPE.BOOL"
    :key="FIELD_TYPE.BOOL"
    :value="value"
    @input="onChangeValue"
    size="is-small"
    expanded
  >
    <option :value="true">true</option>
    <option :value="false">false</option>
  </b-select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "nuxt-property-decorator";
import { FIELD_TYPE } from "~/src/enums";

@Component
export default class InputFieldType extends Vue {
  private FIELD_TYPE = FIELD_TYPE;

  @Prop({ default: FIELD_TYPE.STR }) type!: FIELD_TYPE;
  @Prop({ default: "" }) value!: string | number | boolean;

  // ****************************************************
  // * computed
  // ****************************************************

  // ****************************************************
  // * methods
  // ****************************************************

  // ****************************************************
  // * emit
  // ****************************************************
  @Emit("input")
  private onChangeValue(val: string | number | boolean) {
    return val;
  }

  @Watch("type")
  private onChangeType(type: FIELD_TYPE) {
    this.onChangeValue("");
  }
}
</script>

<style lang="scss" scoped>
// ****************************
// * Part
// ****************************

// ****************************
// * Flex Layout
// ****************************
</style>