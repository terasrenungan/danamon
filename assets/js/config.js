$(document).ready(function(){

	/**
	 *
	 * Mobile Toggle Menu
	 *
	 */
	if( $(window).width() < 1200){
		var menuWidth = $(this).width();
		$('#header .menu .level-1').css({'right': -menuWidth});
		$('#icon-menu-responsive').click(function(){
			$(this).toggleClass('open');
			if($(this).hasClass('open')){
				$('#header .menu .level-1').animate({right: "0px"}, 500);
				if($('#sticky-menu').hasClass('open'))
					$('#sticky-menu .glyphicon-remove').trigger('click');
				$('body').addClass('disableScroll');
			} else {
				$('#header .menu .level-1').animate({right: -menuWidth}, 500);
				$('body').removeClass('disableScroll');
			}
		});

		// Submenu
		$('#header .menu .level-1 li').has('ul')
			.append('<div class="arrow-submenu"></div>')
			.click(function(e){
				e.preventDefault();
				$(this).toggleClass('open');
				$(this).find('ul').slideToggle();
			});
	};
	

	/**
	 *
	 * Slideshow
	 *
	 */
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

	$('#slideshow .description').css({'left': function(){
		return $('.wrap').offset().left;
	}});

	/**
	 *
	 * Sidebar Menu
	 *
	 */
	if( $(window).width() < 992){
		$('#sidebar ul').width(function(){
			return $('#sidebar').width() - 40
		})
		$('#selected-sidebar').click(function(){
			$('#sidebar ul').slideToggle();
		})
	}


	/**
	 *
	 * Content Tab
	 *
	 */
	$("#featured-menu .tab-menu").first().addClass('current');
	$(".tab-content").first().css("display", "block");
	$("#featured-menu .tab-menu").click(function(e){
		$(this).addClass('current');
		$(this).siblings().removeClass('current');
		var tab = $(this).attr('id');
		$(".tab-content").not(tab).hide();
		$(tab).fadeIn();
	});

	if( $(window).width() < 992){
		$('#tab-1 .switch-side .pull-right').removeClass('pull-right');
	}


	/**
	 *
	 * Simulation Tab
	 *
	 */
	$("#simulation-content .row").first().css("display", "block");
	$("#simulation-select select").change(function(){
		$("#simulation-content .row").css("display", "none");
		$("#simulation-content #" + this.value).fadeIn();
	});


	/**
	 *
	 * More News AJAX
	 *
	 */
	$("#news-section .col-md-4:gt(2)").hide();
	$("#more-news").click(function(e){
		e.preventDefault();
		$("#news-section .col-md-4:gt(2)").slideDown();
		$("#news-section #more-news").hide();
		$("#news-section .link-page-news").show();
	});


	/**
	 *
	 * Sidebar Submenu
	 *
	 */
	$("#sidebar li.active").children("ul").show();
	// $("#sidebar > ul > li.active > ul > li.active").children("ul").show();
	$("#sidebar > ul > li").has("ul").append('<div class="arrow-submenu"></div>');
	$('#sidebar a').on("click", function(e){
		var _li = $(this).closest('li');
		if(_li.has('ul')){
			e.preventDefault();
			_li.toggleClass('active');
			_li.siblings().removeClass('active').find('ul').slideUp();
			_li.children('ul').slideToggle();
		}
	})


	/**
	 *
	 * Scroll to top
	 *
	 */
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


	/**
	 *
	 * Sticky Menu
	 *
	 */
	if( $(window).width() >= 1200){
		$('#sticky-menu a').click(function(){
			$('#sticky-menu').animate({right: "320px"}, 500);
			$('#container, #footer').animate({right: "400px"}, 500);
			$('#sticky-menu a').removeClass('current').siblings('.content').hide();
			$(this).addClass('current').siblings('.content').show();
		});

		$('#sticky-menu .glyphicon-remove').click(function(){
			$('#sticky-menu').animate({right: "0"}, 500);
			$('#container, #footer').animate({right: "0"}, 500);
			$('#sticky-menu a').removeClass('current');
		});
	} else {
		var windowHeight = $(window).height();
		var headerHeight = $('#header').height() - 5;
		var stickyMenuHeight = $("#sticky-menu").height();
		var stickyContentHeight = windowHeight - headerHeight - stickyMenuHeight;
		$('#sticky-menu .content').css({
			'height': stickyContentHeight,
			'bottom': -stickyContentHeight
		})

		$('#sticky-menu a').click(function(){
			$('#sticky-menu').addClass('open');
			$('body').addClass('disableScroll');
			$('#sticky-menu').animate({top: headerHeight + stickyMenuHeight}, 500);
			$('#sticky-menu a').removeClass('current').siblings('.content').hide();
			$(this).addClass('current').siblings('.content').show();
			$('#header').css({
				'position' : 'fixed',
				'width' : '100%'
			});

			$('#icon-menu-responsive').removeClass('open');
			$('#header .menu .level-1').animate({right: -menuWidth}, 500);
		});

		$('#sticky-menu .glyphicon-remove').click(function(){
			$('#sticky-menu').animate({top: windowHeight - stickyMenuHeight}, 500);
			$('#header').css({'position' : 'relative'});
			$('#sticky-menu').removeClass('open');
			$('body').removeClass('disableScroll');
			$('#sticky-menu a').removeClass('current');
		});
	}


	/**
	 *
	 * Window On Resize
	 *
	 */
	$(window).on('resize', function(){
		if($(this).width() < 1200) {
			$('#header .menu .level-1').css({'right': $(this).width()});
		}
		
		if($(this).width() < 992) {
			$('#tab-1 .switch-side .pull-right').removeClass('pull-right');
		} else {
			$('#tab-1 .switch-side > div').addClass('pull-right');
		}
	})

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
