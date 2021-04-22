<template>
  <div style="position:relative;height:100%;width: calc(100% - 30px);margin:20px auto">
    <!-- <el-button type="primary" class="print" v-print="'#printTable'">一键打印</el-button> -->
    <el-button
      v-if="showPrint"
      type="primary"
      class="print"
      @click="print"
    >一键打印</el-button>
    <table
      id="printTable"
      border="1;"
      cellpadding="12;"
      cellspacing="0;"
      align="center"
      class="table_ticket"
    >
      <tr>
        <td colspan="5" style="" class="table_title">
          <div style="position:relative;height: 100%;">
            <img
              src="@/assets/images/ticket.png"
              style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);height: 20px;">
            <img
              src="@/assets/images/flow_left.png"
              style="position:absolute;left:5px;top:5px"
            >
            <img
              src="@/assets/images/flow_right.png"
              style="position:absolute;right:5px;top:5px"
            >
          </div>
        </td>
      </tr>
      <tr align="center">
        <td>姓名</td>
        <td>{{ data.name }}</td>

        <td>学历</td>
        <td style="width:124px">{{ data.education }}</td>

        <td rowspan="4" style="width: 120px;text-align: center;">
          <el-image  v-if="data.Image"
            style="    height: 156px;width: 103px; object-fit: contain;margin-top: 3px;"
            :src="data.Image"
          />
           <img
                v-if="!data.Image"
                style=" height: 156px;width: 103px; object-fit: contain;margin-top: 3px;"
                src="@/assets/images/defaultImgCopy.png"
                alt
              >
        </td>
      </tr>

      <tr align="center">
        <td>身份证号</td>
        <td colspan="3">{{ data.IdCard }}</td>
      </tr>
      <tr align="center">
        <td>考号</td>
        <td colspan="3">{{ data.code }}</td>
      </tr>
      <tr align="center">
        <td>手机号</td>
        <td colspan="3">{{ data.phone }}</td>
      </tr>
      <tr align="center">
        <td>报考地区</td>
        <td colspan="4">
          {{ data.province }}  {{ data.city }} {{ data.regionCode }}
        </td>
      </tr>
      <tr align="center">
        <td>考试名称</td>
        <td colspan="4">{{ data.examine }}</td>
      </tr>
      <tr align="center">
        <td>考试时间</td>
        <td colspan="4">{{ data.startTime }} - {{data.endTime}}</td>
      </tr>
      <tr align="center">
        <td>考试地点</td>
        <td colspan="4">{{ data.site }}</td>
      </tr>

      <tr v-if="data.mattersNeedAttention">
        <td colspan="5" style="padding: 5px 10px;">
          <div v-html="data.mattersNeedAttention" />
        </td>
      </tr>
    </table>

    <div
      v-if="showPrint"
      style="width: 522px;margin: 20px auto;line-height: 16px;font-size:14px"
    >
      *注：请单击准考证上方"一键打印"按钮进入打印页面设置窗口进行准考证打印，若您使用的浏览器不适配该功能，请你使用您已开启的浏览器的打印功能进行准考证打印。
    </div>
  </div>
</template>

<script>
import '@/assets/js/jQuery.print.js';
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['showPrint', 'data'],

  data() {
    return {};
  },



  methods: {
    print() {
      $.print('#printTable');
    }
  }
};
</script>
<style lang="scss" scoped>
.table_ticket {
  margin: 0 auto;
    min-width: 525px;
  // width: 510px;
}
.table_title {
  height: 45px;
  font-weight: 700;
  font-size: 20px;
}
td {
  width: 100px;
  height: 40px;
  font-size: 16px;

}
.print {
  background: #bbb !important;
  border-color: #bbb !important;
  margin: 30px calc(50% - 40px);
  border-radius: 7px;
}
</style>
