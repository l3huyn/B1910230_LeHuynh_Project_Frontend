<template>
  <nav class="navbar navbar-expand navbar-dark navbar-header ">
    <a href="/" class="navbar-brand">REVIEW BOOK</a>
    <div class="navbar-nav">
      <li class="nav-item d-flex">
        <router-link :to="{ name: 'reviewbooks' }" class="nav-link text-light">
          Sách
          <i class="fa-solid fa-book"></i>
        </router-link>
        <div v-if="checkLogin == true">
          <div class="btn-appheader">
            <button class="btn btn-user nav-link text-light">
              {{ this.account.username }}
            </button>
            <ul class="dropdown-appheader">
              <li class="dropdown-item" v-on:click="goToProfile()">Trang cá nhân</li>
              <li class="dropdown-item" v-on:click="logout()" >Đăng xuất</li>
            </ul>
          </div>
        </div>
        <router-link v-else :to="{ name: 'login' }" class="nav-link text-light">
          Đăng nhập
          <i class="fa-solid fa-user"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>
<script>
import { useStore } from "@/stores/use-store";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const store = useStore();
    return {
      ...storeToRefs(store),
    };
  },
  // data() {
  //   return {
  //     account: {},
  //     checkLogin: false,
  //   };
  // },
  methods: {
    getAccount() {
      if (
        typeof localStorage.getItem("account") !== "undefined" &&
        $cookies.isKey("token")
      ) {
        this.checkLogin = true;
        this.account = JSON.parse(localStorage.getItem("account"));
        console.log(this.account);
      }
    },
    async logout() {
      if (typeof localStorage.getItem("account") !== "undefined") {
        await localStorage.removeItem("account");
        this.checkLogin = false
      }
      if ($cookies.isKey("token")) {
        $cookies.remove("token");
        this.checkLogin = false

      }
    },

    goToProfile() {
      if (
        typeof localStorage.getItem("account") !== "undefined" &&
        $cookies.isKey("token")
      ) {
        const id = JSON.parse(localStorage.getItem("account"))._id
        this.$router.push({name: "profile", params: {id: id}})
      }
    }
  },
  mounted() {
    this.getAccount();
  },
};
</script>
<style scoped>
.navbar-header {
  background: linear-gradient(270deg, #3f5efb, #fc466b);
}

.btn-appheader {
  position: relative;
}

.dropdown-appheader {
  position: absolute;
  display: none;
  list-style: none;
  background-color: white;
  width: 200px;
  z-index: 1;
  right: -100px;
  padding: 8px 20px;
  margin: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 8px;
}

.dropdown-item {
  margin-bottom: 4px;
  padding: 0;
  transition: transform linear 0.1s;
  will-change: transform;
}

.dropdown-item:hover {
  transform: translateX(8px);
  background-color: white;
  color: #fc466b;
}

.btn-appheader:hover .dropdown-appheader {
  display: block;
}

.dropdown-appheader::after {
  content: "";
  display: block;
  position: absolute;
  /* background-color: #000; */
  width: 160px;
  right: 40px;
  top: -24px;
  height: 40px;
}
</style>
