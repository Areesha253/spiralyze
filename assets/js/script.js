var getTestimonialUsersTemplate = (name, description, img) => `
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
var userDataTemplate = (user) => `
                  <tr data-id="${user.id}">
                      <td class="user-data">${user.firstName}</td>
                      <td class="user-data">${user.lastName}</td>
                      <td class="user-data">${user.businessEmail}</td>
                      <td class="user-data">${user.company}</td>
                      <td class="user-data">${user.country}</td>
                      <td class="user-data">
                          <div class="action-btns">
                <i class="fa-solid fa-lg fa-pencil btn-edit" data-id="${user.id}"></i>
                <i class="fa-solid fa-lg fa-trash btn-delete" data-id="${user.id}"></i>
              </div>
                </td>
               </tr>
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
var getTestimonialUsers = async () => {
  var usersApiUrl = "https://jsonplaceholder.typicode.com/users?_limit=3";
  var imgApiUrl = "https://randomuser.me/api/";

  $(".spinner-border").show();

  var users = await $.ajax({ url: usersApiUrl });

  var usersWithImages = await Promise.all(
    users.map(async (user) => {
      var imgResponse = await $.ajax({ url: imgApiUrl });
      var userImage = imgResponse.results[0].picture.large;
      return getTestimonialUsersTemplate(user.name, user.company.catchPhrase, userImage);
    })
  );

  $(".testimonial-carousel").html(usersWithImages.join(" "));
  initTestimonialsCarousel();
  $(".spinner-border").hide();
};
getTestimonialUsers();

$(".contact-form").on("submit", function (e) {
  e.preventDefault();

  $(".empty-field-warning").hide();
  $(".input-field").removeClass("error");

  var formValid = true;
  var value = Object.fromEntries(new FormData(this));

  $(".data-input").each(function () {
    var inputValue = $(this).val().trim();
    if (!inputValue) {
      formValid = false;
      $(this).siblings(".empty-field-warning").show();
      $(this).closest(".input-field").addClass("error");
      $(this).trigger("focus");
      return false;
    }
  });

  if (!formValid) return;

  $.ajax({
    url: "https://formspree.io/f/mldjwjwr",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(value),
    success: () => {
      $(".data-input").val("");
      alert("Form submitted successfully!");
      fetchUserDataIntoTable();
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

var userDataUrl = "http://localhost:3000/formData";

var fetchUserDataIntoTable = async () => {
  try {
    var userData = await $.ajax({ url: userDataUrl });
    var tableBody = $(".table-body").empty();
    userData.forEach((user) => tableBody.append(userDataTemplate(user)));
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("Failed to fetch user data.");
  }
};

$(".table-body").on("click", ".btn-edit, .btn-delete", function (e) {
  e.preventDefault();
  var actionButton = $(this);
  var requestUrl = `${userDataUrl}/${actionButton.data("id")}`;
  actionButton.hasClass("btn-delete") ? deleteUserData(requestUrl, actionButton) : editUserData(requestUrl);
});

var deleteUserData = async (requestUrl, actionButton) => {
  try {
    await $.ajax({ url: requestUrl, method: "DELETE" });
    actionButton.closest("tr").fadeOut(200);
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete user.");
  }
};
var editUserData = async (requestUrl) => {
  try {
    var userDataToEdit = await $.ajax({ url: requestUrl });

    $(".data-input").each(function () {
      $(this).val(userDataToEdit[$(this).attr("name")]);
    });

    $("#user-id").val(userDataToEdit.id);
    $(".edit-form").fadeIn();
  } catch (error) {
    console.error("Error fetching user for edit:", error);
    alert("Failed to load user data for editing.");
  }
};
$(".btn-cancel").on("click", () => $(".edit-form").fadeOut());

$(".edit-data-form").on("submit", async function (e) {
  e.preventDefault();
  var userId = $("#user-id").val();
  var updatedDataUrl = `${userDataUrl}/${userId}`;
  var updatedData = Object.fromEntries(new FormData(this));

  try {
    await $.ajax({
      url: updatedDataUrl,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(updatedData),
    });

    alert("User data updated successfully!");
    $(`.table-body tr[data-id='${userId}']`).replaceWith(userDataTemplate(updatedData));
    $(".edit-form").fadeOut();
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Failed to update user data.");
  }
});

fetchUserDataIntoTable();

Fancybox.bind("[data-fancybox]", {});
