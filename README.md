# wpsqiandao（~~自动打卡已失效，但自动邀请还可以用~~）


利用腾讯云函数实现wps每日签到送会员  
使用方法见 [利用腾讯云函数服务进行每日wps签到打卡](https://blog.csdn.net/austin1000/article/details/107180568)

原项目见[WPS小程序签到](https://github.com/lepecoder/checkin/issues)，目前自动打卡已失效，但还可以自动邀请。每天只需要微信手动打卡一次还可以获取11天会员。

## 2021-02-22更新
- 采用了server酱新的api
- 两次邀请中间加入了10秒延迟（邀请过快会导致邀请失败只拿1天签到时间）


## 2021-04-26更新
目前邀请接口显示成功，但是小程序上显示0人，据说是wps小程序1人只能助力成功1次，大佬们也还没想出来pj之法，等等吧
