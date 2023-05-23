import Swal from 'sweetalert2';

// function Toast() {
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  customClass: {
    content: 'text-white',
  },
  // didOpen: (toast) => {
  //   toast.addEventListener('mouseenter', Swal.stopTimer)
  // }
});
// }

export default Toast;
