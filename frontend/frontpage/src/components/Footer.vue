<template>
  <!-- footer -->
  <footer id="footer">
    <div class="container-footer">
      <ul>
        <li style="max-width: 300px">
          <p>
            <a
              class="footer-logo"
              href="https://www.zibll.com"
              title="Wordpress主题模板_WP中文社区论坛主题_zibll主题_子比主题官网"
            >
              <img
                src="https://oss.zibll.com/zibll.com/2021/01/ZIBLL-LOGO-精简-白天.svg"
                switch-src="https://oss.zibll.com/zibll.com/2021/01/ZIBLL-LOGO-精简-夜间.svg"
                alt="Wordpress主题模板_WP中文社区论坛主题_zibll主题_子比主题官网"
                class="ls-is-cached lazyloaded"
                style="height: 40px"
                data-src=""
              />
            </a>
          </p>
          <div class="footer-muted">
            Zibll
            子比主题专为博客、自媒体、资讯类的网站设计开发，简约优雅的设计风格，全面的前端用户功能，简单的模块化配置，欢迎您的体验
          </div>
        </li>
        <li style="max-width: 550px">
          <p class="fcode-links">
            <a href="https://www.zibll.com/friendship-links">友情链接</a>
            <a href="https://www.zibll.com/1083.html">推广计划</a>
            <a href="https://www.zibll.com/custom">定制需求</a>
            <a href="https://www.zibll.com/zibll_word">产品文档</a>
          </p>
          <div class="footer-muted">
            Copyright ©&nbsp;2022&nbsp;·&nbsp;<a href="https://zibll.com"
              >子比主题</a
            >&nbsp;·&nbsp;<a target="_blank" href="https://beian.miit.gov.cn/"
              >蜀ICP备20005655号-1</a
            >
          </div>
          <div class="footer-contact">
            <a class="icon-radius">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weixin1"></use>
              </svg>
              <div class="footer-wechat-img">
                <img
                  height="100"
                  src="https://oss.zibll.com/zibll.com/2022/03/子比企业微信客服.png"
                  alt="扫一扫加微信-Wordpress主题模板-zibll子比主题"
                />
              </div>
            </a>
            <a href="" class="icon-radius">
                <el-tooltip
              class=""
              effect="dark"
              content="QQ联系"
              placement="top"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-QQ"></use>
              </svg>
            </el-tooltip>
            </a>
            
            <!-- <a class="icon-radius" data-original-title="QQ联系">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-QQ"></use>
              </svg>
            </a> -->
            <a href="" class="icon-radius">
                <el-tooltip
              class=""
              effect="dark"
              content="发邮件"
              placement="top"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mail"></use>
              </svg>
            </el-tooltip>
            </a>
          </div>
        </li>
        <li>
        <el-tooltip
        effect="dark"
        content="QQ交流群"
        placement="top"
      >
      <div class="footer-miniimg">
      <p>
                <img src="https://oss.zibll.com/zibll.com/2022/05/qq群2-1.png" alt="QQ交流群-Wordpress主题模板-zibll子比主题">
                </p>
                <span>QQ交流群</span>
                </div>
      </el-tooltip>
       <el-tooltip
        effect="dark"
        content="QQ交流群"
        placement="top"
      >
      <div class="footer-miniimg">
      <p>
                <img src="https://oss.zibll.com/zibll.com/2022/05/qq群2-1.png" alt="QQ交流群-Wordpress主题模板-zibll子比主题">
                </p>
                <span>QQ交流群</span>
                </div>
      </el-tooltip>
        </li>
      </ul>
    </div>
  </footer>
</template>
<style lang="scss">
@import "@/styles/common.scss";
#footer {
  @include font_color("footer-color");
  @include background_color("footer-bg");
  padding: 30px;
  font-size: 13px;
  .container-footer {
    max-width: 1380px;
    // max-width: calc($mian-max-width + 180px);
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    & > ul {
      margin-left: 0;
      padding-left: 0;
      & > li {
        margin: 5px 15px;
        vertical-align: middle;
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px;
        & > p {
          margin: 0 0 10px;
        }
        .footer-muted {
          font-size: 0.9em;
        }
        .fcode-links > a + a:before {
          content: "";
          width: 4px;
          height: 4px;
          margin: 0 0.5em;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
          @include background_color("main-color");
          opacity: 0.3;
          vertical-align: 0.2em;
        }
        .footer-contact {
          margin-top: 10px;
          & > a {
            font-size: 20px;
            margin: 5px;
            width: 35px;
            height: 35px;
          }
          .icon-radius {
            @include background_color("main-border-color");
            width: 29px;
            height: 29px;
            display: inline-block;
            text-align: center;
            border-radius: 100%;
            position: relative;
            vertical-align: text-top;
            z-index: 10;
            .icon {
              position: absolute;
              top: 50%;
              right: 0 !important;
              left: 0 !important;
              margin: auto;
              transform: translateY(-50%);
              z-index: 1;
            }
            .footer-wechat-img {
              position: absolute;
              visibility: hidden;
              opacity: 0;
              transform: translateY(6px);
              transition: 0.4s;
              width: 140px;
              bottom: 90%;
              left: -55px;
              padding-bottom: 20px;
              img {
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
                border-radius: 4px;
                // height: 100;
              }
            }
            &:hover .footer-wechat-img {
              visibility: unset;
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
        &+li+li {
            float: right;
        }
        .footer-miniimg {
            width: 90px;
            margin: 0 10px;
            text-align: center;
            vertical-align: text-top;
            display: inline-block;
            span{
                opacity: .8;
                font-size: .9em;
            }
        }
      }
    }
  }
  a:not(.but):not(.focus-color) {
    @include font_color("footer-color");
  }
}
</style>