<template>
    <van-nav-bar placeholder fixed title="我的"/>
    <van-cell-group inset @click="userInfo">
        <van-cell class="topCard">
            <template #value>
                <van-col>
                    <van-row justify="center">
                        <van-image
                            round
                            fit="cover"
                            width="8rem"
                            height="8rem"
                            src="../public/lsq.png"
                        />
                    </van-row>
                    <van-row justify="center" id="name">
                        <van-col>用户132174433213</van-col>
                        <van-col offset="22">
                            <van-icon name="setting-o" />
                        </van-col>
                    </van-row>
                </van-col>
            </template>
        </van-cell>
    </van-cell-group>

    <van-cell-group inset>
        <van-cell>
            <van-grid :border="false">
                <van-grid-item icon="coupon-o" text="电影票" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
                <van-grid-item icon="photo-o" text="文字" />
            </van-grid>
        </van-cell>
    </van-cell-group>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    setup(){
        const router = useRouter()
        const userInfo = () =>{
            router.push("/userInfo")
        }

        return {
            userInfo,
        }
    }
}
</script>

<style scoped>
.van-cell-group {
    margin-top: 10px;
}
.topCard {
    padding: 20px;
    background-color: #f7faf8;
}
.topCard #name {
    margin-top: 10px;
    font-size: 19px;
    font-weight: 500;
}
</style>