<template>
  <div>
      <div class="row w-100 h-100 mt-1">
        <div class="col">
          <center>
            <img src="../../assets/music.png" style="height: 500px;"/>
          </center>
        </div>
        <div class="card col">
          <b-form @submit="onLogin" class="card-body mt-5">
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
            <div class="card-footer text-muted">
              <b-button type="submit" variant="primary">Login</b-button>
              <b-link @click="redirectToSignUp" class="reg-link">New User? Sign Up</b-link>
            </div>
          </b-form>
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
        this.$store.dispatch('loginUser', user).then(() => {
            this.redirectToDashboard();
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
  .reg-link {
    float: right;
  }
</style>