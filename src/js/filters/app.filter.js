/**
 * Created by k on 2017/7/5.
 */
angular.module('app').filter('cnMessage', function () {
    return function (code) {
        var messages = {
            100001: "非法操作",
            200000: "操作成功",
            200001: "操作失败",
            200002: "操作出错",
            200003: "没有参数",
            200004: "缺少参数",
            200005: "错误参数",
            200101: "用户不存在",
            200102: "邮箱已存在",
            200103: "邮箱不存在",
            200104: "原密码不正确",
            200105: "两次输入密码不相同",
            200106: "登录密码错误",
            200107: "激活失败",
            200108: "用户名未激活",
            200109: "用户名已存在",
            200110: "电话已存在",
            200201: "电站不存在",
            200202: "关联电站跟用户失败",
            200203: "添加电站详细信息出错",
            200204: "添加电站联系人出错",
            200205: "添加电站地址信息出错",
            200206: "添加电站邮件出错",
            200207: "生成电站出错",
            200208: "删除电站出错",
            200209: "电站不能删除",
            200210: "电站名称已经存在",
            200301: "未知设备种类",
            200302: "设备sn已存在",
            200303: "设备sn不存在",
            200306: "设备sn已绑定电站",
            200401: "暂无数据",
            200501: "邮件发送失败，请联系管理员",
            200601: "时间范围选择错误",
            200602: "时间范围不能超过七天",
            200603: "时间范围不能超过三十天",
            200701: "不能删除",
            200801: "该用户无法添加"
        };
        return messages[code];
    }
});
angular.module('app').filter('power', function () {
    return function (power) {
        if (power > 0) {
            return (power / 1000).toFixed(2);
        } else {
            return 0;
        }

    }

});
angular.module('app').filter('shortTime', function () {
    return function (time) {
        if (time) {
            return time.slice(0, 10);
        } else {
            return '';
        }

    }

});
angular.module('app').filter('shortTime2', function () {
    return function (time) {
        if (time) {
            var Newtime = time.slice(6).replace(/\-/, '月') + '日';
            return Newtime;
        } else {
            return '';
        }

    }

});
angular.module('app').filter('detailKind', function () {
    return function (kind) {
        if (kind != null) {
            return Number(kind) == 0 ? '单相机' : '三相机';
        } else {
            return '单相机';
        }

    }

});
angular.module('app').filter('equipStatus', function () {
    return function (status) {
        if (status != null) {
            switch (Number(status)) {
                case 0:
                    return '异常';
                case 1:
                    return '正常';
                case 2:
                    return '告警';
                case 3:
                    return '离线';
                default:
                    return '异常';
            }
        } else {
            return '异常';
        }

    };
});

angular.module('app').filter('kwhFormat', function () {
    return function (kwh) {
        if (kwh != null && kwh >= 0) {
            if (kwh >= 10000000) { // 千万
                return Number((kwh / 10000000).toFixed(0));
            } else if (kwh >= 1000000) {  // 百万
                return Number((kwh / 1000000).toFixed(0));

            } else if (kwh >= 10000) { // 万
                return Number((kwh / 10000).toFixed(2));
            } else {
                return Number(kwh.toFixed(0));
            }
        } else {
            return 0;
        }
    }
});
angular.module('app').filter('kwhUnitFormat', function () {
    return function (kwh) {
        if (kwh != null && kwh >= 0) {
            if (kwh >= 10000000) { // 千万
                return '千万度';
            } else if (kwh >= 1000000) { // 百万
                return '百万度';
            } else if (kwh >= 10000) { // 万
                return '万度'
            } else {
                return '度'
            }
        } else {
            return '度';
        }
    }

});

angular.module('app').filter('kwFormat', function () {
    return function (kw) {
        if (kw != null && kw >= 0) {
            if (kw >= 1000) { // 千万
                return Number((kw / 1000).toFixed(1));
            } else {
                return Number(kw.toFixed(0));
            }
        } else {
            return '瓦';
        }
    }
});
angular.module('app').filter('kwUnitFormat', function () {
    return function (kw) {
        if (kw != null && kw >= 0) {
            if (kw >= 1000) { // 千万
                return '千瓦';
            } else {
                return '瓦'
            }
        } else {
            return '瓦';
        }
    }

});
angular.module('app').filter('weather', function () {
    return function (str) {
        var keyCn2 = '云', r2 = -1;
        var keyCn3 = '阴', r3 = -1;
        var keyCn4 = '雨', r4 = -1;
        var keyCn5 = '雪', r5 = 0;


        r2 = str.indexOf(keyCn2);

        r3 = str.indexOf(keyCn3);

        r4 = str.indexOf(keyCn4);

        r5 = str.indexOf(keyCn5);


        if (r5 >= 0) {
            return 5;
        } else if (r4 >= 0) {
            return 4;
        } else if (r3 >= 0) {
            return 3;
        } else if (r2 >= 0) {
            return 2;
        } else {
            return 1;
        }

    }
});

angular.module('app').filter('taskStatus', function () {
    return function (code) {
        switch (parseInt(code)) {
            case 0:
                return '待完善任务';
                break;
            case 1:
                return '等待运维人员提交故障报告';
                break;
            case 2:
                return '待回复提交的故障报告';
                break;
            case 3:
                return '待指定运维人员';
                break;
            case 4:
                return '待运维人员开启任务';
                break;
            case 5:
                return '运维开始';
                break;
            case 6:
                return '物料申请';
                break;
            case 7:
                return '检修完成-提交离场报告';
                break;
            case 8:
                return '检修完成-离场报告通过';
                break;
            case 9:
                return '离场报告不通过';
                break;
            case 10:
                return '运维完成-终端用户确认';
                break;
            case 11:
                return '运维完成-安装商确认';
                break;
            case 12:
                return '运维完成-安装商&终端确认';
                break;
            case 13:
                return '运维完成-直接结束';
                break;
            case 14:
                return '确认人员拒绝任务';
                break;
            case 15:
                return '运维人员拒绝任务';
                break;
            default:
                return '状态错误';
                break;


        }

    }
});
/**告警等级过滤器**/
angular.module('app').filter('Level', function () {
    return function (code) {
        switch (parseInt(code)) {
            case 0:
                return '轻微';
                break;
            case 1:
                return '一般';
                break;
            case 2:
                return '严重';
                break;
            case 3:
                return '紧急';
                break;
            case 4:
                return '非常紧急';
                break;
            default :
                return '一般';
                break;
        }
        ;

    };
});
/**是否派人现场处理**/
angular.module('app').filter('Handle', function () {
    return function (code) {
        if (code) {
            return '派人处理'
        } else {
            return '直接结束'
        }
    };

});
/** 物料状态*/
angular.module('app').filter('MaterialStatus', function () {
    return function (code) {
        switch (parseInt(code)) {
            case 0:
                return '待发货';
                break;
            case 1:
                return '已发货';
                break;
            case 2:
                return '已到货';
                break;
            case 3:
                return '已撤销';
                break;
            case 4:
                return '退回已发货';
                break;
            case 5:
                return '退回已到货';
                break;
            default :
                return '';
                break;
        }
        ;

    }
});
/**是否同意离场**/
angular.module('app').filter('Approval', function () {
    return function (code) {
        if (code == 8) {
            return '同意';
        } else {
            return '不同意';
        }
    }


});

/**保留两位小数*/
angular.module('app').filter('TwoDecimal', function () {
    return function (num) {
        if (num > 0) {
            return parseFloat(num).toFixed(2);
        }else {
            return 0;
        }
    }
});

/** 如果大于1000 除以1000*/
angular.module('app').filter('Power', function () {
    return function (num) {
        if (num > 0) {
            if(num >= 1000){
                return num/1000
            }else{
                return num
            }
        }else {
            return 0;
        }
    }
});

/** 离场报告 是否处理完成*/
angular.module('app').filter('Finish', function () {
    return function (code) {
        var phases = {
            0: '未解决',
            1: '已解决'
        };
        return phases[parseInt(code)];
    }
});