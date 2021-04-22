import axios from 'axios'
 var miniMap ={
    map: null,
    container: null,
    callback: null,
    callback2: null,
    mapData:{},
    themeUrl: '/static/indoorMapData/theme/fillcolor.json',
    setMap: (mapList, fn, fn2) => {
        if (!miniMap.container)
            return
        miniMap.callback = fn
        miniMap.callback2 = fn2
        if (miniMap.map) {
            miniMap.map.resetRender({
                mapList: JSON.parse(JSON.stringify(mapList))
            });
        } else {
            miniMap.map = new AirocovMap.Map({
                container: miniMap.container,
                themeUrl: miniMap.themeUrl,
                mapList: JSON.parse(JSON.stringify(mapList)),
                logoSrc: "",
                showAllFloor: false,
                count: 100,
                zoom: 2,
                defaultGap: 1,//楼层间距
                showMenu: false, //不显示楼层选择,
                theta: 0,
                showViewMode: "MODE_2D",
                defaultClickModels: [
                    "roomGroup",
                    "bottomGroup",
                    "otherGroup",
                    "deskGroup",
                    "seatGroup",
                    "logoGroup",
                ],
            });
            miniMap.map.event.on("loaded", (e) => {
                miniMap.callback && miniMap.callback(miniMap.map)
            })
            miniMap.map.event.on("click", (e) => {
                miniMap.callback2 && miniMap.callback2(e)
            })
        }
    },
    getMapData: (parkName) => {
        return new Promise((resolve, reject) => {
            if (miniMap.mapData.parkName != parkName) {
                axios.get("/static/indoorMapData/indoorMapData.json").then(res => {
                    miniMap.mapData = res.data[parkName]
                    resolve(miniMap.mapData)
                })
            } else {
                resolve(miniMap.mapData)
            }

        })
    },
    getParkItem: (name) => {
        if (Array.isArray(miniMap.mapData)) {
            return miniMap.mapData.find(function (data) {
                return data.name == name;
            })
        }
        return miniMap.mapData;
    },
    getPark: (name) => {
        var park = miniMap.getParkItem(name);
        if (park) {
            return {
                name: park.name,
                mapUrl: park.mapUrl,
                themeUrl: park.themeUrl
            }
        } else {
            return {}
        }

    },
    getFloor: (parkName, floorName) => {
        var park = miniMap.getParkItem(parkName);
        var floor = park.list.filter(function (item) {
            return item.name === floorName;
        })[0];
        return floor;
    },
    getFloorById: (parkName, id) => {
        var park = miniMap.getParkItem(parkName);
        var floor = park.list.find(function (item) {
            return item.bimId == id;
        });
        return floor;
    },
    getFloorByNo: (parkName, floorNo,cb) => {
     
          miniMap.getMapData(parkName).then((data)=>{
                var floor = data.list.find(function (item) {
                    return item.floorNo == floorNo;
                });
                cb(floor)
            })
        
        
    },
    getGround: (parkName, floorName, groundName) => {
        var floor = miniMap.getFloor(parkName, floorName);
        var ground = floor.list.filter(function (item) {
            return item.name === groundName;
        })[0];
        return ground;
    },
    changeMapGroupColor:(groupIds,Name, color, color2, floorNo) =>{
        if (groupIds) {
            var groupName = miniMap.map.getLayer(floorNo, Name);
            groupName && groupName.children.forEach(function (ch) {
                if (groupIds.indexOf(ch.info.properties.uuid) !== -1) {
                    ch.material.color.set(color);
                    ch.info.properties.newColor = color;
                    ch.info.properties.coverColor = color2;
                }
            });
        }
    }
}

export default  miniMap