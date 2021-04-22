//页面共用的一些方法
//为日期补0
function to_zero(m) {
  return m < 10 ? "0" + m : m;
}

export default {
  //将金钱格式化成千分位,两位小数
  formate_money: function(row, column) {
    var date = Number(row[column.property].split("～")[0]).toFixed(2);
    var thousand = (date + "").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
    return "￥" + thousand + "起";
  },
  //格式化时间 2018-01-02 12:22:25
  formate_time: function(row, column) {
    let str = row[column.property];
    if (str == null) {
      return "";
    } else {
      var time = new Date(str);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        to_zero(m) +
        "-" +
        to_zero(d) +
        " " +
        to_zero(h) +
        ":" +
        to_zero(mm) +
        ":" +
        to_zero(s)
      );
    }
  },
  //将一个特定的时间戳格式化
  formate_time_stamp: function(params) {
    if (params == 1523882019000 || params == null) {
      return "";
    } else {
      var time = new Date(params);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        to_zero(m) +
        "-" +
        to_zero(d) +
        " " +
        to_zero(h) +
        ":" +
        to_zero(mm) +
        ":" +
        to_zero(s)
      );
    }
  },
  //产品名称一旦超出20个字,显示省略号
  formate_name: function(row, column) {
    var data = row[column.property];
    if (data.length > 20) {
      return data.substr(0, 20) + "...";
    } else {
      return data;
    }
  },
  //将金钱保留两位小数,转千分位
  formatSingleMoney: function(num) {
    return (
      "￥" +
      (num.toFixed(2) + "").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,")
    );
  },
  //为日期补0
  to_zero: function(m) {
    return m < 10 ? "0" + m : m;
  },
  //将null处理成空
  changeNull: function(params) {
    if (params == null) {
      return "";
    } else {
      return params;
    }
  },
  ellipsis: function(value, length) {
    if (!value) return "";
    if (value.length > length) {
      return value.slice(0, length) + "...";
    }
    return value;
  },
  playVideo: function(equipmentId, cameraCode, action, startTime, endTime) {
    window.viewFrameList = window.viewFrameList || [];
    var dom = {};
    window.viewFrameList.push(dom);
    var domIndex = window.viewFrameList.indexOf(dom);
    var offset = "auto";
    if (domIndex <= 8) {
      offset = [domIndex * 20 + "px", domIndex * 20 + "px"];
    }
    var paramObj = {
      equipmentId: equipmentId,
      cameraCode: cameraCode,
      action: action,
      startTime: startTime,
      endTime: endTime
    };
    var params = [];
    for (var p in paramObj) {
      if (
        paramObj[p] != undefined &&
        paramObj[p] != null &&
        paramObj[p] != ""
      ) {
        params.push(
          encodeURIComponent(p) + "=" + encodeURIComponent(paramObj[p])
        );
      }
    }
    layer.open({
      type: 2,
      title: ["视频直播", "font-size:16px;"],
      area: ["500px", "330px"],
      offset: offset,
      shade: 0,
      closeBtn: 1,
      maxmin: true,
      // scrollbar: false,ovu-iot\src\components\video\videoPaly.html
      content: "/static/component/videoPlay.html?" + params.join("&"), //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no'],
      // content: '//player.youku.com/embed/XMjY3MzgzODg0',
      success: function(layero, index) {
        layer.iframeAuto(index);
      },
      cancel: function(index, layero) {
        var iframeWin = window[layero.find("iframe")[0]["name"]];
        iframeWin.closePlayer();
        layer.close(index);
      }
    });
  },
  //数组去重
  removeDuplicatedItem(arr, str) {
    for (var i = 0; i < arr.length - 1; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i][str] == arr[j][str]) {
          arr.splice(j, 1); //console.log(arr[j]);
          j--;
        }
      }
    }
    return arr;
  },
  treeToFlat(treeData) {
    var list = [];

    function pushNode(nodes) {
      nodes &&
        nodes.forEach(function(n) {
          list.push(n);
          if (n.nodes && n.nodes.length) {
            pushNode(n.nodes);
          }
        });
    }

    pushNode(treeData);
    return list;
  },
  processImgUrl: function(imgUrl, width) {
    if (imgUrl && imgUrl.indexOf("http") == 0) {
      if ("origin" == width) {
        return imgUrl;
      } else if (width && !isNaN(width)) {
        if (imgUrl.indexOf("?") > -1) {
          return imgUrl.replace("?", "?imageView2/2/w/" + width + "&");
        } else {
          //指定了宽度
          return imgUrl + "?imageView2/2/w/" + width;
        }
      }
      return imgUrl;
      //return imgUrl + "?imageView2/2/w/100";
    } else {
      return "/ovu-base/" + imgUrl;
    }
  }
};
