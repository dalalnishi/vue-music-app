<template>
  <div class="container">
    <div class="mt-3 d-flex justify-content-between align-items-center">
        <span class="track-title">Liked Tracks</span>
        <div @click="goBack" class="d-flex align-items-center icon">
            <a-icon type="home" title="Back"/>
        </div>
    </div>
    <hr/>
    <template v-if="likes && likes.length">
        <div class="bg-white list-item d-flex mb-3 align-items-center" v-for="like in likes" :key="like.Track_id">
            <img
                slot="extra"
                width="40"
                height="40"
                alt="logo"
                src="../../assets/music.png" class="mr-3"
            />
            <div class="details">
                <div class="title text-truncate">{{ like.Track_name }}</div>
                <div class="subtitle mb-2 text-muted text-truncate">{{ like.Album_name }} by {{ like.Artist_name }}</div>
            </div>
            <audio controls>
                <source :src="like.previewURL"/>
                Your browser does not support the audio tag.
            </audio>
        </div>
    </template>
    <template v-else>
        <div>
            <div class="no-found">
                <img class="w-100" src="../../assets/no-result.png" />
            </div>
        </div>
    </template>
  </div>
</template>

<script>
export default {
    data() {
        return {
            likes: [],
        }
    },
    mounted() {
        let UserId = localStorage.getItem('UserID');
        this.$store.dispatch('getUserFavourites', UserId).then((res) => {
            this.likes = res;
        }).catch((err) => {
            console.log('Failed to load User likes records: ' + err);
        });
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
    .icon {
        cursor: pointer;
        font-size: 18px;
    }
    .icon :hover {
        color:#483d8b;
    }
    .track-title {
        font-size: 16px;
        color: #343a40;
        font-weight: 700;
    }
    .list-item {
        padding: 10px;
        box-shadow: 0px 3px 9px 1px rgba(0,0,0,0.2);
        border-radius: 5px;
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
    .details {
        width: calc(100% - 350px);
    }
    audio:focus {
        outline: none;
    }
</style>