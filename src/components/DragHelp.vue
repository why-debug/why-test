<template>
    <div id="drag">
        <img src="../assets/images/help.png" v-drag>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        //局部组件指令
        directives: {
            drag: function (el) {
                let dragBox = el; //获取当前元素
                let disX, disY;
                let pageWidth = document.documentElement.clientWidth;
                let pageHeight = document.documentElement.clientHeight;
                dragBox.ontouchstart = e => {
                    let touch = e.touches[0];
                    //触摸时相对元素的位置
                    disX = touch.clientX - dragBox.offsetLeft;
                    disY = touch.clientY - dragBox.offsetTop;
                };
                dragBox.ontouchmove = e => {
                    let touch = e.touches[0];
                    //计算元素的位置
                    let left = touch.clientX - disX;
                    let top = touch.clientY - disY;
                    if (left + 55 > pageWidth) {
                        left = pageWidth - 55;
                    } else if (left < 5) {
                        left = 5
                    }
                    if (top + 110 > pageHeight) {
                        top = pageHeight - 110;
                    } else if (top < 5) {
                        top = 5
                    }
                    //移动当前元素
                    dragBox.style.left = left + "px";
                    dragBox.style.top = top + "px";
                    //阻止页面的滑动默认事件
                    document.addEventListener("touchmove", function () {
                        e.preventDefault();
                    }, {passive: false});
                };
                dragBox.ontouchend = e => {
                    //触摸结束时候不再移动
                    dragBox.onmousemove = null;
                    //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
                    dragBox.ontouchend = null;
                };
            }
        }
    };
</script>

<style scoped>
    #drag img {
        position: fixed;
        right: 10px;
        top: calc(50% - 80px);
        z-index: 1999;
        width: 46px;
        height: 46px;
    }
</style>
