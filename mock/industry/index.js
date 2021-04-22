import Mock from 'mockjs';
import { addSeconds } from 'date-fns';

let parkInfo = [
    {
        name: '湖北省',
        lnglat: [114.298572, 30.584355],
        code: 420000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '武汉市',
                lnglat: [114.3052500000, 30.5927600000],
                code: 420100,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '04201110001CYTD',
                        name: '创意天地',
                        lnglat: [114.321771, 30.470407],
                        zoom: 17,
                        depth: 2,
                        field: [
                            [114.319271, 30.472316],
                            [114.325194, 30.472446],
                            [114.323885, 30.467952],
                            [114.318971, 30.468969],
                        ],
                        data: {

                        }
                    },
                    // {
                    //     parkNo: 'none',
                    //     name: '武汉未来科技城',
                    //     lnglat: [114.539352, 30.491428],
                    //     zoom: 17,
                    //     depth: 2,
                    //     field: [],
                    //     data: {}
                    // },
                    {
                        parkNo: '04201150001YC00',
                        name: '研创中心',
                        lnglat: [114.4254070000, 30.4220550000],
                        zoom: 17,
                        depth: 2,
                        field: [
							[114.4255256700,30.4241973500],
							[114.4282078700,30.4220139800],
							[114.4255256700,30.4196270200],
							[114.4225859600,30.4219399600]
						],
                        data: {}
                    },
                    // {
                    //     parkNo: 'none',
                    //     name: '武汉光谷智创园',
                    //     lnglat: [114.418025, 30.480241],
                    //     zoom: 17,
                    //     depth: 2,
                    //     field: [],
                    //     data: {}
                    // },
                    // {
                    //     parkNo: 'none',
                    //     name: '光谷金融港',
                    //     lnglat: [114.425278, 30.456355],
                    //     zoom: 17,
                    //     depth: 2,
                    //     field: [],
                    //     data: {}
                    // },
                    // {
                    //     parkNo: 'none',
                    //     name: '光谷软件园',
                    //     lnglat: [114.403992, 30.475127],
                    //     zoom: 17,
                    //     depth: 2,
                    //     field: [],
                    //     data: {}
                    // },
                    // {
                    //     parkNo: 'none',
                    //     name: '光谷生物城创新园',
                    //     lnglat: [114.474287, 30.48417],
                    //     zoom: 17,
                    //     depth: 2,
                    //     field: [],
                    //     data: {}
                    // },
                    // {
                    //     parkNo: 'none',
                    //     name: '武汉高科医疗器械园',
                    //     lnglat: [114.528392, 30.486495],
                    //     zoom: 17,
                    //     depth: 2,
                    //     field: [],
                    //     data: {}
                    // },
					{
                        parkNo: '04201120001WAJD',
                        name: '武汉网安基地',
                        lnglat: [114.1437649727,30.6777638952],
                        zoom: 17,
                        depth: 2,
                        field: [
							[114.1408681870,30.6800522482],
							[114.1475844383,30.6805320573],
							[114.1480135918,30.6748295568],
							[114.1408252716,30.6746080936]
						],
                        data: {}
                    }
                ],
                data: {}
            },
            // {
            //     name: '鄂州市',
            //     lnglat: [114.657217, 30.500932],
            //     code: 420700,
            //     depth: 1,
            //     zoom: 9,
            //     nodes: [
            //         {
            //             parkNo: '04207030001JSQ0',
            //             name: '鄂州光谷联合科技城',
            //             lnglat: [114.6529330000, 30.5001320000],
            //             zoom: 17,
            //             depth: 2,
            //             field: [
			// 				[114.6527838700, 30.5001038800],
			// 				[114.6568179100, 30.4999744600],
			// 				[114.6568393700, 30.4977003400],
			// 				[114.6517374400, 30.5003229900]
            //             ],
            //             data: {}
            //         },
            //     ],
            //     data: {}
            // },
            {
                name: '黄石市',
                lnglat: [115.001184, 30.160006],
                code: 420200,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '04202810001HSKJ',
                        name: '黄石光谷联合科技城',
                        lnglat: [115.0000119200,30.1575401300],
                        zoom: 17,
                        depth: 2,
                        field: [
							[114.9985528000,30.1586718800],
							[115.0013637500,30.1591542600],
							[115.0016427000,30.1556847900],
							[114.9985957100,30.1557033400]
                        ],
                        data: {}
                    },
                ],
                data: {}
            },
            {
                name: '黄冈市',
                lnglat: [114.900673, 30.473041],
                code: 421100,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '04211020001HGKJ',
                        name: '黄冈光谷联合科技城',
                        lnglat: [114.9019289000,30.4735322300],
                        zoom: 17,
                        depth: 2,
                        field: [
							[114.9020576500,30.4753076000],
							[114.9042892500,30.4734027700],
							[114.9016928700,30.4716273700],
							[114.8993110700,30.4738651100]
                        ],
                        data: {}
                    },
                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '四川省',
        lnglat: [104.065735,30.659462],
        code: 510000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '成都市',
                lnglat: [104.0647600000,30.5702000000],
                code: 510100,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '05101160001CDXG',
                        name: '成都芯谷',
                        lnglat: [103.8981320000,30.5578460000],
                        zoom: 17,
                        depth: 2,
                        field: [
                            [103.8970667124,30.5583946217],
							[103.8993519545,30.5582652795],
							[103.8992071152,30.5570919530],
							[103.8969808817,30.5571843414]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '山东省',
        lnglat: [117.000923, 36.675807],
        code: 370000,
        depth: 0,
        zoom: 7,
        nodes: [
            // {
            //     name: '济南市',
            //     lnglat: [118.714933, 37.427403],
            //     code: 370100,
            //     depth: 1,
            //     zoom: 9,
            //     nodes: [
            //         {
            //             parkNo: 'none',
            //             name: '东营光谷未来城',
            //             lnglat: [118.714933, 37.427403],
            //             zoom: 17,
            //             depth: 2,
            //             field: [
            //             ],
            //             data: {}
            //         },

            //     ],
            //     data: {}
            // },
            {
                name: '青岛市',
                lnglat: [120.3829900000, 36.0662300000],
                code: 370200,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '03702110001QDXX',
                        name: '青岛光谷软件园',
                        lnglat: [120.160233, 35.950986],
                        zoom: 17,
                        depth: 2,
                        field: [
						[120.1593375206,35.9515817309],
						[120.1606732607,35.9517988590],
						[120.1611185074,35.9505481929],
						[120.1597774029,35.9502876349]
                        ],
                        data: {}
                    },
                    {
                        parkNo: '03702110001QDKJ',
                        name: '青岛海洋科技园',
                        lnglat: [120.6782540000,36.3458260000],
                        zoom: 17,
                        depth: 2,
                        field: [
							[120.6767249107,36.3468458235],
							[120.6798899174,36.3466816353],
							[120.6794285774,36.3448236918],
							[120.6769180298,36.3445817238]
                        ],
                        data: {}
                    },
                    {
                        parkNo: '03702110001QDYC',
                        name: '青岛研创中心',
                        lnglat: [120.1619190000,35.9653210000],
                        zoom: 17,
                        depth: 2,
                        field: [
							[120.1610648600,35.9663016700],
							[120.1635217700,35.9662495600],
							[120.1632428200,35.9638355100],
							[120.1608181000,35.9643391700]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '安徽省',
        lnglat: [117.283042, 31.86119],
        code: 340000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '合肥市',
                lnglat: [117.2290100000, 31.8205700000],
                code: 340100,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '03401110001HFJR',
                        name: '合肥金融港',
                        lnglat: [117.288385, 31.751641],
                        zoom: 17,
                        depth: 2,
                        field: [
							[117.2869062400, 31.7530032600],
							[117.2914552700, 31.7529120300],
							[117.2914338100, 31.7503575600],
							[117.2869706200, 31.7504123000]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    },
    // {
    //     name: '海南省',
    //     lnglat: [110.33119, 20.031971],
    //     code: 460000,
    //     depth: 0,
    //     zoom: 7,
    //     nodes: [
    //         {
    //             name: '海口市',
    //             lnglat: [110.121071, 19.94796],
    //             code: 460100,
    //             depth: 1,
    //             zoom: 9,
    //             nodes: [
    //                 {
    //                     parkNo: 'none',
    //                     name: '海南生态软件园',
    //                     lnglat: [110.121071, 19.94796],
    //                     zoom: 17,
    //                     depth: 2,
    //                     field: [
    //                     ],
    //                     data: {}
    //                 },

    //             ],
    //             data: {}
    //         }
    //     ],
    //     data: {}
    // },
    {
        name: '福建省',
        lnglat: [119.306239, 26.075302],
        code: 350000,
        depth: 0,
        zoom: 7,
        nodes: [
            // {
            //     name: '厦门市',
            //     lnglat: [118.128411, 24.515205],
            //     code: 350200,
            //     depth: 1,
            //     zoom: 9,
            //     nodes: [
            //         {
            //             parkNo: 'none',
            //             name: '厦门智慧物联科技园',
            //             lnglat: [118.128411, 24.515205],
            //             zoom: 17,
            //             depth: 2,
            //             field: [
            //             ],
            //             data: {}
            //         },

            //     ],
            //     data: {}
            // },
			{
                name: '南平市',
                lnglat: [118.1204300000, 27.3317500000],
                code: 350700,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '03507030001ZGRJ',
                        name: '武夷智谷软件园',
                        lnglat: [118.1402671300,27.3976128200],
                        zoom: 17,
                        depth: 2,
                        field: [
							[118.1381428200, 27.3974223100],
							[118.1418013600, 27.3989463700],
							[118.1421124900, 27.3979176300],
							[118.1388402000, 27.3961839900]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    },
    // {
    //     name: '上海市',
    //     lnglat: [121.472644, 31.231706],
    //     code: 310000,
    //     depth: 0,
    //     zoom: 7,
    //     nodes: [
    //         {
    //             name: '上海市',
    //             lnglat: [121.158878, 31.029038],
    //             code: 310100,
    //             depth: 1,
    //             zoom: 9,
    //             nodes: [
    //                 {
    //                     parkNo: '03101170001SHXX',
    //                     name: '上海中电信息港',
    //                     lnglat: [121.1595610000,31.0295350000],
    //                     zoom: 17,
    //                     depth: 2,
    //                     field: [
	// 					[121.1583745500, 31.0291807100],
	// 					[121.1623978600, 31.0304402200],
	// 					[121.1638355300, 31.0274798800],
	// 					[121.1597371100, 31.0259812800]
    //                     ],
    //                     data: {}
    //                 },

    //             ],
    //             data: {}
    //         }
    //     ],
    //     data: {}
    // },
    {
        name: '辽宁省',
        lnglat: [123.429096, 41.796767],
        code: 210000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '沈阳市',
                lnglat: [123.411268, 41.8188145],
                code: 210100,
                depth: 1,
                zoom: 9,
                nodes: [
                    // {
                    //     parkNo: '02101130001SYKJ',
                    //     name: '沈阳光谷联合科技城',
                    //     lnglat: [123.4078600000, 41.9838500000,],
                    //     zoom: 17,
                    //     depth: 2,
                    //     field: [
					// 	[123.4075999300, 41.9849672200],
					// 	[123.4121918700, 41.9863389000],
					// 	[123.4135866200, 41.9824630400],
					// 	[123.4086298900, 41.9822556800]
                    //     ],
                    //     data: {}
                    // },
                    {
                        parkNo: '02101130001SYXX',
                        name: '沈阳中电光谷信息港',
                        lnglat: [123.4032869300,41.9763058300],
                        zoom: 17,
                        depth: 2,
                        field: [
							[123.3991026900, 41.9759389300],
							[123.4061837200, 41.9782360000],
							[123.4071064000, 41.9763217800],
							[123.3995533000, 41.9747903600]
                        ],
                        data: {}
                    },
					{
                        parkNo: '02101130001SYCK',
                        name: '创客公社',
                        lnglat: [123.4255170800,41.9260927800],
                        zoom: 17,
                        depth: 2,
                        field: [
							[123.4243798300,41.9266355800],
							[123.4266221500,41.9268670600],
							[123.4268903700,41.9251907700],
							[123.4243047200,41.9249912100]
                        ],
                        data: {}
                    }
                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '浙江省',
        lnglat: [120.153576, 30.287459],
        code: 330000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '温州市',
                lnglat: [120.648265, 28.008014],
                code: 330300,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '03303030001WZXX',
                        name: '温州CEC信息港',
                        lnglat: [120.8171460000, 27.8336600000],
                        zoom: 17,
                        depth: 2,
                        field: [
							[120.8140325500,27.8341047400],
							[120.8191609400,27.8374443000],
							[120.8219933500,27.8344462900],
							[120.8166718500,27.8311256100]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '陕西省',
        lnglat: [108.948024, 34.263161],
        code: 610000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '西安市',
                lnglat: [108.852967, 34.366101],
                code: 610100,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '06101120001XAXX',
                        name: '西安信息港',
                        lnglat: [108.8861620000, 34.3695070000],
                        zoom: 17,
                        depth: 2,
                        field: [
							[108.8855838800, 34.3703704000],
							[108.8870108100, 34.3706626400],
							[108.8873004900, 34.3690597600],
							[108.8860344900, 34.3683335800]
                        ],
                        data: {}
                    },

                ],
                data: {}
            },
			 {
                name: '咸阳市',
                lnglat: [108.7092900000, 34.3293200000],
                code: 610400,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '06104020001XYZG',
                        name: '咸阳西部智谷',
                        lnglat: [108.6413000000,34.2859620000],
                        zoom: 17,
                        depth: 2,
                        field: [
							[108.6393356300,34.2870239800],
							[108.6430478100,34.2873785600],
							[108.6430048900,34.2840809400],
							[108.6394858400,34.2839922900]
                        ],
                        data: {}
                    },
					{
                        parkNo: '06104020001XYKJ',
                        name: '咸阳启点科技城',
                        lnglat: [108.6488413800,34.2904633200],
                        zoom: 17,
                        depth: 2,
                        field: [
							[108.6456227300, 34.2927502200],
							[108.6508369400, 34.2934415900],
							[108.6526179300, 34.2883004500],
							[108.6471247700, 34.2868998800]
                        ],
                        data: {}
                    }

                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '湖南省',
        lnglat: [112.9834000000, 28.1126600000],
        code: 430000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '长沙市',
                lnglat: [112.9388600000, 28.2277800000],
                code: 430100,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '04301040001CSRJ',
                        name: '长沙中电软件园',
                        lnglat: [112.8810668000,28.2289740500],
                        zoom: 17,
                        depth: 2,
                        field: [
							[112.8800797500, 28.2319421900],
							[112.8834271400, 28.2310347400],
							[112.8825473800, 28.2261570800],
							[112.8790497800, 28.2267053600]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '重庆市',
        lnglat: [106.504962,29.533155],
        code: 500000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '重庆市',
                lnglat: [106.504962,29.533155],
                code: 500100,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '05001060001CQZC',
                        name: '光谷智创园',
                        lnglat: [106.3123154600,29.6028598200],
                        zoom: 17,
                        depth: 2,
                        field: [
							[106.3117575600,29.6032143000],
							[106.3129752900,29.6032236300],
							[106.3130182000,29.6022721300],
							[106.3117629300,29.6022674700]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '河南省',
        lnglat: [113.7532200000, 34.7657100000],
        code: 410000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '洛阳宜阳县',
                lnglat: [112.1792000000, 34.5149600000],
                code: 410327,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '04103270001LYJM',
                        name: '洛阳军民融合产业园',
                        lnglat: [112.5091195100,34.6320956100],
                        zoom: 17,
                        depth: 2,
                        field: [
							[112.5066947900, 34.6335786800],
							[112.5119519200, 34.6340377200],
							[112.5116086000, 34.6306301600],
							[112.5068879100, 34.6302593900]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    },
    {
        name: '宁夏回族自治区',
        lnglat: [106.2586700000, 38.4711700000],
        code: 640000,
        depth: 0,
        zoom: 7,
        nodes: [
            {
                name: '银川市',
                lnglat: [106.2324800000, 38.4864400000],
                code: 640100,
                depth: 1,
                zoom: 9,
                nodes: [
                    {
                        parkNo: '06401060001YCJM',
                        name: '银川先进技术融合创新中心',
                        lnglat: [106.2211632700,38.5178470600],
                        zoom: 17,
                        depth: 2,
                        field: [
							[106.2211310900, 38.5185312000],
							[106.2218821000, 38.5182038200],
							[106.2212652000, 38.5171713100],
							[106.2205785500, 38.5174777100]
                        ],
                        data: {}
                    },

                ],
                data: {}
            }
        ],
        data: {}
    }
]

parkInfo.forEach(p => {
    let p_parkNum =0
    let p_r_e_num = 0
    let p_e_num = 0
    let p_injectM = 0
    let p_e_people = 0
    p.nodes.forEach(c => {
        let lng = 0
        let lat = 0
        let c_r_e_num =0
        let c_e_num = 0
        let c_injectM = 0
        let c_e_people = 0
        c.nodes.forEach(park => {
            lng += park.lnglat[0]
            lat += park.lnglat[1]
            let e_num = 100 + parseInt(Math.random() * 100)
            let r_e_num = parseInt(e_num * 1.8)
            let e_people = 2000 + parseInt(Math.random() * 3000)
            park.info = [
                park.name,
                `<span>产业园主题：</span><span>文化创建</span>`,
                `<span>园区面积：</span><span>${parseInt(Math.random() * 10000) / 100}万平方米</span>`,
                `<span>服务企业：</span><span>${r_e_num}家</span>`,
                `<span>就业人数：</span><span>${e_people}人</span>`,
                `<span>年税收：</span><span>约${5 + parseInt(Math.random() * 100) / 10}亿</span>`
            ]
            park.data = {
                activeNum: 100 - parseInt(Math.random() * 20),
                e_num: e_num,
                r_e_num: r_e_num,
                injectM: 20 + parseInt(Math.random() * 20),
                e_people: e_people,
                coverC: 6
            }
            c_e_num += park.data.e_num
            c_injectM += park.data.injectM
            c_e_people += park.data.e_people
            c_r_e_num += park.data.r_e_num
        })
        lng = lng / c.nodes.length
        lat = lat / c.nodes.length
        c.lnglat = [lng, lat]
        c.data = {
            parkNum: c.nodes.length,
            e_num: c_e_num,
            r_e_num: c_r_e_num,
            injectM: c_injectM,
            e_people: c_e_people,
            coverC: 16
        }
        p_parkNum+=c.data.parkNum
        p_e_num += c.data.e_num
        p_injectM += c.data.injectM
        p_e_people += c.data.e_people
        p_r_e_num += c.data.r_e_num
    })
    p.data = {
        parkNum: p_parkNum,
        e_num: p_e_num,
        r_e_num: p_r_e_num,
        injectM: p_injectM,
        e_people: p_e_people,
        coverC: 16
    }
})


export default [
    {
        url: '/industry/companylist',
        type: 'get',
        response: config => {
            const placeCode = config.query.placeCode
            let data = parkInfo
            if (placeCode) {
                var pCode = placeCode.split('')[0] + placeCode.split('')[1] + '0000' - 0
                data = data.find((item) => {
                    return item.code == pCode
                })

                if (pCode == (placeCode - 0)) {
                    var _data = []
                    data.nodes.forEach(v => {
                        _data = _data.concat(v.nodes)
                    })
                    data = _data
                } else {
                    data = data.nodes.find((item) => {
                        return item.code == (placeCode - 0)
                    })
                    data = data.nodes
                }
            } else {
                var _data = []
                data.forEach(v => {
                    v.nodes.forEach(vv => {
                        _data = _data.concat(vv.nodes)
                    })
                })
                data = _data
            }

            const { pageSize, pageIndex } = config.query;
            const fdata = data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize * 1);
            return {
                code: 200,
                total: data.length,
                data: fdata
            };
        }
    },
    {
        url: '/industry/parkInfo',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: parkInfo
            };
        }
    },
    {
        url: '/industry/citylist',
        type: 'get',
        response: config => {
            var citys = [{
                name: '全国',
                code: 666,
            }]
            parkInfo.forEach(v => {
                v.nodes.forEach(c => {
                    citys.push({
                        name: c.name,
                        code: c.code
                    })
                })
            })
            return {
                code: 200,
                data: citys
            };
        }
    },
    {
        url: '/industry/cityinfo',
        type: 'get',
        response: config => {
            var placeCode = config.query.placeCode
            var pCode = placeCode.split('')[0] + placeCode.split('')[1] + '0000' - 0
            var p = parkInfo.find(v => {
                return v.code == pCode
            })
            var city = p.nodes.find(c => {
                return c.code == placeCode
            })
            return {
                code: 200,
                data: city
            };
        }
    }
];
