<style scoped lang="less">
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  h1 {
    height: 150px;
    img {
      height: 100%;
    }
  }
  h2 {
    color: #666;

    p {
      margin: 0 0 50px;
    }
  }
  .ivu-row-flex {
    height: 100%;
  }
  .sign-place {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
  .sign-icon {
    display: flex;
    flex-direction: column;
    margin:15px 10px;
  }
  span.icon {
    font-size: 30px;
    display: flex;
    width:30px;
    height:30px;
    justify-content: center;
    align-items: center;
    background: #ffd6a4;
    color:white;
    border-radius: 50%;
  }
  .sign-icon span {
    font-size: 14px;
  }
}
</style>
<template>
  <div class="index">
    <Row type="flex" justify="center" align="middle">
      <Col span="24">
        <h1>
        </h1>
        <h2>
          <p>连续签到{{userInfo.signinDay}}天,当前总积分为{{userInfo.score}}</p>
          <Button @click="isSigned?false:handleStart()">{{isSigned?'已签到':'今日签到'}}</Button>
          
        </h2>
        <div class="sign-place">
            <div class="sign-icon" v-for="i in 7" :key="i" >
              <Icon v-if="parseInt(userInfo.signinDay) % 8 + 1 >= i" :color="parseInt(userInfo.signinDay) % 8 + 1 === i?'#ffd6a4':'#ccc'" type="ios-checkmark-circle" />
              <span class="icon" v-else>{{socre[i-1]}}</span>
              <span>{{parseInt(userInfo.signinDay) % 8 + 1 === i?'今':i}}天</span>
            </div>
          </div>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Icon type="ios-checkmark-circle" />
      </Col>
    </Row>
  </div>
</template>
<script>
import { getUserInfo,userSignIn } from "../api/user";
export default {
  mounted() {
    this.getUserInfo();
  },
  computed: {
    isSigned() {
      return this.userInfo.signTime > 3600 * 24?true:false
    }
  },
  data() {
      return {
          userInfo: {},
          socre: [5,10,15,20,25,30,35]
      }
  },
  methods: {
    async handleStart() {
      await userSignIn()
      this.$Modal.info({
        title: "消息",
        content: "签到成功"
      });
      this.getUserInfo();
    },
    async getUserInfo() {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await getUserInfo();
        this.userInfo = res.data;
      } else {
        this.$router.push('/login')
      }
    }
  }
};
</script>
