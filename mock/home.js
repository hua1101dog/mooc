import Mock from 'mockjs'

export default [
  // username search
  {
    url: '/home/findSituation',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: Mock.mock({
          zy: { waitingCn: '@int(0, 20)', waitingTsCn: '@int(0, 20)', waitingRentCn: '@int(70, 100)', waitingSaleCn: '@int(70, 100)' },
          aq: { ltxfCn: '@int(0, 20)', zcCn: '@int(10, 30)', ryCn: '@int(50, 60)', xfCn: '@int(0, 10)' },
          hj: { pm: '@int(25, 43)', qmCn: '@int(100, 200)', bjCn: '@int(0, 10)', cqCn: '@int(60, 70)' },
          sb: { pdfyjCn: '@int(40, 50)', sbfyjCn: '@int(100, 200)', dtyjCn: '@int(0, 10)', dtwbCn: '@int(60, 70)' },
          nh: { 'shMonth': 187 + '@increment(43)', 'ssMonth': '@increment(1)', 'dhMonth': 622 + '@increment(3.12)', 'dsMonth': 1 + '@increment(1.32)' }
        })
      }
    }
  },
  {
    url: '/cleaning/getWorkList',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: [
          {workTime: '10:00', location: '一二期外围及楼栋', workContent: '为了保证外围的质量及工作效率，要求保证重要区域每周冲地一次。遇到甲方活动、社区接待检查，或甲方要求，酌情增加次数，乙方需全面配合。清洗时间需避开业主上下班高峰期。', person: '@name()' + ',' + '@name()'},
          {workTime: '10:00', location: '一二期外围垃圾堆放点', workContent: '生活垃圾中转站位置定在四期社会停车场，垃圾房内及周围的卫生需及时清扫和清洗，保证无溢出物、无明显异味。生活垃圾清运，不仅需要将保洁服务范围内的垃圾桶转运到集中存放处，并且保证要保证周围的环境卫生。', person: '@name()' + ',' + '@name()'},
          {workTime: '10:00', location: '一二期外围', workContent: '园区绿化带里除保证无白色垃圾外，严禁保洁人员将树叶、残渣等扫入绿化带内。', person: '@name()' + ',' + '@name()'},
          {workTime: '10:30', location: '一二期期各高层及工坊楼内区域', workContent: '楼栋大门口、楼层大厅、高层连廊、电梯轿厢、公区卫生间。', person: '@name()' + ',' + '@name()'},
          {workTime: '10:30', location: '三四期外围及各楼栋', workContent: '确保园区外围垃圾桶清理完毕，各楼栋各楼层垃圾桶清理完毕。', person: '@name()' + ',' + '@name()'}
        ]
      }
    }
  }
]
