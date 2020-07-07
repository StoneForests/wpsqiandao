var daka = require('./lib/wps')

exports.main_handler = async () => {
    sckey = '你的server酱的key（非必填）';
    sid = '你的wps的sid，cookie中以V02开头的那个字符串';
    wpsinviteid = '你的wps的用户id';
    return daka(sid, wpsinviteid, sckey)
};
