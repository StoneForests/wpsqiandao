var daka = require('./lib/wps')

exports.main_handler = async () => {
    sckey = '你的server酱的key（非必填）';
    sid = '第一步中的wps_sid';
    wpsinviteid = '第二步中的分享id';
    return daka(sid, wpsinviteid, sckey)
};
