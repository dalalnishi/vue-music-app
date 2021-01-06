import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from "vuex";
import VueRouter from "vue-router";
import routes from '../../src/router/index';
import Header from '@/components/Header/Header.vue';
import { IconsPlugin } from 'bootstrap-vue';
import Antd from 'ant-design-vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(IconsPlugin);
localVue.use(Antd);

const router = new VueRouter({ routes });

describe('Header component', () => {
    let store;
    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                AuthStore: {
                    state: {
                        token: null,
                        userData: {
                            firstName: '',
                            lastName: ''
                        }
                    },
                    mutations: {
                        removeAuth(state) {
                            state.token = null;
                            state.userData = {
                                firstName: '',
                                lastName: ''
                            }
                        }
                    },
                    namespaced: true
                },
            }
        });
    });
    it('renders UI components', async () => {
        let wrapper = mount(Header, { localVue, store, router });
        
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find('.navbar').exists()).toBeFalsy();

        store.state.AuthStore.token = 'AFDIFHIAHAIJOSJODJAJDOJAODJOAJDOJA';
        store.state.AuthStore.userData = {
            firstName: 'xyz',
            lastName: 'mno'
        }
        await wrapper.vm.$nextTick();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();

        const liWrapper = wrapper.findAll('ul li');
        expect(liWrapper.at(0).find('.ant-avatar-string').text()).toBe('x m');

        // liWrapper.at(1).trigger('click');
        // wrapper.vm.removeAuth();
        // await wrapper.vm.$nextTick();
        // expect(store.state.AuthStore.token).toBe(null);
        // expect(store.state.AuthStore.userData).toEqual({ firstName: '', lastName: '' });
        // expect(router.currentRoute.path).toBe('/');
    });
});