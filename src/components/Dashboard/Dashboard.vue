<template>
  <div class="container">
    <!-- Search -->
    <b-container class="bv-example-row mb-3 mt-3">
        <b-row>
            <b-col cols="9">
                <a-input-search placeholder="Search by Song, Album or Artist name" v-model="searchText"/>
            </b-col>
            <b-col cols="3">
                <b-button variant="outline-info" class="mb-2 like-icon" @click="userLikes" title="Liked Tracks">
                    Liked Tracks <a-icon type="like-o" />
                </b-button>
            </b-col>
        </b-row>
    </b-container>

    <!-- Records List -->
    <a-list item-layout="vertical" :data-source="trackList" :pagination="pagination">
        <div slot="footer"><b>Entertainment App 2020</b></div>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <template v-for="{ type } in actions" slot="actions">
            <span :key="type" @click="likeUnlike(item)" class="icon-span">
                <a-icon :type="type" :class="{active: item.like}"/>
            </span>
        </template>
        <img
            slot="extra"
            width="100"
            height="100"
            alt="logo"
            src="../../assets/music.png"
        />
        <a-list-item-meta :description="'Album: ' + item.albumName + ' by ' + item.name">
            <a slot="title">{{ item.trackName }}</a>
        </a-list-item-meta>
        <audio controls>
            <source :src="item.previewURL"/>
            Your browser does not support the audio tag.
        </audio>
        </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tracks: [],
            actions: [
                { type: 'like-o' },
            ],
            pagination: {
                pageSize: 3,
            },
            searchText: ""
        }
    },
    mounted() {
        this.$store.dispatch('getAllTracks').then((res) => {
            this.tracks = res;
        }).catch((err) => {
            console.log('Failed to load Track records: ' + err);
        });
    },
    computed: {
        trackList() {
            if(this.searchText && this.searchText.length >= 3) {
                return this.tracks.filter((track) => {
                    return this.searchText.toLowerCase().split(' ').every(v => track.trackName.toLowerCase().includes(v) 
                        || track.name.toLowerCase().includes(v) || track.albumName.toLowerCase().includes(v));
                });
            }
            return this.tracks;
        }
    },
    methods: {
        userLikes() {
            this.$router.push('/likes');
        },
        likeUnlike(track) {
            this.$store.dispatch('addUserFavourites', {
                User_id: localStorage.getItem('UserID'),
                Track_id: track.track_id
            }).then(() => {
                // Updating object of an array
                var data = [...this.tracks];
                var index = data.findIndex(obj => obj.track_id === track.track_id);
                data[index].like = !data[index].like;                
                this.tracks = data;
            }).catch((err) => {
                console.log('Failed to load Track records: ' + err);
            });
        }
    }
}
</script>

<style scoped>
    .like-icon {
        cursor: pointer;
    }

    .active {
        /* color: cornflowerblue; */
        color: brown;
    }

    .icon-span {
        font-size: 20px;
    }
</style>