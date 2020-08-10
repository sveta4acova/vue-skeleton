<template lang="pug">
  layout-form(:wait="$store.state.session.wait")
    template(v-slot:header)
      h2 Log in
    template(v-slot:content)
      form-group(
        :type="'email'"
        :modifiers="'mb'"
        :label="'Email'"
        :value="$v.email"
        v-model="$v.email.$model"
        :errorMessages="errorMessages.email"
        :error="$v.email")
      form-group(
        :type="'password'"
        :modifiers="'mb'"
        :label="'Password'"
        :value="$v.password"
        :errorMessages="errorMessages.password"
        :error="$v.password"
        v-model="$v.password.$model")
      error(v-if="$store.state.session.errors" :data="$store.state.session.errors")
    template(v-slot:footer)
      v-button(@click="onSubmit" :disabled="disabledSubmitBtn") Log in
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators';
  // TODO
  import FormGroup from '@components/elements/FormGroup/index.vue';
  import { Button, LayoutForm, Error } from '@components';
  import { getValidateMessages } from '@utils';

  export default {
    components: {
      'layout-form': LayoutForm,
      'form-group': FormGroup,
      'v-button': Button,
      'error': Error,
    },
    data() {
      return {
        email: 'test@gmail.com',
        password: '123456',
      };
    },
    computed: {
      errorMessages() {
        return {
          email: getValidateMessages('email'),
          password: getValidateMessages('password'),
          common: getValidateMessages('common'),
        };
      },
      disabledSubmitBtn() {
        return !!(this.$v.password.$error || this.$v.email.$error) || !this.email || !this.password;
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault();
        this.$store.dispatch('session/login', {
          email: this.email,
          password: this.password,
        }).then(() => this.$router.push('/'));
      }
    },
    validations: {
      email: {
        required,
        email,
      },
      password: {
        required,
      }
    }
  };
</script>
