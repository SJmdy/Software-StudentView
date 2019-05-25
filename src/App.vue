<template>
    <div id="app" class="fillcontain">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterAlive: true
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick (function () {
                    this.isRouterAlive = true;
                })
            }
        }
    }
</script>

<style lang="less">
    @import './style/common';

    .bg_image {
        background-image: url("/assets/bg.jpg");
        background-repeat: repeat;
    }

</style>
