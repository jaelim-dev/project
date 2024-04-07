$(function(){	
	var link = $('a.default');
	var main = $('main > article');
	var home = $('#home');
	var about = $('#about');
	
	about.hide();
	
	link.click(function(event){
		$('header').addClass('header-down');
		$('header').removeClass('header-up');
		
		event.preventDefault();
		
		var linkP = $(this);
		var mainP = $(linkP.attr('href'));
		
		link.removeClass('active');
		linkP.addClass('active');
		
		main.hide();
		mainP.fadeIn(800);
		
		if ( linkP.is('.logo') ) {
			$('.logo').removeClass('active');
			$('.home').addClass('active');
		} else if ( linkP.is('.more') ) {
			$('.more').removeClass('active');
			$('.about').addClass('active');
		}
	});
			
// 	HEADER SCROLLING
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('header').outerHeight();
	
	$(window).scroll(function(event){
		didScroll = true;
	});
	
	setInterval(function(){
		hasScrolled();
		didScroll = false;
	}, 250);
	
	function hasScrolled() {
		var st = $(this).scrollTop();
		
		if (Math.abs(lastScrollTop - st) <= delta) {
			return;
		}
		
		if (st > lastScrollTop && st > navbarHeight) {
			$('header').removeClass('header-down').addClass('header-up');	
		} else {
			if (st + $(window).height() < $(document).height()) {
				$('header').removeClass('header-up').addClass('header-down');
			}
		}
		
		lastScrollTop = st;
	}

//PORTFOLIO

	var thumbList = $('.thumb-list ul li');
								
	var newLayer = $('.newlayer');
	var layerList = newLayer.find('> ul > li');

	var current = 0;

	layerList.hide();

	thumbList.click(function(){
		$('body').css('overflow','hidden');
		
		newLayer.show();
		
		$('.curtainOff').addClass('curtainOn');
		
		var thumb = $(this);
		var i = thumb.index();

		openLayer(i);
	});

	function openLayer(i){
		var currentList = layerList.eq(current);
		var nextList = layerList.eq(i);
		
		currentList.css('display','none');
		nextList.css('display','block');
		
		current = i;
		
		nextList.find('article').scrollTop(0,0);
		
		onOff();
	}

	$('#btnNext').on('click', function(){
		var prev = layerList.eq(current);
		prev.hide();
		
		current++;
		
		var next = layerList.eq(current);
		next.show();
		next.find('article').scrollTop(0,0);
		
		onOff();
	});

	$('#btnPrev').on('click', function(){
		var prev = layerList.eq(current);
		prev.hide();
		
		current--;
		
		var next = layerList.eq(current);
		next.show();
		next.find('article').scrollTop(0,0);
		
		onOff();
	});

	function onOff() {
		$('#question' + current).css('display', 'block');
		
		if(current == 7) {
			$('#btnNext').css('display', 'none');
		} else {
			$('#btnNext').css('display', 'block');
		}
		if(current > 0) {
			$('#btnPrev').css('display', 'block');
		} else {
			$('#btnPrev').css('display', 'none');
		}
	}

	$('#btnClose').click(function(){
		leaveLayer();
	});

	$('.curtainOff').click(function(){
		leaveLayer();
	});

	function leaveLayer() {
		$('body').css('overflow','inherit');
		newLayer.hide();
		layerList.hide();
		
		$('.curtainOff').removeClass('curtainOn');
		
		$('header').removeClass('header-up');
	}

// HOVER EFFECT
	$(function(){
		var colors = [
			'#ffda7c',
			'#8edecb',
			'#D4CAFB',
			'#fcb9ca',
			'#A8E0F4'
		]
		
		var colori = 0;
		
		$('#about .cover li').hover(function(){
			$(this).css({
				'background': colors[colori]
			});
			
			colori++;
			
			if(colori >= colors.length) colori = 0;
		}, function(){
			$(this).css({
				'background': 'inherit'
			});
		});
	});

// 	MOBILE UI
	$('header .mobile-menu').hide();
	$('header .mobile-home').hide();
	
	$(window).on('resize',function(){     
		mobileWeb();
		$('header').removeClass('header-up');
	});
	
	$(window).trigger('resize');
    
    $('header .mobile-menu').click(function(){
	    $(this).parents('.mobile').addClass('open');
    });
    
    $('header .mobile-menu-close').click(function(){
	    $(this).parents('.mobile').removeClass('open');
    });
    
    $('header nav .default').click(function(){
	    $(this).parents('.mobile').removeClass('open');
    });
	
	function mobileWeb() {
		if ($(window).width() <= 767){
			
			$('header').addClass('mobile');
			$('header .mobile-menu').show();
			$('header .mobile-home').show();
		    
        } else {
	        
	        $('header .mobile-menu').hide();
	        $('header .mobile-home').hide();
	        $('header').removeClass('mobile');
	        $('header').removeClass('open');
	        $('.page').show();
        }
	}
});