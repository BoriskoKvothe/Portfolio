document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById('mainNavbar');
  var footer = document.querySelector('footer');
  var returnToTopBtn = document.getElementById('return-to-top');
  var ratingSlider = document.getElementById('rating');
  var ratingDescription = document.getElementById('rating-description');
  var colors = ['#fafcfac1', '#8dd8fac1', '#e2524ac1'];
  var currentColorIndex = 0;
  var $carousel = $('#carouselExampleIndicators');
    var $carouselItems = $carousel.find('.carousel-item');
    var isSmallScreen = window.innerWidth <= 767;
    var carouselTimer;
    var displayDuration = 6000;


    function checkScreenSize() {
        isSmallScreen = window.innerWidth <= 767;
    }

    function showNextCarouselItem() {
        var $currentItem = $carousel.find('.carousel-item.active');
        var $cols = $currentItem.find('.col-md-6');
        var $nextCol = $cols.filter(':visible').next();

        if ($nextCol.length === 0) {
            // If no next item, move to the first item
            $nextCol = $cols.first();
        }

        $cols.hide();
        $nextCol.show();
    }

    function toggleCarouselItems() {
        clearTimeout(carouselTimer);

        if (isSmallScreen) {
            showNextCarouselItem();
            carouselTimer = setTimeout(showNextCarouselItem, 6000); // Change every 6000 ms
        } else {
            $carouselItems.find('.col-md-6').show(); // Show all items on larger screens
        }
    }

    $carousel.on('slid.bs.carousel', function () {
        if (isSmallScreen) {
            toggleCarouselItems();
        }
    });

    $(window).resize(function () {
        checkScreenSize();
        toggleCarouselItems();
    });

    // Initial setup
    checkScreenSize();
    toggleCarouselItems();
    
    function highlightActiveNavLink() {
        var currentPath = window.location.pathname;
        var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
        navLinks.forEach(function(link) {
            var linkHref = new URL(link.href, window.location.origin).pathname;
            
            // Skip comparison for anchor links (e.g., #contact)
            if (linkHref.indexOf('#') === -1) {
                if (linkHref === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    
    highlightActiveNavLink();
    
    
     // Set the initial color of the navbar
     navbar.classList.add('navbar-color-1');
    
  
    function changeNavbarColor() {
      var colorClasses = ['navbar-color-1', 'navbar-color-2', 'navbar-color-3'];
      var currentColorIndex = 0;
      setInterval(function () {
          navbar.classList.remove(colorClasses[currentColorIndex]);
          currentColorIndex = (currentColorIndex + 1) % colorClasses.length;
          navbar.classList.add(colorClasses[currentColorIndex]);
      }, 6000);
  }

  function changeFooterColor() {
      footer.style.backgroundColor = colors[currentColorIndex];
      currentColorIndex = (currentColorIndex + 1) % colors.length;
  }

  returnToTopBtn.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', changeNavbarColor);
  changeNavbarColor();
  setInterval(changeFooterColor, 3000);

  $(document).ready(function () {
      try {
          $('#background').ripples({
              resolution: 512,
              dropRadius: 20,
              perturbance: 0.04,
          });

          setInterval(function () {
              var $el = $('#background');
              var x = Math.random() * $el.outerWidth();
              var y = Math.random() * $el.outerHeight();
              var dropRadius = 20;
              var strength = 0.04 + Math.random() * 0.04;
              $el.ripples('drop', x, y, dropRadius, strength);
          }, 4000);
      } catch (e) {
          console.error("Could not initiate ripples", e);
      }
  });

  $("a.nav-link[href^='#']").on('click', function (event) {
      event.preventDefault();

      var target = this.hash;
      var offset = 100;

      $('html, body').animate({
          scrollTop: $(target).offset().top - offset
      }, 800, function () {
          window.location.hash = target;
      });
  });

  
  $("#openContactForm").on('click', function (event) {
      event.preventDefault();
      $("#contactForm").toggle();
  });

  $("#feedbackForm").on('submit', function (event) {
      event.preventDefault();
      $("#contactForm").hide();
  });

  ratingSlider.addEventListener('input', function () {
      var value = parseInt(ratingSlider.value);
      var description = '';

      switch (value) {
          case 0:
              description = '0 - Needs much improvement';
              break;
          case 1:
              description = '1 - Extremely poor';
              break;
          case 2:
              description = '2 - Very bad';
              break;
          case 3:
              description = '3 - Bad';
              break;
          case 4:
              description = '4 - Poor';
              break;
          case 5:
              description = '5 - Fair';
              break;
          case 6:
              description = '6 - Average';
              break;
          case 7:
              description = '7 - Good';
              break;
          case 8:
              description = '8 - Very good';
              break;
          case 9:
              description = '9 - Excellent';
              break;
          case 10:
              description = '10 - Outstanding';
              break;
          default:
              description = 'Needs much improvement';
              break;
      }
      ratingDescription.textContent = description;
  });

  ratingDescription.textContent = '0 - Needs much improvement';


 // Exclude 'Contact' nav link from the general jQuery event handler
$("a.nav-link[href^='#']:not([href='#contactForm'])").on('click', function (event) {
    event.preventDefault();
    var target = this.hash;
    var offset = 100;
    $('html, body').animate({
        scrollTop: $(target).offset().top - offset
    }, 800, function () {
        window.location.hash = target;
    });
 });

// Function to toggle contact form visibility
function toggleContactForm() {
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.style.display = (contactForm.style.display === "none" || contactForm.style.display === "") ? "block" : "none";
    }
 }


// Function to scroll to the contact form
function scrollToContact() {
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.style.display = "block";  // Ensure the form is visible when scrolling to it
        contactForm.scrollIntoView({ behavior: 'smooth' });
    }
 }

// Event listener for the "Contact nav" 
var contactNavLink = document.querySelector('a.nav-link[href="#contactForm"]');
if (contactNavLink) {
    contactNavLink.addEventListener('click', function(event) {
        event.preventDefault();
        scrollToContact();
    });
 }

// Event listener for the "Contact form" footer
var contactFormButton = document.getElementById('openContactForm');
if (contactFormButton) {
    contactFormButton.addEventListener('click', function(event) {
        event.preventDefault();
        scrollToContact();
    });
 }

    // Typing effect function definition
   function typingEffect() {
    // Define two versions of the text for different screen sizes
    const textFull = "Welcome, I'm Boris a budding Software & Web Developer";
    const textShort = "Welcome, I'm Boris :)"; // Shorter text for small screens
    let screenWidth = window.innerWidth;
    let text = screenWidth <= 576 ? textShort : textFull; // Choose text based on screen width
    const typingSpeed = 150;
    let i = 0;
    const brand = document.querySelector('.navbar-brand');
        
     // Clear existing text before starting the typing effect
     brand.textContent = '';

    function typeWriter() {
        if (i < text.length) {
            brand.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    typeWriter();
}
typingEffect();

    // Update the typing effect on window resize
    window.addEventListener('resize', typingEffect);
});


