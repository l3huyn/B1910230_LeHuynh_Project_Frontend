<template>
  <h2>Đăng ký</h2>
  <Form @submit="signup" :validation-schema="accountFormSchema">
    <div class="form-group">
      <label for="username">Tên đăng nhập</label>
      <Field name="username" type="text" class="form-control" />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field name="password" type="password" class="form-control" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="retypepassword">Nhập lại mật khẩu</label>
      <Field name="retypepassword" type="password" class="form-control" />
      <ErrorMessage name="retypepassword" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
    </div>
    <router-link :to="{ name: 'login' }" class=""> Đăng nhập </router-link>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AccountService from "../services/account.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const accountFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên đăng nhập phải có giá trị.")
        .min(6, "Tên đăng nhập phải ít nhất 6 ký tự.")
        .max(24, "Tên đăng nhập có nhiều nhất 24 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(8, "Mật khẩu phải ít nhất 8 ký tự.")
        .max(16, "Mật khẩu có nhiều nhất 16 ký tự."),
      retypepassword: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(8, "Mật khẩu phải ít nhất 8 ký tự.")
        .max(16, "Mật khẩu có nhiều nhất 16 ký tự."),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // contactLocal để liên kết với các input trên form
      account: {},
      localAccount: {},
      accountFormSchema,
      ErrorMessage: String,
    };
  },
  methods: {
    async signup(data) {
      if (data.password == data.retypepassword) {
        this.localAccount.username = data.username;
        this.localAccount.password = data.password;
        // console.log(this.localAccount);
        this.account = await AccountService.create(this.localAccount);
        console.log(this.account);
        if (this.account._id) {
          alert("Đăng ký thành công! Bắt đầu đăng nhập");
          this.$router.push({ name: "login" });
        }
      } else {
        this.ErrorMessage = "Mật khẩu không khớp";
        console.log(this.ErrorMessage);
      }
    },
    denyAccess() {
      if (
        typeof localStorage.getItem("account") != "undefined" &&
        $cookies.isKey("token")
      ) {
        this.$router.push({ name: "reviewbooks" });
      }
    },
  },
  mounted() {
    this.denyAccess();
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
