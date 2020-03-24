import ElementUI from 'element-ui'
import Register from '@/components/Register'
import {mount, createLocalVue} from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Register.vue', () => {
    const wrapper = mount(Register, {localVue});

    it('注册页面标题正确', () => {
        expect(wrapper.find('h3').text()).toEqual('注册');
    });

    it('表单组件齐全', () => {
        expect(wrapper.findAll({name: 'el-input'}).length).toBe(6);
        expect(wrapper.findAll({name: 'el-button'}).length).toBe(1);
    });

    it('初始注册信息为空', () => {
        expect(wrapper.vm.registerForm.username).toBe('');
        expect(wrapper.vm.registerForm.password).toBe('');
        expect(wrapper.vm.registerForm.conpassword).toBe('');
        expect(wrapper.vm.registerForm.email).toBe('');
        expect(wrapper.vm.registerForm.organization).toBe('');
        expect(wrapper.vm.registerForm.region).toBe('');
    });

    it('注册信息为空验证正确', () => {
        const registerButton = wrapper.find({name: 'el-button'});
        registerButton.vm.$emit('click');
        wrapper.vm.$nextTick(() => {
            expect(registerButton.emitted().click).toBeTruthy();
            expect(wrapper.findAll({name: 'el-form-item'}).at(0).vm.validateMessage).toEqual('用户名不能为空');
            expect(wrapper.findAll({name: 'el-form-item'}).at(1).vm.validateMessage).toEqual('密码不能为空');
            expect(wrapper.findAll({name: 'el-form-item'}).at(2).vm.validateMessage).toEqual('请再次输入密码');
            expect(wrapper.findAll({name: 'el-form-item'}).at(3).vm.validateMessage).toEqual('电子邮箱不能为空');
            expect(wrapper.findAll({name: 'el-form-item'}).at(4).vm.validateMessage).toEqual('所属单位不能为空');
            expect(wrapper.findAll({name: 'el-form-item'}).at(5).vm.validateMessage).toEqual('所在区域不能为空');
        });
    });

    it('注册信息格式验证1', () => {
        wrapper.vm.registerForm.username = '_CC_CC';
        wrapper.vm.registerForm.password = 'cc';
        wrapper.vm.registerForm.conpassword = 'acc';
        wrapper.vm.registerForm.email = 'CC@ccc';
        wrapper.vm.registerForm.organization = 'cc';
        wrapper.vm.registerForm.region = 'cc';
        const registerButton = wrapper.find({name: 'el-button'});
        registerButton.vm.$emit('click');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll({name: 'el-form-item'}).at(0).vm.validateMessage).toEqual('用户名仅支持字母、数字、- 和 _且以字母或 - 开头');
            expect(wrapper.findAll({name: 'el-form-item'}).at(1).vm.validateMessage).toEqual('密码应为6-32个字符');
            expect(wrapper.findAll({name: 'el-form-item'}).at(2).vm.validateMessage).toEqual('两次输入密码不一致');
            expect(wrapper.findAll({name: 'el-form-item'}).at(3).vm.validateMessage).toEqual('电子邮箱格式错误');
            expect(wrapper.findAll({name: 'el-form-item'}).at(4).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(5).vm.validateMessage).toEqual('');
        });
    });

    it('注册信息格式验证2', () => {
        wrapper.vm.registerForm.username = 'CC';
        wrapper.vm.registerForm.password = 'password';
        wrapper.vm.registerForm.conpassword = 'password';
        wrapper.vm.registerForm.email = 'CC@ccc.cc';
        wrapper.vm.registerForm.organization = '-c-c-';
        wrapper.vm.registerForm.region = '-c-c-';
        const registerButton = wrapper.find({name: 'el-button'});
        registerButton.vm.$emit('click');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll({name: 'el-form-item'}).at(0).vm.validateMessage).toEqual('用户名应为5-32个字符');
            expect(wrapper.findAll({name: 'el-form-item'}).at(1).vm.validateMessage).toEqual('密码应包含字母、数字、- 和 _ 中至少两种');
            expect(wrapper.findAll({name: 'el-form-item'}).at(2).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(3).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(4).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(5).vm.validateMessage).toEqual('');
        });
    });

    it('注册信息格式验证3', () => {
        wrapper.vm.registerForm.username = 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC';
        wrapper.vm.registerForm.password = 'password1';
        wrapper.vm.registerForm.conpassword = 'password';
        wrapper.vm.registerForm.email = 'CCcc.cc';
        wrapper.vm.registerForm.organization = '_C_C_';
        wrapper.vm.registerForm.region = '_C_C_';
        const registerButton = wrapper.find({name: 'el-button'});
        registerButton.vm.$emit('click');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll({name: 'el-form-item'}).at(0).vm.validateMessage).toEqual('用户名应为5-32个字符');
            expect(wrapper.findAll({name: 'el-form-item'}).at(1).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(2).vm.validateMessage).toEqual('两次输入密码不一致');
            expect(wrapper.findAll({name: 'el-form-item'}).at(3).vm.validateMessage).toEqual('电子邮箱格式错误');
            expect(wrapper.findAll({name: 'el-form-item'}).at(4).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(5).vm.validateMessage).toEqual('');
        });
    });

    it('注册信息格式验证4', () => {
        wrapper.vm.registerForm.username = 'username';
        wrapper.vm.registerForm.password = 'username-pass';
        wrapper.vm.registerForm.conpassword = 'username-pass';
        wrapper.vm.registerForm.email = 'user@name.com';
        wrapper.vm.registerForm.organization = 'user';
        wrapper.vm.registerForm.region = 'name';
        const registerButton = wrapper.find({name: 'el-button'});
        registerButton.vm.$emit('click');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll({name: 'el-form-item'}).at(0).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(1).vm.validateMessage).toEqual('密码不应包含用户名');
            expect(wrapper.findAll({name: 'el-form-item'}).at(2).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(3).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(4).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(5).vm.validateMessage).toEqual('');
        });
    });

    it('注册信息格式验证5', () => {
        wrapper.vm.registerForm.username = '@CappuccinoCup';
        wrapper.vm.registerForm.password = 'cc_password';
        wrapper.vm.registerForm.conpassword = 'cc_password';
        wrapper.vm.registerForm.email = '18302010035@fudan.edu.cn';
        wrapper.vm.registerForm.organization = '复旦大学';
        wrapper.vm.registerForm.region = '中国';
        const registerButton = wrapper.find({name: 'el-button'});
        registerButton.vm.$emit('click');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll({name: 'el-form-item'}).at(0).vm.validateMessage).toEqual('用户名仅支持字母、数字、- 和 _且以字母或 - 开头');
            expect(wrapper.findAll({name: 'el-form-item'}).at(1).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(2).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(3).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(4).vm.validateMessage).toEqual('');
            expect(wrapper.findAll({name: 'el-form-item'}).at(5).vm.validateMessage).toEqual('');
        });
    });
});
