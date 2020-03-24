import ElementUI from 'element-ui'
import Router from "vue-router";
import Login from '@/components/Login'
import {mount, createLocalVue} from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Router);

describe('Login.vue', () => {
    let router = new Router({

    });

    const wrapper = mount(Login, {router, localVue});

    it('登录页面标题正确', () => {
        expect(wrapper.find('h3').text()).toEqual('登录');
    });

    it('表单组件齐全', () => {
        expect(wrapper.findAll({name: 'el-input'}).length).toBe(2);
        expect(wrapper.findAll({name: 'el-button'}).length).toBe(2);
    });

    it('初始登录信息为空', () => {
        expect(wrapper.vm.loginForm.username).toEqual('');
        expect(wrapper.vm.loginForm.password).toEqual('');
    });

    it('登录信息为空验证正确', () => {
        const loginButton = wrapper.find({name: 'el-button'});
        loginButton.vm.$emit('click');
        wrapper.vm.$nextTick(() => {
            expect(loginButton.emitted().click).toBeTruthy();
            expect(wrapper.findAll({name: 'el-form-item'}).at(0).vm.validateMessage).toEqual('用户名不能为空');
            expect(wrapper.findAll({name: 'el-form-item'}).at(1).vm.validateMessage).toEqual('密码不能为空');
        });
    });
});
