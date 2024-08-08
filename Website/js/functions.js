$(document).ready(function () {

  var loggedInUser = localStorage.getItem("loggedInUser");

  var loggedInId = localStorage.getItem("loggedInId");



  console.log(loggedInId);



  var loggedInUser = localStorage.getItem("loggedInUser");

  var loggedInEmail = localStorage.getItem("loggedInEmail");



  document.getElementById("login-btn-popup").style = "display: block;";

  if (loggedInEmail) {

    console.log(localStorage.getItem("loggedInEmail"));

    // Eğer oturum varsa, kullanıcı bilgilerini göster.

    getUser(loggedInEmail);

    getGrades(loggedInId);

    // setSession(loggedInUser);

    document.getElementById("login-btn-popup").style = "display: none;";

    document.getElementById("userLinks").style = "display: block;";

  }



  $("#updateUser").click(function () {

    var email = document.getElementById("getuseremail").value;

    var username = document.getElementById("getusername").value;

    var loggedInId = localStorage.getItem("loggedInId");

    var currentEmail = localStorage.getItem("loggedInEmail");

    var currentUsername = localStorage.getItem("loggedInUser");



    // Validate the updated email format

    if (!isValidEmail(email)) {

      alertify.error("Invalid email format.");

      return;

    }



    if (email === currentEmail && username === currentUsername) {

      alertify.error("No changes were made.");

      return;

    }



    $.ajax({

      type: "POST",

      url: "https://fluentvison.000webhostapp.com/functions/updateUser.php",

      data: { email: email, username: username, id: loggedInId },

      success: function (response) {

        console.log(response);

        console.log(response.status);

        if (response.status == "ok") {

          alertify.success("Changes have been saved successfully.");

          localStorage.setItem("loggedInEmail", email);

          localStorage.setItem("loggedInUser", username);

          document.getElementById("login-btn-popup").style = "display: none;";

          document.getElementById("userLinks").style = "display: block;";

        }

      },

      error: function (error) {

        alert("Update error");

        console.log("Error: " + error);

      },

    });

  });



  // Helper function to validate email format

  function isValidEmail(email) {

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

  }



  $("#updateUserPassword").click(function () {

    var currentpassword = document.getElementById("currentpassword").value;

    var newpassword = document.getElementById("newpassword").value;

    var newpassword2 = document.getElementById("newpassword2").value;

    var loggedInId = localStorage.getItem("loggedInId");



    if (currentpassword == "" || newpassword == "" || newpassword2 == "") {

      alertify.error("Please fill in all fields.");

    } else if (newpassword === currentpassword) {

      alertify.error(

        "New password cannot be the same as the current password."

      );

    } else if (newpassword.length < 6) {

      alertify.error("Password cannot be less than 6 characters.");

    } else if (newpassword !== newpassword2) {

      alertify.error("Repeat password does not match the new password.");

    } else {

      // Proceed with the AJAX request if all validations pass

      $.ajax({

        type: "POST",

        url: "https://fluentvison.000webhostapp.com/functions/updateUserPass.php",

        data: {

          id: loggedInId,

          currentpassword: currentpassword,

          newpassword: newpassword,

          newpassword2: newpassword2,

        },

        success: function (response) {

          console.log(response);

          console.log(response.status);

          if (response.status == "ok") {

            alertify.success("Changes have been saved successfully.");

          } else if (response.status == "güncel şifre yanlıs") {

            alertify.error("Current password is incorrect.");

          }

        },

        error: function (error) {

          console.log("Error: " + error);

          alertify.error("An error occurred while updating the password.");

        },

      });

    }

  });



  $("#register_btn").click(function () {

    var username = document.getElementById("register_user").value;

    var email = document.getElementById("register_email").value;

    var pass = document.getElementById("register_pass").value;



    // Validate email format and password length

    if (username == "") {

      alertify.error("Please fill out the user name field.");

      return;

    }



    if (!isValidEmail(email)) {

      alertify.error("Email is not valid.");

      return;

    }



    if (pass.length < 6) {

      alertify.error("Password need to be 6 character long.");

      return;

    }



    $.ajax({

      type: "POST",

      url: "https://fluentvison.000webhostapp.com/functions/signupUser.php",

      data: { email: email, password: pass, username: username },

      success: function (response) {

        console.log(response);

        console.log(response.status);

        if (response.status == "ok") {

          const wrapper = document.querySelector(".wrapper");

          console.log(wrapper);

          wrapper.classList.remove("active-popup");

          // setSession(username, email);

          alertify.success("register success");

        } else {

          alertify.error("User already exist.");

        }

      },

      error: function (error) {

        alertify.error("kayıt hatası");

        console.log("Error: " + error);

      },

    });

  });



  // Helper function to validate email format

  function isValidEmail(email) {

    // You can customize this regex for more accurate email format validation

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);

  }



  $("#loginBtn").click(function () {

    var email = document.getElementById("loginEmail").value;

    var pass = document.getElementById("loginPass").value;



    // Validate that email and password are not empty

    if (!isValidEmail(email)) {

      alertify.error("Please Fill out the email section.");

      return;

    }



    if (pass.length < 6) {

      alertify.error("Please Fill out the password section.");

      return;

    }



    // Proceed with AJAX request if validation passes

    $.ajax({

      type: "POST",

      url: "https://fluentvison.000webhostapp.com/functions/loginUser.php",

      data: { email: email, password: pass },

      success: function (response) {

        console.log(response);

        if (response == "error") {

          alertify.error(

            "User does not exist. Please check your email and password."

          );

        } else if (response.status == "ok") {

          alertify.success("User is successfully logged in.");

          const wrapper = document.querySelector(".wrapper");

          console.log(wrapper);

          wrapper.classList.remove("active-popup");

          setSession(response.id, response.username, response.email);



          // Add the following code for successful login

          document.getElementById("login-btn-popup").style = "display: none;";

          document.getElementById("userLinks").style = "display: block;";

        }

      },

      error: function (error) {

        console.log("Error: " + error);

        alertify.error(

          "User does not exist. Please check your email and password."

        );

      },

    });

  });

  function setSession(id, username, email) {

    // Kullanıcı bilgilerini tarayıcı hafızasında sakla (localStorage kullanılmıştır).

    localStorage.setItem("loggedInId", id);

    localStorage.setItem("loggedInUser", username);

    localStorage.setItem("loggedInEmail", email);

    console.log(localStorage.getItem("loggedInEmail"));

    console.log(localStorage.getItem("loggedInUser"));

  }



  function getUser(email) {

    $.ajax({

      type: "POST", // İsteğin türü (GET, POST, vb.)

      url: "https://fluentvison.000webhostapp.com/functions/getUser.php", // PHP dosyasının yolu

      data: { email: email }, // İsteğe ek veri (varsa)

      success: function (response) {

        // İsteğin başarılı olması durumunda yapılacak işlemler

        console.log(response.username);



        document.getElementById("getusername").value = response.username;

        document.getElementById("getuseremail").value = response.email;

      },

      error: function (error) {

        alert("kayıt hatası");

        // İsteğin başarısız olması durumunda yapılacak işlemler

        console.log("Error: " + error);

      },

    });

  }



  $("#logout_btn").click(function () {

    logout();

  });

  function logout() {

    // Oturumu sonlandır, kullanıcı bilgilerini temizle.

    console.log("asd  ");

    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("loggedInEmail");

    localStorage.removeItem("loggedInId");

    document.getElementById("login-btn-popup").innerText = "login";

    window.location.href = "index.html";

  }



  function getGrades(email) {

    var loggedInId = localStorage.getItem("loggedInId");



    $.ajax({

      type: "POST", // İsteğin türü (GET, POST, vb.)

      url: "https://fluentvison.000webhostapp.com/functions/getGrades.php", // PHP dosyasının yolu

      data: { userId: loggedInId }, // İsteğe ek veri (varsa)

      success: function (response) {

        console.log(response);

        // İsteğin başarılı olması durumunda yapılacak işlemler

        console.log(Array.isArray(response));

        if (Array.isArray(response)) {

          response.forEach(function (veri) {

            var tabloSatiri = document.createElement("tr");

            tabloSatiri.innerHTML = `

                <td>${veri.level}</td>

                <td>${veri.quizName}</td>

                <td>${veri.point}</td>

            `;



            document.getElementById("gradesTable").appendChild(tabloSatiri);

          });

        }

      },

      error: function (error) {

        // alert("kayıt hatası");

        // İsteğin başarısız olması durumunda yapılacak işlemler

        console.log("Error: " + error);

      },

    });

  }

});

