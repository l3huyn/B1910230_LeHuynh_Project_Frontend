<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>
<template>
  <div>
    <div class="p-1">
      <strong>tieu de:</strong>
      {{ contact.title }}
    </div>
    <div class="p-1">
      <strong>anh bia:</strong>
      <img width="300" :src="contact.img" alt="">

    </div>
    <div class="p-1">
      <strong>mo ta:</strong>
      {{ contact.desc }}
    </div>
    <div class="p-1">
      <strong>content:</strong>
      {{ contact.content }}
    </div>

  </div>
</template>
