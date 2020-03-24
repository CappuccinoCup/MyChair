import ElementUI from 'element-ui'
import Vuex from 'vuex'
import Router from "vue-router";
import Index from '@/components/Index'
import {shallowMount, createLocalVue} from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(Vuex);
localVue.use(Router);

describe('Index.vue', () => {
    let store = new Vuex.Store({
        state: {
            token: 'token',
            userDetails: {
                username: 'admin'
            }
        },
        mutations: {
            logout() {
                this.state.token = null;
                this.state.userDetails = null;
            }
        }
    });
    let router = new Router({});
    const wrapper = shallowMount(Index, {store, router, localVue});

    it('主页标题正确', () => {
        expect(wrapper.find('h1.logo').text()).toEqual('主页');
    });

    it('用户名正常显示', () => {
        expect(wrapper.vm.username).toEqual('admin');
        expect(wrapper.find('#username').text()).toEqual('admin');
        wrapper.vm.$store.state.userDetails = null;
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.username).toEqual('用户名');
            expect(wrapper.find('#username').text()).toEqual('用户名');
        })
    });

    it('会议注册对话框正常', () => {
        expect(wrapper.vm.dialogFormVisible).toBeFalsy();
        wrapper.find('#home_menu').find({name: 'el-menu-item'}).vm.$emit('click');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.dialogFormVisible).toBeTruthy();
        });
    });

    it('退出登录功能正常', () => {
        wrapper.vm.logout();
        expect(wrapper.vm.$store.state.userDetails).toBeNull();
        expect(wrapper.vm.$route.path).toEqual('/login');
    });
});
