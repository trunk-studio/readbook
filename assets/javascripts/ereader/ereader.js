console.log('=== ereader start ===');

var ___PRELOAD_SIZE = 2;
var ___DIRECTION_MODE = 1;

$.fn.preload = function () {
    this.each(function () {
        $('<img/>')[0].src = this;
    });
};

var jobStack = new Array();

var pushJobStack = function(job) {

    if (jobStack.length > 2) {
        for (var i = 0; i < jobStack.length - 2; i++) {
            jobStack.shift();
        }
    }

    jobStack.push(job)

    window.setTimeout(jobExecutor, 500 + (jobStack.length * 500));
};

var runCount = 0;

var jobExecutor = function() {

    runCount++;

    console.log('run #' + runCount + ', jobs remain ' + jobStack.length);

    if (jobStack.length > 0) {
        var job = jobStack.pop();
        job();
    }
};

var preload = function (page) {
    var url = $('#p' + page).data('url');
    if (!url) {
        url = '/images/transparent.png';
    }
    var target = $('#p' + page);
    if (! target.hasClass('loaded')) {
        target.addClass('loaded');
        pushJobStack(function() {
            target.css('background-image', 'url(' + url + ')');
        });
    }
};

var startPreload = function(pageNum) {
    for (var i = pageNum + 1; i < pageNum + 2; i++) {
        preload(i);
    }
};

var display = function (pageNum) {

    console.log("display(" + pageNum + ");");

    $('.image-content').removeClass('active').hide();

    var maximum = parseInt($('input[name=maximum]').val());

    if (pageNum < 0) {
        pageNum = 0;
    }
    else if (pageNum > maximum) {
        pageNum = maximum;
    }

    var url = $('#p' + pageNum).data('url');

    $('#p' + pageNum)
      .css('background-image', 'url(' + url + ')')
      .addClass('active').show();

    startPreload(pageNum);

    // Update current page num
    $('input[name=current]').val(pageNum);
    $('#textCurrentPageNum').text(pageNum + 1);
};

display(0);

$(function () {

    $( "#slider" ).slider({
        min: $('#slider').data('min'),
        max: $('#slider').data('max'),
        change: function(event, ui) {
            var pageNum = parseInt($(this).slider('value'));
            console.log("(Slider) Open Page: " + pageNum);
            display(pageNum);
        },
        start: function(event, ui) {
            var pageNum = ui.value;
            console.log("(Slider) Start Preview: " + pageNum);
        },
        slide: function(event, ui) {
            var pageNum = ui.value;
            console.log("(Slider) Preview: " + pageNum);
            display(pageNum);
        },
        stop: function(event, ui) {
            var pageNum = ui.value;
            console.log("(Slider) Stop Preview: " + pageNum);
            //$('#slider').blur();
        }
    });

//        $('#viewer-content').click(function() {
//            $('#viewer-footer').toggle();
//        });

    var swipeHandler = function(event, direction, distance, duration, fingerCount, fingerData) {
        console.log('swipe direction: ' + direction);

        var current = parseInt($('input[name=current]').val());
        var pageNum = current + (direction=='left'?1:-1);
        console.log("(Swipe) Open Page: " + pageNum);
        display(pageNum);
    };

   $('.image-content').click(function() {
     $('header, footer, .page-switcher').toggle();
   });

    $('.image-content').dblclick(function() {
        var imgSrc = $(this).data('url');

        if (!imgSrc) {
            return;
        }

        var html = '<section id="panzoom-parent" class="panzoom-container">' +
                '<div class="panzoom">' +
                '<img src="'+imgSrc+'" />' +
                '</div>' +
                '</section>';

        $('body').append(html);

        $(".panzoom").panzoom({
            contain: 'invert',
            minScale: 1,
            transition: false
        }).panzoom("zoom");

        $(".panzoom").dblclick(function() {
            $('#panzoom-parent').remove();
        });
    });

    $('.image-content').swipe({
        swipeLeft: swipeHandler,
        swipeRight: swipeHandler,
        swipeRight: swipeHandler,
        tap: function(event, target) {
            console.log('aaa');
            $('header, footer').toggle();
        },
        doubleTap: function(event, target) {
            //alert('double tap');
            //$('#panzoom-parent').show();

            // do nothing
        },
        pinchIn: function(event, direction, distance, duration, fingerCount, zoom, fingerData) {
            alert('in');
        },
        threshold: 45
    });

    $('a.page-switcher').click(function () {

        var current = parseInt($('input[name=current]').val());
        var offset = parseInt($(this).data('offset'));

        current += offset;

        $('#slider').slider('value', current);

        return false;
    });

    $("body").keydown(function(e) {
        if(e.keyCode == 37) { // left
            var current = parseInt($('input[name=current]').val());
            current += -1;
            $('#slider').slider('value', current);
        }
        else if(e.keyCode == 39) { // right
            var current = parseInt($('input[name=current]').val());
            current += 1;
            $('#slider').slider('value', current);
        }
        else if (e.keyCode == 27) { // esc
            $('#panzoom-parent').remove();
        }
    });
});
