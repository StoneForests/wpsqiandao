var axios = require('axios');
async function server(b,SCKEY) {
  url = `https://sc.ftqq.com/${SCKEY}.send`
  res = await axios.post(url, `text=178wps每日打卡&desp=${b}`)
  console.log(res.data)
  if (res.data.errmsg == 'success') {
    console.log('server酱:发送成功')
  } else {
    console.log('server酱:发送失败')
  }
}
module.exports = server
