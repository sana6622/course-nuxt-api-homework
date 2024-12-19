import { format } from 'date-fns';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('formatDate', {
    mounted(el, binding) {
      formatDate(el, binding);
    },
    updated(el, binding) {
      formatDate(el, binding);
    },
  });

  // 格式化日期的邏輯
  const formatDate = (el, binding) => {
    try {
      const formattedDate = format(new Date(binding.value), 'yyyy/MM/dd');
      el.innerText = formattedDate; // 將格式化後的日期設置為元素內容
    } catch (error) {
      console.error('Invalid date format:', binding.value);
      el.innerText = 'Invalid Date'; // 處理無效日期
    }
  };

})
