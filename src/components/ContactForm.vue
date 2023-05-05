<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label class="edit-title" for="title">Tựa sách</label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="bookLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="edit-title" for="img">Link hình ảnh</label>
      <Field
        name="img"
        type="text"
        class="form-control"
        v-model="bookLocal.img"
      />
      <ErrorMessage name="img" class="error-feedback" />
      <img :src="bookLocal.img" width="100" alt="" srcset="">
    </div>
    <div class="form-group">
      <label class="edit-title" for="desc">Mô tả ngắn</label>
      <Field
        name="desc"
        type="text"
        class="form-control"
        v-model="bookLocal.desc"
      />
      <ErrorMessage name="desc" class="error-feedback" />
    </div>
    <div class="form-group">
      <label class="edit-title" for="content">Nội dung</label>
      <Field
        name="content"
        type="tel"
        class="form-control"
        v-model="bookLocal.content"
      />
      <ErrorMessage name="content" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="bookLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true },
  },
  data() {
    const contactFormSchema = yup.object().shape({
      // name: yup
      //   .string()
      //   .required("Tên phải có giá trị.")
      //   .min(2, "Tên phải ít nhất 2 ký tự.")
      //   .max(50, "Tên có nhiều nhất 50 ký tự."),
      // email: yup
      //   .string()
      //   .email("E-mail không đúng.")
      //   .max(50, "E-mail tối đa 50 ký tự."),
      // address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      // phone: yup
      //   .string()
      //   .matches(
      //     /((09|03|07|08|05)+([0-9]{8})\b)/g,
      //     "Số điện thoại không hợp lệ."
      //   ),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // bookLocal để liên kết với các input trên form
      bookLocal: this.contact,
      contactFormSchema,
    };
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.bookLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.bookLocal.id);
    },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";

.edit-title {
  font-weight: 600;
  font-size: 20px;
}
</style>
