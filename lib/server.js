const axios = require('axios');
const sckey = require('./config').sckey;
url = `https://sctapi.ftqq.com/${sckey}.send`
console.log(url)
async function server(b) {
  let res = await axios.post(url, `text=每日打卡&desp=${b}`)
  if (res.data.data.error === 'SUCCESS') {
    console.log('server酱:发送成功')
  } else {
    console.log('server酱:发送失败')
    console.log(res.data)
  }
}
module.exports = server
