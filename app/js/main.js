$(function () {
    $('.slider-resedents').slick({
        dots: true,
        prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="images/icon/arrow-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="images/icon/arrow-right.svg" alt=""></button>',
    });
    $('.news__slider').slick({
        prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><img src="images/icon/arrow-left.svg" alt=""></button>',
        nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><img src="images/icon/arrow-right.svg" alt=""></button>',
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
    })
});