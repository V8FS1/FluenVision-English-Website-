document.addEventListener("DOMContentLoaded", () => {
  // Function to get the base path relative to the current file's location
  const getBasePath = () => {
    const pathParts = window.location.pathname.split("/");
    pathParts.pop(); // Remove the current file name
    return pathParts.join("/") + "/";
  };

  // Function to update asset paths
  const updateAssetPaths = () => {
    const basePath = getBasePath();

    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/')) {
        img.setAttribute('src', basePath + src);
      }
    });

    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('/')) {
        link.setAttribute('href', basePath + href);
      }
    });

    document.querySelectorAll('script').forEach(script => {
      const src = script.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/')) {
        script.setAttribute('src', basePath + src);
      }
    });
  };

  // Function to update navigation links
  const updateNavLinks = () => {
    const basePath = getBasePath();

    // Update "Home" link to always point to /Website/index.html
    document.querySelectorAll('header .nav a[href="index.html"]').forEach(link => {
      link.setAttribute('href', '/Website/index.html');
    });

    // Update other navigation links based on the base path, but not anchor links
    document.querySelectorAll('header .nav a, footer a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
        link.setAttribute('href', basePath + href);
      }
    });
  };

  // Define custom elements
  class MyHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header class="header" id="home">
          <div class="container">
            <div class="logo"><a href="/Website/index.html">FluentVison</a></div>
            <div class="nav-cont">
              <div class="links">
                <div class="icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <ul class="nav">
                  <li><i class="fa-solid fa-house icon"></i><a href="/Website/index.html">Home</a></li>
                  <li><i class="fa-solid fa-diagram-project icon"></i><a href="/Website/grammar.html">Grammar</a></li>
                  <li class="skills">
                    <i class="fa-solid fa-brain icon"></i>
                    <a href="#skills">Skills</a>
                    <ul class="skills-nav">
                      <li><i class="fa-solid fa-ear-listen icon"></i><a href="/Website/listening.html">Listening</a></li>
                      <li><i class="fa-solid fa-glasses icon"></i><a href="/Website/reading.html">Reading</a></li>
                      <li><i class="fa-solid fa-pencil icon"></i><a href="/Website/writing.html">Writing</a></li>
                      <li><i class="fa-solid fa-people-robbery icon"></i><a href="/Website/speaking.html">Speaking</a></li>
                    </ul>
                  </li>
                  <li><i class="fa-solid fa-book icon"></i><a href="/Website/vocabulary.html">Vocabulary</a></li>
                  <li><i class="fa-solid fa-phone icon"></i><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div class="user-login">
                <button id="login-btn-popup" class="login-btn-popup main-button">Login</button>
                <div class="user-links" id="userLinks">
                  <div class="user">
                    <div class="image">
                      <img src="/Website/icon/user-man.png" alt="">
                    </div>
                    <ul class="nav">
                      <li><i class="fa-solid fa-address-card icon"></i><a href="/Website/myprofile.html">My Profile</a></li>
                      <li id="logout_btn"><i class="fa-solid fa-arrow-right-from-bracket icon"></i><a href="#">Log Out</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      `;
      updateNavLinks();
    }
  }

  customElements.define("main-header", MyHeader);

  class MyFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="contact-home" id="contact">
          <div class="container">
            <h2 class="special-heading">Contact</h2>
            <p></p>
            <div class="contact-content">
              <div class="lable">We have the honor to write to us:</div>
              <a href="mailto:ffff@gmail.com?subject=Contact" class="email">ffff@gmail.com</a>
              <div class="social-media">
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      `;
      updateNavLinks();
    }
  }

  customElements.define("main-footer", MyFooter);

  class MyScroll extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="Scroll-up">
          <div class="container">
            <a href="#home" class="Scroll-up">Up</a>
          </div>
        </div>
      `;
    }
  }

  customElements.define("main-scroll", MyScroll);

  class GameAd extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <section class="vocublary-game">
          <div class="container">
            <div class="voc-container">
              <div class="overlay"></div>
              <div class="game-body">
                <div class="text">
                  <h2>Learn Vocabulary With Gaming</h2>
                  <p>How many words can you Sushi Spell in two minutes?</p>
                </div>
                <div class="ad">
                  <a class="game-link main-button" href="https://f4af0e655f1ba813387a-9d4e141fd1fc6c7c833d00398717c341.ssl.cf6.rackcdn.com/sushi-spell/sushi-spell2.html">Play Now</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }
  }

  customElements.define("game-ad", GameAd);

  class loginPopup extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <div class="container login-cont">
        <div class="wrapper">
          <div class="close-icon">
            <i class="fa-solid fa-xmark icon"></i>
          </div>
  
          <div class="form-box login">
            <h2>Login</h2>
            <form action="#">
              <div class="input-box">
                <div class="icon"><i class="fa-solid fa-envelope"></i></div>
                <input id="loginEmail" type="email" class="email" required />
                <label for="">Email</label>
              </div>
              <div class="input-box">
                <div class="icon"><i class="fa-solid fa-lock"></i></div>
                <input id="loginPass" type="password" required />
                <label for="">Password</label>
              </div>
              <div class="remember-forgot">
                <div><input type="checkbox" class="checkbox" /><span>Remember Me</span></div>
                <a href="#">Forgot Password?</a>
              </div>
              <button type="button" id="loginBtn" class="submit-btn main-button">Login</button>
              <div class="login-register">
                <p>
                  Don't Have An Accont?
                  <a href="#" class="register-link" >Register</a>
                </p>
              </div>
            </form>
          </div>
  
          <div class="form-box register">
            <h2>Registeration</h2>
            <form action="#">
              <div class="input-box">
                <div class="icon"><i class="fa-solid fa-user"></i></div>
                <input id="register_user" type="text" required />
                <label for="">Username</label>
              </div>
  
              <div class="input-box">
                <div class="icon"><i class="fa-solid fa-envelope"></i></div>
                <input id="register_email" type="email" class="email" required />
                <label for="">Email</label>
              </div>
              <div class="input-box">
                <div class="icon"><i class="fa-solid fa-lock"></i></div>
                <input id="register_pass" type="password" required />
                <label for="">Password</label>
              </div>
              <div class="remember-forgot">
                <div>
                  <input type="checkbox" class="checkbox" />I Agree To The Terms &
                  Conditions
                </div>
              </div>
              <button type="button" id="register_btn" class="submit-btn main-button">
                Register
              </button>
              <div class="login-register">
                <p>
                  Already Have An Accont?
                  <a href="#" class="login-link">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      `;
    }
  }
  customElements.define("main-login-popup", loginPopup);

  // |->>> End Login And Register popup <<<-| //

  // |->>> Start Login And Register popup Functions <<<-| //

  const wrapper = document.querySelector(".wrapper");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");
  const btnpopup = document.querySelector(".login-btn-popup");
  const closeIcon = document.querySelector(".close-icon");

  registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
  });

  loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });

  btnpopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
  });

  closeIcon.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
  });

  // |->>> End Login And Register popup Functions <<<-| //

  // |->>> Start Images Picker <<<-| //
  let profilePic = document.getElementById("profile-pic");
  let inputFile = document.getElementById("input-file");

  inputFile.onchange = () => {
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
  };

  // Log the button to check if it is found
  const loginButton = document.querySelector('#login-btn-popup');
  console.log('Login button:', loginButton);

  // Update paths for assets and links
  updateAssetPaths();

  // Setup event listeners for login and register buttons
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      const popup = document.querySelector('login-popup');
      console.log('Popup element:', popup);
      if (popup) {
        popup.style.display = 'block';
      }
      else {
        console.log('Popup not found');
      }
    });
  }

  const closePopupButtons = document.querySelectorAll('login-popup .close-icon');
  closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = document.querySelector('login-popup');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  });
});
