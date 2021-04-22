<template>
  <div>
    <el-dialog
      title="测评详情"
      width="60%"
      :visible.sync="dialog"
      append-to-body
        :close-on-click-modal="false"
    >
      <el-card shadow="hover" class="card_item">
        <h4>{{ item.personName }}</h4>
        <div />
        <el-row :gutter="20">
          <el-col :span="8"><div>测评名称：{{ item.text }}</div></el-col>
          <el-col :span="8"><div>完成时间:{{ item.submitTime }}</div></el-col>
          <el-col :span="8"><div>用时/分钟：{{ item.time }}</div></el-col>
        </el-row>

      </el-card>
      <el-card class="box-card card_item inline_block" shadow="hover" style="    width: 200px;">
        <div slot="header" class="clearfix">
          <span>得分</span>

        </div>
        <div style="margin-bottom: 15px;">
          <span><strong style="color: #FCA54D;margin-right: 5px;font-size: 25px;"> {{ item.subjectiveScore!==null?item.subjectiveScore:'--' }}</strong>分</span> <span style="font-size: 25px;margin: 0 10px;">/</span> <strong style="margin-right: 5px;font-size: 25px;">{{ item.objectiveScore!==null?item.objectiveScore:'--' }}</strong>分
        </div>
        <div>
          <span style="    margin-right: 15px;">主观题 {{ item.subjectiveNum!==null?item.subjectiveNum:'--' }}  </span>   <span>客观题 {{ item.objectiveNum!==null?item.objectiveNum:'--' }}  </span>
        </div>
        <div />

      </el-card>
      <el-card class="box-card card_item inline_block" shadow="hover" style="width: calc(100% - 220px);max-height: 500px;overflow: auto;">
        <div slot="header" class="clearfix">
          <span>答题情况</span>
        </div>
        <div style="height: 280px">
          <el-table
            :key="tableKey"

            :data="item.infoList"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            height="100%"
            :default-sort="{ prop: 'id', order: 'descending' }"
          >
            <!-- NO列 -->
            <el-table-column label="NO" type="index" width="50" align="center">
              <template slot-scope="scope">
                <span>
                  {{
                    (listQuery.currentPage - 1) * listQuery.pageSize +
                      scope.$index +
                      1
                  }}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              label="题型"
              prop="type"
              align="left"
            />
            <el-table-column label="正确题数/题数" align="left" show-overflow-tooltip>
              <template slot-scope="{ row }">
                <!-- {{ row.correctCount +'/'+ ((row.errorCount-0) + (row.correctCount-0))}} -->
                {{ row.correctCount }} / {{ (row.errorCount-0) + (row.correctCount-0) }}
              </template>
            </el-table-column>

            <el-table-column label="得分" prop="score" align="left" />

          </el-table>

        </div>

      </el-card>

    </el-dialog>
  </div>
</template>

<script>

export default {
  props: ['item'],

  data() {
    return {

      list: [],
      dialog: false,
      loading: false,
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10

      }

    };
  },
  created() {

  },
  methods: {
    // 表格数据

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card_item{
   margin: 5px;
   vertical-align: top;
}
.inline_block{
  display: inline-block;
}
</style>
