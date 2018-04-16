/**
 * Created by k on 2017/7/5.
 */
var httpUrl = 'http://test.le-pv.com/Lepv_appApi/api/';
// 'https://www.le-pv.com/Lepv_system/api/';
// 'http://192.168.1.14:8080/Lepv_appApi/api/';
angular.module('app')
    .factory('httpService', function ($http) {
        return {
            get: function (api, param, successCallback, errorCallback) {
                var str, str2 = '';
                if (param != null) {
                    str = '?';
                    for (var i in param) {
                        str += i + '=' + param[i] + '&';
                    }
                    str2 = str.slice(0, -1);
                }


                $http.get(httpUrl + api + str2)
                    .success(function (data, status, header, config) {
                        successCallback(data);
                    }).error(function (data, status, headers, config) {
                    errorCallback(data);
                })
            },
            post: function (api, param, successCallback, errorCallback) {
                $http.post(httpUrl + api, param)
                    .success(function (data, status, headers, config) {
                        successCallback(data);
                    }).error(function (data, status, headers, config) {
                    errorCallback(data);
                })
            },
            testPost: function (api, param, successCallback, errorCallback) {
                $http.post('https://www.easy-mock.com/mock/5a1b67fd9840a8124566ca88/api/' + api, param)

                    .success(function (data, status, headers, config) {
                        successCallback(data);
                    }).error(function (data, status, headers, config) {

                    errorCallback(data);
                })
            },
            designPost: function (api, param, successCallback, errorCallback) {
                $http.post('https://www.le-pv.com/Lepv_design/api/' + api, param)
                    .success(function (data, status, headers, config) {
                        successCallback(data);
                    }).error(function (data, status, headers, config) {
                    errorCallback(data);
                })
            }

        }
    });
angular.module('app')
    .factory('dateService', function () {
        return {
            getFormatTime: function (type, time) {
                var year = new Date().getFullYear();
                var month = new Date().getMonth();
                var date = new Date().getDate();
                var hour = new Date().getHours() < 23 ? new Date().getHours() + 1 : new Date().getHours();
                if (time) {
                    year = time.getFullYear();
                    month = time.getMonth();
                    date = time.getDate();
                    hour = time.getHours();
                }
                switch (type) {
                    case 'hour' :  // 小时
                        return new Date(year, month, date, hour);
                    default:
                        break;
                }

            }
        }

    });

/**
 *
 *
 * highchart
 *
 *  yAxis: {
            endOnTick: false // 是否强制结束为坐标轴
        },
 *
 * */
angular.module('app').factory('hChart', function () {
    return {
        // 电站概览
        overview3Chart: function (data) {
            var min = 0;
            var max = 1;
            if (data && data.length) {
                min = data[0][1];
                max = data[0][1];
                for (var i in data) {
                    if (min >= data[i][1]) {
                        min = parseInt(data[i][1] || 0);
                    }
                    if (max <= data[i][1]) {
                        max = parseInt(data[i][1] || 0);
                    }
                }
            }
            $('#container1').highcharts({

                yAxis: {
                    tickPositioner: function () {
                        if (max > 1) {
                            var positions = [],
                                tick = Math.floor(min),
                                increment = Math.ceil((max - min) / 3);
                            for (tick; tick - increment <= max; tick += increment) {
                                positions.push(tick);
                            }
                            return positions;
                        }
                    }
                },
                plotOptions: {
                    area: {
                        /* pointStart: 1940,*/
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2,
                            enabled: false
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: 0,//// Y轴的值作为该地区的基础,对于区分值高于和低于一个阈值。如果是null,像一个区域线系列填图和Y轴之间的最小值。默认是:0。
                        tooltip: {
                            useHTML: true,
                            headerFormat: '<b>{point.x:%H:%M} {series.name}</b><br>',
                            pointFormat: '{point.y:.0f}(瓦)'
                        }
                    }
                },
                series: [{
                    name: '功率',
                    type: 'area',
                    data: data

                }],
                lang: {
                    noData: "无结果T^T"
                },
                noData: {
                    style: {
                        fontSize: '36px',
                        fontWeight: 'normal',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }
            });
        },
        // 电站日图表
        overview2DayChart: function (data) {
            $('#container2').highcharts({

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%H:%M'
                    }
                },
                yAxis: {
                    min: 0,
                    //endOnTick: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2,
                            enabled: false
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: 0
                    }

                },
                series: [{
                    name: '功率',
                    type: 'area',
                    data: data,
                    tooltip: {
                        headerFormat: '<b>{point.x:%H:%M}   {series.name}</b><br>',
                        pointFormat: '{point.y:.0f}(瓦)'
                    }

                }
                ],
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        fontWeight: 'normal',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }
            });
        },
        // 电站月/年/总图表
        overview2NotDayChart: function (timeList, powerList, chartLineType) {
            var pointWidth = 20;
            if (timeList && timeList.length) {
                if (timeList.length > 20) {
                    pointWidth = 5;
                } else if (timeList.length > 11) {
                    pointWidth = 10;
                } else if (timeList.length > 5) {
                    pointWidth = 12;
                }
            }

            $('#container2').highcharts({

                xAxis: {
                    categories: timeList,
                    tickmarkPlacement: 'on'// 柱状图在x轴点上
                },
                yAxis: {

                    min: 0,
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    headerFormat: '<b>{point.x}   {series.name}</b><br>',
                    pointFormat: '{point.y:.0f} (度)',
                    valueDecimals: 0
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',
                        borderWidth: 0,
                        minPointLength: 2,
                        pointWidth: pointWidth

                    }
                },
                series: [{
                    name: '发电量',
                    type: chartLineType,
                    data: powerList
                }],
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        fontWeight: 'normal',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }
            });

        },
        // 设备功率
        drawingAcPowerChart: function (data) {
            data = convertToUTC(data);
            //var color = ['#98cf67', '#4d9bfb', '#f39059ed', '#9c91da','#f15c80', '#e4d354', '#515b6d', '#808080']
            $('#container2').highcharts({
                chart: {
                    type: 'area'
                },
                xAxis: {

                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<b>{point.x:%H:%M}    {series.name}</b><br>',
                    pointFormat: '{point.y:.0f}(瓦)',
                    valueDecimals: 0

                },
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        },
                        lineWidth: 1,
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[1]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba')]
                            ]
                        }
                    }
                },
                series: [{
                    name: '功率',
                    data: data,
                    color: Highcharts.getOptions().colors[1]
                }],
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }
            });
        },
        // 设备并网
        drawingGridChart: function (data, chartType) {
            var data = resultchangeGird(data);
            var en = chartType == 2 ? '(V)' : '(A)';
            if (data[0] && data[0].data) { //R or pv1
                data[0].data = convertToUTC(data[0].data);
            }
            if (data[1] && data[1].data) { //S or pv2
                data[1].data = convertToUTC(data[1].data);
            }
            if (data[2] && data[2].data) { //T
                data[2].data = convertToUTC(data[2].data);
            }
            Highcharts.setOptions({
                colors: ['#4d9bfb', '#98cf67', '#f39059ed', '#9c91da', '#f15c80', '#e4d354', '#515b6d', '#808080']
            });
            $('#container2').highcharts({
                chart: {
                    type: 'spline',
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%H:%M'
                    },
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%H:%M}    {point.y}' + en,
                    valueDecimals: 2

                },
                series: data,
                lang: {
                    noData: "无结果"
                },
                legend: {
                    enabled: true,
                    itemStyle: {
                        color: '#333333',
                        fontWeight: 'bold'
                    }
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }

            });
        },
        // 设备PV功率
        drawingPVPowerChart: function (data) {
            var data = resultchangePV(data);
            var newArray = [];
            if (data[0] && data[0][0].data) { //R or pv1
                data[0][0].data = convertToUTC(data[0][0].data);
                newArray.push(data[0][0]);
            }
            if (data[1] && data[1][0].data) { //S or pv2
                data[1][0].data = convertToUTC(data[1][0].data);
                newArray.push(data[1][0]);
            }
            Highcharts.setOptions({
                colors: ['#4d9bfb', '#98cf67', '#9c91da', '#f15c80', 'fd8731', '#e4d354', '#515b6d', '#808080']
            });
            $('#container2').highcharts({
                chart: {
                    type: 'spline',
                },
                xAxis: {
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },

                tooltip: {
                    useHTML: true,
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%H:%M}    {point.y}' + '瓦',
                    valueDecimals: 2

                },

                legend: {
                    enabled: true,
                    itemStyle: {
                        color: '#333333',
                        fontWeight: 'bold'
                    }
                },
                series: newArray,
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        fontWeight: 'normal',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }

            });
        },
        // 设备PV电压
        drawingPVVolChart: function (data) {
            var newArray = []; //由于data是二维数组，定义一个空数组来存放
            var data = resultchangePV(data);
            if (data[0] && data[0][0].data) { //R or pv1
                data[0][0].data = convertToUTC(data[0][0].data);
                newArray.push(data[0][0])
            }
            if (data[1] && data[1][0].data) { //S or pv2
                data[1][0].data = convertToUTC(data[1][0].data);
                newArray.push(data[1][0])
            }
            if (data[2] && data[2][0].data) { //T
                data[2][0].data = convertToUTC(data[2][0].data);
                newArray.push(data[2][0])
            }
            if (data[3] && data[3][0].data) { //pv1 pv2 电流
                data[3][0].data = convertToUTC(data[3][0].data);
                newArray.push(data[3][0]) // newArray 来代替data
            }
            Highcharts.setOptions({
                colors: ['#4d9bfb', '#98cf67', '#9c91da', '#f15c80', 'fd8731', '#e4d354', '#515b6d', '#808080']
            });
            $('#container2').highcharts({
                chart: {
                    type: 'spline',
                },

                xAxis: {
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                yAxis: [{
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    },
                    title: {
                        text: 'PV1&PV2(V)',
                        style: {
                            color: '#666666'
                        },
                    },
                }, {
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    },
                    title: {
                        text: 'PV1&PV2(A)',
                        style: {
                            color: '#666666'
                        },
                    },
                    opposite: true,
                }],
                plotOptions: {},
                legend: {
                    enabled: true,
                    itemStyle: {
                        color: '#333333',
                        fontWeight: 'bold'
                    }
                },
                series: newArray,
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        fontWeight: 'normal',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }

            });
        },
        // 设备 日/月/年/总 发电量
        drawingPower: function (data, type) {
            var datas;
            if (type == 2) {
                datas = convertToUTC(deleMonthNull(data));
            } else {
                datas = convertToUTC(deleNull(data), 1);
            }
            var pointWidth = 20;
            var timeType = {
                2: '%d', //月
                3: '%m', //年
                4: '%Y', //总
            };
            var XtickInterval = null;
            if (type == 2) {
                XtickInterval = 24 * 60 * 60 * 1000;
            }


            if (datas && datas.length) {
                if (datas.length > 20) {
                    pointWidth = 5;
                } else if (datas.length > 11) {
                    pointWidth = 10;
                } else if (datas.length > 5) {
                    pointWidth = 12;
                }
            }
            $('#container2').highcharts({
                chart: {
                    type: 'column',
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: timeType[type],
                        second: timeType[type],
                        minute: timeType[type],
                        hour: timeType[type],
                        day: timeType[type],
                        week: timeType[type],
                        month: timeType[type],
                        year: timeType[type]
                    },
                    tickInterval: XtickInterval,
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                yAxis: {
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<b>{point.x:' + timeType[type] + '} {series.name}</b><br> ',
                    pointFormat: '  {point.y:.0f}(度)',
                    valueDecimals: 0
                },
                plotOptions: {
                    column: {
                        cursor: 'pointer',
                        pointPadding: 0.2,
                        borderWidth: 0,
                        minPointLength: 2,
                        pointWidth: pointWidth,

                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '发电量',
                    data: datas,
                    color: '#4d9bfb'
                }],
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        fontWeight: 'normal',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }
            });
        },
        // 小工具
        drawCalcChart: function (obj, type, title, categories, yTitle, series) {
            $('#' + obj).highcharts({
                chart: {
                    type: type
                },
                title: {
                    text: title,
                    style: {
                        color: '#A0A0A3',
                        fontSize: '16px'
                    },

                },
                xAxis: {
                    categories: categories,
                    labels: {
                        style: {
                            color: '#A0A0A3'
                        }
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: yTitle
                    },
                    labels: {
                        style: {
                            color: '#A0A0A3'
                        }
                    },
                },
                tooltip: {
                    formatter: function () {
                        return '<b>第' + (this.point.x + 1) + '年</b><br/>' +
                            this.point.y;
                    }
                },

                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        color: '#4d9bfb'
                    }
                },
                series: series,
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }
            });
        },
        // 电站统计 近两年发电量对比
        twoYearPower: function (obj, time, data) {
            $('#' + obj).highcharts({
                chart: {
                    type: 'column'
                },
                xAxis: {
                    categories: time,
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    labels: {
                        style: {
                            color: '#666666'
                        }
                    },
                },
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    style: {
                        color: '#666666'
                    },
                    headerFormat: '<span style="font-size:10px">{point.key}' + '月' + '</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} 度</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        fontWeight: 'normal',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                },
                series: data
            })
        },
        // 电站仪表图
        solidgauge: function (obj, type, data) {
            var gaugeOptions = {
                chart: {
                    type: 'solidgauge',
                },
                title: null,
                pane: {
                    center: ['50%', '85%'],
                    size: '140%',
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        backgroundColor: '#EEE',
                        borderWidth: 0,
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                yAxis: {

                    lineWidth: 0,
                    minorTickInterval: null,
                    tickPixelInterval: 400,
                    tickWidth: 0,
                    title: {
                        y: -70
                    },
                    labels: {
                        y: 16,
                        style: {
                            color: 'black'
                        }

                    }
                },
                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 5,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            };
            var minAndMax = [0, 5];
            var tip = '';
            var color = '#98cf67';
            if (type == 'peak') {  // 当月峰值
                minAndMax[0] = 0;
                minAndMax[1] = 1000;
                tip = 'kw';
                color = '#4d9bfb';
            }
            $('#' + obj).highcharts(Highcharts.merge(gaugeOptions, {
                tooltip: {
                    enabled: false
                },
                yAxis: {
                    stops: [
                        [0.1, color],
                        [0.9, color]
                    ],
                    min: minAndMax[0],
                    max: minAndMax[1]
                },
                credits: {
                    enabled: false
                },
                series: [{
                    data: data,
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}</span><br/>' +
                        '<span style="font-size:12px;color:black">' + tip + '</span></div>'
                    }
                }]
            }));
        },
        // 错误值对比图
        errorPie: function (obj, data) {
            $('#' + obj).highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                legend: {
                    enabled: true
                },
                tooltip: {
                    headerFormat: '{series.name}<br>',
                    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    data: data
                }]
            })
        },
        // 最近七天发电量
        sevenDay: function (obj, data,flag) {
            var maxArr = [];
            for(var i=0;i<data.length;i++){
                if(data[i].data && data[i].data.length > 0){
                    var max = data[i].data[0][1];
                    for(var j=0;j<data[i].data.length;j++) {
                        //最大值
                        if (data[i].data[j][1] > max) {
                            max = data[i].data[j][1];
                            maxArr.push(max);
                        }
                    }
                }
            }
            var maxN = maxArr[0];
            for(var t=0;t<maxArr.length;t++){
                if(maxArr[t]>maxN){
                    maxN = maxArr[t];
                }
            }
            var ceiling = Math.ceil(maxN);
            var arrY1 = [];
            $('#' + obj).highcharts({
                chart: {
                    type: 'area',
                    zoomType: 'x'
                },
                xAxis: {
                    type: 'datetime',
                    tickInterval: 24 * 3600 * 1000, // 坐标轴刻度间隔为一天
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%d',
                        week: '%m-%d',
                        month: '%Y-%m',
                        year: '%Y'
                    },
                    tickWidth: 0,
                    labels: {
                        x: 20,
                        style: {
                            color: '#666666'
                        }
                    },
                    minPadding: 0.05 //最小值与X轴原点的距离 为了显示第七天的数字
                },
                yAxis: {
                    min: 0,
                    minRange: 1,
                    gridLineWidth: 0,
                    gridLineColor: 'rgba(255,255,255,0.2)',
                    lineColor: 'rgba(255,255,255,0.2)',
                    lineWidth: 1,
                    tickPositioner: function () {
                        if (ceiling > 0) {
                            var positions = [],
                                tick = Math.floor(0),
                                increment = Math.ceil(ceiling / 5);
                            for (tick; tick - increment <= ceiling; tick += increment) {
                                positions.push(tick);
                            }
                            return positions;

                        }
                    },
                    tickWidth: 0,
                    labels: {
                        formatter: function () {
                            if (this.value > 0) {
                                arrY1.push(this.value);
                            }
                            if (arrY1.length > 0) {
                                for (var i = 0; i < arrY1.length; i++) {
                                    var min = arrY1[0];
                                    if (arrY1[i] < min) {
                                        min = arrY1[i];
                                    }
                                }
                                if (min >= 1000) {
                                    if (this.value > 1000000000) {
                                        this.value = Math.ceil(this.value / 1000000000) + 'G';
                                    } else if (this.value > 1000000) {
                                        this.value = Math.ceil(this.value / 1000000) + 'M';
                                    } else {
                                        if (this.value > 0) {
                                            this.value = Math.ceil(this.value / 1000) + 'K';
                                        }
                                    }
                                }
                            }

                            return this.value;
                        },
                        style: {
                            color: '#666666'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%H:%M}    {point.y:.2f}(瓦)',
                    style: {                      // 文字内容相关样式
                        fontSize: "12px"
                    }
                },
                plotOptions: {
                    series: {
                        animation: flag,
                        marker: {
                            enabled: false  //实心点去掉
                        }
                    }
                },
                series: data,
                lang: {
                    noData: "无结果"
                },
                noData: {
                    style: {
                        fontSize: '47px',
                        fontWeight: 'normal',
                        color: 'rgba(221, 221, 221, 1)',
                    }
                }
            });
        }
    }
});

/** UTC数据处理*/
function convertToUTC(data, flag) {
    var result = null;
    if (data && data.length > 0) {
        var result = new Array(data.length);
        result = $.extend(true, result, data);
        for (var i = 0; i < data.length; i++) {
            if (flag == 1) {// 年：补足到日 2017-01-01
                data[i][0] = data[i][0] + "-01";
            }
            var date = new Date(Date.parse(data[i][0].replace(/-/g, "/")));


            if (date) {
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var hour = date.getHours();
                var minute = date.getMinutes();
                switch (flag) {
                    case 0:
                        result[i][0] = Date.UTC(year, 0);
                        break;
                    case 1:
                        result[i][0] = Date.UTC(year, month);
                        break;
                    case 2:
                        result[i][0] = Date.UTC(year, month, day);
                        break;
                    case 3:
                        result[i][0] = Date.UTC(year, month, day, hour);
                        break;
                    case 4:
                        result[i][0] = Date.UTC(year, month, day, hour, minute);
                        break;
                    default:
                        result[i][0] = Date.UTC(year, month, day, hour, minute);
                        break;
                }
            }
        }
    }
    return result;
};

// 2 并网电压,3 并网电流 结果处理
function resultchangeGird(result) {
    var series = [];
    if (result && result.length > 0) {
        var seriesGirdR = [];
        var seriesGirdS = [];
        var seriesGirdT = [];

        var sn = result[0].sn;
        if (result[0].TvolData || result[0].TcurData || result[0].SvolData || result[0].ScurData) {

            var objR = {};
            objR.name = sn + '  R';
            objR.data = result[0].RvolData || result[0].RcurData || [];//RvolData
            seriesGirdR.push(objR);

            var objS = {};
            objS.name = sn + '  S';
            objS.data = result[0].SvolData || result[0].ScurData || []; //SvolData
            seriesGirdS.push(objS);

            var objT = {};
            objT.name = sn + '  T';
            objT.data = result[0].TvolData || result[0].TcurData || []; //TvolData
            seriesGirdT.push(objT);

            series.push(seriesGirdR[0], seriesGirdS[0], seriesGirdT[0]);
        } else if (result[0].RvolData) {
            var objR = {};
            objR.name = sn + '  并网电压';
            objR.data = result[0].RvolData || [];//RvolData
            seriesGirdR.push(objR);
            //seriesGirdS.push([]);
            //seriesGirdT.push([]);
            series.push(seriesGirdR[0]);
        } else if (result[0].RcurData) {
            var objR = {};
            objR.name = sn + ' 并网电流';
            objR.data = result[0].RcurData || []; //RvolData
            seriesGirdR.push(objR);
            //seriesGirdS.push([]);
            //seriesGirdT.push([]);
            series.push(seriesGirdR[0]);
        }

    }
    return series;
};

// 8 /6 PV1&PV2电压/电流/功率 结果处理

function resultchangePV(result) {
    var series = [];
    if (result && result.length) {

        var seriesPv1 = [],
            seriesPv2 = [],
            series2Pv1 = [],
            series2Pv2 = [],
            series3Pv1 = [],
            series3Pv2 = [],
            objPv1 = {},
            objPv2 = {},
            obj2Pv1 = {},
            obj2Pv2 = {},
            obj3Pv1 = {},
            obj3Pv2 = {};


        objPv1.name = result[0].sn + '  PV1电压';
        objPv1.type = 'spline';
        objPv1.data = result[0].Pv1volData || [];
        objPv1.tooltip = {
            useHTML: true,
            headerFormat: '<b style="color:{series.color}">{series.name}:</b></br>',
            pointFormat: '<b>{point.x:%H:%M}  {point.y}' + 'V' + '</b>',
            valueDecimals: 2
        };
        seriesPv1.push(objPv1);


        objPv2.name = result[0].sn + '  PV2电压';
        objPv2.type = 'spline';
        objPv2.data = result[0].Pv2volData || [];
        objPv2.tooltip = {
            useHTML: true,
            headerFormat: '<b style="color:{series.color}">{series.name}:</b></br>',
            pointFormat: '<b>{point.x:%H:%M}  {point.y}' + 'V' + '</b>',
            valueDecimals: 2
        };
        seriesPv2.push(objPv2);


        obj2Pv1.name = result[0].sn + '  PV1电流';
        obj2Pv1.type = 'spline';
        obj2Pv1.yAxis = 1,
            obj2Pv1.data = result[0].Pv1curData || [];
        obj2Pv1.tooltip = {
            useHTML: true,
            headerFormat: '<b style="color:{series.color}">{series.name}:</b></br>',
            pointFormat: '<b>{point.x:%H:%M}  {point.y}' + 'A' + '</b>',
            valueDecimals: 2
        };
        series2Pv1.push(obj2Pv1);


        obj2Pv2.name = result[0].sn + '  PV2电流';
        obj2Pv2.type = 'spline';
        obj2Pv2.yAxis = 1,
            obj2Pv2.data = result[0].Pv2curData || [];
        obj2Pv2.tooltip = {
            useHTML: true,
            headerFormat: '<b style="color:{series.color}">{series.name}:</b></br>',
            pointFormat: '<b>{point.x:%H:%M}  {point.y}' + 'A' + '</b>',
            valueDecimals: 2
        };
        series2Pv2.push(obj2Pv2);


        obj3Pv1.name = result[0].sn + '  PV1功率';
        obj3Pv1.type = 'spline';
        obj3Pv1.data = result[0].Pv1PowerData;
        obj3Pv1.tooltip = {
            useHTML: true,
            headerFormat: '<b style="color:{series.color}">{series.name}:</b></br>',
            pointFormat: '<b>{point.x:%H:%M}  {point.y}' + '瓦' + '</b>',
            valueDecimals: 2
        };
        series3Pv1.push(obj3Pv1);


        obj3Pv2.name = result[0].sn + '  PV2功率';
        obj3Pv2.type = 'spline';
        obj3Pv2.data = result[0].Pv2PowerData;
        obj3Pv2.tooltip = {
            useHTML: true,
            headerFormat: '<b style="color:{series.color}">{series.name}:</b></br>',
            pointFormat: '<b>{point.x:%H:%M}  {point.y}' + '瓦' + '</b>',
            valueDecimals: 2
        };
        series3Pv2.push(obj3Pv2);


        if (result[0].Pv1curData) {
            if (result[0].Pv1curData.length && result[0].Pv2curData.length && result[0].Pv1volData.length && result[0].Pv1volData.length) { //当存在PV1 和 PV2 电压电流的时候
                series.push(seriesPv1, seriesPv2, series2Pv1, series2Pv2);
            }
        } else {
            if (result[0].Pv1PowerData.length && result[0].Pv2PowerData.length) {
                series.push(series3Pv1, series3Pv2); //PV1 pv2 功率
            }
        }

    }
    return series;
};


/** 去掉今日以后的数据 类型月专用*/
function deleMonthNull(data) {
    var newData = [];
    var newDataResult = [];
    var nowGetTime = new Date().getTime() + 24 * 60 * 60 * 1000;

    //截取今天之前的日期

    for (var i in data) {
        if (data[i] && convertTimes(data[i][0]) < nowGetTime) {
            newData.push(data[i]);
        }
    }
    // 判断是否全部为null;
    for (var j  in newData) {
        if (newData[j] && newData[j][1] !== null) {
            newDataResult.push(newData[j]);
        }
    }
    if (newDataResult == []) {
        return newDataResult;
    } else {
        return newData;
    }

};

/** 去掉为NULL的数组 类型年/总专用*/
function deleNull(data) {
    var newData = [];
    for (var i in data) {
        if (data[i] && data[i][1] !== null) {
            newData.push(data[i]);
        }
    }

    return newData;
};


function convertTimes(date) {
    var date = date.split('-');
    var d = new Date();
    d.setFullYear(date[0]);
    d.setMonth(date[1] - 1);
    d.setDate(date[2]);
    d.getTime();
    return d.getTime();
};