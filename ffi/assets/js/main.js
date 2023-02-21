// SHOW BORDER
const redBorders = document.querySelectorAll('*');

function showBorder() {
  var redBordersArray = Array.from(redBorders);

  redBordersArray.forEach(redBorder => {
    redBorder.classList.toggle('show');
  });
};


// BACK TO TOP
const toTopButton = document.getElementById("toTop");
const navig = document.getElementById("navig");
const link = document.querySelectorAll("a.links");

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    toTopButton.style.display = "block";

    function screen_resize() {
      var h = parseInt(window.innerHeight);
      var w = parseInt(window.innerWidth);
    
      if (w >= 768) {
        navig.style.backdropFilter = "blur(10px)";
      };
    };
    screen_resize();

  } else {
    toTopButton.style.display = "none";
    navig.style.backgroundColor = "transparent";
  }
};
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

window.onscroll = function () { scrollFunction(); };

// ACTIVE LINKS NAV

// const sections = document.querySelectorAll("section[id]");
// window.addEventListener("scroll", navHighlighter);

// function navHighlighter() {

//   let scrollY = window.pageYOffset;

//   sections.forEach(current => {
//     const sectionHeight = current.offsetHeight;
//     const sectionTop = current.offsetTop - 150;
//     const sectionId = current.getAttribute("id");

//     if (
//       scrollY > sectionTop &&
//       scrollY <= sectionTop + sectionHeight
//     ) {
//       document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.add("active");
//     } else {
//       document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.remove("active");
//     }
//   });
// }

// NAVIGATION
const links = document.querySelectorAll(".nav-links li a");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const linksLi = document.querySelectorAll(".nav-links li");

// SCROLL DISABLE NAV
let scrollEnabled = true;

function disableScrolling() {
  document.body.classList.add("pause-scrolling");
  scrollEnabled = false;
  // console.log('Scrolling disabled');
};

function enableScrolling() {
  document.body.classList.remove("pause-scrolling");
  scrollEnabled = true;
  // console.log('Scrolling enabled');
};

hamburger.addEventListener('click', () => {

  // Toggle body scroll when menu is open
  if (scrollEnabled) {
    disableScrolling('body');
  } else {
    enableScrolling('body');
  };

  // Hamburger animation & menu open
  hamburger.classList.toggle('toggle');
  hamburger.classList.toggle('toggle-colors');
  navLinks.classList.toggle('open');

  // Animate links to view if not visible
  if (navLinks.classList.contains('open')) {



    linksLi.forEach(link => {
      link.style.opacity = '1';
    });
  } else {
    linksLi.forEach(link => {
      link.style.opacity = '0';
    });
  }

  // Hide menu & links if link clicked
  var linksArray = Array.from(links);
  linksArray.forEach(link => {
    link.onclick = function () {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('toggle');
      hamburger.classList.toggle('toggle-colors');

      enableScrolling('body');

      linksLi.forEach(link => {
        link.style.opacity = '0';
      });
    };
  });

});

// FADE IN / OUT ELEMENTS

// const observerOptions = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.3
// };

// function observerCallback(entries, observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // fade in observed elements that are in view
//       entry.target.classList.replace('fadeOut', 'fadeIn');
//     } else {
//       // fade out observed elements that are not in view
//       entry.target.classList.replace('fadeIn', 'fadeOut');
//     }
//   });
// }

// const observer = new IntersectionObserver(observerCallback, observerOptions);

// const fadeElms = document.querySelectorAll('.fade');
// fadeElms.forEach(el => observer.observe(el));

// SLIDER

class Slider {
  slideIndex = 1;
  constructor(Options) {
    this.items = Options;
    this.initialSetting(this.items);
    this.Buttons(this.items);
    this.dots(this.items);
    this.autoTime(this.items);
  }

  initialSetting() {
    const { wrapper, dots, arrowBtn, auto, sliderClass } = this.items;

    if (!wrapper) throw Error('Please Select Query Element');
    if (typeof wrapper !== 'object') throw Error('Type Wrapper Must Object');

    if (!sliderClass) throw Error('Please Select Slider Class');

    if (dots && typeof dots != 'boolean') throw Error('Type dots Must Boolean');

    if (arrowBtn && typeof arrowBtn != 'boolean') throw Error('Type Button Must Boolean');

    if (auto && typeof auto != 'number') throw Error('Type Auto Must Number');
    !auto ? (this.auto = 0) : (this.auto = auto);
  }

  Buttons() {
    const { wrapper, arrowBtn } = this.items;
    if (arrowBtn !== false) {
      wrapper.insertAdjacentHTML(
        'beforeEnd',
        `
                <div class="buttonsSlider">
                  <span class="prev">
                  &#8250;
                  </span>
                  <span class="next">
                  &#8249;
                  </span>
                </div>
              `
      );

      const next = document.querySelector('.next');
      const prev = document.querySelector('.prev');

      next.addEventListener('click', () => {
        this.showSlider(--this.slideIndex);
        this.clearTime();
      });
      prev.addEventListener('click', () => {
        this.showSlider(++this.slideIndex);
        this.clearTime();
      });
    }
  }

  dots() {
    const { wrapper, dots } = this.items;

    if (dots !== false) {
      this.itemSlider = wrapper.querySelectorAll('.heroSlider-page');
      this.creatDots = [...this.itemSlider].map((element, index) => `<span class="dot" data-target="${++index}"></span>`);

      const wrapperDots = document.createElement('div');
      wrapperDots.classList.add('dots');
      wrapperDots.innerHTML = this.creatDots.join('');
      wrapper.insertAdjacentElement('afterEnd', wrapperDots);

      document.querySelector('.dot').classList.add('ActiveDot');
      this.allDot = document.querySelectorAll('.dots .dot');

      this.allDot.forEach((element) => {
        element.addEventListener('click', () => {
          this.slideIndex = element.getAttribute('data-target');
          this.showSlider(this.slideIndex);
          this.clearTime();
        });
      });
    }
  }

  showSlider() {
    let { currentSlider } = this.items;
    if (this.slideIndex > this.itemSlider.length) this.slideIndex = 1;
    if (this.slideIndex < 1) this.slideIndex = this.itemSlider.length;

    const classActive = document.querySelectorAll('.Active');
    const classActiveDot = document.querySelectorAll('.ActiveDot');
    for (let item of classActive) item.classList.remove('Active');
    for (let item of classActiveDot) item.classList.remove('ActiveDot');

    this.itemSlider[this.slideIndex - 1].classList.add('Active');
    this.allDot[this.slideIndex - 1].classList.add('ActiveDot');

    // currentSlider(this.itemSlider);
  }

  autoTime() {
    if (this.auto !== 0) {
      this.setTime = setInterval(() => {
        this.showSlider(++this.slideIndex);
      }, this.auto);
    }
  }

  clearTime() {
    clearInterval(this.setTime);
    this.autoTime();
  }
}



new Slider({
  wrapper: document.querySelector('.heroSlider'),
  sliderClass: 'heroSlider-page',
  auto: 5000, // false
  // auto: false, // false
  dots: true,
  arrowBtn: true,
  // currentSlider: (item) => {
  //     console.log(item);
  // },
});

/******************************************/

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("smallDot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" smallDotActive", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " smallDotActive";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}





