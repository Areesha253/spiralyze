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

  const firstName = $("#user-first-name").val();
  const lastName = $("#user-last-name").val();
  const businessEmail = $("#user-business-email").val();
  const company = $("#user-company").val();

  let formValid = true;
  const fields = [
    {
      id: "#user-first-name",
      value: firstName,
    },
    {
      id: "#user-last-name",
      value: lastName,
    },
    {
      id: "#user-business-email",
      value: businessEmail,
    },
    {
      id: "#user-company",
      value: company,
    },
  ];

  for (const field of fields) {
    if (!field.value) {
      formValid = false;
      $(field.id).siblings(".empty-field-warning").show();
      $(field.id).closest(".input-field").addClass("error");
      break;
    }
  }
  if (formValid) {
    console.log(firstName);
    console.log(lastName);
    console.log(businessEmail);
    console.log(company);
    $("input").val("");
  }
  $("input").on("input", function () {
    $(this).siblings(".empty-field-warning").hide();
    $(this).val() && $(this).closest(".input-field").removeClass("error");
  });
});
