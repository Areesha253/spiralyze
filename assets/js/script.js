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
  if (!firstName) {
    formValid = false;
    $("#user-first-name").siblings(".empty-field-warning").show();
    $("#user-first-name").closest(".input-field").addClass("error");
  } else if (!lastName) {
    formValid = false;
    $("#user-last-name").siblings(".empty-field-warning").show();
    $("#user-last-name").closest(".input-field").addClass("error");
  } else if (!businessEmail) {
    formValid = false;
    $("#user-business-email").siblings(".empty-field-warning").show();
    $("#user-business-email").closest(".input-field").addClass("error");
  } else if (!company) {
    formValid = false;
    $("#user-company").siblings(".empty-field-warning").show();
    $("#user-company").closest(".input-field").addClass("error");
  }

  if (formValid) {
    console.log(firstName);
    console.log(lastName);
    console.log(businessEmail);
    console.log(company);

    $("#user-first-name").val("");
    $("#user-last-name").val("");
    $("#user-business-email").val("");
    $("#user-company").val("");
  }
  $("input").on("input", function () {
    $(this).siblings(".empty-field-warning").hide();
    if ($(this).val()) {
      $(this).closest(".input-field").removeClass("error");
    }
    $(this).val();
  });
});
