<template>
  <div class="v-tree-table">
    <el-table ref="table" v-loading="loading" v-bind="$attrs" v-on="$listeners" @select-all="selectAll"
      @select="tableSelect">
      <template v-for="column in columns">
        <el-table-column :key="column.prop" :label="column.label" :prop="column.prop" v-bind="column.options">
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'VTable',
    components: {},
    props: {
      columns: {
        default: () => [],
        type: Array
      },
      loading: Boolean,
      checkedIds: {
        default: () => [],
        type: Array
      }
    },
    data() {
      return {
        tableRef: null,
        checkedNodes: [],
      };
    },
    computed: {
      allTableData() {
        return [...flattenDeep(this.$attrs.data, "nodes")];
      }
    },
    watch: {
      allTableData: {
        deep: true,
        immediate: true,
        handler(val) {
          if (this.checkedIds) {
            val.forEach(v => {
              if (this.checkedIds.indexOf(v.id) != -1) {
                this.$nextTick(() => {
                  if (v.nodes && v.nodes.length > 0) {
                    this.tableRef && this.tableRef.toggleRowExpansion(v, true);
                  }
                  this.tableRef && this.tableRef.toggleRowSelection(v, true)
                })
              }
            })
          } else {
            this.$nextTick(() => {
              this.tableRef && this.tableRef.clearSelection();
            });
          }
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.tableRef = this.$refs.table;
      });
    },
    activated() {},
    methods: {
      tableSelect(selection, row) {
        this.checkedNodes = selection;
        let state = selection.some(item => item.id == row.id);
        // 树中的父级节点
        let parentNodes = this.allTableData.filter(v => {
          return v.id === row.pid;
        });
        // 树中的兄弟节点,包含本身
        let brotherNodes = this.allTableData.filter(v => {
          return v.pid === row.pid;
        });
        // 已选中的兄弟节点,包含本身
        let checkedBrotherNodes = selection.filter(v => {
          return v.pid === row.pid;
        });
        if (!row.nodes || row.nodes.length == 0) {
          //末节点
          this.tableRef.toggleRowSelection(row, state);
          regDeepParents(row, "pid", this.allTableData, (parent, row) => {
            if (parent) {
              let checks = selection.filter(v => {
                return v.pid === row.pid && v.id !== row.id;
              });
              if (state) {
                this.$nextTick(() => {
                  this.tableRef.toggleRowSelection(
                    parent,
                    state
                  );
                })
              } else {
                if (checks.length == 0) {
                  this.$nextTick(() => {
                    this.tableRef.toggleRowSelection(
                      parent,
                      state
                    );
                  })
                }
              }
            }
          })
        } else if (row.nodes && row.nodes.length > 0 && row.pid != 0) {
          //中间节点
          //父节点处理
          regDeepParents(row, "pid", this.allTableData, (parent, row) => {
            if (parent) {
              let checks = selection.filter(v => {
                return v.pid === row.pid && v.id !== row.id;
              });
              if (checks.length == 0) {
                this.$nextTick(() => {
                  this.tableRef.toggleRowSelection(
                    parent,
                    state
                  );
                })
              } else {
                this.$nextTick(() => {
                  this.tableRef.toggleRowSelection(
                    parent,
                    state
                  );
                })
              }
            }
          })
          // 子节点处理
          let toggle_data = [...flattenDeep([row], "nodes")];
          for (let item of toggle_data) {
            if (state) {
              if (item.nodes) {
                this.tableRef.toggleRowExpansion(item, true);
              }
            }
            this.$nextTick(() => {
              this.tableRef.toggleRowSelection(item, state);
            })
          }
        } else {
          //一级节点
          let toggle_data = [...flattenDeep([row], "nodes")];
          for (let item of toggle_data) {
            if (state) {
              if (item.nodes) {
                this.tableRef.toggleRowExpansion(item, true);
              }
            }
            this.$nextTick(() => {
              this.tableRef.toggleRowSelection(item, state);
            })
          }
        }
      },
      selectAll(selection) {
        let state =
          selection.filter(v => {
            return v.pid == "0";
          }).length > 0;
        let toggle_data = [...flattenDeep(selection, "nodes")];
        for (let item of toggle_data) {
          if (state) {
            if (item.nodes) {
              this.tableRef.toggleRowExpansion(item, true);
            }
          }
          this.$nextTick(() => {
            this.tableRef.toggleRowSelection(item, state);
          })
        }
      },
    },
    destroyed() {
      this.tableRef && this.tableRef.clearSelection();
    },
  };

  // 从树形数据中递归筛选目标值
  function valInDeep(arr = [], val, id, childs) {
    return arr.reduce((flat, item) => {
      return flat.concat(
        item[id] == val ? item : valInDeep(item[childs] || [], val, id, childs)
      );
    }, []);
  }

  // 将树形数据向下递归为一维数组
  function flattenDeep(arr = [], childs) {
    return arr.reduce((flat, item) => {
      return flat.concat(
        item,
        item[childs] ? flattenDeep(item[childs], childs) : []
      );
    }, []);
  }

  // 将树形数据向上将此支线递归为一维数组
  function flattenDeepParents(arr, parent) {
    return arr.reduce((flat, item) => {
      return flat.concat(
        item[parent] || [],
        item[parent] ? flattenDeepParents([item[parent]], parent) : []
      );
    }, []);
  }

  // 根据条件递归祖先元素
  function regDeepParents(row, key, baseData, cb) {
    if (row[key] && row[key] != 0) {
      let parents = baseData.filter(v => {
        return v.id === row[key];
      })[0];
      cb && cb(parents, row);
      regDeepParents(parents, key, baseData, cb);
    }
  }

</script>

<style lang="scss" scoped>


</style>
