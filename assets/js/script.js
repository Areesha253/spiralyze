// const getUsersTemplate = (name, description) => `
//   <div class="item">
//     <div class="row">
//       <div class="col-4">
//         <img src="dist/img/testimonial-1.png" class="testimonial-img" alt="" />
//       </div>
//       <div class="col-12 col-sm-8">
//         <div class="testimonial-card">
//           <h4>${name}</h4>
//           <h5>${description}</h5>
//         </div>
//       </div>
//     </div>
//   </div>`;
$(".testimonial-carousel").owlCarousel({
  items: 1,
  nav: true,
  loop: true,
  navText: ['<a href="javascript:void(0)"><span class="arrow-left"></span></a>', '<a href="javascript:void(0)"><span class="arrow-right"></span></a>'],
  dots: true,
});
Fancybox.bind("[data-fancybox]", {});

$("#contact-form").on("submit", function (e) {
  e.preventDefault();

  $(".empty-field-warning").hide();
  $(".input-field").removeClass("error");

  let formValid = true;

  $(".data-input").each(function () {
    const value = $(this).val();

    if (!value) {
      formValid = false;
      $(this).siblings(".empty-field-warning").show();
      $(this).closest(".input-field").addClass("error");
      $(this).trigger("focus");
      return false;
    }
  });

  if (formValid) {
    $(".data-input").val("");
  }
});

$(".data-input").on("input", function () {
  if ($(this).val()) {
    $(this).siblings(".empty-field-warning").hide();
    $(this).closest(".input-field").removeClass("error");
  }
});

// async function getUsers() {
//   const usersApiUrl = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   console.log(users.name);
//   const usersHtmlArr = users.map((user) => getUsersTemplate(user.name, user.company.catchPhrase)).join(" ");
//   $(".testimonial-carousel").html(usersHtmlArr);

//   testimonialCarousel();
// }
