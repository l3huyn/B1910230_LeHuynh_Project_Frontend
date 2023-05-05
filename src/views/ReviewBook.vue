<template>
  <div class="page row">
    <div class="col-md-12">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 ml-3 row">
      <h4 >
        Danh sách một số sách tiêu biểu
        <i class="fa-solid fa-book"></i>
      </h4>


    </div>
    <ContactList
      v-if="filteredContactsCount > 0"
      :contacts="filteredContacts"
      v-model:activeIndex="activeIndex"
    />
    <p v-else>Không có liên hệ nào.</p>
  </div>
</template>
<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import BookService from "@/services/book.service";
export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await BookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    goToAddContact() {
      this.$router.push({ name: "book.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
}

ul {
  list-style: none !important;
}
</style>
