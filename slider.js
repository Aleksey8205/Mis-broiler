// Получаем элементы слайдера
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const slides = Array.from(slider.querySelectorAll('.item'));
const slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'flex';
    } else {
      slide.style.display = 'none';
    }
  });
}

// Инициализация слайдера
updateSlider();

document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки открытия модальных окон
    const openModalButtons = document.querySelectorAll('.carousel-label');

    // Добавляем обработчик события для каждой кнопки
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Отменяем стандартное поведение ссылки

            // Находим ближайшее модальное окно относительно кнопки
            const modalId = this.getAttribute('data-modal'); // Если у кнопки есть атрибут data-modal
            let modal = null;

            if (modalId) {
                modal = document.getElementById(modalId);
            } else {
                // Если нет атрибута data-modal, ищем модальное окно внутри родительского элемента
                modal = this.closest('.item').querySelector('.modal');
            }

            if (modal) {
                // Открываем найденное модальное окно
                modal.style.display = 'block';

                // Добавляем обработчик закрытия модального окна по клику на крестик
                const closeButton = modal.querySelector('.close');
                closeButton.addEventListener('click', () => {
                    modal.style.display = 'none'; // Закрытие модального окна
                });

                // Закрытие модального окна по клику вне его области
                window.addEventListener('click', (event) => {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            }
        });
    });
});

var slideIndexTwo = 1;
showSlides(slideIndexTwo);

function plusSlides(n) {
    showSlides(slideIndexTwo += n);
}

function currentSlide(n) {
    showSlides(slideIndexTwo = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndexTwo = 1}
    if (n < 1) {slideIndexTwo = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndexTwo-1].style.display = "block";
    dots[slideIndexTwo-1].className += " active";
}

// Добавление поддержки свайпов

let touchStartX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
}, false);

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, false);

document.addEventListener('touchend', function(event) {
    let touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    
    if (Math.abs(deltaX) > 40) {
        if (deltaX > 0) {
            plusSlides(-1);
        } else {
            plusSlides(1);
        }
    }
}, false);

document.addEventListener("DOMContentLoaded", function() {
    currentSlide(1);
});

// Автоматическое перелистывание слайдов каждые 5 секунд
setInterval(function() {
    plusSlides(1);
}, 5000);