<script>
export default {
  props: {
    contacts: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
    goToDetailBook(id) {
      this.$router.push({ name: "detailbook", params: { id } });
    },
  },
};
</script>
<template>
  <ul class="col-12 row mt-3">
    <li
      class="col-3 mb-5"
      v-for="(contact, index) in contacts"
      :key="contact._id"
      :class="{ active: index === activeIndex }"
      @click="
        updateActiveIndex(index);
        goToDetailBook(contact._id);
      "
    >
      <div class="book-container">
        <img class="img-book" :src="contact.img" alt="" srcset="" />
        <p class="title-book">{{ contact.title }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.book-container {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 16px;
  transition: transform linear 0.1s;
  will-change: transform;
}

.book-container:hover {
  transform: translateY(-8px);
}

.img-book {
  max-width: 100%;
  max-height: 100px;
  margin-top: 20px;
  border-radius: 10px;
}

.title-book {
  font-size: 18px;
  font-weight: 500;
  padding: 10px 4px 0 4px;
  text-align: center;
}
</style>
