import Mock from 'mockjs';

const complainList = [];

for (let i = 0; i < 20; i++) {
  const name = i % 2 === 0 ? '北京高阳捷讯信息技术有限公司' : '武汉掌游科技有限公司';
  complainList.push(Mock.mock({
    id: '@increment',
    content: '水管坏了反应过多次无法解决，工作效率低下',
    type: '投诉',
    company: name,
    companyType: '软件与服务',
    address: '三期-5号高层-5#高9楼1号房',
    info: `${name}位于武汉市洪山区武汉创意天地产业园内,现有员工80人，属于洪山区政府引荐的一家以移动软件开发，以移动互联网`,
    phone: '15337454545',
    date: Mock.Random.datetime('yyyy-MM-dd')
  }));
}

export default [
  {
    url: '/resource/complain-list',
    type: 'get',
    response: config => {
      const { pageSize = 10, page = 1, name } = config.query;
      let data = complainList;
      data = data.filter(data => data.company.includes(name));
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
