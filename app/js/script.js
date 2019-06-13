//Scripts
$(function () {

    //Popup images from slider
    let modalId = $('#image-gallery');

    $(function () {

            loadGallery(true, 'a.thumbnail');

            //This function disables buttons when needed
            function disableButtons(counter_max, counter_current) {
                $('#show-previous-image, #show-next-image')
                    .show();
                if (counter_max === counter_current) {
                    $('#show-next-image')
                        .hide();
                } else if (counter_current === 1) {
                    $('#show-previous-image')
                        .hide();
                }
            }

            function loadGallery(setIDs, setClickAttr) {
                let current_image,
                    selector,
                    counter = 0;

                $('#show-next-image, #show-previous-image').click(function () {
                        if ($(this)
                            .attr('id') === 'show-previous-image') {
                            current_image--;
                        } else {
                            current_image++;
                        }

                        selector = $('[data-image-id="' + current_image + '"]');
                        updateGallery(selector);
                    });

                function updateGallery(selector) {
                    let $sel = selector;
                    current_image = $sel.data('image-id');
                    $('#image-gallery-title')
                        .text($sel.data('title'));
                    $('#image-gallery-image')
                        .attr('src', $sel.data('image'));
                    disableButtons(counter, $sel.data('image-id'));
                }

                if (setIDs == true) {
                    $('[data-image-id]')
                        .each(function () {
                            counter++;
                            $(this)
                                .attr('data-image-id', counter);
                        });
                }
                $(setClickAttr).on('click', function () {
                        updateGallery($(this));
                    });
            }
        });

// build key actions
    $(document).keydown(function (e) {
            switch (e.which) {
                case 37: // left
                    if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
                        $('#show-previous-image')
                            .click();
                    }
                    break;

                case 39: // right
                    if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
                        $('#show-next-image')
                            .click();
                    }
                    break;

                default:
                    return;
            }
            e.preventDefault();
        });

//Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
// scroll body to 0px on click
    $('#back-to-top').click(function () {
        $('#back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

//соединяемся с API Youtube
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//запускаем функцию проверки видимости элемента
    $(document).scroll(function () {
        checkPosition();
    });
    $(window).resize(function () {
        checkPosition();
    });


    function checkPosition() {
        //функция проверки видимости элемента на jquery
        var div_position = $('#video-placeholder');
        var div_top = div_position.offsetTop;
        var div_left = div_position.offsetLeft;
        var div_width = div_position.offsetWidth;
        var div_height = div_position.offsetHeight;
        var top_scroll = $(document).scrollTop();
        var left_scroll = $(document).scrollLeft();
        var screen_width = $(window).width();
        var screen_height = $(window).height() + 400;
        var see_x1 = left_scroll;
        var see_x2 = screen_width + left_scroll;
        var see_y1 = top_scroll;
        var see_y2 = screen_height + top_scroll;
        var div_x1 = div_left;
        var div_x2 = div_left + div_height;
        var div_y1 = div_top;
        var div_y2 = div_top + div_width;
        // if (div_x1 >= see_x1 && div_x2 <= see_x2 && div_y1 >= see_y1 && div_y2 <= see_y2) {
        //     //если элемент видим на экране, запускаем видео Youtube
        //     player.playVideo();
        //     //player.pauseVideo();
        // } else {
        //     //если не видим, ставим видео на паузу
        //     player.pauseVideo();
        // }
    }


//Carousel responsive
    var jcarousel = $('.jcarousel'),
        games = $('.jcarousel.games-jcarousel'),
        votes = $('.jcarousel.votes-jcarousel');

    jcarousel.jcarousel().jcarouselSwipe();
    games.jcarousel().jcarouselSwipe();
    votes.jcarousel().jcarouselSwipe();

    jcarousel
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            width = width;

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular',
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 10000,
            target: '+=1',
            autostart: true,
        })
        .on('mouseover', function (e) {
            $(this).jcarouselAutoscroll('stop');
        })
        .on('mouseout', function (e) {
            $(this).jcarouselAutoscroll('start');
        });

    games
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            width = width;

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular',
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 10000,
            target: '+=1',
            autostart: true,
        })
        .on('mouseover', function (e) {
            $(this).jcarouselAutoscroll('stop');
        })
        .on('mouseout', function (e) {
            $(this).jcarouselAutoscroll('start');
        });

    votes
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            if (width >= 991) {
                width = width / 3;
            } else if (width >= 767) {
                width = width / 2;
            } else if (width >= 320) {
                width = width;
            }

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular',
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 10000,
            target: '+=1',
            autostart: true,
        })
        .on('mouseover', function (e) {
            $(this).jcarouselAutoscroll('stop');
        })
        .on('mouseout', function (e) {
            $(this).jcarouselAutoscroll('start');
        });

    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function () {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function () {
            $(this).removeClass('active');
        })
        .on('click', function (e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function (page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });

//Match Height

    $('.item').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });

    //Change active items menu on change
    $(document).on("scroll", onScroll);

    $("a.nav-link").click(function (e) {
        e.preventDefault();

        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).attr("href");

        var target = $(hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function () {
            //window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });

    });
});

//Change active items menu on change
var menu_selector = ".ubermenu";


$(menu_selector + " a").click(function () {
    onClick();
});

$(document).mouseup(function (e) {
    var navbar = $(".navbar-toggler");

    if (!navbar.is(e.target) && navbar.has(e.target).length === 0) {
        onClick();
    }
});

function onClick() {
    $(".navbar-toggler").addClass("collapsed");
    $(".navbar-collapse.collapse").removeClass("show");
}

function onScroll() {
    var scroll_top = $(document).scrollTop();
    $(menu_selector + " a").each(function () {
        var hash = $(this).attr("href");
        // console.log(hash);
        var target = $(hash);

        if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
}

