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

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    var shuffleCounter = 0;

    function setWords() {
        
        shuffleCounter++;

        var text;

        switch (shuffleCounter % 5) {
            case 0:
                text = "Web Dev";
                //Statements executed when the result of expression matches value1
                break;
            case 1:
                text = "Data Visualization";
                //Statements executed when the result of expression matches value2
                break;
            case 2:
                text = "Physics Jokes";
                //Statements executed when the result of expression matches valueN
                break;
            case 3:
                text = "Electronics Hacking";
                //Statements executed when the result of expression matches valueN
                break;
            case 4:
                text = "Wushu";
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

    // set up the d3 distribution background
    var canvas = d3.select("#distribution");


    // var height = 600;
    // var width = 1600;
    var height = parseInt(canvas.style("height"));
    var width = parseInt(canvas.style("width"));

    canvas.attr('viewbox', '0 0 ' + width + ' ' + height);
    // canvas.attr('viewbox', '0 0 ' + 1600 + ' ' + 600);

    if(width > height) {
        var randomX = d3.random.normal(width / 2, width/10); //normal distribution with mean width/2 and s.d. 100
        var randomY = d3.random.normal(height / 2, height/5.5);
    } else {
        var randomX = d3.random.normal(width / 2, width/5); //normal distribution with mean width/2 and s.d. 100
        var randomY = d3.random.normal(height / 2, height/10);
    }

    //add something to calculate density based on area - number of points



    var points = d3.range(2500).map(function() { return [randomX(), randomY()]; });


    var color = d3.scale.linear()
        .domain([0, 30])
        .range(["white", "orange"])
        .interpolate(d3.interpolateLab);

    var hexbin = d3.hexbin()
        .size([width, height])
        .radius(20);

    canvas.append("clipPath")
        .attr("id", "clip")
      .append("rect")
        .attr("class", "mesh")
        .attr("width", width)
        .attr("height", height);

    canvas.append("g")
        .attr("clip-path", "url(#clip)")
      .selectAll(".hexagon")
        .data(hexbin(points))
      .enter().append("path")
        .attr("class", "hexagon")
        .attr("d", hexbin.hexagon())
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .style("fill", function(d) { return color(d.length); });


    updateDistribution();
    setInterval(updateDistribution, 3000);

   function updateDistribution() {
        // updating the distribution
        height = parseInt(canvas.style("height"));
        width = parseInt(canvas.style("width"));

        if(width > height) {
            randomX = d3.random.normal(width / 2, width/10); //normal distribution with mean width/2 and s.d. 100
            randomY = d3.random.normal(height / 2, height/5.5);
        } else {
            randomX = d3.random.normal(width / 2, width/5); //normal distribution with mean width/2 and s.d. 100
            randomY = d3.random.normal(height / 2, height/10);
        }

        var newPoints = d3.range(2500).map(function() { return [randomX(), randomY()]; });

        var bins = d3.selectAll(".hexagon")
          .data(hexbin(newPoints), function(d) { return d.x + d.y; } );


        bins.transition()
          .duration(1000)
          .delay(function(d, i) { return i * 30; })
          .attr("d", hexbin.hexagon())
          .style("fill", function(d) { return color(d.length); });

        bins.enter().append("path")
          .attr("class", "hexagon")
          .attr("d", hexbin.hexagon())
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
          .style("fill", "white")
            .transition()   
            .duration(1000) 
            .delay(function(d, i) { return i * 30; }) 
          .style("fill", function(d) { return color(d.length); });

        bins.exit()
          .transition()
            .duration(1000)
            .delay(function(d, i) { return i * 30; })
            .remove();


    } 

});

