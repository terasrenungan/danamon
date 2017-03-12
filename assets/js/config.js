$(document).ready(function(){

	/**
	*
	* Slideshow
	*
	**/
	
	$('#slideshow .item').css('display', 'none');
	$('#slideshow .item').first().fadeIn().addClass('active');
	var slideInt = setInterval( "slideshow()", 3000);

	$('#slideshow-nav').append(function(){
		var nav = '<ul>';

		for(i=0; i < $('#slideshow .item').length; i++){
			nav += '<li data-id="' + i + '"></li>';
		}
		nav += '</ul>';

		return nav;
	}).css("margin-left", function(){
		return -$(this).width()/2;
	});

	$('#slideshow-nav li').first().addClass('active');

	$('#slideshow-nav li').on('click', function(){

		clearInterval(slideInt);

		$('#slideshow-nav li.active').removeClass('active');
		$(this).addClass('active');

		var index = $(this).data('id');

		$('#slideshow .item.active').fadeOut().removeClass('active');
		$("#slideshow .item:eq(" + index + ")").fadeIn().addClass('active');

		slideInt = setInterval( "slideshow()", 3000);

	});

	/**
	*
	* Scroll to top
	*
	**/
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 50) {
			$('#gototop')
				.fadeIn(500)
				.css('left', $('#container .wrap').offset().left + $('#container .wrap').width() - 61);    // Fade in the arrow
		} else {
			$('#gototop').fadeOut(500);
		}
	});
	$('#gototop').click(function() {
		$('body').animate({
			scrollTop : 0
		}, 500);
	});
});

function slideshow(){
	var $active = $('#slideshow .item.active');
	var $next = $active.next('.item');

	$active.fadeOut().removeClass('active');
	$('#slideshow-nav li.active').removeClass('active');

	if($next.length > 0){
		$next.fadeIn().addClass('active');
	} else {
		$('#slideshow .item').first().fadeIn().addClass('active');
	}

	var activeIndex = $('#slideshow .item.active').index();
	$('#slideshow-nav li:eq(' + activeIndex + ')').addClass('active');

}