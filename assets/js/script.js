const getUsersTemplate = (name, description, img) => `
    <div class="item testimonial-item">
                <div class="row">
                  <div class="col-4">
                    <img src="${img}" class="testimonial-img" alt="" />
                  </div>
                  <div class="col-12 col-sm-8">
                    <div class="testimonial-card">
                      <h4>${name}</h4>
                      <h5> ${description}</h5>
                    </div>
                  </div>
                </div>
              </div>
`;

var initTestimonialsCarousel = () => {
  $(".testimonial-carousel").owlCarousel({
    items: 1,
    nav: true,
    loop: true,
    navText: ['<a href="javascript:void(0)"><span class="arrow-left"></span></a>', '<a href="javascript:void(0)"><span class="arrow-right"></span></a>'],
    dots: true,
  });
};
async function getUsers() {
  const usersApiUrl = "https://jsonplaceholder.typicode.com/users?_limit=3";
  const imgApiUrl = "https://randomuser.me/api/";

  $(".spinner-border").show();

  const users = await $.ajax({ url: usersApiUrl });

  const usersWithImages = await Promise.all(
    users.map(async (user) => {
      const imgResponse = await $.ajax({ url: imgApiUrl });
      const userImage = imgResponse.results[0].picture.large;
      return getUsersTemplate(user.name, user.company.catchPhrase, userImage);
    })
  );

  $(".testimonial-carousel").html(usersWithImages.join(" "));
  initTestimonialsCarousel();
  $(".spinner-border").hide();
}

getUsers();

$("#contact-form").on("submit", function (e) {
  e.preventDefault();

  $(".empty-field-warning").hide();
  $(".input-field").removeClass("error");

  let formValid = true,
    formData = {};

  $(".data-input").each(function () {
    var inputValue = $(this).val().trim();
    if (!inputValue) {
      formValid = false;
      $(this).siblings(".empty-field-warning").show();
      $(this).closest(".input-field").addClass("error");
      $(this).trigger("focus");
      return false;
    }
    formData[$(this).attr("name")] = $(this).val();
  });

  if (!formValid) return;

  $.ajax({
    url: "http://localhost:3000/formData",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(formData),
    success: () => {
      $(".data-input").val("");
      alert("Form submitted successfully!");
      window.open("http://localhost:3000/formData", "_blank");
    },
    error: () => {
      alert("Error in form submission!");
    },
  });
});

$(".data-input").on("input", function () {
  if ($(this).val()) {
    $(this).siblings(".empty-field-warning").hide();
    $(this).closest(".input-field").removeClass("error");
  }
});

Fancybox.bind("[data-fancybox]", {});
