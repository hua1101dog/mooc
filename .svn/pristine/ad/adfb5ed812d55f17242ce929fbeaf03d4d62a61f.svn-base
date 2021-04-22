import Mock from 'mockjs';

const attractList = [];
const advList = [];
const meetingList = [];

for (let i = 0; i < 20; i++) {
  attractList.push(Mock.mock({
    id: '@increment',
    title: `4#艺3楼1号房-${i}`,
    area: (i + 1) * 10,
    floorNum: 3,
    price: '面议',
    type: i % 2 === 0 ? '办公' : '商业',
    attractType: i % 2 === 0 ? '销售' : '租赁',
    attractPerson: '鄢滢滢',
    phone: '13984545421',
    position: `${i % 2 === 0 ? '一期' : (i % 3 === 0 ? '二期' : '三期')}1号高层00单元007层会议室`
  }));
  advList.push(Mock.mock({
    id: '@increment',
    title: `高层3栋1楼6号海报框架-${i}`,
    price: 1000,
    area: (i + 1) * 10,
    personNum: 30,
    spaceType: i % 2 === 0 ? '内部' : '外部',
    type: '电梯广告位',
    attractPerson: '鄢滢滢',
    phone: '13984545421',
    position: `${i % 2 === 0 ? '一期' : (i % 3 === 0 ? '二期' : '三期')}1号高层00单元007层会议室`
  }));
  meetingList.push(Mock.mock({
    title: `1#高6楼7号会议室-${i}`,
    id: '@increment',
    area: (i + 1) * 10,
    personNum: 30,
    spaceType: i % 2 === 0 ? '内部' : '外部',
    position: `${i % 2 === 0 ? '一期' : (i % 3 === 0 ? '二期' : '三期')}1号高层00单元006层会议室1`,
    equipment: '投影设备,音响话筒,视频终端',
    price: '免费',
    timeStart: '8:30',
    timeEnd: '16:30',
    phone: '15997437252'
  },));
}

export default [
  {
    url: '/resource/attract-list',
    type: 'get',
    response: config => {
      const { pageSize = 10, page = 1, spaceType, zone, minArea, maxArea, type } = config.query;
      let data = attractList;
      if (spaceType) data = data.filter(data => data.type === spaceType);
      if (type) data = data.filter(data => data.attractType === type);
      if (zone) data = data.filter(data => JSON.parse(zone).some(val => data.position.includes(val)));
      if (Number(minArea) && Number(maxArea)) {
        data = data.filter(data => data.area <= parseFloat(maxArea) && data.area >= parseFloat(minArea));
      }
      const length = data.length;
      data = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return {
        code: 200,
        total: length,
        data
      };
    }
  },
  {
    url: '/resource/support-list/advertisement',
    type: 'get',
    response: config => {
      const { pageSize = 10, page = 1, spaceType, zone } = config.query;
      let data = advList;
      if (spaceType) data = data.filter(data => data.spaceType === spaceType);
      if (zone) data = data.filter(data => JSON.parse(zone).some(val => data.position.includes(val)));
      const length = data.length;
      data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return {
        code: 200,
        total: length,
        data
      };
    }
  },
  {
    url: '/resource/support-list/meetingRoom',
    type: 'get',
    response: config => {
      const { pageSize = 10, page = 1, zone, spaceType } = config.query;
      let data = meetingList;
      if (spaceType) data = data.filter(data => data.spaceType === spaceType);
      if (zone) data = data.filter(data => JSON.parse(zone).some(val => data.position.includes(val)));
      const length = data.length;
      data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return {
        code: 200,
        total: length,
        data
      };
    }
  }
];
