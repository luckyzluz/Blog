<template>
    <!-- 评论列表 -->
    <div id="postcomments">
        <ol class="commentlist list-unstyled">
            <div class="comment-filter tab-nav-theme flex ac jsb">
                <ul class="list-inline comment-order-box" style="padding: 0;">
                    <li class="active" style="margin-right: 6px;">
                        <a>最新</a>
                    </li>
                    <li class="">
                        <a>最热</a>
                    </li>
                </ul>
                <a class="but comment-orderby btn-only-author p2-10">只看作者</a>
            </div>
            <li class="comment byuser comment-author-user45133241 even thread-even depth-1" v-for="(v,i) in data" :key="i" :id="'comment-'+v.comment_id">
                <ul class="list-inline">
                    <li class="comt-main" :id="'div-comment-'+v.comment_id">
                        <div class="comment-header" style="margin-bottom: 10px;">
                            <div class="author-box flex ac">
                                <a :href="'/author/'+v.user_info.user_id">
                                    <span class="avatar-img comt-avatar">
                                        <img class="avatar avatar-id-16147" :src="v.user_info.avatar_large" :alt="v.user_info.user_name">
                                    </span>
                                </a>
                                <span class="flex ac flex1">
                                    <a class="text-ellipsis font-bold" :href="'/author/'+v.user_info.user_id">
                                        {{ v.user_info.user_name }}
                                    </a>
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        content="初出茅庐"
                                        placement="top"
                                    >
                                        <img class="img-icon medal-icon" src="src/assets/image/web/medal/medal-1.svg" alt="" style="margin-left: 3px;">
                                    </el-tooltip>
                                    <el-tooltip
                                        class="box-item"
                                        effect="dark"
                                        content="LV2"
                                        placement="top"
                                    >
                                        <img src="src/assets/image/user-level-2.png" alt="" class="img-icon" style="margin-left: 3px;">
                                    </el-tooltip>
                                </span>
                                <a class="action action-comment-like muted-2-color flex0" style="margin-left: 10px;">
                                    <svg class="icon" aria-hidden="true" style="margin-right: 3px;">
                                        <use xlink:href="#icon-zan"></use>
                                    </svg>
                                    <span>{{ v.comment_info.digg_count }}</span>
                                </a>
                            </div>
                        </div>
                        <div class="comment-footer">
                            <div class="comment-content" style="margin-bottom: 10px;" :id="'comment-content-'+v.comment_id">{{ v.comment_info.comment_content }}</div>
                            <div class="comt-meta muted-2-color">
                                <span class="comt-author" :title="v.comment_info.ctime">3天前</span>
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    :content="'回复给'+v.user_info.user_name"
                                    placement="top"
                                >
                                    <span class="reply-link">
                                        <a rel="nofollow" class="comment-reply-link" @click="openEdit(i)">回复</a>
                                    </span>
                                </el-tooltip>
                                <el-dropdown placement="bottom" trigger="click">
                                    <span class="dropdown drop-fixed-sm open" style="padding: 6px;">
                                        <a class="muted-color" style="padding: 6px;">
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-menu_2"></use>
                                            </svg>
                                        </a>
                                    </span>
                                    <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <a>
                                                <i class="iconfont icon-fasfa-exclamation-triangle iconfont-fw c-red" style="margin-right: 10px;"></i>举报
                                            </a>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </li>
                    <commentEdit v-if="commentEditActive==i" class="show" />
                </ul>
                <!-- <ul v-if="v.comment_info.comment_replys&&v.comment_info.comment_replys.length!==0" class="children">
                    <li class="comment byuser comment-author-user35887246 odd alt depth-2">
                        <ul class="list-inline">
                            <li class="comt-main" :id="'div-comment-'+v.comment_info.comment_replys.reply_id"></li>
                        </ul>
                    </li>
                </ul> -->
            </li>
        </ol>
    </div>
</template>
<script setup>
import commentEdit from 'c/article/comment/commentEdit.vue';
import commentListChild from 'c/article/comment/commentListChild.vue';
import {ref} from 'vue';
let commentEditActive=ref(null);
let data=[
  {
    "comment_id": "7220624206600766263",
    "comment_info": {
      "comment_id": "7220624206600766263",
      "user_id": "3087084381294302",
      "item_id": "7219209641796911159",
      "item_type": 2,
      "comment_content": "省流：每月额度用完后20美元/月",
      "comment_pics": [],
      "comment_status": 1,
      "ctime": 1681182658,
      "comment_replys": [
        {
          "reply_id": "7220638350703674173",
          "reply_comment_id": "7220624206600766263",
          "user_id": "4406498335134366",
          "reply_to_reply_id": "0",
          "reply_to_user_id": "0",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "用的是 gpt4 吗",
          "reply_pics": [],
          "reply_status": 1,
          "ctime": 1681185937,
          "digg_count": 0,
          "burry_count": 0
        },
        {
          "reply_id": "7220646132186956599",
          "reply_comment_id": "7220624206600766263",
          "user_id": "3087084381294302",
          "reply_to_reply_id": "7220638350703674173",
          "reply_to_user_id": "4406498335134366",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "不是，之前宣传的噱头，后来改了",
          "reply_pics": [],
          "reply_status": 1,
          "ctime": 1681187766,
          "digg_count": 0,
          "burry_count": 0
        }
      ],
      "digg_count": 1,
      "bury_count": 0,
      "reply_count": 4,
      "is_digg": false,
      "is_bury": false,
      "level": 0
    },
    "user_info": {
      "user_id": "3087084381294302",
      "user_name": "极四维",
      "company": "",
      "job_title": "",
      "avatar_large": "https://p9-passport.byteacctimg.com/img/user-avatar/60a24341233a662306b5ce4d0b755481~300x300.image",
      "level": 2,
      "description": "",
      "followee_count": 5,
      "follower_count": 5,
      "post_article_count": 2,
      "digg_article_count": 4,
      "got_digg_count": 2,
      "got_view_count": 3016,
      "post_shortmsg_count": 13,
      "digg_shortmsg_count": 20,
      "isfollowed": false,
      "favorable_author": 0,
      "power": 90,
      "study_point": 0,
      "university": {
        "university_id": "0",
        "name": "",
        "logo": ""
      },
      "major": {
        "major_id": "0",
        "parent_id": "0",
        "name": ""
      },
      "student_status": 0,
      "select_event_count": 0,
      "select_online_course_count": 0,
      "identity": 0,
      "is_select_annual": false,
      "select_annual_rank": 0,
      "annual_list_type": 0,
      "extraMap": {},
      "is_logout": 0,
      "annual_info": [],
      "account_amount": 0,
      "user_growth_info": {
        "user_id": 3087084381294302,
        "jpower": 90,
        "jscore": 552.5,
        "jpower_level": 2,
        "jscore_level": 5,
        "jscore_title": "先锋掘友",
        "author_achievement_list": [],
        "vip_level": 4,
        "vip_title": "融会贯通",
        "jscore_next_level_score": 2000,
        "jscore_this_level_mini_score": 500
      },
      "is_vip": true,
      "become_author_days": 0,
      "collection_set_article_count": 0,
      "recommend_article_count_daily": 0,
      "article_collect_count_daily": 0
    },
    "user_interact": {
      "id": 7219209641796911000,
      "omitempty": 2,
      "user_id": 0,
      "is_digg": false,
      "is_follow": false,
      "is_collect": false,
      "collect_set_count": 0
    },
    "reply_infos": [
      {
        "reply_id": 7220638350703674000,
        "reply_info": {
          "reply_id": "7220638350703674173",
          "reply_comment_id": "7220624206600766263",
          "user_id": "4406498335134366",
          "reply_to_reply_id": "0",
          "reply_to_user_id": "0",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "用的是 gpt4 吗",
          "reply_pics": [],
          "reply_status": 1,
          "ctime": 1681185937,
          "digg_count": 0,
          "burry_count": 0
        },
        "user_info": {
          "user_id": "4406498335134366",
          "user_name": "周婕纶",
          "company": "",
          "job_title": "",
          "avatar_large": "https://p9-passport.byteacctimg.com/img/user-avatar/c5831168726081ce6f533bd4f20ad716~300x300.image",
          "level": 1,
          "description": "",
          "followee_count": 12,
          "follower_count": 6,
          "post_article_count": 1,
          "digg_article_count": 28,
          "got_digg_count": 0,
          "got_view_count": 132,
          "post_shortmsg_count": 4,
          "digg_shortmsg_count": 14,
          "isfollowed": false,
          "favorable_author": 0,
          "power": 26,
          "study_point": 0,
          "university": {
            "university_id": "0",
            "name": "",
            "logo": ""
          },
          "major": {
            "major_id": "0",
            "parent_id": "0",
            "name": ""
          },
          "student_status": 0,
          "select_event_count": 0,
          "select_online_course_count": 0,
          "identity": 0,
          "is_select_annual": false,
          "select_annual_rank": 0,
          "annual_list_type": 0,
          "extraMap": {},
          "is_logout": 0,
          "annual_info": [],
          "account_amount": 0,
          "user_growth_info": {
            "user_id": 4406498335134366,
            "jpower": 26,
            "jscore": 161.5,
            "jpower_level": 1,
            "jscore_level": 4,
            "jscore_title": "进阶掘友",
            "author_achievement_list": [],
            "vip_level": 0,
            "vip_title": "",
            "jscore_next_level_score": 500,
            "jscore_this_level_mini_score": 150
          },
          "is_vip": false,
          "become_author_days": 0,
          "collection_set_article_count": 0,
          "recommend_article_count_daily": 0,
          "article_collect_count_daily": 0
        },
        "reply_user": {
          "user_id": "0",
          "user_name": "",
          "company": "",
          "job_title": "",
          "avatar_large": "",
          "level": 0,
          "description": "",
          "followee_count": 0,
          "follower_count": 0,
          "post_article_count": 0,
          "digg_article_count": 0,
          "got_digg_count": 0,
          "got_view_count": 0,
          "post_shortmsg_count": 0,
          "digg_shortmsg_count": 0,
          "isfollowed": false,
          "favorable_author": 0,
          "power": 0,
          "study_point": 0,
          "university": null,
          "major": null,
          "student_status": 0,
          "select_event_count": 0,
          "select_online_course_count": 0,
          "identity": 0,
          "is_select_annual": false,
          "select_annual_rank": 0,
          "annual_list_type": 0,
          "extraMap": null,
          "is_logout": 0,
          "annual_info": null,
          "account_amount": 0,
          "user_growth_info": null,
          "is_vip": false,
          "become_author_days": 0,
          "collection_set_article_count": 0,
          "recommend_article_count_daily": 0,
          "article_collect_count_daily": 0
        },
        "user_interact": {
          "id": 7219209641796911000,
          "omitempty": 2,
          "user_id": 0,
          "is_digg": false,
          "is_follow": false,
          "is_collect": false,
          "collect_set_count": 0
        },
        "is_author": false,
        "parent_reply": {
          "reply_id": "0",
          "reply_comment_id": "0",
          "user_id": "0",
          "reply_to_reply_id": "0",
          "reply_to_user_id": "0",
          "item_id": "0",
          "item_type": 0,
          "reply_content": "",
          "reply_pics": null,
          "reply_status": 0,
          "ctime": 0,
          "digg_count": 0,
          "burry_count": 0
        }
      },
      {
        "reply_id": 7220646132186957000,
        "reply_info": {
          "reply_id": "7220646132186956599",
          "reply_comment_id": "7220624206600766263",
          "user_id": "3087084381294302",
          "reply_to_reply_id": "7220638350703674173",
          "reply_to_user_id": "4406498335134366",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "不是，之前宣传的噱头，后来改了",
          "reply_pics": [],
          "reply_status": 1,
          "ctime": 1681187766,
          "digg_count": 0,
          "burry_count": 0
        },
        "user_info": {
          "user_id": "3087084381294302",
          "user_name": "极四维",
          "company": "",
          "job_title": "",
          "avatar_large": "https://p9-passport.byteacctimg.com/img/user-avatar/60a24341233a662306b5ce4d0b755481~300x300.image",
          "level": 2,
          "description": "",
          "followee_count": 5,
          "follower_count": 5,
          "post_article_count": 2,
          "digg_article_count": 4,
          "got_digg_count": 2,
          "got_view_count": 3016,
          "post_shortmsg_count": 13,
          "digg_shortmsg_count": 20,
          "isfollowed": false,
          "favorable_author": 0,
          "power": 90,
          "study_point": 0,
          "university": {
            "university_id": "0",
            "name": "",
            "logo": ""
          },
          "major": {
            "major_id": "0",
            "parent_id": "0",
            "name": ""
          },
          "student_status": 0,
          "select_event_count": 0,
          "select_online_course_count": 0,
          "identity": 0,
          "is_select_annual": false,
          "select_annual_rank": 0,
          "annual_list_type": 0,
          "extraMap": {},
          "is_logout": 0,
          "annual_info": [],
          "account_amount": 0,
          "user_growth_info": {
            "user_id": 3087084381294302,
            "jpower": 90,
            "jscore": 552.5,
            "jpower_level": 2,
            "jscore_level": 5,
            "jscore_title": "先锋掘友",
            "author_achievement_list": [],
            "vip_level": 4,
            "vip_title": "融会贯通",
            "jscore_next_level_score": 2000,
            "jscore_this_level_mini_score": 500
          },
          "is_vip": true,
          "become_author_days": 0,
          "collection_set_article_count": 0,
          "recommend_article_count_daily": 0,
          "article_collect_count_daily": 0
        },
        "reply_user": {
          "user_id": "4406498335134366",
          "user_name": "周婕纶",
          "company": "",
          "job_title": "",
          "avatar_large": "https://p9-passport.byteacctimg.com/img/user-avatar/c5831168726081ce6f533bd4f20ad716~300x300.image",
          "level": 1,
          "description": "",
          "followee_count": 12,
          "follower_count": 6,
          "post_article_count": 1,
          "digg_article_count": 28,
          "got_digg_count": 0,
          "got_view_count": 132,
          "post_shortmsg_count": 4,
          "digg_shortmsg_count": 14,
          "isfollowed": false,
          "favorable_author": 0,
          "power": 26,
          "study_point": 0,
          "university": {
            "university_id": "0",
            "name": "",
            "logo": ""
          },
          "major": {
            "major_id": "0",
            "parent_id": "0",
            "name": ""
          },
          "student_status": 0,
          "select_event_count": 0,
          "select_online_course_count": 0,
          "identity": 0,
          "is_select_annual": false,
          "select_annual_rank": 0,
          "annual_list_type": 0,
          "extraMap": {},
          "is_logout": 0,
          "annual_info": [],
          "account_amount": 0,
          "user_growth_info": {
            "user_id": 4406498335134366,
            "jpower": 26,
            "jscore": 161.5,
            "jpower_level": 1,
            "jscore_level": 4,
            "jscore_title": "进阶掘友",
            "author_achievement_list": [],
            "vip_level": 0,
            "vip_title": "",
            "jscore_next_level_score": 500,
            "jscore_this_level_mini_score": 150
          },
          "is_vip": false,
          "become_author_days": 0,
          "collection_set_article_count": 0,
          "recommend_article_count_daily": 0,
          "article_collect_count_daily": 0
        },
        "user_interact": {
          "id": 7219209641796911000,
          "omitempty": 2,
          "user_id": 0,
          "is_digg": false,
          "is_follow": false,
          "is_collect": false,
          "collect_set_count": 0
        },
        "is_author": false,
        "parent_reply": {
          "reply_id": "7220638350703674173",
          "reply_comment_id": "7220624206600766263",
          "user_id": "4406498335134366",
          "reply_to_reply_id": "0",
          "reply_to_user_id": "0",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "用的是 gpt4 吗",
          "reply_pics": [],
          "reply_status": 1,
          "ctime": 1681185937,
          "digg_count": 0,
          "burry_count": 0
        }
      }
    ],
    "is_author": false,
    "root_item": {
      "item_id": "",
      "item_type": 0,
      "title": "",
      "parent_id": ""
    }
  },
  {
    "comment_id": "7219289704154858299",
    "comment_info": {
      "comment_id": "7219289704154858299",
      "user_id": "1767670430838046",
      "item_id": "7219209641796911159",
      "item_type": 2,
      "comment_content": "补充reply：经过多次调试后，生成的五子棋如下，可运行，效果还可以：",
      "comment_pics": [
        {
          "pic_url": "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7ef2e305bc648748803782189fff3f1~tplv-k3u1fbpfcp-watermark.image?",
          "width": 511,
          "height": 506,
          "pic_type": 1
        }
      ],
      "comment_status": 1,
      "ctime": 1680871937,
      "comment_replys": [
        {
          "reply_id": "7220362938857800506",
          "reply_comment_id": "7219289704154858299",
          "user_id": "2375360276596989",
          "reply_to_reply_id": "0",
          "reply_to_user_id": "0",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "求一个prompt呢，为啥我生成出来这样？？[疑问]",
          "reply_pics": [
            {
              "pic_url": "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd3b379e6f504902aa602ea3ae863cae~tplv-k3u1fbpfcp-watermark.image?",
              "width": 795,
              "height": 447,
              "pic_type": 1
            }
          ],
          "reply_status": 1,
          "ctime": 1681121820,
          "digg_count": 0,
          "burry_count": 0
        },
        {
          "reply_id": "7220381392159376189",
          "reply_comment_id": "7219289704154858299",
          "user_id": "1767670430838046",
          "reply_to_reply_id": "7220362938857800506",
          "reply_to_user_id": "2375360276596989",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "你这个是用什么语言文件生成的",
          "reply_pics": [],
          "reply_status": 1,
          "ctime": 1681126097,
          "digg_count": 0,
          "burry_count": 0
        }
      ],
      "digg_count": 2,
      "bury_count": 0,
      "reply_count": 3,
      "is_digg": false,
      "is_bury": false,
      "level": 0
    },
    "user_info": {
      "user_id": "1767670430838046",
      "user_name": "从起风了到那个夏天",
      "company": "愿心纳吉",
      "job_title": "等风来",
      "avatar_large": "https://p9-passport.byteacctimg.com/img/user-avatar/46c57d98c151fea35946191d8cce8290~300x300.image",
      "level": 2,
      "description": "云程发轫 培风图南",
      "followee_count": 12,
      "follower_count": 30,
      "post_article_count": 5,
      "digg_article_count": 193,
      "got_digg_count": 43,
      "got_view_count": 4991,
      "post_shortmsg_count": 221,
      "digg_shortmsg_count": 1412,
      "isfollowed": false,
      "favorable_author": 0,
      "power": 196,
      "study_point": 0,
      "university": {
        "university_id": "0",
        "name": "",
        "logo": ""
      },
      "major": {
        "major_id": "0",
        "parent_id": "0",
        "name": ""
      },
      "student_status": 0,
      "select_event_count": 0,
      "select_online_course_count": 0,
      "identity": 0,
      "is_select_annual": true,
      "select_annual_rank": 0,
      "annual_list_type": 0,
      "extraMap": {},
      "is_logout": 0,
      "annual_info": [],
      "account_amount": 0,
      "user_growth_info": {
        "user_id": 1767670430838046,
        "jpower": 196,
        "jscore": 4197.4,
        "jpower_level": 2,
        "jscore_level": 6,
        "jscore_title": "杰出掘友",
        "author_achievement_list": [],
        "vip_level": 0,
        "vip_title": "",
        "jscore_next_level_score": 7000,
        "jscore_this_level_mini_score": 2000
      },
      "is_vip": false,
      "become_author_days": 0,
      "collection_set_article_count": 0,
      "recommend_article_count_daily": 0,
      "article_collect_count_daily": 0
    },
    "user_interact": {
      "id": 7219209641796911000,
      "omitempty": 2,
      "user_id": 0,
      "is_digg": false,
      "is_follow": false,
      "is_collect": false,
      "collect_set_count": 0
    },
    "reply_infos": [
      {
        "reply_id": 7220362938857801000,
        "reply_info": {
          "reply_id": "7220362938857800506",
          "reply_comment_id": "7219289704154858299",
          "user_id": "2375360276596989",
          "reply_to_reply_id": "0",
          "reply_to_user_id": "0",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "求一个prompt呢，为啥我生成出来这样？？[疑问]",
          "reply_pics": [
            {
              "pic_url": "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd3b379e6f504902aa602ea3ae863cae~tplv-k3u1fbpfcp-watermark.image?",
              "width": 795,
              "height": 447,
              "pic_type": 1
            }
          ],
          "reply_status": 1,
          "ctime": 1681121820,
          "digg_count": 0,
          "burry_count": 0
        },
        "user_info": {
          "user_id": "2375360276596989",
          "user_name": "用户1279294496604",
          "company": "",
          "job_title": "",
          "avatar_large": "https://p6-passport.byteacctimg.com/img/user-avatar/fb39929feb72c7f6f2b664f2bf1b11cf~300x300.image",
          "level": 0,
          "description": "",
          "followee_count": 6,
          "follower_count": 0,
          "post_article_count": 0,
          "digg_article_count": 19,
          "got_digg_count": 0,
          "got_view_count": 0,
          "post_shortmsg_count": 0,
          "digg_shortmsg_count": 1,
          "isfollowed": false,
          "favorable_author": 0,
          "power": 0,
          "study_point": 0,
          "university": {
            "university_id": "0",
            "name": "",
            "logo": ""
          },
          "major": {
            "major_id": "0",
            "parent_id": "0",
            "name": ""
          },
          "student_status": 0,
          "select_event_count": 0,
          "select_online_course_count": 0,
          "identity": 0,
          "is_select_annual": false,
          "select_annual_rank": 0,
          "annual_list_type": 0,
          "extraMap": {},
          "is_logout": 0,
          "annual_info": [],
          "account_amount": 0,
          "user_growth_info": {
            "user_id": 2375360276596989,
            "jpower": 0,
            "jscore": 262.5,
            "jpower_level": 0,
            "jscore_level": 4,
            "jscore_title": "进阶掘友",
            "author_achievement_list": [],
            "vip_level": 0,
            "vip_title": "",
            "jscore_next_level_score": 500,
            "jscore_this_level_mini_score": 150
          },
          "is_vip": false,
          "become_author_days": 0,
          "collection_set_article_count": 0,
          "recommend_article_count_daily": 0,
          "article_collect_count_daily": 0
        },
        "reply_user": {
          "user_id": "0",
          "user_name": "",
          "company": "",
          "job_title": "",
          "avatar_large": "",
          "level": 0,
          "description": "",
          "followee_count": 0,
          "follower_count": 0,
          "post_article_count": 0,
          "digg_article_count": 0,
          "got_digg_count": 0,
          "got_view_count": 0,
          "post_shortmsg_count": 0,
          "digg_shortmsg_count": 0,
          "isfollowed": false,
          "favorable_author": 0,
          "power": 0,
          "study_point": 0,
          "university": null,
          "major": null,
          "student_status": 0,
          "select_event_count": 0,
          "select_online_course_count": 0,
          "identity": 0,
          "is_select_annual": false,
          "select_annual_rank": 0,
          "annual_list_type": 0,
          "extraMap": null,
          "is_logout": 0,
          "annual_info": null,
          "account_amount": 0,
          "user_growth_info": null,
          "is_vip": false,
          "become_author_days": 0,
          "collection_set_article_count": 0,
          "recommend_article_count_daily": 0,
          "article_collect_count_daily": 0
        },
        "user_interact": {
          "id": 7219209641796911000,
          "omitempty": 2,
          "user_id": 0,
          "is_digg": false,
          "is_follow": false,
          "is_collect": false,
          "collect_set_count": 0
        },
        "is_author": false,
        "parent_reply": {
          "reply_id": "0",
          "reply_comment_id": "0",
          "user_id": "0",
          "reply_to_reply_id": "0",
          "reply_to_user_id": "0",
          "item_id": "0",
          "item_type": 0,
          "reply_content": "",
          "reply_pics": null,
          "reply_status": 0,
          "ctime": 0,
          "digg_count": 0,
          "burry_count": 0
        }
      },
      {
        "reply_id": 7220381392159376000,
        "reply_info": {
          "reply_id": "7220381392159376189",
          "reply_comment_id": "7219289704154858299",
          "user_id": "1767670430838046",
          "reply_to_reply_id": "7220362938857800506",
          "reply_to_user_id": "2375360276596989",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "你这个是用什么语言文件生成的",
          "reply_pics": [],
          "reply_status": 1,
          "ctime": 1681126097,
          "digg_count": 0,
          "burry_count": 0
        },
        "user_info": {
          "user_id": "1767670430838046",
          "user_name": "从起风了到那个夏天",
          "company": "愿心纳吉",
          "job_title": "等风来",
          "avatar_large": "https://p9-passport.byteacctimg.com/img/user-avatar/46c57d98c151fea35946191d8cce8290~300x300.image",
          "level": 2,
          "description": "云程发轫 培风图南",
          "followee_count": 12,
          "follower_count": 30,
          "post_article_count": 5,
          "digg_article_count": 193,
          "got_digg_count": 43,
          "got_view_count": 4991,
          "post_shortmsg_count": 221,
          "digg_shortmsg_count": 1412,
          "isfollowed": false,
          "favorable_author": 0,
          "power": 196,
          "study_point": 0,
          "university": {
            "university_id": "0",
            "name": "",
            "logo": ""
          },
          "major": {
            "major_id": "0",
            "parent_id": "0",
            "name": ""
          },
          "student_status": 0,
          "select_event_count": 0,
          "select_online_course_count": 0,
          "identity": 0,
          "is_select_annual": true,
          "select_annual_rank": 0,
          "annual_list_type": 0,
          "extraMap": {},
          "is_logout": 0,
          "annual_info": [],
          "account_amount": 0,
          "user_growth_info": {
            "user_id": 1767670430838046,
            "jpower": 196,
            "jscore": 4197.4,
            "jpower_level": 2,
            "jscore_level": 6,
            "jscore_title": "杰出掘友",
            "author_achievement_list": [],
            "vip_level": 0,
            "vip_title": "",
            "jscore_next_level_score": 7000,
            "jscore_this_level_mini_score": 2000
          },
          "is_vip": false,
          "become_author_days": 0,
          "collection_set_article_count": 0,
          "recommend_article_count_daily": 0,
          "article_collect_count_daily": 0
        },
        "reply_user": {
          "user_id": "2375360276596989",
          "user_name": "用户1279294496604",
          "company": "",
          "job_title": "",
          "avatar_large": "https://p6-passport.byteacctimg.com/img/user-avatar/fb39929feb72c7f6f2b664f2bf1b11cf~300x300.image",
          "level": 0,
          "description": "",
          "followee_count": 6,
          "follower_count": 0,
          "post_article_count": 0,
          "digg_article_count": 19,
          "got_digg_count": 0,
          "got_view_count": 0,
          "post_shortmsg_count": 0,
          "digg_shortmsg_count": 1,
          "isfollowed": false,
          "favorable_author": 0,
          "power": 0,
          "study_point": 0,
          "university": {
            "university_id": "0",
            "name": "",
            "logo": ""
          },
          "major": {
            "major_id": "0",
            "parent_id": "0",
            "name": ""
          },
          "student_status": 0,
          "select_event_count": 0,
          "select_online_course_count": 0,
          "identity": 0,
          "is_select_annual": false,
          "select_annual_rank": 0,
          "annual_list_type": 0,
          "extraMap": {},
          "is_logout": 0,
          "annual_info": [],
          "account_amount": 0,
          "user_growth_info": {
            "user_id": 2375360276596989,
            "jpower": 0,
            "jscore": 262.5,
            "jpower_level": 0,
            "jscore_level": 4,
            "jscore_title": "进阶掘友",
            "author_achievement_list": [],
            "vip_level": 0,
            "vip_title": "",
            "jscore_next_level_score": 500,
            "jscore_this_level_mini_score": 150
          },
          "is_vip": false,
          "become_author_days": 0,
          "collection_set_article_count": 0,
          "recommend_article_count_daily": 0,
          "article_collect_count_daily": 0
        },
        "user_interact": {
          "id": 7219209641796911000,
          "omitempty": 2,
          "user_id": 0,
          "is_digg": false,
          "is_follow": false,
          "is_collect": false,
          "collect_set_count": 0
        },
        "is_author": true,
        "parent_reply": {
          "reply_id": "7220362938857800506",
          "reply_comment_id": "7219289704154858299",
          "user_id": "2375360276596989",
          "reply_to_reply_id": "0",
          "reply_to_user_id": "0",
          "item_id": "7219209641796911159",
          "item_type": 2,
          "reply_content": "求一个prompt呢，为啥我生成出来这样？？[疑问]",
          "reply_pics": [
            {
              "pic_url": "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd3b379e6f504902aa602ea3ae863cae~tplv-k3u1fbpfcp-watermark.image?",
              "width": 795,
              "height": 447,
              "pic_type": 1
            }
          ],
          "reply_status": 1,
          "ctime": 1681121820,
          "digg_count": 0,
          "burry_count": 0
        }
      }
    ],
    "is_author": true,
    "root_item": {
      "item_id": "",
      "item_type": 0,
      "title": "",
      "parent_id": ""
    }
  }
]
const openEdit=(i)=>{
    commentEditActive.value=i;
}
</script>
<style lang="scss">
.list-unstyled {
    padding-left: 0;
    list-style: none;
}
// #postcomments {
    .tab-nav-theme {
        margin-top: 0;
        li {
            padding-bottom: 1px;
            &::before {
                width: 20px !important;
                height: 2px !important;
                bottom: -2px;
                opacity: 0;
            }
            &.active::before{
                opacity: 1;
            }
        }
    }
// }
.list-inline>li {
    vertical-align: middle;
}
#comments .list-inline {
    padding: 15px;
}
#respond+#postcomments .comment-filter, .comment-signarea+#postcomments .comment-filter {
    margin-top: 20px;
}
#postcomments {
    .comment .list-inline{
        &>.comt-main {
            width: 100%;
        }
        &>li {
            padding: 10px;
            vertical-align: top;
        }
        
    }
    .comment-header {
        font-size: 15px;
        position: relative;
    }
    .comment-footer {
        position: relative;
    }
    .commentlist>.comment>.list-inline {
        .author-box {
            align-items: start;
        }
        .comment-footer {
            margin-left: 65px;
            margin-top: -25px;
        }
    }
    .avatar-img {
        --this-size: 45px;
        margin-right: 20px;
    }
    .action span {
        margin-left: 4px;
    }
    .comt-meta>span{
        &:not(:empty) {
            margin-right: 10px;
            vertical-align: middle;
        }
        a {
            color: inherit;
        }
    }
    .comt-title {
        display: none;
    }
    #cancel-comment-reply-link,.action-text {
        display: inline-block;
    }
    .comt-ctrl .but {
        margin-bottom: 2px;
    }
    // 子
    .children {
        margin-left: 86px;
        background: var(--main-shadow);
        border-radius: var(--main-radius);
        margin-bottom: 6px;
    }
}
.comment-content {
    word-wrap: hidden;
    white-space: pre-wrap;
}
</style>