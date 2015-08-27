$('.header-video').coverVid(1920, 1080);

$(".header .nav-bar .icon").click(function() {
	$(".header .nav-bar .menu").slideToggle();	
});

$(window).on("resize", function () {
    if ($(window).width() > 568) {
        $('.header .nav-bar .menu').css('display','');
    }
}).resize();


$('#go_contact').click(function(evente){
	event.preventDefault();
	$(".contact a.button").fadeOut(100);
	$("#contact-form").delay(100).slideDown(700);
});

$('.go').click(function(event){
    event.preventDefault();
    href = $(this).attr('href');
    $('body,html').animate({scrollTop: $(href).offset().top}, 1000);
});


// contact form Ajax
$(function() {
    
    var form = $('#contact-form');

    $(form).submit(function(event) {
        event.preventDefault();

		var name = $('#name').val();
	    var email = $('#email').val();
	    var phone = $('#phone').val();
	    var message = $('#message').val();
	    var error = false;

	    if(name == ''){
	    	error = true;
	    	$('#name').focus();
	    }else if(email == ''){
	    	error = true;
	    	$('#email').focus();
	    }else if(phone == ''){
	    	error = true;
	    	$('#phone').focus();
	    }else if(message == ''){
	    	error = true;
	    	$('#message').focus();
	    }

	    if(error == true){
	    	$('#flash-message').text('Please complete all fields');
	    	$('#flash-message').removeClass('success');
    		$('#flash-message').addClass('error');
    		$('#flash-message').fadeIn( 250 );
	    }else{

	        var formData = $(form).serialize();

	        $.ajax({
		        type: 'POST',
		        url: $(form).attr('action'),
		        data: formData,
		        beforeSend:function(){
		            $("#submit-btn").prop('value', 'Sending...');
		        },
		        complete:function(){
                    $("#submit-btn").prop('value', 'Send');
                }
		    })

		    .done(function(response) {

		    	if(response == 'sent'){
		    		//$("#submit-btn").prop('value', 'Send');
		    		$('#flash-message').text('Message sent');
		    		$('#flash-message').addClass('success');
		    		$('#flash-message').fadeIn( 250 );
		    		$('#name').val('');
		    		$('#email').val('');
		    		$('#phone').val('');
		    		$('#message').val('');

		    	}else{
		    		//$("#submit-btn").prop('value', 'Send');
		    		$('#flash-message').text('Message NOT sent');
		    		$('#flash-message').addClass('error');
		    		$('#flash-message').fadeIn( 250 );
		    	}

		    })

		    .fail(function(data) {
		    	//$("#submit-btn").prop('value', 'Send');
		    	$('#flash-message').text('Message NOT sent');
	    		$('#flash-message').addClass('error');
	    		$('#flash-message').fadeIn( 250 );
		    })

		}

	});

});