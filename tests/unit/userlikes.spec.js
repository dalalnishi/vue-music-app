import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from "vuex";
import VueRouter from "vue-router";
import routes from '../../src/router/index';
import Userlikes from '@/components/UserActions/UserLikes.vue';
import Antd from 'ant-design-vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(Antd);

let actions = {
    getUserFavourites: jest.fn()
}

const store = new Vuex.Store({
    state: {
        userLikes: []
    },
    actions
});

const router = new VueRouter({ routes });
localStorage.setItem('UserID', '123');

describe('Userlikes component', () => {
    it('should render User liked Tracks', async () => {
        let wrapper = mount(Userlikes, {
            data() {
                return {
                    likes: []
                }
            }, 
            localVue, 
            store, 
            router 
        });
        expect(wrapper.exists()).toBeTruthy();

        expect(wrapper.find('div.no-found').exists()).toBeTruthy();
        expect(wrapper.find('div.no-found img').attributes().src).toBe('../../assets/no-result.png');

        expect(actions.getUserFavourites.mock.calls).toHaveLength(1);
        expect(actions.getUserFavourites.mock.calls[0][1]).toBe('123');

        wrapper.setData({ 
            likes: 
            [
                {
                    "Track_id": "tra.500478553",
                    "Track_name": "WAP (feat. Megan Thee Stallion)",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/1/1/4/0/9/2180090411.mp3",
                    "Album_id": "alb.230477459",
                    "Album_name": "California Sunrise",
                    "Artist_id": "art.214281475",
                    "Artist_name": "Billie Eilish"
                },
                {
                    "Track_id": "tra.245806622",
                    "Track_name": "I Fall Apart",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/5/2/4/4/8/2070184425.mp3",
                    "Album_id": "alb.243984585",
                    "Album_name": "24K Magic",
                    "Artist_id": "art.39801162",
                    "Artist_name": "Chris Stapleton"
                }
            ]
        });
        await wrapper.vm.$nextTick();
        const listItems = wrapper.findAll('.list-item');
        expect(listItems.length).toBe(2);

        expect(listItems.at(0).find('img').attributes().src).toBe('../../assets/music.png');
        expect(listItems.at(0).find('.details .title').text()).toBe('WAP (feat. Megan Thee Stallion)');
        expect(listItems.at(0).find('.details .subtitle').text()).toBe('California Sunrise by Billie Eilish');

        expect(listItems.at(1).find('img').attributes().src).toBe('../../assets/music.png');
        expect(listItems.at(1).find('.details .title').text()).toBe('I Fall Apart');
        expect(listItems.at(1).find('.details .subtitle').text()).toBe('24K Magic by Chris Stapleton');
    })
});