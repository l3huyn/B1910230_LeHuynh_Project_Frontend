<template>
  <h2>Đăng nhập</h2>

  <Form @submit="signup" :validation-schema="accountFormSchema">
    <div class="form-group">
      <label for="username">Tên đăng nhập</label>
      <Field name="username" type="text" class="form-control" />
      <span class="error-feedback"> {{ dataAccount.wrongUsername }}</span>
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field name="password" type="password" class="form-control" />
      <span class="error-feedback"> {{ dataAccount.wrongPassword }}</span>
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Đăng nhập</button>
    </div>
    <router-link :to="{ name: 'signup' }" class="">
          Đăng ký
        </router-link>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "../services/account.service";
import { useStore } from "@/stores/use-store";
import { storeToRefs } from "pinia";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    return {
      ...storeToRefs(store),
    };
  },
  data() {
    const accountFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(6, "Tên phải ít nhất 6 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      password: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(8, "Tên phải ít nhất 8 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      dataAccount: {},
      localAccount: {},
      accountFormSchema,
      ErrorMessage: String,
    };
  },
  methods: {
    async signup(data) {

        this.localAccount.username = data.username;
        this.localAccount.password = data.password;
        // console.log(this.localAccount);
        this.dataAccount = await AccountService.login(this.localAccount);
        console.log(typeof this.dataAccount.data != "undefined");
        if (typeof this.dataAccount.data != "undefined") {
          const dataLocalStore = {}
          dataLocalStore._id = this.dataAccount.data._id
          dataLocalStore.username = this.dataAccount.data.username
          localStorage.setItem('account', JSON.stringify(dataLocalStore))
          useStore().onAccount(dataLocalStore)
          console.log(dataLocalStore);
          this.$router.push({name: 'reviewbooks'})
        }
    },

    denyAccess() {
      if(typeof localStorage.getItem('account') != 'undefined' && $cookies.isKey('token')) {
        this.$router.push({name: 'reviewbooks'})
      }
    }
  },
  mounted() {
    this.denyAccess()
  }
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
