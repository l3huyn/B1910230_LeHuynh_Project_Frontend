<script>
import BookService from "@/services/book.service";

export default {
  props: {
    id: { type: String, required: true}
  },
  data() {
    return {
      book: {},
      isAuthor: false
    }
  },
  methods: {
    async getBook(id) {
      try {
        this.book = await BookService.get(id)
        console.log(this.book);
          if(this.book && typeof localStorage.getItem('account') != 'undefined' && $cookies.isKey('token') && this.book.idAuth == JSON.parse(localStorage.getItem('account'))._id) {
            this.isAuthor = true
          }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getBook(this.id)
  }
};
</script>
<template>
  <div>
    <router-link v-if="isAuthor"
          :to="{
            name: 'book.edit',
            params: { id: id },
          }"
        >
          <span class="mt-2 badge badge-warning p-2">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>

    <div class="p-1 d-flex justify-content-center">
      <img class="img-detail-book"  :src="book.img" alt="">
    </div>
    <div class="p-1 text-center">
     <h2 class="mb-3 mt-3"><strong> {{ book.title }}</strong></h2>
    </div>
    <div class="p-1">
      <strong style="font-size: 20px;">Mô tả: </strong><br>
      <p class="desc">{{ book.desc }}</p>
    </div>
    <div class="p-1">
      <strong style="font-size: 20px;">Nội dung truyện:</strong> <br>
      <p class="desc">{{ book.content }}</p>
    </div>

  </div>
</template>

<style scoped>
  .img-detail-book {
    width: 400px;
  }

  .desc {
    font-size: 17px;
  }
</style>
