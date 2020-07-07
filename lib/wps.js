var axios = require('axios');
var server = require('./server')
let url = 'http://zt.wps.cn/2018/clock_in/api/get_question?member=wps'
invite_sid = [
    'V02S2UBSfNlvEprMOn70qP3jHPDqiZU00a7ef4a800341c7c3b',
    'V02StVuaNcoKrZ3BuvJQ1FcFS_xnG2k00af250d4002664c02f',
    'V02SWIvKWYijG6Rggo4m0xvDKj1m7ew00a8e26d3002508b828',
    'V02Sr3nJ9IicoHWfeyQLiXgvrRpje6E00a240b890023270f97',
    'V02SBsNOf4sJZNFo4jOHdgHg7-2Tn1s00a338776000b669579',
    'V02ScVbtm2pQD49ArcgGLv360iqQFLs014c8062e000b6c37b6',
    'V02S2oI49T-Jp0_zJKZ5U38dIUSIl8Q00aa679530026780e96',
    'V02ShotJqqiWyubCX0VWTlcbgcHqtSQ00a45564e002678124c',
    'V02SFiqdXRGnH5oAV2FmDDulZyGDL3M00a61660c0026781be1',
    'V02S7tldy5ltYcikCzJ8PJQDSy_ElEs00a327c3c0026782526',
    'V02SPoOluAnWda0dTBYTXpdetS97tyI00a16135e002684bb5c',
    'V02Sb8gxW2inr6IDYrdHK_ywJnayd6s00ab7472b0026849b17',
    'V02SwV15KQ_8n6brU98_2kLnnFUDUOw00adf3fda0026934a7f',
    'V02SC1mOHS0RiUBxeoA8NTliH2h2NGc00a803c35002693584d'
]

//可网页登录https://zt.wps.cn查看两个id 一个在分享链接 一个在cookie里
async function wpsdaka(sid, wpsinviteid, sckey) {
    const header = {
        headers: {
            sid: sid
        }
    }
    const answer = [
        'WPS会员全文检索',
        '100G',
        'WPS会员数据恢复',
        'WPS会员PDF转doc',
        'WPS会员PDF转图片',
        'WPS图片转PDF插件',
        '金山PDF转WORD',
        'WPS会员拍照转文字',
        '使用WPS会员修复',
        'WPS全文检索功能',
        '有，且无限次',
        '文档修复'
    ]

    //查看题目
    res = await axios.get(url, header)
    console.log('答题中')
    //   console.log(res.data)
    while (res.data.data.multi_select == 1) {
        res = await axios.get(url, header)
    }
    answer_id = 3
    //查找答案
    for (i = 0; i < res.data.data.options.length; i++) {
        if (answer.indexOf(res.data.data.options[i]) != -1) {
            answer_id = i + 1
        }
    }
    //答题
    answerurl = 'http://zt.wps.cn/2018/clock_in/api/answer?member=wps'
    answerdata = `answer=${answer_id}`
    rres = await axios.post(answerurl, answerdata, header)
    //console.log(rres.data)
    if (rres.data.result == 'ok') {
        console.log('答案正确,打卡中')
    }
    //打卡
    checkinurl = 'http://zt.wps.cn/2018/clock_in/api/clock_in?member=wps'
    let cres = await axios.get(checkinurl, header)
    if (cres.data.result == 'ok') {
        console.log('打卡成功')
        dk = '打卡成功'
    } else if (cres.data.msg == '前一天未报名') {
        console.log('前一天未报名,报名中')
        dk = '前一天未报名,报名中'
        bres = await axios.get('http://zt.wps.cn/2018/clock_in/api/sign_up', header)
        //   console.log(bres.data)
    } else {
        dk = cres.data.msg
        console.log(cres.data.msg)
    }
    server(dk, sckey)
    //每日邀请
    invitedata = `invite_userid=${wpsinviteid}`
    inviteurl = 'http://zt.wps.cn/2018/clock_in/api/invite'
    for (i = 0; i < invite_sid.length; i++) {
        ires = await axios.post(inviteurl, invitedata, {
            headers: {sid: invite_sid[i]}
        })
        if (ires.status == 200) {
            console.log(`邀请第${i}个好友成功`)
        } else {
            console.log('邀请失败')
        }
    }
    if (ires.status == 200) {
        console.log('邀请完毕,任务结束')
        return "执行完毕"
    }
}

module.exports = wpsdaka