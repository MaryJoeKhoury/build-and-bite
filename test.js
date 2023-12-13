const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  // centeredSlides: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const submitForm = () => {
  const form = document.getElementById("bookingForm");
  const formData = new FormData(form);

  const postData = {};
  formData.forEach((value, key) => {
    postData[key] = value;
  });

  if (
    !postData.name ||
    !postData.email ||
    !postData.city ||
    !postData.phone ||
    !postData.time
  ) {
    return Swal.fire({
      title: `Oops...`,
      text: "All fields are required!",
      icon: "error",
    });
  }

  fetch("http://127.0.0.1:8090/api/collections/reservations/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Response:", data);
      Swal.fire({
        title: `Welcome ${data.name} to Build & Bite 🙌!`,
        text: "Your table has been reserved 🤩!",
        icon: "success",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
