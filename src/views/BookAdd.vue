<template>
  <div v-if="contact" class="page">
    <h4>Thêm Review sach</h4>
    <ContactForm :contact="contact" @submit:contact="addContact" />
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

  data() {
    return {
      contact: {},
      message: "",
      dataBook:{}
    };
  },
  methods: {
    async addContact(data) {
      try {
        if(this.$cookies.isKey('token')) {
          data.token = this.$cookies.get('token')
          this.dataBook = await BookService.create(data);
          // console.log(this.dataBook);
          this.$router.push({name: 'reviewbooks'});
        }
        // this.message = "Liên hệ được tạo thành công";
      } catch (error) {
        console.log(error);
      }
    },

    denyAccess() {
      if (
        typeof localStorage.getItem("account") != "undefined" &&
        $cookies.isKey("token")
      ) {
      } else {
        this.$router.push({ name: "reviewbooks" });
        
      }
    },
  },
  mounted() {
    this.denyAccess()
  }
};
</script>