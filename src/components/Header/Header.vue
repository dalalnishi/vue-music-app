<template>
    <div class="div-main" v-if="authenticated">
        <div>
            <router-link to="/dashboard" class="navbar-brand">
                <img alt="Play Logo" src="../../assets/music.png" class="img-logo ml-2"/>
                <font style="color: orange;"> Rhythm</font>
            </router-link>
            <ul>
                <!-- <li class="nav-item" :class="{active: $route.path.match('/')}">
                    <router-link to="/" tag="li" class="nav-link">Sign In</router-link>
                </li>
                <li class="nav-item" :class="{active: $route.path.match('/sign-up')}">
                    <router-link to="/sign-up" tag="li" class="nav-link">Signup</router-link>
                </li> -->
                <li class="nav-avatar">
                    <font style="color: orange;">Welcome </font>
                    <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">
                        {{ user }}
                    </a-avatar>
                </li>
                <li class="nav-item" @click="removeAuth">
                    <router-link to="" tag="li" class="nav-link">
                        <b-button variant="outline-info" class="mb-2">
                            <b-icon icon="power" aria-hidden="true"></b-icon> Logout
                        </b-button>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        authenticated() {
            return this.$store.state.AuthStore.token;
            // return localStorage.getItem('token');
        },
        user() {
            const userData = this.$store.state.AuthStore.userData;
            return userData !== null && userData.firstName.charAt(0) + ' ' + userData.lastName.charAt(0);
        }
    },
    methods: {
        removeAuth () {
            this.$store.commit('removeAuth');
            this.$router.push('/');
        },
    }
}
</script>

<style scoped>
    ul {
        float: right;
        color: white;
        list-style: none;
        display: inline-flex;
    }
    .nav-item li {
        color: orange !important;
        font-size: large !important;
    }
    .nav-link {
        cursor: pointer;
    }
    .div-main {
        background-color: darkslateblue;
    }
    .img-logo {
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
    .btn-outline-info {
        color: orange !important;
        border-color: orange !important;
        pointer-events: none !important;
    }
    .btn-outline-info :hover {
        background-color: orange !important;
    }
    .nav-avatar {
        padding: 15px;
    }
</style>