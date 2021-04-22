<template>
  <div ref="map-container" :style="{'height': height}"></div>
</template>

<script>
OvuMap.Config.set({
  showAllFloor: true,
  count: 200,
  zoom: 2.5,
  defaultGap: 1, //楼层间距
  showMenu: false, //不显示楼层选择,
  showViewMode: "MODE_2D",
  theta: 0,
  defaultClickModels: [
    "roomGroup",
    "bottomGroup",
    "otherGroup",
    "deskGroup",
    "seatGroup",
    "logoGroup"
  ]
});
const polyline = new OvuMap.Markers.PolyLine();
const vidicon = new OvuMap.Markers.Vidicon();
const addWindow = (lnglat, map, name, str, height) => {
  let imc = coordinatesToMercato(map.getMapCenter(name));
  let tempPt = coordinatesToCoordinates3(imc, lnglat);
  let infowindow = new OvuMap.Controls.InfoWindow({
    //信息窗内容，是一个dom
    content: str,
    position: map.screenCoordinates({
      x: tempPt[0],
      y: height,
      z: tempPt[1]
    }), //三维场景坐标的投影到屏幕的坐标
    positionXYZ: {
      x: tempPt[0],
      y: height,
      z: tempPt[1]
    } //三维场景坐标
  });
  //将信息窗添加到地图中
  map.addControl(infowindow);
  //实时对信息窗定位
  infowindow.positioning();
};
const addPositionWindow = (position, map, name, str, height) => {
  let infowindow = new OvuMap.Controls.InfoWindow({
    //信息窗内容，是一个dom
    content: str,
    position: map.screenCoordinates({
      x: position[0],
      y: height,
      z: position[1]
    }), //三维场景坐标的投影到屏幕的坐标
    positionXYZ: {
      x: position[0],
      y: height,
      z: position[1]
    } //三维场景坐标
  });
  //将信息窗添加到地图中
  map.addControl(infowindow);
  //实时对信息窗定位
  infowindow.positioning();
};

const addText = ({
  lnglat,
  map,
  text,
  color = "purple",
  name,
  group = "textGroup",
  height
}) => {
  new OvuMap.Markers.TextMarker({
    text, //标注内容
    zoom: 1, //文字大小缩放系数
    color, //文字颜色
    //position:, //三维坐标系位置
    lnglat, //经纬度
    y: height, //三维坐标系y值
    mapCenter: map.getMapCenter(name), //地图中心点
    callback: function(textMark) {
      map.addToLayer(textMark, name, group, true);
    }
  });
};
const addRail = ({ points, map }) => {

};
const addTolauers = ({ points, map }) => {
  map.clearLayer("cytd", "testlayer");
  var PolyLine = new OvuMap.Markers.PolyLine()
    //围栏的坐标
    //围栏的配置
    var config = {
        //围栏高度
        height: 100,
        //围栏平面颜色
        color: "#ffff00",
        //围栏平面透明度
        opacity: 0.5,
        //围栏线的颜色
        lineColor: "#ff0000",
    }
    //创建围栏，传入围栏坐标及配置，返回围栏对象
    var fence = PolyLine.drawFence(points, config)
    //添加到对应楼层中图层
    var fenceId = map.addToLayer(fence, "cytd", "testlayer", true)
};
const toggleRange = function(lnglat, map, name, height, color, size, opacity) {
  let imc = coordinatesToMercato(map.getMapCenter(name));
  let tempPt = coordinatesToCoordinates3(imc, lnglat);

  let position = [tempPt[0], height, tempPt[1]];
  //监控器配置
  let config = {
    //是否显示扇形
    surround: true,
    sector: [
      {
        //长度
        length: size,
        //颜色
        color: color,
        //透明度
        opacity: opacity
      }
    ],
    //偏转角
    direction: 0,
    //扫描角度
    arc: 360
  };
  let vi = vidicon.drawMonitor(config, position);
  map.addToLayer(vi, name, "monitorLayer", true);
};

const drawFence = (fence, map, name) => {
  let config = {
    height: 70, //围栏高度
    color: fence.color || "#FFFF00",
    opacity: fence.opacity || 0.5,
    lineColor: fence.lineColor || "#FF0000"
  };
  let _fence = polyline.drawWordsFence(fence.points, config);
  _fence.info.properties.userData = {};
  fence.userDataKeys.forEach(key => {
    _fence.info.properties.userData[key] = fence[key];
  });
  map.addToLayer(_fence, name, "fenceGroup", true);
};

const addFences = (fences, map, name) => {
  map.clearLayer(name, "fenceGroup");
  fences.forEach(fence => {
    drawFence(fence, map, name);
  });
};

const navigation = function(map, name, lineList, routeUrl) {
  if (map.isLayerExist(name, "roadLayer")) map.clearLayer(name, "roadLayer");

  $.ajax({
    type: "get",
    url: routeUrl ? routeUrl : "./static/mapData/6fRoute.json",
    async: true,
    success: function(data) {
      let paths = data; //规划的道路

      let pathConfig = {
        //线段的高度
        height: 1,
        //路径的宽度
        radius: 0.2,
        //自定义贴图
        imgUrl: "./static/mapData/img/arrow.png",
        //单节长度
        sinLength: 2
      };
      lineList.forEach(function(line) {
        //生成起点图片标注
        new OvuMap.Markers.ImageMarker({
          imgMarker: "./static/mapData/img/start.png", //图片路径
          size: 4, //图片大小缩放系数
          position: {
            x: line[0][0],
            y: 4,
            z: line[0][1]
          }, //三维坐标系坐标
          y: 3, //三维坐标系坐标y值
          mapCenter: map.getMapCenter(name), //地图中心点
          callback: function(imgMark) {
            //将图片标注添加到地图
            map.addToLayer(imgMark, name, "myroadGroup", true);
          }
        });
        new OvuMap.Markers.ImageMarker({
          imgMarker: "./static/mapData/img/end.png", //图片路径
          size: 4, //图片大小缩放系数
          position: {
            x: line[1][0],
            y: 4,
            z: line[1][1]
          }, //三维坐标系坐标
          y: 3, //三维坐标系坐标y值
          mapCenter: map.getMapCenter(name), //地图中心点
          callback: function(imgMark) {
            //将图片标注添加到地图
            map.addToLayer(imgMark, name, "myroadGroup", false);
          }
        });

        //路径规划
        let road = polyline.drawRoad(line, pathConfig, paths, 1);
        map.addToLayer(road, name, "roadLayer");
        let pathPoints = road.geometry.parameters.path.points.map(function(
          point
        ) {
          return [point.x, point.z];
        });
        map.addJSONModel({
          src: "./static/mapData/models/man2.json",
          size: 4,
          position: [pathPoints[0][0], 1, pathPoints[0][1]],
          callback: function(man) {
            map.addToLayer(man, name, "myroadGroup");
            animate(1, 6, pathPoints, man, map);
          }
        });
      });
    }
  });
};

const navigation2 = function(map, name, lineList, routeUrl) {
  if (map.isLayerExist(name, "roadLayer")) map.clearLayer(name, "roadLayer");

  let imc = coordinatesToMercato(map.getMapCenter(name));

  $.ajax({
    type: "get",
    url: routeUrl,
    async: true,
    success: function(data) {
      let paths = data; //规划的道路
      paths.forEach(v => {
        v.coor[0] = v.coor[0] * 0.1;
        v.coor[1] = v.coor[1] * 0.1;
      });
      console.log(paths);
      let config = {
        //线段的高度
        height: 50,
        //路径的宽度
        radius: 0.2,
        //自定义贴图
        imgUrl: "./static/mapData/img/arrow3.png",
        //单节长度
        sinLength: 3,
        //是否弯曲化,默认笔直'straight',设为’curve'则弯曲，三个以上点的路径有效。
        lineType: "straight"
      };

      lineList.forEach(points => {
        let arr = [];
        points.forEach(function(v) {
          let tempPt = coordinatesToCoordinates3(imc, v);
          arr.push([tempPt[0] * 0.1, tempPt[1] * 0.1]);
        });

        let path = polyline.drawRoad(arr, config, paths, 1);
        path.scale.x = 10;
        path.scale.z = 10;
        map.addToLayer(path, name, "roadLayer");
      });
    }
  });
};

const getAngle = function(v1, v2) {
  let cosTheta = v1.dot(v2) / (v1.length() * v2.length());

  if (cosTheta > 1) {
    cosTheta = 1;
  } else if (cosTheta < -1) {
    cosTheta = -1;
  }
  let theta = Math.acos(cosTheta);
  return v1.x * v2.y - v1.y * v2.x > 0 ? -theta : theta;
};

const animate = function(step, speed, positionData, model, map) {
  if (step <= positionData.length - 1) {
    let next_V = new map.THREE.Vector2(
      positionData[step][0] - model.position.x,
      positionData[step][1] - model.position.z
    );
    let t = next_V.length() / speed;
    TweenMax.to(model.position, t, {
      x: positionData[step][0],
      z: positionData[step][1],
      ease: Power0.easeNone,
      onStart: function() {
        model.rotation.y = getAngle(new map.THREE.Vector2(0, 1), next_V);
      },
      onUpdate: function(e) {},
      onComplete: function() {
        step++;
        animate(step, speed, positionData, model, map);
      }
    });
  } else {
    model.position.x = positionData[0][0];
    model.position.z = positionData[0][1];
    animate(1, speed, positionData, model, map);
  }
};

const addMarker = function(
  lnglat,
  map,
  name,
  imgUrl,
  Group = "markerGroup",
  userData,
  size,
  height
) {
  if (lnglat[0])
    new OvuMap.Markers.ImageMarker({
      imgMarker: imgUrl, //图片路径
      size: size,
      lnglat: lnglat, //经纬度坐标
      y: height, //图标在所在楼层的高度
      mapCenter: map.getMapCenter(name), //地图中心点
      userData: userData,
      callback: function(imgMark) {
        map.addToLayer(imgMark, name, Group, true);
      }
    });
};
const addPositionMarker = function(
  position,
  map,
  name,
  imgUrl,
  Group = "markerGroup",
  userData,
  size,
  height
) {
  new OvuMap.Markers.ImageMarker({
    imgMarker: imgUrl, //图片路径
    size: size,
    position: { x: position[0], y: height, z: position[1] },
    userData: userData,
    callback: function(imgMark) {
      map.addToLayer(imgMark, name, Group, true);
    }
  });
};

const clearLayerGroup = function(map, name, Group) {
  map.clearLayer(name, Group);
};

const coordinatesToMercato = function(dinatesArr) {
  let dinatesToMercato = dinatesArr.slice(0);
  dinatesToMercato = dinatesToMercato instanceof Array ? dinatesToMercato : [];
  dinatesToMercato[0] =
    (Number.parseFloat(dinatesToMercato[0]) * 20037508.34) / 180;
  dinatesToMercato[1] =
    Math.log(
      Math.tan(((90 + Number.parseFloat(dinatesToMercato[1])) * Math.PI) / 360)
    ) /
    (Math.PI / 180);
  dinatesToMercato[1] =
    (-Number.parseFloat(dinatesToMercato[1]) * 20037508.34) / 180;
  return dinatesToMercato;
};

//经纬度转换到三维坐标系中的坐标
const coordinatesToCoordinates3 = function(mapCenter, dinatesArr) {
  let coordinatesThreeArr = [];
  if (!(dinatesArr[0] instanceof Array)) {
    let centerMercato = coordinatesToMercato(dinatesArr);
    coordinatesThreeArr[0] = centerMercato[0] - mapCenter[0];
    coordinatesThreeArr[1] = centerMercato[1] - mapCenter[1];
  } else {
    dinatesArr.forEach(item => {
      let dinatesToMercato = coordinatesToMercato(item);
      let dinatesDiff = [];
      dinatesDiff[0] = dinatesToMercato[0] - mapCenter[0];
      dinatesDiff[1] = dinatesToMercato[1] - mapCenter[1];
      coordinatesThreeArr.push(dinatesDiff);
    });
  }
  return coordinatesThreeArr;
};

const createPath = function(map, name, points) {
  if (map.isLayerExist(name, "roadLayer")) map.clearLayer(name, "roadLayer");

  let imc = coordinatesToMercato(map.getMapCenter(name));
  let config = {
    //线段的高度
    height: 50,
    //路径的宽度
    radius: 0.2,
    //自定义贴图
    imgUrl: "./static/mapData/img/arrow3.png",
    //单节长度
    sinLength: 3,
    //是否弯曲化,默认笔直'straight',设为’curve'则弯曲，三个以上点的路径有效。
    lineType: "straight"
  };
  let arr = [];
  points.forEach(function(v) {
    let tempPt = coordinatesToCoordinates3(imc, [
      Number(v.longitude),
      Number(v.latitude)
    ]);
    arr.push([tempPt[0] * 0.1, tempPt[1] * 0.1]);
  });
  let path = polyline.drawPath(arr, config);
  path.scale.x = 10;
  path.scale.z = 10;
  map.addToLayer(path, name, "roadLayer");
};

const createLines = function(map, name, Lines, radiuVal) {
  if (map.isLayerExist(name, "roadLayer")) map.clearLayer(name, "roadLayer");

  let imc = coordinatesToMercato(map.getMapCenter(name));
  let config = {
    //线段的高度
    height: 50,
    //路径的宽度
    radius: radiuVal,
    //自定义贴图
    imgUrl: "./static/mapData/img/arrow2.png",
    //单节长度
    sinLength: 3,
    //是否弯曲化,默认笔直'straight',设为’curve'则弯曲，三个以上点的路径有效。
    lineType: "straight"
  };

  Lines.forEach(points => {
    let arr = [];
    points.forEach(function(v) {
      let tempPt = coordinatesToCoordinates3(imc, v);
      arr.push([tempPt[0] * 0.1, tempPt[1] * 0.1]);
    });
    let path = polyline.drawPath(arr, config);
    path.scale.x = 10;
    path.scale.z = 10;
    map.addToLayer(path, name, "roadLayer");
  });
};
const addLine = function(map, name, color, points) {
  if (map.isLayerExist(name, "lineLayer")) map.clearLayer(name, "lineLayer");
  let imc = coordinatesToMercato(map.getMapCenter(name));

  var config = {
    //线段的高度
    height: 5,
    //线段的颜色
    lineColor: color,
    //是否为虚线
    lineType: true,
    //虚线时，线段的长度
    dashSize: 4,
    //虚线时，线段的距离
    gapSize: 2
  };

  let arr = [];
  points.forEach(function(v) {
    let tempPt = coordinatesToCoordinates3(imc, [Number(v[0]), Number(v[1])]);
    arr.push([tempPt[0], tempPt[1]]);
  });
  //创建线段
  let line = polyline.drawLine(arr, config);
  //添加到对应楼层中图层
  let lineId = map.addToLayer(line, name, "lineLayer", true);
};

const themeUrl = "./static/mapData/fillcolor.json";

export default {
  props: {
    height: {
      type: String
    },
    width: {
      type: String
    },
    config: {
      type: Object,
      default: () => ({})
    },
    onLoaded: {
      type: Function,
      default: () => {}
    },
    onMapClick: {
      type: Function,
      default: () => {}
    },
    mapList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    mapList: {
      deep: true,
      immediate: true,
      handler(n) {
        this.setMap(n);
      }
    }
  },
  data() {
    return {
      container: null,
      map: null
    };
  },
  mounted() {
    if (this.config) OvuMap.Config.set(this.config);

    let mapDiv = document.createElement("div");
    let width = this.width ? this.width : "100%";
    let height = this.height ? this.height : "900px";
    mapDiv.setAttribute(
      "style",
      `height:${height};width:${width};position:relative`
    );

    this.$refs["map-container"].appendChild(mapDiv);
    this.container = mapDiv;
    this.setMap(this.mapList);
  },
  methods: {
    setMap(mapList) {
      if (!this.container) return;
      if (mapList.length === 0) {
        return;
      }
      if (this.map) {
        this.map.resetRender({
          mapList: mapList
        });
      } else {
        this.map = new OvuMap.Map({
          container: this.container,
          themeUrl: themeUrl,
          mapList: mapList,
          logoSrc: ""
        });

        this.map.event.on("loaded", e => {
          this.map.addMarker = (
            lnglat,
            imgUrl,
            Group = "markerGroup",
            userData = {},
            size = 3,
            height = 100
          ) => {
            addMarker(
              lnglat,
              this.map,
              mapList[0].name,
              imgUrl,
              Group,
              userData,
              size,
              height
            );
          };
          this.map.addPositionMarker = (
            lnglat,
            imgUrl,
            Group = "markerGroup",
            userData = {},
            size = 3,
            height = 100
          ) => {
            addPositionMarker(
              lnglat,
              this.map,
              mapList[0].name,
              imgUrl,
              Group,
              userData,
              size,
              height
            );
          };
          this.map.addTolauers = ({ points, map }) => {
            addTolauers({ points, map: this.map });
          };
          this.map.addText = ({
            lnglat,
            group = "textGroup",
            color,
            text,
            height = 100
          }) => {
            addText({
              lnglat,
              map: this.map,
              name: mapList[0].name,
              group,
              color,
              text,
              height
            });
          };
          this.map.addRail = ({ points, map }) => {
            addRail({ points, map: this.map });
          };
          this.map.clearLayerGroup = Group => {
            clearLayerGroup(this.map, mapList[0].name, Group);
          };

          this.map.clearAll = () => {
            this.map.clearFloorLayer(mapList[0].name, false);
          };

          this.map.createPath = points => {
            createPath(this.map, mapList[0].name, points);
          };

          this.map.createLines = (Lines, radiuVal = 0.2) => {
            createLines(this.map, mapList[0].name, Lines, radiuVal);
          };
          this.map.addLine = (color, points) => {
            addLine(this.map, mapList[0].name, color, points);
          };
          this.map.toggleRange = (
            lnglat,
            height = 90,
            color = "#0000ff",
            size = 130,
            opacity = 0.5
          ) => {
            toggleRange(
              lnglat,
              this.map,
              mapList[0].name,
              height,
              color,
              size,
              opacity
            );
          };

          this.map.navigation = (lineList, routeUrl = false) => {
            navigation(this.map, mapList[0].name, lineList, routeUrl);
          };

          this.map.navigation2 = (lineList, routeUrl) => {
            navigation2(this.map, mapList[0].name, lineList, routeUrl);
          };

          this.map.addWindow = (lnglat, str, height = 50) => {
            addWindow(lnglat, this.map, mapList[0].name, str, height);
          };
          this.map.addPositionWindow = (lnglat, str, height = 100) => {
            addPositionWindow(lnglat, this.map, mapList[0].name, str, height);
          };
          this.onLoaded(this.map);
          this.map.event.on("click", e => {
            console.log('e :', e);
            this.onMapClick(e);
          });
        });
      }
    },
    addMaker({ x, z, imgUrl }) {

    }
  },
  beforeDestroy() {
    this.map = null;
    this.$refs["map-container"].removeChild(this.container);
    this.container = null;
  }
};
</script>
<style scoped>
</style>


