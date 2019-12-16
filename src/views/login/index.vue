<template>
    <div class="main">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <h3 style="margin: 50px auto;">登录页面</h3>
            <FormItem prop="username">
                <Input type="text" v-model="formInline.username" placeholder="用户名">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
            </FormItem>
        </Form>
    </div>
    
</template>
<script>
import { login } from '../../api/user'
    export default {
        data () {
            return {
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate( async (valid) => {
                    if (valid) {
                        let result = await login(this.formInline);
                        localStorage.setItem('token',result.data);
                        this.$Message.success('登录成功!');
                        this.$router.push('/')
                    } else {
                        this.$Message.error('缺少参数！');
                    }
                })
            }
        }
    }
</script>
<style >
    .main {
        width:500px;
        margin:0 auto;
    }
    h3 {
        text-align: center;
    }
</style>