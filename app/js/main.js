
$(function () {
    $('.slider-resedents').slick({
        dots: true,
        prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="images/icon/arrow-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="images/icon/arrow-right.svg" alt=""></button>',
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 3500,
                }
            },
        ]
    });
    $('.news__slider').slick({
        prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="images/icon/arrow-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="images/icon/arrow-right.svg" alt=""></button>',
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        responsive: [
            {
                breakpoint: 1060,
                settings: {
                    arrows: false,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings:{
                    slidesToShow: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings:{
                    slidesToShow: 1 ,
                    arrows: false,
                }
            }
        ]
    })
    $('.menu__btn, a ').on('click', function () {
        $('.header-top').toggleClass('header-top--active')
    })
});

new WOW().init();
