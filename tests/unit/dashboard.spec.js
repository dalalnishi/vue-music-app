import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from "vuex";
import VueRouter from "vue-router";
import routes from '../../src/router/index';
import Dashboard from '@/components/Dashboard/Dashboard.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Antd from 'ant-design-vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
localVue.use(Antd);

let actions = {
    getAllTracks: jest.fn(),
    searchRecords: jest.fn(),
    addUserFavourites: jest.fn()
}

let mutations = {
    clearData: jest.fn()
}

const store = new Vuex.Store({
    state: {
        tracks: [],
        searchResult: []
    },
    actions,
    mutations
});

const router = new VueRouter({ routes });
localStorage.setItem('UserID', '123');

describe('Dashboard component', () => {
    it('should render all Tracks', async () => {
        let wrapper = mount(Dashboard, {
            data() {
                return {
                    tracks: [],
                    searchText: "",
                    limit: 8,
                    currentPage: 0,
                    loadMore: true,
                    searchResult: [],
                    debounce: null
                }
            }, 
            localVue, 
            store, 
            router 
        });
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find('.input-search').attributes().placeholder).toBe('Search by Song, Album or Artist name');
        expect(wrapper.find('.no-found').exists()).toBeTruthy();

        expect(actions.getAllTracks.mock.calls).toHaveLength(1);
        expect(actions.getAllTracks.mock.calls[0][1]).toEqual({ currentPage: 1, limit: 8 });

        wrapper.setData({ 
            tracks: 
            [
                {
                    "track_id": "tra.500478553",
                    "trackName": "WAP (feat. Megan Thee Stallion)",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/1/1/4/0/9/2180090411.mp3",
                    "album_id": "alb.230477459",
                    "createdAt": "2020-12-30T12:56:32.000Z",
                    "updatedAt": "2020-12-30T12:56:32.000Z",
                    "albumName": "California Sunrise",
                    "artist_id": "art.214281475",
                    "name": "Billie Eilish",
                    "like": true
                },
                {
                    "track_id": "tra.245806622",
                    "trackName": "I Fall Apart",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/5/2/4/4/8/2070184425.mp3",
                    "album_id": "alb.243984585",
                    "createdAt": "2020-12-30T12:56:32.000Z",
                    "updatedAt": "2020-12-30T12:56:32.000Z",
                    "albumName": "24K Magic",
                    "artist_id": "art.39801162",
                    "name": "Chris Stapleton"
                }
            ]
        });
        await wrapper.vm.$nextTick();

        const listWrapper = wrapper.findAll('.list');
        expect(listWrapper.length).toBe(2);

        expect(listWrapper.at(0).find('img').attributes().src).toBe('../../assets/music-back.jpg');
        expect(listWrapper.at(0).find('.detail .title').text()).toBe('WAP (feat. Megan Thee Stallion)');
        expect(listWrapper.at(0).find('.detail .subtitle').text()).toBe('California Sunrise by Billie Eilish');
        expect(listWrapper.at(0).find('.heart-icon .heart-icon').classes()).toContain('red');
        expect(listWrapper.at(0).find('source').attributes().src).toBe('https://listen.hs.llnwd.net/g3/prvw/1/1/4/0/9/2180090411.mp3');

        expect(listWrapper.at(1).find('img').attributes().src).toBe('../../assets/music-back.jpg');
        expect(listWrapper.at(1).find('.detail .title').text()).toBe('I Fall Apart');
        expect(listWrapper.at(1).find('.detail .subtitle').text()).toBe('24K Magic by Chris Stapleton');
        expect(listWrapper.at(1).find('.heart-icon .heart-icon').classes()).not.toContain('red');
        expect(listWrapper.at(1).find('source').attributes().src).toBe('https://listen.hs.llnwd.net/g3/prvw/5/2/4/4/8/2070184425.mp3');
    });

    it('should be able to like or unlike the Track', async () => {
        let wrapper = mount(Dashboard, {
            data() {
                return {
                    tracks: [],
                    searchText: "",
                    limit: 8,
                    currentPage: 0,
                    loadMore: true,
                    searchResult: [],
                    debounce: null
                }
            }, 
            localVue, 
            store, 
            router 
        });
        expect(wrapper.exists()).toBeTruthy();

        wrapper.setData({ 
            tracks: 
            [
                {
                    "track_id": "tra.500478553",
                    "trackName": "WAP (feat. Megan Thee Stallion)",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/1/1/4/0/9/2180090411.mp3",
                    "album_id": "alb.230477459",
                    "createdAt": "2020-12-30T12:56:32.000Z",
                    "updatedAt": "2020-12-30T12:56:32.000Z",
                    "albumName": "California Sunrise",
                    "artist_id": "art.214281475",
                    "name": "Billie Eilish",
                    "like": true
                },
                {
                    "track_id": "tra.245806622",
                    "trackName": "I Fall Apart",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/5/2/4/4/8/2070184425.mp3",
                    "album_id": "alb.243984585",
                    "createdAt": "2020-12-30T12:56:32.000Z",
                    "updatedAt": "2020-12-30T12:56:32.000Z",
                    "albumName": "24K Magic",
                    "artist_id": "art.39801162",
                    "name": "Chris Stapleton"
                }
            ]
        });
        await wrapper.vm.$nextTick();

        const listWrapper = wrapper.findAll('.list');
        expect(listWrapper.length).toBe(2);

        listWrapper.at(0).find('.heart-icon').trigger('click');
        expect(actions.addUserFavourites.mock.calls).toHaveLength(1);
        expect(actions.addUserFavourites.mock.calls[0][1]).toEqual({ User_id: '123', Track_id: 'tra.500478553' });

        await wrapper.vm.$nextTick();
        wrapper.setData({ 
            tracks: 
            [
                {
                    "track_id": "tra.500478553",
                    "trackName": "WAP (feat. Megan Thee Stallion)",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/1/1/4/0/9/2180090411.mp3",
                    "album_id": "alb.230477459",
                    "createdAt": "2020-12-30T12:56:32.000Z",
                    "updatedAt": "2020-12-30T12:56:32.000Z",
                    "albumName": "California Sunrise",
                    "artist_id": "art.214281475",
                    "name": "Billie Eilish",
                    "like": false
                },
                {
                    "track_id": "tra.245806622",
                    "trackName": "I Fall Apart",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/5/2/4/4/8/2070184425.mp3",
                    "album_id": "alb.243984585",
                    "createdAt": "2020-12-30T12:56:32.000Z",
                    "updatedAt": "2020-12-30T12:56:32.000Z",
                    "albumName": "24K Magic",
                    "artist_id": "art.39801162",
                    "name": "Chris Stapleton"
                }
            ]
        });
        await wrapper.vm.$nextTick();
        expect(listWrapper.at(0).find('.heart-icon .heart-icon').classes()).not.toContain('red');
    });

    it('should be able to search Tracks', async () => {
        let wrapper = mount(Dashboard, {
            data() {
                return {
                    tracks: [],
                    searchText: "",
                    limit: 8,
                    currentPage: 0,
                    loadMore: true,
                    searchResult: [],
                    debounce: null
                }
            }, 
            localVue, 
            store, 
            router 
        });
        expect(wrapper.exists()).toBeTruthy();

        wrapper.find('.input-search').trigger('input');
        wrapper.setData({
            searchText: 'wap ',
            // debounce:  setTimeout(() => {
            //     wrapper.vm.handleSearch();
            // }, 600)
        });
        wrapper.vm.handleSearch();

        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();

        expect(actions.searchRecords.mock.calls).toHaveLength(1);
        expect(actions.searchRecords.mock.calls[0][1]).toEqual({ searchString: 'wap ' });

        await wrapper.vm.$nextTick();

        wrapper.setData({
            searchResult: [
                {
                    "track_id": "tra.500478553",
                    "trackName": "WAP (feat. Megan Thee Stallion)",
                    "previewURL": "https://listen.hs.llnwd.net/g3/prvw/1/1/4/0/9/2180090411.mp3",
                    "album_id": "alb.230477459",
                    "createdAt": "2020-12-30T12:56:32.000Z",
                    "updatedAt": "2020-12-30T12:56:32.000Z",
                    "albumName": "California Sunrise",
                    "artist_id": "art.214281475",
                    "name": "Billie Eilish",
                    "like": true
                }
            ]
        });
        await wrapper.vm.$nextTick();

        const listWrapper = wrapper.findAll('.list');
        expect(listWrapper.length).toBe(1);

        expect(listWrapper.at(0).find('img').attributes().src).toBe('../../assets/music-back.jpg');
        expect(listWrapper.at(0).find('.detail .title').text()).toBe('WAP (feat. Megan Thee Stallion)');
        expect(listWrapper.at(0).find('.detail .subtitle').text()).toBe('California Sunrise by Billie Eilish');
        expect(listWrapper.at(0).find('.heart-icon .heart-icon').classes()).toContain('red');
        expect(listWrapper.at(0).find('source').attributes().src).toBe('https://listen.hs.llnwd.net/g3/prvw/1/1/4/0/9/2180090411.mp3');
    });

    it('should redirect to User Favourite Tracks page', async () => {
        let wrapper = mount(Dashboard, {
            data() {
                return {
                    tracks: [],
                    searchText: "",
                    limit: 8,
                    currentPage: 0,
                    loadMore: true,
                    searchResult: [],
                    debounce: null
                }
            }, 
            localVue, 
            store, 
            router 
        });
        expect(wrapper.exists()).toBeTruthy();

        wrapper.find('.fav-btn button').trigger('click');
        await wrapper.vm.$nextTick();
        expect(router.currentRoute.path).toBe('/likes');
    });
});