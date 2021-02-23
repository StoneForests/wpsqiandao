var axios = require('axios');
var server = require('./server')
var config = require('./config')

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
let i = 0

//可网页登录https://zt.wps.cn查看两个id 一个在分享链接 一个在cookie里
sid = config.sid
wpsinviteid = config.inviteid

async function task() {
    iv = await invite();
    iv = `WPS邀请:\n邀请情况：${iv}`;
    console.log(iv)
    await server(iv)
}

function invite() {
    return new Promise(async resolve => {
        try {
            invitedata = `invite_userid=${wpsinviteid}`
            inviteurl = 'http://zt.wps.cn/2018/clock_in/api/invite'
            j=0;
            for (i = 0; i < invite_sid.length; i++) {
                ires = await axios.post(inviteurl, invitedata, {
                    headers: { sid: invite_sid[i] }
                })
                //现在一秒只能邀请1个人，邀请多了也只算1个
                sleep(10000)
                if (ires.status === 200) {
                    console.log(`邀请第${i}个好友成功`)
                    j=j+1;
                } else {
                    console.log('邀请失败')
                }
            }
            if (ires.status === 200) {
                console.log('邀请完毕,任务结束')
                iv='邀请'+j+'个好友成功,任务结束'
            }
        } catch (err) {
            console.log(err)
            iv='邀请失败'
        }
        resolve(iv)
    })
}

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
}

module.exports = task
