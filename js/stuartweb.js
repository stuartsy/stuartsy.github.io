//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});



//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    var shuffleCounter = 0;

    function setWords() {
        
        console.log(shuffleCounter);
        shuffleCounter++;

        var text;

        switch (shuffleCounter % 3) {
            case 0:
                text = "Algorithms";
                //Statements executed when the result of expression matches value1
                break;
            case 1:
                text = "Data Visualization";
                //Statements executed when the result of expression matches value2
                break;
            case 2:
                text = "Web Development";
                //Statements executed when the result of expression matches valueN
                break;
            default:
                //Statements executed when none of the values match the value of the expression
                break;
        }

        $shuffleContainer.shuffleLetters({
            "text": text
        });
    }

    var $shuffleContainer = $('#shuffle');
    // Shuffle the contents of container
    $shuffleContainer.shuffleLetters()

    setInterval(setWords, 3000);
});

