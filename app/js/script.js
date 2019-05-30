//Scripts

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
    var div_position = $('#video-placeholder').offset();
    var div_top = div_position.top;
    var div_left = div_position.left;
    var div_width = $('#video-placeholder').width();
    var div_height = $('#video-placeholder').height();
    var top_scroll = $(document).scrollTop();
    var left_scroll = $(document).scrollLeft();
    var screen_width = $(window).width();
    var screen_height = $(window).height() + 600;
    var see_x1 = left_scroll;
    var see_x2 = screen_width + left_scroll;
    var see_y1 = top_scroll;
    var see_y2 = screen_height + top_scroll;
    var div_x1 = div_left;
    var div_x2 = div_left + div_height;
    var div_y1 = div_top;
    var div_y2 = div_top + div_width;
    if (div_x1 >= see_x1 && div_x2 <= see_x2 && div_y1 >= see_y1 && div_y2 <= see_y2) {
        //если элемент видим на экране, запускаем видео Youtube
        player.playVideo();
        //player.pauseVideo();
    } else {
        //если не видим, ставим видео на паузу
        player.pauseVideo();
    }
}

//Carousel responsive
$(function () {

    var jcarousel = $('.jcarousel'),
        games = jcarousel = $('.jcarousel.games-jcarousel'),
        votes = jcarousel = $('.jcarousel.votes-jcarousel');

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

    $("nav a").click(function (e) {
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

function onScroll() {
    var scroll_top = $(document).scrollTop();
    $(menu_selector + " a").each(function () {
        var hash = $(this).attr("href");
        // console.log(hash);
        var target = $(hash);
        console.log(target.position().top);
        console.log(target.position().top + target.outerHeight());
        if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
}

