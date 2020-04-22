<template>
  <div id="add">
    <div class="header">
      <div>上传视频彩铃</div>
      <div @click="submitData">完成</div>
    </div>
    <circle-video-item
      :submit-data.sync="isSubmitRing"
      :is-set-type="true"
      @refreshClick="ringSubmit"
    />
  </div>
</template>

<script>
import CircleVideoItem from "./../components/CircleVideoItem";
import api from "@/api/basic";

export default {
  name: "AddRingVideo",
  components: {
    CircleVideoItem
  },
  data() {
    return {
      msisdn: "",
      ringObject: {
        // ringName: "",
        // fileList: [],
        // ringText: ""
      },
      isSubmitRing: false,
      why: ""
    };
  },
  mounted() {
    this.msisdn = this.$route.query.msisdn;
  },
  methods: {
    ringSubmit(form) {
      this.ringObject = form;
      //   this.$toast.loading({
      //     mask: true,
      //     message: "请稍候...",
      //     duration: 0
      //   });
      if (form.fileList.length !== 0 && form.ringName != "") {
        this.$router.push({
          path: "/video-progress",
          query: { videoName: form.fileList[0].file.name }
        });
      }
      if (form.ringName != "") {
        api
          .uploadRing({
            msisdn: this.msisdn,
            ringName: form.ringName,
            ringContent: form.ringContent,
            setType: form.currentIndex,
            file: form.fileList[0].file
          })
          .then(res => {
            const { data } = res;
            if (data.code !== this.$common.SUCCESS) {
              // this.$notify({
              //   message: "上传成功",
              //   duration: 1000,
              //   background: "#07c160",
              //   onClose: _ => {
              //     this.$router.go(-2);
              //   }
              // });
              this.$notify({
                type: "danger",
                message: data.msg,
                duration: 2000,
                  onClose: _ => {
                  this.$router.go(-2);
                }
              });
            }
          });
        //   .finally(_ => {
        //     this.$toast.clear();
        //   });
      } else {
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      }
    },
    submitData() {
      this.isSubmitRing = true;
      //   console.log(this.ringObject.fileList);
    }
  }
};
</script>

<style scoped lang="scss" src="./../../styles/add-header.scss"/>