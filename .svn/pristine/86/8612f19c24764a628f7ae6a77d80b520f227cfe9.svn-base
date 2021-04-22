  import Mock from 'mockjs';

  //reportList
  const reportList = [];
  let nameList=['黄琴谊','李传铭','熊艳珍','黎雄娇','余友珍','何景珍','梁群浦','颜荣娥','张红霞','项先娥','沈巨香','肖桃枝','唐巧珍','朱立钦','汪敬桥','余静珍','程晓安','周彩文','肖云先','龚方清','钱金翠','余腊荣','李伍梅','彭东桂',
    '余艳明','刘开芝','余三桃','刘联斌','叶永华','汪艾美','余正明','谢学启','皮传刚','王维容','左自华','李又德','刘昌宏','王凤云',
    '黄光德','赵长梅','方凤莲','林文芝','项再先','谢斌','扫地机','高春玉','闵梅花','柯江娥','张凤兰','柴昌勤','王凤仙',
    '袁杏兰','陈梅荣','顾全国','蒋身平','涂卫平','王运清','王明菊','曹光华','邱望生','李想英','方志国',
    '陈定进','王小平','周飞琴','李继虎','钱美珍','孙亚茹','周响玲','邱小安','徐成凤',
    '何庆分','颜润支','汪细胖','刘显凤','易恩芳','郭建伟','邹长法','何杰','方喜连','秦启平'
    ]
  const Random = Mock.Random;
  for (let i = 0; i < 80; i++) {
    let blotten=Random.natural(0,50)
    let garbage=Random.natural(0,50)
    let whiteRubbish=Random.natural(0,50)
    let cigarete=Random.natural(0,50)
    let fallen=Random.natural(0,50)
    let noStandard=blotten+garbage+whiteRubbish+cigarete+fallen
    reportList.push(Mock.mock({
      'id': Random.id(),
      'name': nameList[i],
      'noStandard':noStandard,
      'blotten':blotten,
      'garbage':garbage,
      'whiteRubbish':whiteRubbish,
      'cigarete':cigarete,
      'fallen':fallen,
    }));
  }
  
  //配电房实时监控预警信息
  let earlyWarningList=[];
  let msgList=["计量点(高层9-1402房14AL1-2#照明电表321076)余额告警自动生成工单(当前余额:99.69)",'2-3D1进线柜1电表 电流异常(值/阈值：0A/233A)',
'2-3D1进线柜1电表(值/阈值：0A/233A)','2-4D1进线柜4电表(值/阈值：0A/23A)',"计量点(底商11#102新增照明电表327930)余额告警自动生成工单(当前余额:99.46)",
'计量点(高层1-1102房14AL1-2#照明电表321000)余额告警自动生成工单']
  for (let i = 0; i <13; i++) {
    let j=Random.natural(0,4)
    earlyWarningList.push(Mock.mock({
      'id':i,
      'msg':getArrItem(msgList,Random.natural(0,5))
    }));
  }


  const popList=[];
  const inviterList=[ '袁杏兰','陈梅荣','顾全国','蒋身平','涂卫平','王运清','王明菊','曹光华','邱望生','李想英','方志国',
  '陈定进','王小平','周飞琴','李继虎','钱美珍','孙亚茹','周响玲','邱小安','徐成凤',
  '何庆分','颜润支','汪细胖','刘显凤','易恩芳','郭建伟','邹长法','何杰','方喜连','秦启平']
  const visitorList=['黄琴谊','李传铭','熊艳珍','黎雄娇','余友珍','何景珍','梁群浦','颜荣娥','张红霞','项先娥','沈巨香','肖桃枝','唐巧珍','朱立钦','汪敬桥','余静珍','程晓安','周彩文','肖云先','龚方清','钱金翠','余腊荣','李伍梅','彭东桂',
  '余艳明','刘开芝','余三桃','刘联斌','叶永华','汪艾美','余正明','谢学启','皮传刚','王维容','左自华','李又德','刘昌宏','王凤云',
  '黄光德','赵长梅','方凤莲','林文芝','项再先','谢斌','扫地机','高春玉','闵梅花','柯江娥','张凤兰','柴昌勤','王凤仙']
  const tellList=['5210032654','15814423300','15878787777','13695999900','1310123230']
  const wayList=['动态密码设备','人脸识别']
  const msg=['照片','']
  for (let i = 0; i < 20; i++) {
    popList.push(Mock.mock({
      'id': Random.id(),
      'inviter': inviterList[i],
      'visitor':visitorList[i],
      'tell':Random.pick(tellList),
      'way':Random.pick(wayList),
      'time':Random.now('second'),
      'msg':Random.pick(msg),
    }));
  }


  // 预定明细
  let reserveList=[]
  const reserName=['1号楼9楼1号会议室','1号楼6楼7号会议室','1号楼7楼6号会议室','1号楼8楼5号会议室','1号楼8楼3号会议室','1号楼6楼7号会议室','1号楼7楼6号会议室','1号楼8楼5号会议室','1号楼9楼1号会议室','1号楼6楼7号会议室']
  const reserPeo=['武汉光谷联合集团有限公司','刘莉莉','刘曦子','李木子','赵山','李艳','武汉光谷联合集团有限公司','刘莉莉','刘曦子','李木子','赵山','李艳']
  for (let i = 0; i < 20; i++) {
    reserveList.push(Mock.mock({
      'id': Random.id(),
      'name':reserName[i],
      'num':Random.natural(20,50),
      'tell':Random.pick(tellList),
      'time':Random.now('second'),
      'reserPeo':reserPeo[i],
    }));
  }

 //地图参数点
let mapQueryDot=[]



  export default [
    {
      url: '/environmentState/atrolMonthReport',
      type: 'get',
      response: config => {
        const { pageSize, pageIndex } = config.query;
        const data = reportList.slice(pageIndex* pageSize, pageIndex*pageSize + pageSize*1);
        return {
          code: 200,
          total: reportList.length,
          data
        };
      }
    },
    {
      url: '/environmentState/earlyWarningList',
      type: 'get',
      response: config => {
        const { roomId } = config.query;
        let data=earlyWarningList[roomId]
        return {
          code: 200,
          data:data
        };
      }
    },
    {
      url: '/industry/popup',
      type: 'get',
      response: config => {
        const { pageSize, pageIndex } = config.query;
        const data = popList.slice(pageIndex* pageSize, pageIndex*pageSize + pageSize*1);
        return {
          code: 200,
          total: popList.length,
          data
        };
      }
    },
    {
      url: '/industry/reserveList',
      type: 'get',
      response: config => {
        const { pageSize, pageIndex } = config.query;
        const data = reserveList.slice(pageIndex* pageSize, pageIndex*pageSize + pageSize*1);
        return {
          code: 200,
          total: reserveList.length,
          data
        };
      }
    }
  ];

  function getArrItem(arr, num) {
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    var return_array = new Array();
    for (var i = 0; i < num; i++) {
        if (temp_array.length > 0) {
            var arrIndex = Math.floor(Math.random() * temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
        } else {
            break;
        }
    }
    return return_array;
}
  