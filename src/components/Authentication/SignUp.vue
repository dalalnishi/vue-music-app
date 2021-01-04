<template>
  <div>
    <div class="row w-100">
      <div class="col card">
        <b-form @submit="onSubmit" @reset="onReset" class="card-body">
          <b-form-group id="input-group-1" label="First Name:" label-for="input-fname">
            <b-form-input
              id="input-fname"
              v-model="form.fname"
              placeholder="First name"
              :class="{ 'is-invalid': submitted && $v.form.fname.$error }"
            ></b-form-input>
            <div v-if="submitted && $v.form.fname.$error" class="invalid-feedback">
              <span v-if="!$v.form.fname.required">First name is required</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-2" label="Last Name:" label-for="input-lname">
            <b-form-input
              id="input-lname"
              v-model="form.lname"
              placeholder="Last name"
              :class="{ 'is-invalid': submitted && $v.form.lname.$error }"
            ></b-form-input>
            <div v-if="submitted && $v.form.lname.$error" class="invalid-feedback">
              <span v-if="!$v.form.lname.required">Last name is required</span>
            </div>
          </b-form-group>

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
              :class="{ 'is-invalid': submitted && $v.form.email.$error }"
            ></b-form-input>
            <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
              <span v-if="!$v.form.email.required">Email is required</span>
              <span v-if="!$v.form.email.email">Email is invalid</span>
            </div>
          </b-form-group>

          <b-form-group id="input-group-4" label="Your Password:" label-for="input-pwd">
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

          <b-form-group id="input-group-5" label="Confirm Password:" label-for="input-cpwd">
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

          <b-form-group label="Gender:" v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="form.gender" :aria-describedby="ariaDescribedby" name="gender" value="male">Male</b-form-radio>
            <b-form-radio v-model="form.gender" :aria-describedby="ariaDescribedby" name="gender" value="female">Female</b-form-radio>
          </b-form-group>

          <div class="card-footer text-muted px-0">
            <b-button type="submit" variant="primary" class="mr-3">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-link @click="redirectToLogin" class="log-link">Already registered? Log-In</b-link>
          </div>
        </b-form>
      </div>
      <div class="col">
        <center>
          <img src="../../assets/music.png" style="height: 100vh;"/>
        </center>
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
  .log-link {
    float: right !important;
  }
</style>