<template>
  <div class="bg-login">
    <div class="d-flex justify-content-center h-100 align-items-center">
      <div class="card">
        <div class="d-flex justify-content-center my-3 color-primary">
          <p class="h1 mb-0"><b-icon icon="person-circle"></b-icon></p>
        </div>
        <b-form @submit="onSubmit" @reset="onReset" class="card-body">
          <div class="d-flex">
            <b-form-group  class="w-50 mr-3" id="input-group-1" label="First Name:" label-for="input-fname">
              <b-form-input
                id="input-fname"
                v-model="form.fname"
                placeholder="First name"
                autocomplete="off"
                :class="{ 'is-invalid': submitted && $v.form.fname.$error }"
              ></b-form-input>
              <div v-if="submitted && $v.form.fname.$error" class="invalid-feedback">
                <span v-if="!$v.form.fname.required">First name is required</span>
              </div>
            </b-form-group>

            <b-form-group class="w-50" id="input-group-2" label="Last Name:" label-for="input-lname">
              <b-form-input
                id="input-lname"
                v-model="form.lname"
                placeholder="Last name"
                autocomplete="off"
                :class="{ 'is-invalid': submitted && $v.form.lname.$error }"
              ></b-form-input>
              <div v-if="submitted && $v.form.lname.$error" class="invalid-feedback">
                <span v-if="!$v.form.lname.required">Last name is required</span>
              </div>
            </b-form-group>
          </div>
          <b-form-group
            id="input-group-3"
            label="Email address:"
            label-for="input-email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              autocomplete="off"
              :class="{ 'is-invalid': submitted && $v.form.email.$error }"
            ></b-form-input>
            <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
              <span v-if="!$v.form.email.required">Email is required</span>
              <span v-if="!$v.form.email.email">Email is invalid</span>
            </div>
          </b-form-group>
          <div class="d-flex">
            <b-form-group class="w-50 mr-3" id="input-group-4" label="Your Password:" label-for="input-pwd">
              <b-form-input
                id="input-pwd"
                type="password"
                v-model="form.password"
                placeholder="Enter Password"
                :class="{ 'is-invalid': submitted && $v.form.password.$error }"
              ></b-form-input>
              <div v-if="submitted && $v.form.password.$error" class="invalid-feedback">
                <span v-if="!$v.form.password.required">Password is required</span>
                <span v-if="!$v.form.password.minLength">Password must be of at least 6 characters</span>
              </div>
            </b-form-group>

            <b-form-group class="w-50" id="input-group-5" label="Confirm Password:" label-for="input-cpwd">
              <b-form-input
                id="input-cpwd"
                type="password"
                v-model="form.confirmPassword"
                placeholder="Confirm Password"
                :class="{ 'is-invalid': submitted && $v.form.confirmPassword.$error }"
              ></b-form-input>
              <div v-if="submitted && $v.form.confirmPassword.$error" class="invalid-feedback">
                <span v-if="!$v.form.confirmPassword.required">Confirmation Password is required</span>
                <span v-if="!$v.form.confirmPassword.sameAsPassword">Confirm Password and Password must match</span>
              </div>
            </b-form-group>
          </div>
          <b-form-group plain label="Gender:" v-slot="{ ariaDescribedby }" class="d-flex">
            <b-form-radio-group name="plain-inline" plain v-model="form.gender">
              <b-form-radio v-model="form.gender" :aria-describedby="ariaDescribedby" name="gender" value="male">Male</b-form-radio>
              <b-form-radio v-model="form.gender" :aria-describedby="ariaDescribedby" name="gender" value="female">Female</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <div class="d-flex fav-btn">
            <b-button variant="primary" type="submit" 
              class="w-50 mr-3 like-icon d-flex align-items-center justify-content-center">
              <span>Submit</span>
            </b-button>
            <b-button type="reset" variant="outline-info" class="w-50">Reset</b-button>
          </div>
        </b-form>
        <div class="card-footer text-muted px-0 d-flex justify-content-center">
          <span class="mr-2">Already registered?</span> 
          <b-link @click="redirectToLogin" class="color-primary">Log-In</b-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        form: {
          email: '',
          fname: '',
          lname: '',
          password: '',
          confirmPassword: '',
          gender: 'female'
        },
        submitted: false
      }
    },
    validations: {
      form: {
        email: {
          required, email
        },
        fname: { required },
        lname: { required },
        password: {
          required, minLength: minLength(6)
        },
        confirmPassword: {
          required, sameAsPassword: sameAs('password')
        }
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.submitted = true;
        
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        const user = {
            'firstName': this.form.fname,
            'lastName': this.form.lname,
            'email': this.form.email,
            'password': this.form.password,
            'gender': this.form.gender
        }
        this.$store.dispatch('registerUser', user).then(() => {
          let newUser = {
            email: user.email,
            password: user.password
          }
          this.$store.dispatch('loginUser', newUser).then(() => {
            this.$router.push('/dashboard');
          })
          .catch((err) => {
            console.log(err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = '';
        this.form.fname = '';
        this.form.lname = '';
        this.form.password = '';
        this.form.confirmPassword = '';
        this.form.gender = 'female';
      },
      redirectToLogin() {
        this.$router.push('/');
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
  .color-primary {
    color:  #483d8b;
  }
  .fav-btn .btn-primary {
    color: #fff;
    background-color:  #483d8b;
    border-color: #483d8b;
  }
  .fav-btn .btn-primary:hover  {
    background-color: #393071;
  }
  .fav-btn .btn-outline-info {
    color: #483d8b;
    border-color: #483d8b;
  }
  .fav-btn .btn-outline-info:hover  {
    background-color:  #483d8b;
    color: white;
  }
  .card {
    width: 480px;
  }
</style>