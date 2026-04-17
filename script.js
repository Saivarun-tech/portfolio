// ─── ELEMENTS ───
const menu = document.getElementById("menu");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const scrollIndicator = document.querySelector(".scroll-indicator");


// ─── DROPDOWN MENU (⚙️) ───
function toggleMenu(event) {
  event.stopPropagation();
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// prevent closing when clicking inside dropdown
menu.addEventListener("click", (e) => {
  e.stopPropagation();
});

// close dropdown when clicking outside
document.addEventListener("click", () => {
  menu.style.display = "none";
});



// ─── SCROLL INDICATOR ───
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight - 10) {
    scrollIndicator.classList.add("hide");
  } else {
    scrollIndicator.classList.remove("hide");
  }
});


// ─── BUTTON SMOOTH SCROLL ───
document.querySelectorAll(".conc").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    const el = document.getElementById(target);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// ─── HAMBURGER MENU ───
if (hamburger && navLinks) {

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("open");
  });

  // close when clicking a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // prevent closing when clicking inside nav
  navLinks.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // close when clicking outside
  document.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
}
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const btn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // loading state
  btn.innerText = "Sending...";
  btn.disabled = true;

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      status.innerText = "✅ Message sent successfully!";
      status.style.color = "#4caf50";

      form.reset();
      status.style.opacity = "1";

// 🔥 auto hide after 2 seconds
setTimeout(() => {
  status.style.opacity = "0";
  status.innerText = "";
}, 2000);// 🔥 clears fields
    } else {
      status.innerText = "❌ Failed to send. Try again.";
      status.style.color = "red";
      status.style.opacity = "1";

      setTimeout(() => {
        status.style.opacity = "0";
        status.innerText = "";
        }, 2000);}
  } catch (error) {
    status.innerText = "⚠️ Network error. Try later.";
    status.style.color = "orange";
  }

  // reset button
  btn.innerText = "Send Message";
  btn.disabled = false;
});
window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  // remove #section from URL
  if (window.location.hash) {
    history.replaceState(null, null, " ");
  }
});
const textarea = document.getElementById("message");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";          // reset
  textarea.style.height = textarea.scrollHeight + "px"; // expand
});
// ─── POPUP HANDLING ───
// ─── MENU BUTTONS ───
const commentBtn = document.querySelector("#menu p:nth-child(1)");
const rateBtn = document.querySelector("#menu p:nth-child(2)");

const commentPopup = document.getElementById("comment-popup");
const ratingPopup = document.getElementById("rating-popup");

// OPEN
commentBtn.addEventListener("click", () => {
  commentPopup.classList.add("show");
  document.getElementById("menu").style.display = "none";
});

rateBtn.addEventListener("click", () => {
  ratingPopup.classList.add("show");
  document.getElementById("menu").style.display = "none";
});

// CLOSE BUTTONS
document.querySelectorAll(".close-popup").forEach(btn => {
  btn.addEventListener("click", () => {

    // reset inputs
    document.getElementById("comment-name").value = "";
    document.getElementById("comment-text").value = "";

    document.getElementById("comment-popup").classList.remove("show");
    document.getElementById("rating-popup").classList.remove("show");
  });
});

// CLOSE OUTSIDE CLICK
[commentPopup, ratingPopup].forEach(popup => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });
});

// STAR RATING
const stars = document.querySelectorAll(".stars span");
const ratingText = document.getElementById("rating-text");

// load saved rating
let savedRating = localStorage.getItem("rating");

if (savedRating) {
  stars.forEach(s => {
    if (s.getAttribute("data-value") <= savedRating) {
      s.classList.add("active");
    }
  });

  ratingText.innerText = "You rated " + savedRating + " ⭐";
}

// click rating
stars.forEach(star => {
  star.addEventListener("click", () => {

    const value = star.getAttribute("data-value");

    // save/update rating
    localStorage.setItem("rating", value);

    // update UI
    stars.forEach(s => {
      s.classList.remove("active");

      if (s.getAttribute("data-value") <= value) {
        s.classList.add("active");
      }
    });

    ratingText.innerText = "You rated " + value + " ⭐";
  });
});
// ─── COMMENT SUBMIT LOGIC ───
// ─── COMMENT FORM SUBMIT (FORM + EMAIL) ───
const commentForm = document.getElementById("comment-form");
const commentStatus = document.getElementById("comment-status");

if (commentForm) {

  commentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("comment-name").value.trim();
    const message = document.getElementById("comment-text").value.trim();

    const namePattern = /^[A-Za-z\s]+$/;

    // reset status
    commentStatus.innerText = "";
    commentStatus.className = "";

    // ❌ validation
    if (!namePattern.test(name)) {
      commentStatus.innerText = "Name should contain only letters";
      commentStatus.classList.add("error");
      return;
    }

    if (message === "") {
      commentStatus.innerText = "Message cannot be empty";
      commentStatus.classList.add("error");
      return;
    }

    const formData = new FormData(commentForm);

    try {
      const response = await fetch(commentForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        commentStatus.innerText = "Message sent successfully!";
        commentStatus.classList.add("success");

        commentForm.reset();

        setTimeout(() => {
          document.getElementById("comment-popup").classList.remove("show");
          commentStatus.innerText = "";
        }, 2000);

      } else {
        commentStatus.innerText = "Failed to send message";
        commentStatus.classList.add("error");
      }

    } catch {
      commentStatus.innerText = "Network error";
      commentStatus.classList.add("error");
    }

  });

}