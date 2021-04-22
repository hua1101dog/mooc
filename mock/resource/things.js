import {
  thingList,
  companyList,
  contracts,
  decorationList,
  maintainList,
  checkList
} from './thingList';
import Mock from 'mockjs';

const billList = [];
for (let i = 0; i < 20; i++) {
  billList.push(Mock.mock({
    id: Mock.Random.guid(),
    sn: `${Mock.Random.date('yyyyMMdd')}${Mock.Random.integer(100000000)}`,
    type: i % 2 === 0 ? '自营' : '第三方',
    name: '武汉掌游科技有限公司',
    price: Mock.Random.float(10000, 100000, 2, 2),
    date: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
    product_name: '物业费',
    classify: '信息传输、软件和信息技术服务业',
    payment: Mock.Random.float(1000, 10000, 2, 2),
    unpaid: '0.00',
    paid_date: '2017-07-19 14:48:38'
  }));
}

export default [
  {
    url: '/resource/thing-list',
    type: 'get',
    response: config => {
      const { status, pageSize = 10, page = 1, name } = config.query;
      let data = thingList.filter(data => data.status === Number(status));
      if (name) data = data.filter(data => data.title.includes(name));
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
    url: '/resource/company-detail',
    type: 'get',
    response: config => {
      const { id, name } = config.query;
      let data;
      if (id) data = companyList.find(data => data.id === Number(id));
      if (name) data = companyList.find(data => data.name.includes(name));
      data.contract = contracts[0];
      data.decoration = decorationList[0];
      data.checkList = checkList[0];
      return {
        code: 200,
        data
      };
    }
  },
  {
    url: '/resource/company',
    type: 'get',
    response: config => {
      const { type = 2, pageSize = 10, page = 1, name } = config.query;
      let data = companyList;
      data = data.filter(data => data.typeNum === Number(type));
      if (name) data = data.filter(data => data.name.includes(name));
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
    url: '/resource/maintain',
    type: 'get',
    response: config => {
      const { pageSize = 10, page = 1, date, status, content } = config.query;
      let data = maintainList.filter(data => data.title.includes(content));
      data = data.filter(data => data.date.includes(date));
      data = data.filter(data => data.status === status);
      const length = data.length;
      data = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return {
        code: 200,
        data,
        total: length,
        date
      };
    }
  },
  {
    url: '/resource/bill',
    type: 'get',
    response: config => {
      const { pageSize = 10, page = 1, sn, scope, date, isPay, type } = config.query;
      let data = billList;
      if (sn) data = data.filter(data => data.sn.includes(sn));
      if (scope) data = data.filter(data => data.price <= scope);
      if (date) data = data.filter(data => data.date.includes(date));
      if (isPay) {
        data = data.filter(data => {
          if (isPay === '已付') {
            return data.payment > 0;
          } else {
            return data.payment === 0;
          }
        });
      }
      if (type) data = data.filter(data => data.type === type);
      const length = data.length;
      data = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
      return {
        code: 200,
        total: length,
        data
      };
    }
  }
];
