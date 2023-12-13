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
  // lform houwe kl shi input bl bookingForm
  const formData = new FormData(form);
  // ldata henne name email phone city.. mtl lstructure bi c++

  const postData = {};
  formData.forEach((value, key) => {
    postData[key] = value;
  });

  // 7attein la kl item (struct) key w value lvalue hiye name email...

  // hon 7atteit condition eza in case kn we7de mennoun fade=>alert opps
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

  // fetch hiye ma7al ma ra7 yetsajalo lma3loumet
  fetch("http://127.0.0.1:8090/api/collections/reservations/records", {
    method: "POST",
    // post y3ne 3am eb3at 3al backend database
    headers: {
      "Content-Type": "application/json",
    },
    // json houwe kif 3am birou7 shakl hal data 3al backend
    body: JSON.stringify(postData),
  })
    .then((response) => response.json())
    // bas tousal ldata 3al backend 7a yred response enno woslo ldata henne lossas li ra7it 3al backend mtl name balala
    .then((data) => {
      console.log("Response:", data);
      // han bshouf bl inspect ldata li nba3atit w bired bi alert ahlan wa sahlan
      Swal.fire({
        title: `Welcome ${data.name} to Build & Bite 🙌!`,
        text: "Your table has been reserved 🤩!",
        icon: "success",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // hon fi 7al tawal lresponse aw fa2a3 w ma wosil then byenrad error
};
