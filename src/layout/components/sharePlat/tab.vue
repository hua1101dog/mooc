<template>
  <div>
    <div class="operate-panel">
      <el-row class="container" style="margin-top:0px;">
        <div class="panel" style="margin-top: 20px;">
          <div class="panne-se-title">
            <span class="xtgh">选择智能服务</span>
            <span
              class="xtgh_hove_click"
              :class="{'xtgh_hove_click_active':SelectSr=='fw'}"
              @click="handleSelectSr('fw')"
            >运营服务</span>
            <span
              class="xtgh_hove_click"
              :class="{'xtgh_hove_click_active':SelectSr=='wc'}"
              @click="handleSelectSr('wc')"
            >科技文创</span>
            <span
              class="xtgh_hove_click"
              :class="{'xtgh_hove_click_active':SelectSr=='yq'}"
              @click="handleSelectSr('yq')"
            >红色园区</span>
            <span
              class="xtgh_hove_click"
              :class="{'xtgh_hove_click_active':SelectSr=='zw'}"
              @click="handleSelectSr('zw')"
            >数字政务</span>
            <span
              class="xtgh_hove_click"
              :class="{'xtgh_hove_click_active':SelectSr=='hq'}"
              @click="handleSelectSr('hq')"
            >智能后勤</span>
          </div>
        </div>
        <div class="panel" style="margin-top: 20px;">
          <div v-if="SelectSr=='hq'" style="margin-top:15px">
            <span
              style="color:#f98b70;width:7%;text-align:right;vertical-align: middle;"
              class="inline_block"
            >入驻准备</span>
            <div
              style="height:1px;color:#C0C4CC;background-color: rgb(192, 196, 204);width:3%;margin: 0 3%"
              class="inline_block"
            ></div>
            <span
              style="color:#f98b70;width:7%;text-align:left;vertical-align: middle;"
              class="inline_block"
            >设施服务</span>
            <div
              style="height:1px;color:#C0C4CC;background-color: rgb(192, 196, 204);width:3%; margin: 0 3%;margin-left:-10px"
              class="inline_block"
            ></div>
            <span
              style="color:#f98b70;width:7%;text-align:left;vertical-align: middle;"
              class="inline_block"
            >特约服务</span>
            <div
              style="height:1px;color:#C0C4CC;background-color: rgb(192, 196, 204);width:8%; margin: 0 3%;margin-left:-10px"
              class="inline_block"
            ></div>
            <span
              style="color:#f98b70;width:7%;text-align:left;vertical-align: middle;"
              class="inline_block"
            >行政服务</span>
            <div
              style="height:1px;color:#C0C4CC;background-color: rgb(192, 196, 204);width:8%; margin: 0 3%;margin-left:-10px"
              class="inline_block"
            ></div>
            <span
              style="color:#f98b70;width:7%;text-align:left;vertical-align: middle;"
              class="inline_block"
            >园区配套</span>
            <div
              style="height:1px;color:#C0C4CC;background-color: rgb(192, 196, 204);width:3%; margin: 0 3%;margin-left:-10px"
              class="inline_block"
            ></div>
            <span
              style="color:#f98b70;width:7%;text-align:left;vertical-align: middle;"
              class="inline_block"
            >数字办公</span>
            <div
              style="height:1px;color:#C0C4CC;background-color: rgb(192, 196, 204);width:3%; margin: 0 3%;margin-left:-10px"
              class="inline_block"
            ></div>
            <span
              style="color:#f98b70;width:7%;text-align:left;vertical-align: middle;"
              class="inline_block"
            >退场管理</span>
          </div>
          <div style="margin-top: 15px;">
            <el-row :gutter="20">
              <el-col :span="3" v-if="SelectSr=='hq'" v-for="(item,i) in srHqList">
                <div class="srCard" v-for="(child,index) in item">
                  <el-checkbox v-model="checked" style="top:-30px;left:85px;" v-if="!show"></el-checkbox>
                  <img :src="child.icon" alt style="margin: 10px auto;height:30px" />                 
                  <span
                    style="font-weight:700;display:block;font-size:13px;font-family:'Yahei Regular'"
                  >{{child.name}}</span>
                  <el-button style="margin-top:10px;padding: 5px 12px;font-size:12px">查看</el-button>
                </div>
              </el-col>
              <el-col :span="3" v-if="SelectSr=='zw'" v-for="(item,i) in srZwList">
                <div class="srCard">
                  <el-checkbox v-model="checked" style="top:-30px;left:85px;" v-if="!show"></el-checkbox>
                  <img :src="item.icon" alt style="margin: 10px auto;height:30px" />
                  <span
                    style="font-weight:700;display:block;font-size:13px;font-family:'Yahei Regular'"
                  >{{item.name}}</span>
                  <el-button style="margin-top:10px;padding: 5px 12px;font-size:12px">查看</el-button>
                </div>
              </el-col>
              <el-col :span="3" v-if="SelectSr=='yq'" v-for="(item,i) in srYqList">
                <div class="srCard">
                  <el-checkbox v-model="checked" style="top:-30px;left:85px;" v-if="!show"></el-checkbox>
                  <img :src="item.icon" alt style="margin: 10px auto;height:30px" />
                  <span
                    style="font-weight:700;display:block;font-size:13px;font-family:'Yahei Regular'"
                  >{{item.name}}</span>
                  <el-button style="margin-top:10px;padding: 5px 12px;font-size:12px">查看</el-button>
                </div>
              </el-col>
              <el-col :span="3" v-if="SelectSr=='wc'" v-for="(item,i) in srWcList">
                <div class="srCard">
                  <el-checkbox v-model="checked" style="top:-30px;left:85px;" v-if="!show"></el-checkbox>
                  <img :src="item.icon" alt style="margin: 10px auto;height:30px" />
                  <span
                    style="font-weight:700;display:block;font-size:13px;font-family:'Yahei Regular'"
                  >{{item.name}}</span>
                  <el-button style="margin-top:10px;padding: 5px 12px;font-size:12px">查看</el-button>
                </div>
              </el-col>
              <el-col :span="3" v-if="SelectSr=='fw'" v-for="(item,i) in srFwList">
                <div class="srCard">
                  <el-checkbox v-model="checked" style="top:-30px;left:85px;" v-if="!show"></el-checkbox>
                  <img :src="item.icon" alt style="margin: 10px auto;height:30px" />
                  <span
                    style="font-weight:700;display:block;font-size:13px;font-family:'Yahei Regular'"
                  >{{item.name}}</span>
                  <el-button style="margin-top:10px;padding: 5px 12px;font-size:12px">查看</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-row>
    </div>
    <div class="operate-panel">
      <el-row class="container" style="margin-top:20px;margin-left:700px">
        <el-button
          style="background:#409eff !important;color:#ffffff;font-weight:700;"
          class="save"
        >保存</el-button>
        <el-button
          style="background:#ccc !important;color:#ffffff;font-weight:700;"
          class="cancle"
        >取消</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      SelectSr: "hq",
      text: "",
      show: false,
      srHqList: [
        [
          {
            name: "入驻准备",
            icon: require("@/assets/images/sharePlat/u264.png")
          },
          {
            name: "客户须知",
            icon: require("@/assets/images/sharePlat/u278.png")
          }
        ],
        [
          {
            name: "能源服务",
            icon: require("@/assets/images/sharePlat/u263.png")
          },
          {
            name: "装修服务",
            icon: require("@/assets/images/sharePlat/u279.png")
          },
          {
            name: "报事保修",
            icon: require("@/assets/images/sharePlat/u292.png")
          },
          {
            name: "运维态势",
            icon: require("@/assets/images/sharePlat/u302.png")
          }
        ],
        [
          {
            name: "保洁服务",
            icon: require("@/assets/images/sharePlat/u266.png")
          },
          {
            name: "环境净化",
            icon: require("@/assets/images/sharePlat/u280.png")
          },
          {
            name: "安保服务",
            icon: require("@/assets/images/sharePlat/u291.png")
          }
        ],
        [
          {
            name: "员工管理",
            icon: require("@/assets/images/sharePlat/u265.png")
          },
          {
            name: "访客登记",
            icon: require("@/assets/images/sharePlat/u281.svg")
          },
          {
            name: "考勤统计",
            icon: require("@/assets/images/sharePlat/u293.svg")
          },
          {
            name: "资产安全",
            icon: require("@/assets/images/sharePlat/u303.svg")
          },
          {
            name: "VIP车位",
            icon: require("@/assets/images/sharePlat/u309.svg")
          }
        ],
        [
          {
            name: "企业采购",
            icon: require("@/assets/images/sharePlat/u267.svg")
          },
          {
            name: "信息发布",
            icon: require("@/assets/images/sharePlat/u282.svg")
          },
          {
            name: "员工体检",
            icon: require("@/assets/images/sharePlat/u294.svg")
          },
          {
            name: "企业团建",
            icon: require("@/assets/images/sharePlat/u304.svg")
          }
        ],
        [
          {
            name: "餐饮服务",
            icon: require("@/assets/images/sharePlat/u268.svg")
          },
          {
            name: "酒店服务",
            icon: require("@/assets/images/sharePlat/u283.svg")
          },
          {
            name: "会务服务",
            icon: require("@/assets/images/sharePlat/u295.svg")
          },
          {
            name: "公寓服务",
            icon: require("@/assets/images/sharePlat/u305.svg")
          },
          {
            name: "电子地图",
            icon: require("@/assets/images/sharePlat/u310.svg")
          }
        ],
        [
          {
            name: "IT系统集成",
            icon: require("@/assets/images/sharePlat/u269.svg")
          },
          {
            name: "工位规划",
            icon: require("@/assets/images/sharePlat/u284.svg")
          },
          {
            name: "智能办公",
            icon: require("@/assets/images/sharePlat/u296.svg")
          },
          {
            name: "睿空间",
            icon: require("@/assets/images/sharePlat/u306.svg")
          }
        ],
        [
          {
            name: "企业搬家",
            icon: require("@/assets/images/sharePlat/u270.svg")
          }
        ]
      ],
      srZwList: [
        {
          name: "项目申报",
          icon: require("@/assets/images/sharePlat/u330.svg")
        },
        {
          name: "科技转换",
          icon: require("@/assets/images/sharePlat/u331.svg")
        }
      ],
      srYqList: [
        {
          name: "党建",
          icon: require("@/assets/images/sharePlat/u347.svg")
        },
        {
          name: "团建",
          icon: require("@/assets/images/sharePlat/u348.svg")
        },
        {
          name: "妇联",
          icon: require("@/assets/images/sharePlat/u349.svg")
        },
        {
          name: "工会",
          icon: require("@/assets/images/sharePlat/u350.svg")
        },
        {
          name: "新阶层",
          icon: require("@/assets/images/sharePlat/u351.svg")
        }
      ],
      srWcList: [
        {
          name: "美术馆",
          icon: require("@/assets/images/sharePlat/u355.svg")
        }
      ],
      srFwList: [
        {
          name: "园区广告",
          icon: require("@/assets/images/sharePlat/u368.svg")
        },
        {
          name: "跳蚤市场",
          icon: require("@/assets/images/sharePlat/u369.svg")
        },
        {
          name: "园区交流",
          icon: require("@/assets/images/sharePlat/u370.svg")
        },
        {
          name: "通用服务",
          icon: require("@/assets/images/sharePlat/u371.svg")
        }
      ]
    };
  },
  mounted() {
    this.getParams()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectSr(name) {
      this.SelectSr = name;
    },
    getParams() {
    // 取到路由带过来的参数
      this.show = this.$route.query.show  
      console.log(this.show)
    }
  },
  watch: {
    '$route': 'getParams'
  }
};
</script>
<style lang="scss" scoped>
.operate-panel {
  background-color: #f9f9f9;
}
.container {
  width: 100%;
  padding-left: 70px;
  padding-right: 70px;
}
.title {
  width: 100%;
  font-size: 16px;
  color: #707070;
  font-family: "Yahei Regular";
  font-weight: 700;
  font-style: normal;
}
.left_title {
  position: absolute;
  width: 200px;
  height: 30px;
  margin-top: 20px;
  margin-left: 20px;
  z-index: 999;
}
.container {
  position: relative;
  width: 100%;
}
.grid-content {
  min-height: 300px;
  background: #fff;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.size--default .el-tabs__item,
.size--default .el-form-item__label {
  font-size: 13px;
  font-weight: 400;
  color: #48465b;
}
.size--default .el-pagination span:not([class*="suffix"]),
.size--default .el-pagination button,
.size--default .el-pagination,
.size--default .el-input__inner,
.size--default .el-submenu__title,
.size--default .el-link,
.size--default .el-menu-item {
  font-size: 14px !important;
  color: #646c9a;
}
.el-input__inner:focus {
  border-color: #409eff !important;
  box-shadow: none;
  transition-duration: 0.2s;
}
.el-tabs__nav-scroll {
  overflow: hidden;
  background: #fff;
  height: 60px;
  padding-left: 950px;
  padding-top: 20px;
}
.el-select > .el-input {
  display: block;
  width: 285.5px;
}
.el-select .el-input.is-focus .el-input__inner {
  width: 285.5px;
}
.container .save:hover {
  background-color: #43cd80 !important;
}
.container .cancle:hover {
  background-color: #f98b70 !important;
}
.el-tabs__nav-scroll {
  overflow: hidden;
  padding-left: 950px;
}

.step {
  color: #f98b70;
  font-size: 16px;
  font-weight: 400;
  margin-left: 30px;
}
.line {
  display: inline-block;
  width: 100%;
  height: 1px;
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
.line1 {
  display: inline-block;
  width: 100%;
  height: 1px;
  margin-bottom: 5px;
}
.grid-content1 {
  position: relative;
  width: 100%;
  min-height: 110px;
  margin: 10px 0;
  background-color: #fff;
}
.checked {
  position: absolute;
  margin-top: 5px;
  margin-left: 100px;
}
.img2 {
  position: absolute;
  margin-top: 5px;
  margin-left: 35px;
}
.title2 {
  font-family: "Yahei Regular";
  position: absolute;
  font-size: 13px;
  font-weight: 700;
  margin-top: 60px;
  margin-left: 35px;
}
.look {
  position: absolute;
  margin-top: 75px;
  margin-left: 20px;
  width: 70px;
  height: 25px;
  background: #fff;
  font-size: 12px;
  font-weight: 400;
  line-height: 0px;
}
.look:hover {
  border-color: #6666ff !important;
  color: #6666ff !important;
}
.size--default .el-tabs__item,
.size--default .el-form-item__label {
  font-size: 14px;
  font-weight: 700;
  color: #48465b;
}
.panel {
  .panne-se-title {
    background-color: rgba(255, 255, 255, 1);
    height: 40px;
    border-bottom: 1px solid #f98b70;
  }
  .xtgh {
    color: #f98b70;
    font-family: "Yahei Regular";
    font-weight: 700;
    font-size: 16px;
    line-height: 40px;
    padding: 0 20px;
  }
  .xtgh_icon {
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background: #fff;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    color: #b1beff;
    &:hover {
      background: #409eff;
    }
  }
  .xtgh_hove_click {
    color: #333;
    font-family: "Yahei Regular";
    font-weight: 700;
    font-size: 16px;
    line-height: 37px;
    padding: 0 20px;
    float: right;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
  .xtgh_hove_click_active {
    border-bottom: 2px solid #409eff;
    color: #409eff;
  }
  .srCard {
    background: #fff;
    height: 115px;
    text-align: center;
    margin-top: 10px;
  }
  .inline_block {
    display: inline-block;
  }
}
</style>