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
