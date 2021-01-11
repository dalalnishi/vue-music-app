<template>
  <div class="bg-login">
    <div class="d-flex justify-content-center h-100 align-items-center">
      <div class="card">
        <div class="d-flex justify-content-center my-3 color-primary">
          <p class="h1 mb-0"><b-icon icon="person-circle"></b-icon></p>
        </div>
        <b-form @submit="onLogin" class="card-body d-flex justify-content-center flex-column">
          <b-form-group
            id="input-group-3"
            label="Email address:"
            label-for="input-email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-email"
              v-model="email"
              type="email"
              placeholder="Enter email"
              autocomplete="off"
              :class="{ 'is-invalid': submitted && $v.email.$error }"
            ></b-form-input>
            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
              <span v-if="!$v.email.required">Email is required</span>
              <span v-if="!$v.email.email">Email is invalid</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-4" label="Your Password:" label-for="input-pwd">
            <b-form-input
              id="input-pwd"
              type="password"
              v-model="password"
              placeholder="Enter Password"
              :class="{ 'is-invalid': submitted && $v.password.$error }"
            ></b-form-input>
            <div v-if="submitted && $v.password.$error" class="invalid-feedback">
              <span v-if="!$v.password.required">Password is required</span>
              <span v-if="!$v.password.minLength">Password must be of at least 6 characters</span>
            </div>
          </b-form-group>
          <div class="fav-btn">
            <b-button variant="primary" type="submit" 
              class="w-100 like-icon d-flex align-items-center justify-content-center">
              <span>Login</span>
            </b-button>
          </div>
        </b-form>
        <div class="card-footer text-muted px-0 d-flex justify-content-center">
          <span class="mr-2">Not a Member? </span>
          <b-link @click="redirectToSignUp" class="color-primary">Create an Account</b-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        email: '',
        password: '',
        submitted: false
      }
    },
    validations: {
      email: {
        required, email
      },
      password: {
        required, minLength: minLength(6)
      }
    },
    methods: {
      onLogin(event) {
        event.preventDefault();
        this.submitted = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        const user = {
            'email': this.email,
            'password': this.password
        }
        this.$store.dispatch('loginUser', user).then((res) => {
          if(res && res.error) {
            console.log(res.message);
          } else {
            this.redirectToDashboard();
          }
        })
        .catch((err) => {
            console.log(err);
        });
      },
      redirectToSignUp() {
        this.$router.push('/sign-up');
      },
      redirectToDashboard() {
          this.$router.push('/dashboard');
      }
    }
  }
</script>

<style scoped>
  .bg-login {
    background: url('../../assets/bg-4.jpg');
    overflow: auto;
    background-attachment: fixed;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
  }
  .fav-btn .btn-primary {
    color: #fff;
    background-color:  #483d8b;
    border-color: #483d8b;
  }
  .fav-btn .btn-primary:hover  {
    background-color: #393071;
  }
  .color-primary {
    color:  #483d8b;
  }
  .card {
    width: 400px;
  }
</style>