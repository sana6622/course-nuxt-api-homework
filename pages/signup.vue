<script setup>
definePageMeta({
  layout: "account-layout",
});


const config = useRuntimeConfig();
const baseURL= config.public.apiBaseURL;
const { $swal } = useNuxtApp();

const route = useRoute();
const router = useRouter();


const signupFormData = ref({
  email: "",
  password: "",
  name: "",
  phone:"",
  address: {
    city: "",
    district: "",
    detail: "",
  },
  birthday: {
    year: "",
    month: "",
    day: "",
  },
});
const checkPassword =ref('')
const agreement = ref(false)


import { Icon } from "@iconify/vue";
const { cityArea } = useCity();

const isEmailAndPasswordValid = ref(false);

const samePassword = () => { 
 if(signupFormData.value.password === checkPassword.value){
  return true
 }else {
  return false
 }
}

const nextStep = () => {
  const checkout = samePassword()
  if(signupFormData.email !="" && checkout == true){
    isEmailAndPasswordValid.value = true
  } else(
      $swal.fire({
      title: '資料填寫不正確，請確認',    
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: '是',
   })
  )  
}

const submitSignupForm = () => {
  // 整理出生日為 yyyy-MM-dd 格式
  const { year, month, day } = signupFormData.value.birthday;
  console.log('signupFormData.value.birthday',signupFormData.value.birthday)
  console.log(year, month, day)
    // 如果任何一項未填寫，返回提示
    if (!year || !month || !day) {
    $swal.fire({
      title: "資料不完整",
      text: "請完整選擇生日資料",
      icon: "error",
      confirmButtonText: "確定",
    });
    return;
  }

  const formattedbirthday = `${year+1958}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;

  // 整理資料
  const data = {
    ...signupFormData.value,
    birthday: formattedbirthday,
    address: {
      zipcode:802,
      detail:`${signupFormData.value.address.detail}`
    },
  };

  // 呼叫 API
  createUserAccount(data);
};



const createUserAccount = async(data) => {
  console.log('data',data)
  console.log('agreement',agreement.value)
  if(!agreement.value){
    await $swal.fire({
      title: "錯誤",
      text: "請勾選同意條款後再進行註冊。",
      icon: "error",
      confirmButtonText: "確定",
    });
    return;
    
  }

   try{
    const res = await $fetch("api/v1/user/signup", {
      method: "POST",
      baseURL: config.public.apiBaseURL, 
      body:data,
    })
    console.log('res',res); 
    // 使用 SweetAlert2 顯示註冊成功的提示
    await $swal.fire({
      title: "註冊成功！",
      text: "您的帳戶已創建成功，請立即登入！",
      icon: "success",
      confirmButtonText: "確定",
    });
    router.push("/login");    

   }catch(error) {
    console.log('error',error);
      const { message } = error.response._data;
      // message 有陣列 [] 和字串 "" 兩種回應格式
      if (Array.isArray(message)) {
      await $swal.fire({
        title: "註冊失敗",
        text: message.join("、"), // 以「、」分隔訊息
        icon: "error",
        confirmButtonText: "確定",
      });
    } else {
      await $swal.fire({
        title: "註冊失敗",
        text: message || "發生未知錯誤，請稍後再試。",
        icon: "error",
        confirmButtonText: "確定",
      });
    }
   }finally{
    signupFormData.value = {}; // 清空註冊表單
    agreement.value = false; // 解鎖按鈕
   }
  }

const selectCity = ref("");
const filterAreas = ref([]);

const updateAreas = () => {
  filterAreas.value = selectCity.value.areas;

  console.log("filterArea", filterArea);
};
</script>

<template>
  <div class="p-5 px-md-0 py-md-30">
    <div class="mb-10">
      <p class="mb-2 text-primary-100 fs-8 fs-md-7 fw-bold">
        享樂酒店，誠摯歡迎
      </p>
      <h1 class="mb-4 text-neutral-0 fw-bold">立即註冊</h1>

      <div class="d-flex align-items-center py-4 gap-2">
        <div class="d-flex flex-column align-items-center gap-1 text-neutral-0">
          <span
            :class="{ 'd-none': isEmailAndPasswordValid }"
            class="step p-2 bg-primary-100 rounded-circle"
            >1</span
          >
          <Icon
            :class="{ 'd-none': !isEmailAndPasswordValid }"
            class="p-2 fs-3 bg-primary-100 rounded-circle"
            icon="material-symbols:check"
          />
          <p class="mb-0 fs-8 fs-md-7 fw-bold">輸入信箱及密碼</p>
        </div>

        <hr class="flex-grow-1 my-0 border border-neutral-60 opacity-100" />

        <div
          :class="{
            'text-neutral-0': isEmailAndPasswordValid,
            'text-neutral-60': !isEmailAndPasswordValid,
          }"
          class="d-flex flex-column align-items-center gap-1"
        >
          <span
            :class="{
              'bg-primary-100': isEmailAndPasswordValid,
              'bg-transparent border border-neutral-60':
                !isEmailAndPasswordValid,
            }"
            class="step p-2 rounded-circle"
            >2</span
          >
          <p class="mb-0 fs-8 fs-md-7 fw-bold">填寫基本資料</p>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <form :class="{ 'd-none': isEmailAndPasswordValid }" class="mb-4" @submit.prevent="createAccount(registrationFormData)">
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="email">
            電子信箱
          </label>
          <input
            id="email"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="hello@exsample.com"
            type="email"
            v-model="signupFormData.email"
          />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="password">
            密碼
          </label>
          <input
            id="password"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="請輸入密碼"
            type="password"
            v-model="signupFormData.password"
          />
        </div>
        <div class="mb-10 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="confirmPassword">
            確認密碼
          </label>
          <input
            id="confirmPassword"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40"
            placeholder="請再輸入一次密碼"
            type="password"
            v-model="checkPassword"
          />
        </div>
        <button
          class="btn btn-neutral-40 w-100 py-4 text-neutral-60 fw-bold"
          type="button"
          @click="nextStep"
        >
          下一步
        </button>
      </form>
      <form :class="{ 'd-none': !isEmailAndPasswordValid }" class="mb-4">
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="name"> 姓名 </label>
          <input
            id="name"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 rounded-3"
            placeholder="請輸入姓名"
            type="text"
            v-model ="signupFormData.name"
          />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="phone">
            手機號碼
          </label>
          <input
            id="phone"
            class="form-control p-4 text-neutral-100 fw-medium border-neutral-40 rounded-3"
            placeholder="請輸入手機號碼"
            type="tel"
            v-model="signupFormData.phone"
          />
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="mb-2 text-neutral-0 fw-bold" for="birth"> 生日 </label>
          <div class="d-flex gap-2">
            <select
              id="birth"
              class="form-select p-4 text-neutral-80 fw-medium rounded-3"
               v-model="signupFormData.birthday.year"
            >
              <option
                v-for="year in 65"
                :key="year"
                :value= "year"
              >
                {{ year + 1958 }} 年
              </option>
            </select>
            <select class="form-select p-4 text-neutral-80 fw-medium rounded-3" 
            v-model="signupFormData.birthday.month">
              <option v-for="month in 12" :key="month" :value=" month">
                {{ month }} 月
              </option>
            </select>
            <select class="form-select p-4 text-neutral-80 fw-medium rounded-3"  
            v-model="signupFormData.birthday.day">
              <option v-for="day in 30" :key="day" :value="day">
                {{ day }} 日
              </option>
            </select>
          </div>
        </div>
        <div class="mb-4 fs-8 fs-md-7">
          <label class="form-label text-neutral-0 fw-bold" for="address">
            地址
          </label>
          <div>
            <div class="d-flex gap-2 mb-2">
              <select
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"    
                v-model="selectCity"
                @change="updateAreas"
              >
                <option :value="city" v-for="city in cityArea" :key="city">
                  {{ city.city }}
                </option>
              </select>
              <select
                class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                v-model="signupFormData.address.district"
              >
                <option
                  :value="area"
                  v-for="itemArea in filterAreas"
                  :key="itemArea"
                >
                  {{ itemArea.area }}
                </option>
              </select>
            </div>
            <input
              id="address"
              type="text"
              class="form-control p-4 rounded-3"
              placeholder="請輸入詳細地址"
             v-model="signupFormData.address.detail"
            />
          </div>
        </div>

        <div
          class="form-check d-flex align-items-end gap-2 mb-10 text-neutral-0"
        >
          <input
            id="agreementCheck"
            class="form-check-input"
            type="checkbox"
            v-model="agreement"
          />
          <label class="form-check-label fw-bold" for="agreementCheck">
            我已閱讀並同意本網站個資使用規範
          </label>
        </div>
        <button
          class="btn btn-primary-100 w-100 py-4 text-neutral-0 fw-bold"
          type="button"
          @click="submitSignupForm"
        >
          完成註冊
        </button>
      </form>
    </div>

    <p class="mb-0 fs-8 fs-md-7">
      <span class="me-2 text-neutral-0 fw-medium">已經有會員了嗎？</span>
      <RouterLink
        to="login"
        class="text-primary-100 fw-bold text-decoration-underline bg-transparent border-0"
      >
        <span>立即登入</span>
      </RouterLink>
    </p>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);

input[type="password"] {
  font: small-caption;
  font-size: 1.5rem;
}

input::placeholder {
  color: #909090;
  font-size: 1rem;
  font-weight: 500;

  @include media-breakpoint-down(md) {
    font-size: 14px;
  }
}

.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
}

.form-check-input:checked {
  background-color: #bf9d7d;
  border-color: #bf9d7d;
}

.step {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
}
</style>
