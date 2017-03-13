(function ($) {
    "use strict"; // Start of use strict

    /* NAVIGATION */

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Smooth Scrolling: Smooth scrolls to an ID on the current page.
    // To use this feature, add a link on your page that links to an ID, and add the .page-scroll class to the link itself. See the docs for more details.
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 90 // to offset the menu
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Scrollspy: Highlights the navigation menu items while scrolling.
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 91
    });

    /* SECTION-5: EXAMPLES */

    // Portfolio Carousel Settings
    $(".portfolio-carousel").owlCarousel({
        autoplay: 3000,
        stopOnHover: true,
        navigation: true,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: false,
        transitionStyle: "fadeUp",
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ]
    });

    /* SECTION-6: PORTFOLIO */

    // Portfolio Filtering Scripts & Hover Effect
    var filterList = {
        init: function () {

            // MixItUp plugin
            // http://mixitup.io
            $('#portfolio-list').mixitup({
                targetSelector: '.portfolio',
                filterSelector: '.filter',
                effects: ['fade'],
                easing: 'snap',
                // call the hover effect
                onMixEnd: filterList.hoverEffect()
            });

        },
        hoverEffect: function () {

            // Simple parallax effect
            $('#portfolio-list .portfolio').hover(
                function () {
                    $(this).find('.caption').stop().animate({
                        bottom: 0
                    }, 200, 'easeOutQuad');
                    $(this).find('img').stop().animate({
                        top: -20
                    }, 300, 'easeOutQuad');
                },
                function () {
                    $(this).find('.caption').stop().animate({
                        bottom: -75
                    }, 200, 'easeInQuad');
                    $(this).find('img').stop().animate({
                        top: 0
                    }, 300, 'easeOutQuad');
                }
            );

        }
    };
    filterList.init();


    /* SECTION-7: TESTIMONIALS */
    $(".testimonials-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        pagination: true,
        autoHeight: true,
        navigationText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        transitionStyle: "backSlide"
    });


    /* SECTION-8: CONTACT US */

    // Activates floating label headings for the contact form.
    $("body").on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

})(jQuery); // End of use strict


//// Load WOW.js on non-touch devices
var isPhoneDevice = "ontouchstart" in document.documentElement;
$(document).ready(function () {
    if (isPhoneDevice) {
        //mobile
    } else {
        //desktop               
        // Initialize WOW.js
        wow = new WOW({
            offset: 50
        });
        wow.init();
    }
});