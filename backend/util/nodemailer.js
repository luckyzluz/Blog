//nodemailer.js
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const {EmailVerifyConfig} =require('../config/config.email');
//创建一个smtp服务器EmailVerifyConfig.smtpConfig
// const config = {
//     host: 'smtp.qq.com',
//     port: 465,
//     auth: {
//         user: '2567046155@qq.com', //注册的邮箱账号
//         pass: 'eckhfvvstjendjgh' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
//     }
// };
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(smtpTransport(EmailVerifyConfig.smtpConfig));

//发送邮件
module.exports =async function (addressee,code,template){
    let html ={
        letter:`<div id="contentDiv" onmouseover="getTop().stopPropagation(event);" onclick="getTop().preSwapLink(event, 'html', 'ZC0015_ie7NuyWMOwUu3ooA_CEbGc2');"
        style="position:relative;font-size:14px;height:auto;padding:15px 15px 10px 15px;z-index:1;zoom:1;line-height:1.7;"
        class="body">
           <div id="qm_con_body">
               <div id="mailContentContainer" class="qmbox qm_con_body_content qqmail_webmail_only" style="opacity: 1;">
                   <style>
                       .qmbox .but {
                           display: inline-block;
                           border-radius: 4px;
                           padding: 5px 22px;
                           text-align: center;
                           background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%) !important;
                           color: #fff !important;
                           text-decoration: none;
                       }
        
                       .qmbox img {
                           max-width: 100%;
                       }
        
                       .qmbox a {
                           text-decoration: none;
                       }
                   </style>
                   <div style="background:#ecf1f3;padding-top:20px; min-width:820px;">
                       <div style="width:801px;height:auto; margin:0px auto;">
                           <div style="width:778px;height:auto;margin:0px 11px;background:#fff;box-shadow: 6px 3px 5px rgba(0,0,0,0.05);-webkit-box-shadow: 6px 3px 5px rgba(0,0,0,0.05);-moz-box-shadow: 6px 3px 5px rgba(0,0,0,0.05);-ms-box-shadow: 6px 3px 5px rgba(0,0,0,0.05);-o-box-shadow: 6px 3px 5px rgba(0,0,0,0.05);">
                               <div style="width:781px; background:#fff;padding-top: 30px;">
                                   <div style="width:200px;height:100px;background:url(http://img.cdeledu.com/ADVC/2023/0124/0d6bee381455df8c-0.png) center no-repeat; margin:auto;background-size: contain;"></div>
                               </div>
                               <div style="width:627px;margin:0 auto; padding-left:77px; background:#fff;font-size:14px;color:#55798d;padding-right:77px;"><br>
                                   <div style="overflow-wrap:break-word;line-height:20px;">
                                       您正在本站进行验证操作，如非您本人操作，请忽略此邮件。<br>
                                       <br>
                                       验证码30分钟内有效，如果超时请重新获取<br>
                                       <br>
                                       您的验证码为：<p style="font-size:34px;color:#3095f1;"><span style="border-bottom: 1px dashed #ccc; z-index: 1; position: static;">${code}</span></p>
                                   </div>
                                   <br><br><br>
                               </div>
                           </div>
                           <div style="position:relative;top:-15px;width:800px;height: 360px;background:url(https://www.nesxc.com/wp-content/themes/zibll/img/mail-bg.png) 0px 0px no-repeat;">
                               <div style="height:200px;color:#507383;font-size:14px;line-height: 1.4;padding: 20px 92px;">
                                   <div style="font-size: 22px;font-weight: bold;">Lost Blog</div>
                                   <div style="margin:20px 0;color: #6a8895;min-height:4.2em;white-space: pre-wrap;">此为系统邮件，请不要直接回复。</div>
                                   <div style=""><a href="#" rel="noopener" target="_blank">访问网站</a> |
                                       <a>联系站长</a></div>
                               </div>
                               <div style="clear:both;"></div>
                           </div>
                       </div>
                   </div>
        
                   <style type="text/css">
                       .qmbox style,
                       .qmbox script,
                       .qmbox head,
                       .qmbox link,
                       .qmbox meta {
                           display: none !important;
                       }
                   </style>
               </div>
           </div><!-- -->
           <style>
               #mailContentContainer .txt {
                   height: auto;
               }
           </style>
        </div>`,
        ali:`<head>
        <base target="_blank" />
        <style type="text/css">::-webkit-scrollbar{ display: none; }</style>
        <style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style>
        <style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style>
        <style type="text/css">
            body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}
            td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}
            pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}
            th,td{font-family:arial,verdana,sans-serif;line-height:1.666}
            img{ border:0}
            header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}
            blockquote{margin-right:0px}
        </style>
    </head>
    <body tabindex="0" role="listitem">
    <table width="700" border="0" align="center" cellspacing="0" style="width:700px;">
        <tbody>
        <tr>
            <td>
                <div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;">
                        <tbody><tr><td width="210"></td></tr></tbody>
                    </table>
                </div>
                <div style="width:680px;padding:0 10px;margin:0 auto;">
                    <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;">
                        <strong style="display:block;margin-bottom:15px;">尊敬的用户：<span style="color:#f60;font-size: 16px;"></span>您好！</strong>
                        <strong style="display:block;margin-bottom:15px;">
                            您正在进行<span style="color: red">注册账号</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${code}</span>，以完成操作。
                        </strong>
                    </div>
                    <div style="margin-bottom:30px;">
                        <small style="display:block;margin-bottom:20px;font-size:12px;">
                            <p style="color:#747474;">
                                注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全
                                <br>（工作人员不会向你索取此验证码，请勿泄漏！)
                            </p>
                        </small>
                    </div>
                </div>
                <div style="width:700px;margin:0 auto;">
                    <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                        <p>此为系统邮件，请勿回复<br>
                            请保管好您的邮箱，避免账号被他人盗用
                        </p>
                        <p>Z'Blog网络科技团队</p>
                    </div>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
    </body>
    `
    }
    var mail = {
        // 发件人
        from: `<${EmailVerifyConfig.smtpConfig.auth.user}>`,
        // 主题
        subject: '操作凭证',//邮箱主题
        // 收件人
        to: addressee,//前台传过来的邮箱
        // 邮件内容，HTML格式
        html: template ? template : html[EmailVerifyConfig.Template]
    };
    return new Promise((resolve, reject)=>{
        transporter.sendMail(mail, function(error, info){
            if(error) {
                reject(error.response)
                // return console.log(error);
            }
            // console.log('mail sent:', info.response);
            
            transporter.close();
            resolve(info)
        });
    })
};
