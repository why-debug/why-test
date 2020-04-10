<template>
    <div id="qa">
        <img src="../../assets/images/dsds.png" class="banner">
        <div class="content">
            <div class="qa-wrap">
                <div class="left-box icon-box">
                    <van-icon name="question-o" color="#458FCE" size="22px"/>
                </div>
                <div class="right-box" style="font-size: 18px;font-weight: 600;">猜你想问</div>
            </div>
            <div class="qa-wrap" v-for="(item,index) of qusetion" :key="index">
                <div class="left-box">Q</div>
                <div class="right-box">
                    <div class="question">{{item.title}}</div>
                    <div class="answer" v-html="item.answer"></div>
                    <van-button type="info" plain size="small" v-if="item.hasButton" @click="searchOk">点击查询手机是否支持圈子视频彩铃</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Qa",
        data(){
            return{
                qusetion:[
                    {
                        title: "该平台能实现什么功能？",
                        answer:"该平台主要为江苏省移动的圈子彩铃用户进行圈子彩铃视频的个人制作，上传，设置及修改。"
                    },{
                        title: "圈子视频彩铃和音频（或普通）彩铃有什么区别？",
                        answer:"当您开通了圈子视频彩铃业务后，您圈子的朋友拨打您的电话时，将有机会看到专属于你圈子的一段视频，音频（或普通）彩铃只是音乐或歌曲。即：视频彩铃是声音+画面，音频（或普通）则只有声音。"
                    },{
                        title: "怎样才能看到圈子视频彩铃？",
                        answer:"圈子视频彩铃是被叫订购设置让主叫看的业务，看到圈子视频彩铃需具备以下几个条件：\n" +
                            "（1）主叫用户（拨打方）：手机支持视频彩铃播放，同时升级到最新系统；开通VoLTE高清语音功能；手机打开VoLTE开关（手机设置中打开“VoLTE高清通话”或“高清语音”）；VoLTE网络环境（手机屏幕上方有HD或VoLTE标识）。\n" +
                            "（2）被叫用户（接听方）：用户开通圈子视频彩铃"
                    },{
                        title: "哪些手机能看到圈子视频彩铃？",
                        answer:"从2018年3月开始，新发售的中国移动定制手机和公开版手机都陆续支持圈子视频彩铃播放，部分之前发售的存量终端也可以通过安装手机推送的升级包支持。"
                    },{
                        title: "如何打开手机上的VoLTE（高清语音）开关？",
                        answer:"Android系统手机在手机设置中找到移动网络，将“VoLTE高清通话”或“高清语音”开关打开。开通VoLTE功能并打开手机VoLTE开关后，手机屏幕上方会有“HD”标识。",
                        hasButton:true
                    },{
                        title: "我开通了圈子视频彩铃功能后，为什么别人打我电话时会有无法接通、掉话或者接通后听不到通话声音的现象？",
                        answer:"目前部分省少数用户会出现这种情况，建议用户先取消VoLTE和视频彩铃功能，然后再重新开通VoLTE和圈子视频彩铃功能。"
                    },{
                        title: "我开通了圈子视频彩铃，但我的朋友打我电话时，为什么有些朋友能看到视频，而有些朋友却看不到视频？",
                        answer:"您开通圈子视频彩铃业务后，您的朋友在拨打您电话时，观看到圈子视频彩铃需同时满足几个条件：\n" +
                            "1）您朋友是中国移动的用户；\n" +
                            "2）您朋友的终端需支持视频彩铃播放；\n" +
                            "3）您朋友开通了VoLTE高清语音功能；\n" +
                            "4）您朋友给您打音频或者视频电话时所处的位置网络情况良好（处于VoLTE网络中，手机终端右上角有HD或VOLTE标识）。"
                    },{
                        title: "开通了圈子视频彩铃业务，我的音频彩铃还在吗？",
                        answer:"开通视频彩铃业务后，您的音频彩铃业务仍然存在。当呼叫您的用户的终端不支持视频彩铃或者处于非4G VoLTE网络下，此时系统会播放您所设置的音频彩铃。"
                    },
                    {
                        title: "我开通了圈子视频彩铃功能后，为什么别人打我电话时会有无法接通、掉话或者接通后听不到通话声音的现象？",
                        answer:"目前部分省少数用户会出现这种情况，建议用户先取消VoLTE和视频彩铃功能，然后再重新开通VoLTE和圈子视频彩铃功能。"
                    },
                    {
                        title: "为什么我退订了4G VoLTE功能，我的圈子视频彩铃业务也退订了？",
                        answer:"圈子视频彩铃业务基于VoLTE功能开通，如果您退订了VoLTE功能，将不再具备使用视频彩铃的条件，系统自动退订视频彩铃业务。（注：是否自动退订以各省执行为准）"
                    },
                    {
                        title: "圈子视频彩铃播放产生的流量收费吗？",
                        answer:"在通话前播放圈子视频彩铃产生的流量免费，主叫（打电话）、被叫（接电话）均免费。"
                    },
                    {
                        title: "圈子视频彩铃制作的时长限制是多少？",
                        answer:"最长48秒、最短7秒，建议选择或制作10至20秒的视频。"
                    },
                    {
                        title: "苹果手机支持圈子视频彩铃功能嘛？",
                        answer:"苹果手机无法看到圈子视频彩铃，但苹果手机用户可以正常开通圈子视频彩铃业务。"
                    },
                    {
                        title: "圈子视频彩铃业务支持国际漫游吗，港澳台地区支持视频彩铃业务吗？",
                        answer:"圈子视频彩铃业务现在只支持省间漫游，港澳台地区及国外目前暂不支持视频彩铃业务。"
                    }
                ]
            }
        },
        methods:{
            replaceBr(val){
                return val.replace(/\n/g, '<br>')
            },
            searchOk(){
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否同意访问终端检测网站？'
                }).then(() => {
                    window.location.href = 'http://h5.vrbt.migu.cn/QRcold.html';
                }).catch(() => {
                    // on cancel
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    #qa {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;

        .banner {
            width: 100%;
        }

        .content {
            padding: 15px 20px 0;

            .qa-wrap {
                width: 100%;
                margin-bottom: 20px;
                display: flex;
                flex-direction: row;
                line-height: 30px;
                font-size: 16px;
                color: #333;

                .icon-box {
                    display: flex;
                    align-items: center;
                }

                .left-box {
                    width: 25px;
                }

                .right-box {
                    width: calc(100% - 25px);

                    .question {
                        display: inline-block;
                        font-weight: 600;
                        text-shadow: 0 0 10px #8BB9E1;
                    }

                    .answer {
                        font-size: 15px;
                        white-space: pre-wrap;
                    }
                }
                .is-ok{
                    display: block;
                }
            }
        }
    }
</style>
