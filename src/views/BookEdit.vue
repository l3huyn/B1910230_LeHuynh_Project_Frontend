<template>
  <div v-if="contact" class="page">
    <h3 class="text-center fw-bold">Chỉnh sửa thông tin sách</h3>
    <ContactForm
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue";
import BookService from "@/services/book.service";
export default {
  components: {
    ContactForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      contact: null,
      message: "",
    };
  },
  methods: {
    async getContact(id) {
      try {
        this.contact = await BookService.get(id);
        console.log(this.contact);
        if (
          typeof localStorage.getItem("account") != "undefined" &&
          $cookies.isKey("token") &&
          this.contact.idAuth == JSON.parse(localStorage.getItem("account"))._id
        ) {
        } else {
          this.$router.push({ name: "reviewbooks" });
        }
      } catch (error) {
        console.log(id);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateContact(data) {
      try {
        await BookService.update(this.contact._id, data);
        this.message = "Cập nhật thành công.";
        confirm(this.message);
        this.$router.push({ name: "reviewbooks" });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteContact() {
      if (confirm("Bạn muốn xóa cuốn sách này?")) {
        try {
          await BookService.delete(this.contact._id);
          this.$router.push({ name: "reviewbooks" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getContact(this.id);
    this.message = "";
  },
};
</script>
