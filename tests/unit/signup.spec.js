import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from "vuex";
import VueRouter from "vue-router";
import routes from '../../src/router/index';
import Signup from '@/components/Authentication/SignUp.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
localVue.use(Vuelidate);

let actions = {
    registerUser: jest.fn(),
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

describe('SignUp component', () => {
    it('renders UI components', async () => {
        let wrapper = mount(Signup, {
            data() {
                return {
                    form: {
                        email: '',
                        fname: '',
                        lname: '',
                        password: '',
                        confirmPassword: '',
                        gender: 'female'
                    },
                }
            }, localVue
        });
        expect(wrapper.exists()).toBeTruthy();
        wrapper.setData({
            form: {
                fname: 'xyz',
                lname: 'mno',
                email: 'xyz@gmail.com',
                password: 'xyz1234',
                confirmPassword: 'xyz1234'
            }
        });
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        const inputFname = wrapper.find('#input-fname');
        expect(inputFname.element.value).toBe('xyz');

        const inputLname = wrapper.find('#input-lname');
        expect(inputLname.element.value).toBe('mno');

        const inputEmail = wrapper.find('#input-email');
        expect(inputEmail.element.value).toBe('xyz@gmail.com');

        const inputPwd = wrapper.find('#input-pwd');
        expect(inputPwd.element.value).toBe('xyz1234');

        const inputCpwd = wrapper.find('#input-cpwd');
        expect(inputCpwd.element.value).toBe('xyz1234');

        const btnWrapper = wrapper.findAll('button');
        expect(btnWrapper.at(0).text()).toBe('Submit');
        expect(btnWrapper.at(1).text()).toBe('Reset');
    });

    it('renders errors on Form submission', async () => {
        let wrapper = mount(Signup, {
            data() {
                return {
                    form: {
                        email: '',
                        fname: '',
                        lname: '',
                        password: '',
                        confirmPassword: '',
                        gender: 'female'
                    },
                }
            }, localVue
        });
        expect(wrapper.exists()).toBeTruthy();

        await wrapper.find('button').trigger('click');
        
        wrapper.vm.onSubmit(event);
        await wrapper.vm.$nextTick();

        const errorWrapper = wrapper.findAll('.invalid-feedback');
        expect(errorWrapper.at(0).text()).toBe('First name is required');
        expect(errorWrapper.at(1).text()).toBe('Last name is required');
        expect(errorWrapper.at(2).text()).toBe('Email is required');
        expect(errorWrapper.at(3).text()).toBe('Password is required');
        expect(errorWrapper.at(4).text()).toBe('Confirmation Password is required');

        wrapper.setData({
            form: {
                fname: 'xyz',
                lname: 'mno',
                email: 'xyz@gmail.com',
                password: 'xyz1234',
                confirmPassword: 'xyz12345'
            }
        });
        await wrapper.vm.$nextTick();

        const passwordError = wrapper.find('.invalid-feedback');
        expect(passwordError.text()).toBe('Confirm Password and Password must match');
    });

    it('should make API call on Form submission', async () => {
        let wrapper = mount(Signup, {
            data() {
                return {
                    form: {
                        email: '',
                        fname: '',
                        lname: '',
                        password: '',
                        confirmPassword: '',
                        gender: 'female'
                    },
                }
            }, localVue, store, router
        });
        expect(wrapper.exists()).toBeTruthy();
        wrapper.setData({
            form: {
                fname: 'xyz',
                lname: 'mno',
                email: 'xyz@gmail.com',
                password: 'xyz1234',
                confirmPassword: 'xyz1234'
            }
        });
        await wrapper.vm.$nextTick();

        await wrapper.find('button[type="submit"]').trigger('click');
        wrapper.vm.onSubmit(event);
        expect(actions.registerUser.mock.calls).toHaveLength(1);
        expect(actions.registerUser.mock.calls[0][1]).toEqual(
            { 
                firstName: 'xyz',
                lastName: 'mno',
                email: 'xyz@gmail.com',
                password: 'xyz1234',
                gender: 'female'
            });
        
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(actions.loginUser.mock.calls).toHaveLength(1);
        expect(actions.loginUser.mock.calls[0][1]).toEqual(
            { 
                email: 'xyz@gmail.com',
                password: 'xyz1234'
            });
        
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect(router.currentRoute.path).toBe('/dashboard');
    });

    it('should redirect to SignIn', () => {
        let wrapper = mount(Signup, {
            data() {
                return {
                    form: {
                        email: '',
                        fname: '',
                        lname: '',
                        password: '',
                        confirmPassword: '',
                        gender: 'female'
                    },
                }
            }, localVue, router
        });
        wrapper.find('a').trigger('click');
        expect(router.currentRoute.path).toBe('/');
    });

    it('should reset the form', async () => {
        let wrapper = mount(Signup, {
            data() {
                return {
                    form: {
                        email: 'xyz@gmail.com',
                        fname: 'xyz',
                        lname: 'mno',
                        password: 'xyz1234',
                        confirmPassword: 'xyz1234',
                        gender: 'female'
                    },
                }
            }, localVue, router
        });
        wrapper.find('button[type="reset"]').trigger('click');
        wrapper.vm.onReset(event);
        await wrapper.vm.$nextTick();
        
        expect(wrapper.vm.$data.form.fname).toBe('');
        expect(wrapper.find('#input-fname').element.value).toBe('');

        expect(wrapper.vm.$data.form.lname).toBe('');
        expect(wrapper.find('#input-lname').element.value).toBe('');

        expect(wrapper.vm.$data.form.email).toBe('');
        expect(wrapper.find('#input-email').element.value).toBe('');

        expect(wrapper.vm.$data.form.password).toBe('');
        expect(wrapper.find('#input-pwd').element.value).toBe('');

        expect(wrapper.vm.$data.form.confirmPassword).toBe('');
        expect(wrapper.find('#input-cpwd').element.value).toBe('');

        expect(wrapper.vm.$data.form.gender).toBe('female');
    });
});