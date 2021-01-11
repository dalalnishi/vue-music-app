<template>
  <div class="container">
    <!-- Search -->
    <div class="d-flex mb-3 mt-3">
        <div class="flex-fill mr-3 flex-grow-1">
            <b-form-input 
                placeholder="Search by Song, Album or Artist name" 
                v-model="searchText" 
                @input="debounceSearch"
                class="input-search">
            </b-form-input>
        </div>
        <div class="fav-btn">
            <b-button variant="outline-info" class="like-icon d-flex align-items-center" @click="userLikes" title="Favourites">
                <span class="mr-3">Favourites</span> <a-icon type="heart" />
            </b-button>
        </div>
    </div>

    <!-- Records List -->
    <div class="row">
        <template v-if="searchResult && searchResult.length">
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3 list" v-for="item in searchResult" :key="item.Track_id">
                <div class="w-100 flex-column list-main d-flex justify-content-center align-items-center">
                    <div class="list-img">
                        <img
                            slot="extra"
                            alt="logo"
                            src="../../assets/music-back.jpg"
                        />
                        </div> 
                        <div class="w-100 list-item mt-3">
                            <div class="w-100 d-flex justify-content-between">
                            <div class="d-flex flex-column detail">
                                <span class="title text-truncate">{{ item.Track_name }}</span>
                                <span class="subtitle mb-2 text-muted text-truncate">{{ item.Album_name }} by {{ item.Artist_name }}</span>
                            </div>
                            <span class="heart-icon d-flex justify-content-between" @click="likeUnlike(item)">
                                <b-icon class="heart-icon red" icon="heart-fill" v-if="item.like" aria-hidden="true"></b-icon>
                                <b-icon class="heart-icon" icon="heart" v-else aria-hidden="true"></b-icon>
                            </span>
                            </div>
                            <div class="w-100">
                                <audio controls class="w-100">
                                    <source :src="item.previewURL"/>
                                    Your browser does not support the audio tag.
                                </audio>
                            </div>
                        </div>
                    </div>
            </div>
        </template>
        <template v-else-if="tracks && tracks.length && searchText.length<3">
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3 list" v-for="track in tracks" :key="track.Track_id">
                <div class="w-100 flex-column list-main d-flex justify-content-center align-items-center">
                    <div class="list-img">
                        <img
                            slot="extra"
                            alt="logo"
                            src="../../assets/music-back.jpg"
                        />
                    </div> 
                    <div class="w-100 list-item mt-3">
                        <div class="w-100 d-flex justify-content-between">
                            <div class="d-flex flex-column detail">
                                <span class="title text-truncate">{{ track.Track_name }}</span>
                                <span class="subtitle mb-2 text-muted text-truncate">{{ track.Album_name }} by {{ track.Artist_name }}</span>
                            </div>
                            <span class="heart-icon d-flex justify-content-between" @click="likeUnlike(track)">
                                <b-icon class="heart-icon red" icon="heart-fill" v-if="track.like" aria-hidden="true"></b-icon>
                                <b-icon class="heart-icon" icon="heart" v-else aria-hidden="true"></b-icon>
                            </span>
                        </div>
                        <div class="w-100">
                            <audio controls class="w-100">
                                <source :src="track.previewURL"/>
                                Your browser does not support the audio tag.
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="no-found">
                <img class="w-100" src="../../assets/no-result.png" />
            </div>
        </template>
    </div>
  </div>
</template>

<script>
export default {
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
    mounted() {
        const context = this;
        this.$store.commit('clearData');
        window.addEventListener('scroll', function() {
            if(window.innerHeight + window.scrollY >= document.body.scrollHeight) {
                context.handleScroll();
            }
        });
        this.handleScroll();
    },
    watch: {
        searchText() {
            if(this.searchText === '') {
                this.searchResult = [];
            }
        }
    },
    // computed: {
    //     // Local search filter
    //     searchList() {
    //         if(this.searchText && this.searchText.length >= 3) {
    //             return this.tracks.filter((track) => {
    //                 return this.searchText.toLowerCase().split(' ').every(v => track.trackName.toLowerCase().includes(v) 
    //                     || track.name.toLowerCase().includes(v) || track.albumName.toLowerCase().includes(v));
    //             });
    //         }
    //         return this.tracks;
    //     },
    // },
    methods: {
        userLikes() {
            this.$router.push('/likes');
        },
        likeUnlike(track) {
            this.$store.dispatch('addUserFavourites', {
                user_id: localStorage.getItem('UserID'),
                track_id: track.Track_id
            }).then(() => {
                this.$store.commit('userLike', track);
            }).catch((err) => {
                console.log('Failed to add User favourite track: ' + err);
            });
        },
        handleScroll() {
            if(this.loadMore) {
                this.currentPage++;
                this.$store.dispatch('getAllTracks', {
                    currentPage: this.currentPage,
                    limit: this.limit 
                }).then((res) => {
                    if(res) {
                        if(res.length < this.limit) this.loadMore = false;
                        this.tracks = this.$store.state.MediaStore.tracks;
                    } else {
                        this.loadMore = false;
                    }
                }).catch((err) => {
                    console.log('Failed to load Track records: ' + err);
                });
            }
        },
        handleSearch() {
            if(this.searchText) {
                this.$store.dispatch('searchRecords', {
                    searchString: this.searchText
                }).then((res) => {
                    if(res) this.searchResult = this.$store.state.MediaStore.searchResult;
                }).catch((err) => {
                    console.log('Failed to load search records: ' + err);
                });
            }
        },
        debounceSearch() {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.handleSearch();
            }, 600)
        }
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>

<style scoped>
    .like-icon {
        cursor: pointer;
    }
    .icon-span {
        font-size: 20px;
    }
    .input-search {
        height: 38px;
        border-radius: 3rem;
        line-height: 38px;
        border-color: #e6e6e6;
    }
    .input-search:focus {
        outline: none;
        box-shadow: none;
    }
    .list-main {
        background: #fff;
        border-radius: 5px;
        padding: 16px;
    }
    .list-img {
        width: 100%;
        height: 200px;
    }
    .list-img img {
        object-fit: cover;
        height: 200px;
        width: 100%;
        border-radius: 5px 5px 0 0;
    }
    .list-item .title {
        font-size: 16px;
        color: #343a40;
        font-weight: 700;
    }
    .list-item .sub-title {
        font-size: 13px;
        color: #343a401a;
    }
    .detail {
        width: calc(100% - 40px);
    }
    .heart-icon {
        width: 40px;
        cursor: pointer;
    }
    .red {
        fill: red;
    }
    .no-found {
        height: 400px;
        width: 400px;
        margin: 0 auto;
    }
    .fav-btn .btn-outline-info {
        color: #483d8b;
        border-color: #483d8b;
    }
    .fav-btn .btn-outline-info:hover  {
        background-color:  #483d8b;
        color: white;
    }
    audio:focus {
        outline: none;
    }
</style>