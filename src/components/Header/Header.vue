<template>
    <div class="div-main" v-if="authenticated">
        <div class="navbar d-flex justify-content-between align-items-center">
            <router-link to="/dashboard" class="d-flex align-items-center">
                <img alt="Play Logo" src="../../assets/music.png" class="img-logo mr-2" height="40" width="40"/>
                <font class="text-white font-large"> Rhythm</font>
            </router-link>
            <ul class="m-0">
                <!-- <li class="nav-item" :class="{active: $route.path.match('/')}">
                    <router-link to="/" tag="li" class="nav-link">Sign In</router-link>
                </li>
                <li class="nav-item" :class="{active: $route.path.match('/sign-up')}">
                    <router-link to="/sign-up" tag="li" class="nav-link">Signup</router-link>
                </li> -->
                <li class="nav-avatar d-flex align-items-center">
                    <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">
                        {{ user }}
                    </a-avatar>
                    <font class="ml-2">Welcome </font>
                </li>
                <li class="nav-link d-flex justify-content-center align-items-center" @click="removeAuth">
                    <router-link to="" tag="div">
                         <b-icon icon="power" aria-hidden="true"></b-icon>
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
    .font-large {
        font-size: 16px;
    }
    ul {
        color: white;
        display: inline-flex;
    }
    .nav-link {
        cursor: pointer;
    }
    .div-main {
        background-color: darkslateblue;
    }
    .img-logo {
        cursor: pointer;
    }
</style>