<template>
  <div class="v-table" :style="{ height: height}">
    <div v-show="showFilter" class="v-table_filter">
      <slot name="filter" />
    </div>
    <div class="v-table_operation">
      <div>
        <slot name="operation" />
      </div>
      <div>
        <el-button-group>
          <el-button icon="el-icon-search" @click="showFilter = !showFilter" />
          <el-button icon="el-icon-refresh" @click="refresh" />
          <el-popover placement="bottom-end" width="150" trigger="click">
            <el-button slot="reference" icon="el-icon-s-grid" />
            <div>
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" label="全部"
                @change="handleCheckAllChange" />
              <el-checkbox-group v-model="checked" :min="1" @change="handleCheckedChange">
                <el-checkbox v-for="column in enabledColumns" :key="column.prop" :label="column.prop">
                  {{ column.label }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </el-popover>
        </el-button-group>
      </div>
    </div>
    <el-table ref="table" v-loading="loading" v-bind="$attrs" height="100%" v-on="$listeners" :data="limitData">
      <template v-for="column in selfShowColumns">
        <el-table-column :key="column.prop" :label="column.label" :prop="column.prop" v-bind="column.options">
          <template v-if="column.slot" v-slot="{ row }">
            <slot :name="column.slot" :row="row" />
          </template>
          <template v-if="column.slotHeader" v-slot:header="{ row }">
            {{column.label}}
            <slot :name="column.slotHeader" :row="row" />
            <input-search v-if="column.slotHeader ==='InputSearch'" :target="column" @inputClick="inputSearch">
            </input-search>
            <date-search v-if="column.slotHeader ==='DateSearch'" :target="column" @inputClick="inputSearch">
            </date-search>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
  import {
    InputSearch,
    DateSearch
  } from './components';
  export default {
    name: 'VTable',
    components: {
      InputSearch,
      DateSearch
    },
    props: {
      columns: {
        default: () => [],
        type: Array
      },
      data: {
        default: () => [],
        type: Array
      },
      loading: Boolean,
      height: {
        type: [Number, String],
        default: '100%'
      }
    },
    data() {
      return {
        showFilter: true,
        checked: [],
        checkAll: true,
        selfColumns: [],
        isIndeterminate: false,
        tableRef: null,
        filter_key: [],
        filter_value: []
      };
    },
    computed: {
      selfShowColumns() {
        return this.selfColumns.filter(data => data.visible !== false);
      },
      enabledColumns() {
        return this.selfColumns.filter(data => data.prop);
      },
      limitData() {
        if (!this.data || this.data.length == 0) {
          return this.data;
        }
        let targetData = JSON.parse(JSON.stringify(this.data));
        if (this.filter_key && this.filter_key.length > 0) {
          this.filter_key.forEach((value, index) => {
            if (this.filter_value[index]) {
              targetData = targetData.filter(v => {
                return v[value].indexOf(this.filter_value[index]) != -1
              })
            }
          })
          return targetData;
        } else {
          return targetData;
        }
      }
    },
    watch: {
      columns: {
        deep: true,
        immediate: true,
        handler(val) {
          this.selfColumns = JSON.parse(JSON.stringify(val));
          this.checked = this.selfColumns.filter(data => data.prop).map(data => data.prop);
        }
      },
      data: {
        deep: true,
        immediate: true,
        handler(val) {
          this.filter_key = [];
          this.filter_value = [];
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.tableRef = this.$refs.table;
      });
    },
    activated() {
      this.doTableLayout();
    },
    methods: {
      handleCheckedChange(value) {
        const checkedCount = value.length;
        this.checkAll = checkedCount === this.enabledColumns.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.enabledColumns.length;
        for (const data of this.enabledColumns) {
          if (value.includes(data.prop)) {
            this.$set(data, 'visible', true);
          } else {
            this.$set(data, 'visible', false);
          }
        }
        this.doTableLayout();
      },
      handleCheckAllChange() {
        this.checkAll = true;
        this.checked = this.enabledColumns.map(data => data.prop);
        for (const data of this.enabledColumns) {
          this.$set(data, 'visible', true);
        }
        this.doTableLayout();
      },
      doTableLayout() {
        this.$nextTick(() => {
          this.$refs.table.doLayout();
        });
      },
      refresh() {
        this.$emit('refresh');
      },
      inputSearch(data) {
        // debugger;
        let key = data.prop;
        let value = data.input;
        if (value) {
          if (this.filter_key.indexOf(key) == -1) {
            this.filter_key.push(key);
            this.filter_value.push(value);
          } else {
            this.filter_value[this.filter_key.indexOf(key)] = value;
          }
        } else {
          if (this.filter_key.indexOf(key) != -1) {
            let index = this.filter_key.indexOf(key);
            this.filter_key.splice(index, 1)
            this.filter_value.splice(index, 1)
          }
        }
      }
    }
  };

</script>

<style lang="scss" scoped>
  .v-table {
    display: flex;
    flex-direction: column;

    .el-table {
      flex: 1;
    }
  }

  .el-checkbox {
    display: block;
  }

  .v-table_filter {
    margin-bottom: 10px;
  }

  .v-table_operation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

</style>
