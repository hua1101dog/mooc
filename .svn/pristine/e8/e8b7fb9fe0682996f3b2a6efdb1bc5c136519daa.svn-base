<template>
  <div class="app-container" style="height: calc(100% - 3px) !important;">
    <div class="filter-container">
      <div style="height: 100%;">
        <EditTest />
      </div>
      <!-- 表格,数据循环list数组 -->
    </div>

  </div>
</template>

<script>
import { findList } from '@/api/mooc/exam';

import waves from '@/directive/waves'; // waves directive

// import SingleImageUpload from "@/components/Upload/SingleImage"; // secondary package based on el-pagination
import settings from '@/mixins/SettingMixin';

import EditTest from './addExam';

export default {
  name: 'ExamManage',

  components: { EditTest },
  directives: { waves },
  filters: {
    filterType(val) {
      switch (val) {
        case 1:
          return '单选题';
        case 2:
          return '多选题';
        case 3:
          return '判断题';
        case 5:
          return '问答题';
      }
    }
  },
  mixins: [settings],
  data() {
    return {
      activeName: 'set',
      ids: '',
      groupList: [],
      courseList: [],
      tableKey: 0,
      list: [],
      test: {},
      total: 0,
      analyseList: [],
      listLoading: true,
      listQuery: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        params: '',
        examineId: '',
        isSaveMaxScore: '0'
      },
      listQueryCopy: {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        id: ''
      },
      form: {},

      options: []
    };
  },

  mounted: function() {
    this.listQueryCopy.id = this.$route.query.id - 0;
    this.listQuery.id = this.$route.query.id - 0;
    this.test.id = this.$route.query.id - 0;
    this.getList();

    findList(this.listQueryCopy).then(response => {
      this.test = response.data.data[0];
      this.test.date = [
        new Date(this.test.starttime),
        new Date(this.test.endtime)
      ];
      if (this.test.personIds) {
        this.selectStuList = this.test.personIds.split(',');
      }
      if (this.test.testreport) {
        this.testreport = JSON.parse(this.test.testreport);
      }
      this.$set(this, 'test', response.data.data[0]);
    });
  },
  activated: function() {
    this.listQueryCopy.id = this.$route.query.id - 0;
    this.listQuery.id = this.$route.query.id - 0;
    this.test.id = this.$route.query.id - 0;
    this.getList();

    findList(this.listQueryCopy).then(response => {
      this.test = response.data.data[0];
      this.test.date = [
        new Date(this.test.starttime),
        new Date(this.test.endtime)
      ];

      if (this.test.testreport) {
        this.testreport = JSON.parse(this.test.testreport);
      }
      this.$set(this, 'test', response.data.data[0]);
    });
  },

  methods: {
    resetQuery() {
      this.listQuery = {
        pageIndex: 0,
        currentPage: 1,
        pageSize: 10,
        examineId: '',
        isSaveMaxScore: '0',
        params: ''
      };
    },

    // 表格数据
    getList() {
      this.listLoading = true;
      this.listQuery.pageIndex = this.listQuery.currentPage - 1;
      this.listQuery.examineId = this.test.id;
    },

    handleClick(tab, event) {

    }

  }
};
</script>
<style lang="scss" scoped>
/deep/.el-tabs {
  width: 100%;
  height: 100%;
}
/deep/.el-tabs__content {
  height: calc(100% - 41px);
  overflow: auto;
}
/deep/ .el-tab-pane {
  height: 100%;
}
.fxTabal {
  border-right: 1px solid #e1e6eb !important;
  border-bottom: 1px solid #e1e6eb !important;
}
.fxTabal td,
.fxTabal th {
  border-left: 1px solid #e1e6eb !important ;
  border-top: 1px solid #e1e6eb !important;
}
.active {
  color: #e87b0f;
}
.res {
  /deep/.el-card__body {
    padding: 0;
    height: 60px;
  }
}
</style>
