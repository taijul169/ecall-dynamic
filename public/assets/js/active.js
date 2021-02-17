
$(document).ready(function () {
     // testimonial-owl-slider-active------
     $('.specialities-slider-wrapper').owlCarousel({
        loop:true,
        margin:0,
        responsiveClass: true,
        responsive:{
            0:{
                items:1,
                nav: true,
                dots:false
            },
            600:{
                items:3,
                nav: false,
                dots:true,
                autoplay:true
            },
            1000:{
                items:5,
                nav:false,
                loop: true,
                dots:true,
                autoplay:false

            },
            1400:{
                items:6,
                nav:false,
                loop: true,
                dots:true,
                autoplay:false
            }
        }
    });
     // testimonial-owl-slider-active------
     $('.doctorlist-slider-wrapper').owlCarousel({
        loop:true,
        margin:10,
        responsiveClass: true,
        responsive:{
            0:{
                items:1,
                nav: true,
                dots:false
            },
            600:{
                items:2,
                nav: false,
                dots:true,
                autoplay:true
            },
            1000:{
                items:3,
                nav:false,
                loop: true,
                dots:true,
                autoplay:false

            },
            1400:{
                items:3,
                nav:false,
                loop: true,
                dots:true,
                autoplay:false
            }
        }
    });
        // counter-activatioin--------------
        $('.counter').counterUp({
            delay: 10,
            time: 1000,
            triggerOnce:true
        });

   // sticky nav-area-start------------------------- 
    $(window).scroll(function () {
        var topPosition = $(document).scrollTop();
        if (topPosition > 100) {
            $('header').addClass("fixed-nav");
            // $('.logo-area h4').css("color", "#000");
            // $('.menu-icon i').css("color", "#000");
        }
        else {
            $('header').removeClass("fixed-nav");
            // $('.logo-area h4').css("color", "#FFF");
            //  $('.menu-icon i').css("color", "#FFF");
        }
    });
      // menu-controler
      $('.nav-menu-icon').click(()=>{
    $('.header-nav nav').toggleClass('mean-menu');
        
    });
    // sidebar-controller----------------
      $('.sidebar-open-icon').click(()=>{
        $('nav').addClass('sideNav-open');   
       });
       $('.close-btn').click(()=>{
         $('nav').removeClass('sideNav-open');   
      });

    //   sticky-filter-search
    $(".search-filter-wrapper").sticky({bottomSpacing:450,topSpacing:80});
    $(".dash-left").sticky({bottomSpacing:500,topSpacing:80});

    // form-lebel-floating
    $(".form-group input").blur(function(){
        if($(this).val()!= ""){
            $(this).siblings("label").addClass("active");
        }
        else{
            $(this).siblings("label").removeClass("active");
        }
    });
    // nav-link-active
	$(".doc-dash-page-link .nav-item a").click(function(event) { 
        var $this = $(this);
        $(".doc-dash-page-link .nav-item a").removeClass("active");  
         $this.removeClass('active');
         $($this).addClass("active"); 
     });


    //  alert auto-close
    $(".alert").delay(5000).slideUp(200, function () {
        $(this).alert('close');
    });




    // // top-scroll-button-active---------------------
    // $(window).scroll(function () {
    //     if ($(window).scrollTop() > 200) {
    //         $(".scroll-top-indicator").fadeIn(); 
    //     }
    //     else {
    //         $(".scroll-top-indicator").fadeOut();
    //     }
    // });

    //  $(".scroll-top-indicator").click(function () {
    //     $("html").animate({ scrollTop: 0 },2000);
    //  });
   
    // var heroSlider = $('.hero-content-info-wrapper');

    // // owl-carousel-caption-animation------------------
    //  heroSlider.on('changed.owl.carousel', function (event) {
    //     var item = event.item.index - 2;
    //     $('.hero-content-text h5,h1').removeClass('animate__animated animate__fadeInDown');
    //     $('.owl-item').not('.cloned').eq(item).find('.hero-content-text h5,h1').addClass('animate__animated animate__fadeInDown');
    //     $('.common-button-two').removeClass('animate__animated animate__fadeInDown');
    //     $('.owl-item').not('.cloned').eq(item).find('.common-button-two').addClass('animate__animated animate__fadeInDown');
    //      $('.hero-content-right').removeClass('animate__animated animate__flipInY');
    //     $('.owl-item').not('.cloned').eq(item).find('.hero-content-right').addClass('animate__animated animate__flipInY');
    // });

      
 
    // apply-button-scroll------
//     $('.down-indicator').click(function () {  
//         $("html").animate({
//             scrollTop: 640}, 1000);
//     });
//     // scroll-nav-activation--------
//     $('#custom-nav').onePageNav({
// 	currentClass: 'active',
// 	changeHash: false,
// 	scrollSpeed: 750,
// 	scrollThreshold: 0.5,
// 	filter: '',
// 	easing: 'swing',
// });
//     // Filter Gallery
//     $('.itm-list').click(function () {
//         const value = $(this).attr('data-filter');
//         if (value == 'all') {
//             $('.single-item').show('1000');
//         }
//         else {
//             $('.single-item').not('.' + value).hide('1000');
//             $('.single-item').filter('.' + value).show('1000');
//         }
//     });
//     $('.itm-list').click(function () {
//         $(this).addClass('active').siblings().removeClass('active');
//     });


//     // filter-gallery-activation
//     // As A jQuery Plugin -->
//     // responsive-navbar-toggle----------------------
//     // $('.threebarBtn').click(function () {
//     //     $('.nav-header').toggleClass('displayNav');
//     // });



//     // sideBar-controler
//     $('.sidebar-controler').click(() => {
//         $('.sidebar-controler').toggleClass('closeBtn');
//         $('.sidebar-home').toggleClass('closeBtn');
//         $('.margin-left-300').toggleClass('closeBtn');
//     });
//     // preloader-activation------------------------
//     $('.preloader').css('display', 'none');
//     // nivo-slider-activation
//     // $('#slider').nivoSlider();
    
});

