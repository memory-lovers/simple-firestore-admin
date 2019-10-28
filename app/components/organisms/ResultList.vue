<template>
  <div v-if="items.length > 0">
    <b-field label="Enter some fields">
      <b-taginput
        v-model="fields"
        :data="filteredFields"
        autocomplete
        icon="label"
        @typing="getFiltered"
      ></b-taginput>
    </b-field>

    <b-table
      :data="items"
      :loading="loading"
      :total="total"
      paginated
      backend-pagination
      :per-page="parPage"
      pagination-position="both"
      detailed
      detail-key="id"
      default-sort="id"
      mobile-cards
      @page-change="onPageChange"
    >
      <template slot-scope="props">
        <template v-for="field in allFields">
          <b-table-column
            :field="field == 'id' ? field : `data.${field}`"
            :label="field.toUpperCase()"
            sortable
            :key="field == 'id' ? field : `data.${field}`"
            :visible="fields.indexOf(field) > -1"
          >{{ field == 'id' ? props.row.id : props.row.data[field] }}</b-table-column>
        </template>

        <b-table-column field="action" label="Action" width="110">
          <b-button
            type="is-info"
            :loading="loading"
            :disabled="loading"
            icon-left="pencil"
            @click="sendEdit(props.row)"
          />
          <b-button
            type="is-danger"
            :loading="loading"
            :disabled="loading"
            icon-left="delete"
            @click="sendDel(props.row)"
          />
        </b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <div>
          <pre>{{props.row.data}}</pre>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "nuxt-property-decorator";

@Component
export default class ResultList extends Vue {
  @Prop({ required: true }) items!: any[];
  @Prop({ default: false }) loading!: boolean;
  @Prop({ default: false }) hasNext!: boolean;
  @Prop({ default: 0 }) identifer!: number;

  private parPage: number = 20;
  private page: number = 1;
  private fields: string[] = ["id"];
  private filteredFields: string[] = [];
  private allFields: string[] = [];

  // ****************************************************
  // * computed
  // ****************************************************
  private get total() {
    if (this.hasNext) return this.items.length + this.parPage;
    else return this.items.length;
  }

  // ****************************************************
  // * methods
  // ****************************************************
  private async onPageChange(page: number) {
    this.page = page;
    if (this.page != 1 && this.items.length < (this.page - 1) * this.parPage) {
      this.sendLoad();
    }
  }

  private getFiltered(text: string) {
    this.filteredFields = this.allFields.filter(v => {
      return v.toLowerCase().indexOf(text.toLowerCase()) >= 0;
    });
  }

  // ****************************************************
  // * emit
  // ****************************************************
  @Emit("load")
  private sendLoad() {}

  @Emit("edit")
  private sendEdit(item: any) {
    return item;
  }

  @Emit("del")
  private sendDel(item: any) {
    return item;
  }

  // ****************************************************
  // * watch
  // ****************************************************
  @Watch("identifer")
  private onChangeIdentifer() {
    if (this.items.length > 0) {
      this.allFields = ["id"].concat(Object.keys(this.items[0].data));
    } else {
      this.allFields = ["id"];
    }
  }
}
</script>

<style lang="scss" scoped>
</style>