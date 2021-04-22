export default {
  data() {
    return {
      slist: [],
      total: 0,
      listQuery: {
        pageIndex: 1,
        pageSize: 20
      },
      longtatol: 0,
      constList: [],
      data: [],
      loading: false,
      selected: [],
      height: 'calc(100% - 50px)',
      filter: {},
    };
  },
  computed: {
    permission() {
      return this.$route.meta.permission;
    }
  },
  methods: {
    handleFilter(data,listQuery) {
      if(listQuery){
        this.listQuery.pageIndex=listQuery.pageIndex
        this.listQuery.pageSize=listQuery.pageSize
      }else{
        this.listQuery.pageIndex = 1    
      }
      if(data instanceof Object){
        this.initData(data)
      }else{
        this.initData();
      }
     
    },
    async initData(query = {}, callback) {
      let peojectIdKey = 'projectId'
      if (query && peojectIdKey in query) { 
        if (!query[peojectIdKey]) {
          this.$message.error('请选择项目！');
          return
        }
      }
      try {
        this.loading = true;

        
        await this.getList(Object.assign({}, {
          pageIndex: this.listQuery.pageIndex - 1,
          pageSize: this.listQuery.pageSize
        }, this.filter, query)).then(res => {
          const data = res.data;
          if (Array.isArray(data)) {
            this.data = data;
          } else {
            this.data = data.data;
            this.total = data.totalCount;
            this.listQuery.pageIndex = data.pageIndex + 1;
          }
          return res.data;
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        this.loading = false;
        if (callback) {
          callback()
        }
      }
    },
    async initData2(query = {}, callback) {
      this.slist = []
      this.total = 0
      let peojectIdKey = 'projectId'
      if (query && peojectIdKey in query) {
        if (!query[peojectIdKey]) {
          this.$message.error('请选择项目！');
          return
        }
      }
      try {
        this.loading = true;
        await this.getList(Object.assign({}, {
        }, this.filter, query)).then(res => {
          const data = res.data;
          if (Array.isArray(data)) {
            this.data = data;
            this.total = data.length;
          } else {
            this.data = data.data;
            this.total = data.data.length;
          }

          this.constList = this.data
          return res.data;
        });
      } catch (err) {
        throw new Error(err);
      } finally {
        this.loading = false;
        if (callback) {
          callback()

        }
      }
    },
    flist2() {
      let list = this.constList
      if (this.slist.length > 0) {
        list = this.slist
      }

      let newlist = []
      let i = 0;
      for (i = this.listQuery.pageSize * (this.listQuery.pageIndex - 1); i < this.listQuery.pageSize * this.listQuery.pageIndex; i++) {
        if (list[i]) {
          newlist.push(list[i])
        }
      }

      this.data = newlist
      this.$forceUpdate()
    },

    handleSelectChange(data) {
      this.selected = data;
    },
    handleAdd() {
      this.$refs.uploadForm.dialog = true;
      this.$refs.uploadForm.init({
        isEdit: false,
        title: '添加'
      });
    },
    handleEdit(data) {
      this.$refs.uploadForm.dialog = true;
      this.$refs.uploadForm.init({
        data,
        isEdit: true,
        title: '编辑'
      });
    },
    handleDelete(data,backcall) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRow(data.id).then(res => {
          this.initData({},backcall);
          this.$message.success('删除成功!');
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
