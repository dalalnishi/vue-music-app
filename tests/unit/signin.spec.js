import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from "vuex";
import VueRouter from "vue-router";
import routes from '../../src/router/index';
import Signin from '@/components/Authentication/SignIn.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
localVue.use(Vuelidate);

let actions = {
    loginUser: jest.fn()
}

const store = new Vuex.Store({
    state: {
      token: null
    },
    actions
});

const router = new VueRouter({ routes });
const event = {
    preventDefault: jest.fn()
}

describe('SignIn component', () => {
    it('renders UI components', async () => {
        let wrapper = mount(Signin, {
            data() {
                return {
                    email: '',
                    password: ''
                }
            }, localVue
        });
        expect(wrapper.exists()).toBeTruthy();
        wrapper.setData({
            email: 'xyz@gmail.com',
            password: 'xyz1234'
        });
        await wrapper.vm.$nextTick();

        const inputEmail = wrapper.find('#input-email');
        expect(inputEmail.element.value).toBe('xyz@gmail.com');

        const inputPwd = wrapper.find('#input-pwd');
        expect(inputPwd.element.value).toBe('xyz1234');

        expect(wrapper.find('button').text()).toBe('Login');
    });

    it('renders errors on Form submission', async () => {
        let wrapper = mount(Signin, {
            data() {
                return {
                    email: '',
                    password: ''
                }
            }, localVue
        });
        expect(wrapper.exists()).toBeTruthy();

        await wrapper.find('button').trigger('click');
        wrapper.vm.onLogin(event);
        await wrapper.vm.$nextTick();

        const errorWrapper = wrapper.findAll('.invalid-feedback');
        expect(errorWrapper.at(0).text()).toBe('Email is required');
        expect(errorWrapper.at(1).text()).toBe('Password is required');
    });

    it('should make API call on Form submission', async () => {
        let wrapper = mount(Signin, {
            data() {
                return {
                    email: '',
                    password: ''
                }
            }, localVue, store, router
        });
        expect(wrapper.exists()).toBeTruthy();
        wrapper.setData({
            email: 'xyz@gmail.com',
            password: 'xyz1234'
        });
        await wrapper.vm.$nextTick();

        await wrapper.find('button').trigger('click');
        wrapper.vm.onLogin(event);
        expect(actions.loginUser.mock.calls).toHaveLength(1);
        expect(actions.loginUser.mock.calls[0][1]).toEqual({ email: 'xyz@gmail.com', password: 'xyz1234' });
        
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect(router.currentRoute.path).toBe('/dashboard');
    });

    it('should redirect to Signup', () => {
        let wrapper = mount(Signin, {
            data() {
                return {
                    email: '',
                    password: ''
                }
            }, localVue, router
        });
        wrapper.find('a').trigger('click');
        expect(router.currentRoute.path).toBe('/sign-up');
    })
});