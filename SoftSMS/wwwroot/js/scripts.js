var WindowCollectionObserverResizeFS = [];


$(function ($) {
    if (window.location.href.toUpperCase().indexOf("MAIN.ASPX") == -1) {
        fnLoadCentaurusThemeFeatures();
    }
});

//$(function ($) {
function fnLoadCentaurusThemeFeatures() {
    setTimeout(function () {
        $('#content-wrapper > .row').css({
            opacity: 1
        });


    }, 200);

    $('#sidebar-nav .dropdown-toggle').on('click', function (e) {
        e.preventDefault();

        var $item = $(this).parent();
        if (!$item.hasClass('open')) {
            $item.parent().find('.open .submenu').slideUp('fast');
            $item.parent().find('.open').toggleClass('open');
        }

        $item.toggleClass('open');

        if ($item.hasClass('open')) {
            $item.children('.submenu').slideDown('fast');
        }
        else {
            $item.children('.submenu').slideUp('fast');
        }
        // sroll a la mitad de los submenus
        //scroll al titulo - se escogi� este y parece que funciona
        //scroll si es de la mitad pa arriba al primero, si es de la mitad pa abajo al ultimo
        setTimeout(function () {
            $("#col-left").nanoScroller({
                scrollTo: $item//.children('.submenu').find("li").last()
            });
        }, 300);

    });

    $('body').on('mouseenter', '#page-wrapper.nav-small #sidebar-nav .dropdown-toggle', function (e) {
        var $sidebar = $(this).parents('#sidebar-nav');

        if ($(document).width() >= 992) {
            var $item = $(this).parent();

            $item.addClass('open');
            $item.children('.submenu').slideDown('fast');
        }

    });

    $('body').on('mouseleave', '#page-wrapper.nav-small #sidebar-nav > .nav-pills > li', function (e) {
        var $sidebar = $(this).parents('#sidebar-nav');

        if ($(document).width() >= 992) {
            var $item = $(this);

            if ($item.hasClass('open')) {
                $item.find('.open .submenu').slideUp('fast');
                $item.find('.open').removeClass('open');
                $item.children('.submenu').slideUp('fast');
            }

            $item.removeClass('open');
        }

    });

    $('#make-small-nav').click(function (e) {
        $('#page-wrapper').toggleClass('nav-small');
        $(document.body).toggleClass("fixed-leftmenu");

        if ($("#page-wrapper").hasClass("nav-small")) {
            $("#leftMenuContainer").css("width", "50px");
            $("#CompanySmallLogoImage").css("display", "none");
            $("#leftMenuContainer").css("background-color", "#2c3e50");
            $("#ExpandCollapseButton").css("color", "white");

            $("#ChatStatisticsDiv").css("display", "none");
            $("#SearchMenuItemsDiv").css("display", "none");
            $("#ExpandCollapseDiv").css("height", "25px");
        }
        else {
            $("#ExpandCollapseDiv").css("height", "0");
            $("#leftMenuContainer").css("width", "220px");
            $("#CompanySmallLogoImage").css("display", "block");
            $("#leftMenuContainer").css("background-color", "white");
            $("#ExpandCollapseButton").css("color", "#2c3e50");

            $("#ChatStatisticsDiv").css("display", "block");
            $("#SearchMenuItemsDiv").css("display", "block");
        }
        $("#page-wrapper.nav-small #sidebar-nav > .nav-pills > li").trigger("mouseleave");

        //fixed panels
        //if ($('#page-wrapper').hasClass('nav-small')) {
        //    //colapsed menu
        //    $(".tpPanel-primmary-Fixed").addClass("tpPanel-primmary-Fixed-LefMenu");
        //}
        //else {
        //    //expanded menu
        //    $(".tpPanel-primmary-Fixed").removeClass("tpPanel-primmary-Fixed-LefMenu");
        //}

    });

    //$(".navbar-toggle").click(function () {
    //    $(".collapse.in").css("width", ($("body").first().width()) + "px");
    //});


    $("#ExpandCollapseButton").click(function (event) {
        event.preventDefault();
        $('#make-small-nav').click();
    });

    $(window).smartresize(function () {
        if ($(document).width() <= 991) {
            $('#page-wrapper').removeClass('nav-small');
            $("#leftMenuContainer").hide();
        }
        else {
            $("#leftMenuContainer").show();
        }


        var i;
        var iframe;
        var obj;
        var h;
        var screenHeight;

        for (i = 0; i <= WindowCollectionObserverResizeFS.length - 1; i++) {
            try {

                obj = WindowCollectionObserverResizeFS[i];
                iframe = document.getElementById("TPCLIENT_MODAL_TS_myIframe_" + obj.mControlIndex);

                screenHeight = $(window.top).height();
                h = ((screenHeight - 100 - 30) * 100 / screenHeight);
                if (screenHeight - 100 - 30 < 100) {
                    h = 25;
                }

                iframe.style.height = h.toString() + "%";

            } catch (ex) { }
        }

        ////fixed panels
        //if ($('#page-wrapper').hasClass('nav-small')) {
        //    $(".tpPanel-primmary-Fixed").addClass("tpPanel-primmary-Fixed-LefMenu");
        //}
        //else {
        //    $(".tpPanel-primmary-Fixed").removeClass("tpPanel-primmary-Fixed-LefMenu");
        //}

        //TPClient.MainPage.ResizeAllTabs();

    });

    $('.mobile-search').click(function (e) {
        e.preventDefault();

        $('.mobile-search').addClass('active');
        $('.mobile-search form input.form-control').focus();
    });
    $(document).mouseup(function (e) {
        var container = $('.mobile-search');

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass('active');
        }
    });

    $('.fixed-leftmenu #col-left').nanoScroller({
        alwaysVisible: true,
        iOSNativeScrolling: false,
        preventPageScrolling: false,
        contentClass: 'col-left-nano-content'
    });

    window.setInterval(function () {
        $(".fixed-leftmenu #col-left").nanoScroller();
        var toSum = 0;
        if (detectIE()) {
            toSum = 19;
        }
        $(".collapse.in").css("width", ($("body").width() - toSum) + "px");
    }, 300);


    // build all tooltips from data-attributes
    //$("[data-toggle='tooltip']").each(function (index, el) {
    //	$(el).tooltip({
    //		placement: $(this).data("placement") || 'top'
    //    });
    //});
}
//});

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

var hasScrollbar = function () {
    // The Modern solution
    if (typeof window.innerWidth === 'number')
        return window.innerWidth > document.documentElement.clientWidth

    // rootElem for quirksmode
    var rootElem = document.documentElement || document.body

    // Check overflow style property on body for fauxscrollbars
    var overflowStyle

    if (typeof rootElem.currentStyle !== 'undefined')
        overflowStyle = rootElem.currentStyle.overflow

    overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow

    // Also need to check the Y axis overflow
    var overflowYStyle

    if (typeof rootElem.currentStyle !== 'undefined')
        overflowYStyle = rootElem.currentStyle.overflowY

    overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY

    var contentOverflows = rootElem.scrollHeight > rootElem.clientHeight
    var overflowShown = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle)
    var alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll'

    return (contentOverflows && overflowShown) || (alwaysShowScroll)
}

$.fn.removeClassPrefix = function (prefix) {
    this.each(function (i, el) {
        var classes = el.className.split(" ").filter(function (c) {
            return c.lastIndexOf(prefix, 0) !== 0;
        });
        el.className = classes.join(" ");
    });
    return this;
};

(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');