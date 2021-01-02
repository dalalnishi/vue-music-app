<template>
  <div class="container">
      <h1>Liked Tracks</h1>
      <hr />
      <div @click="goBack" class="icon mb-3 mt-3">
          <a-icon type="home" title="Back"/>
      </div>
    <a-list item-layout="vertical" :data-source="likes" :pagination="pagination">
        <div slot="footer"><b>Entertainment App 2020</b></div>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
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
            likes: [],
            pagination: {
                pageSize: 3,
            },
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
        color: cornflowerblue;
    }
</style>