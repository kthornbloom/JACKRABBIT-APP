	$(document.body).on('click', '.connection-edit', function (event) {
		$(".connection-list").removeClass().addClass('remove-list');
		$(this).fadeOut(function(){
			$('.connection-edit-2').fadeIn();
		});	
	});

	$(document.body).on('click', '.connection-edit-2', function (event) {
		$(".remove-list").removeClass().addClass('connection-list');
		$(this).fadeOut(function(){
			$('.connection-edit').fadeIn();
		});	
	});

	// Function to check if external image exists
	function checkExists(imageUrl, callback) {
		var img = new Image();
		img.onerror = function() {
			callback(false);
		};
		img.onload = function() {
			callback(true);
		};
		img.src = imageUrl;
	}
	

	function setConnection() {
		var name = $('#con-name').val();
		var url = $('#con-url').val();
		var data = 'http://' + url;
		var auth = ''+data+'/jackrabbit-handshake.gif';
		$('.error-field').removeClass('error-field');
		$('.connection-helper').remove();

		checkExists(auth, function(exists) {
		    if(!exists) {
		    	$('.connections').addClass('shake');
		    	setTimeout(function(){ 
		    		$('.shake').removeClass('shake');
		    	}, 700);
		    	$("#con-url").addClass('error-field');
		    	$("<span class='connection-helper'>This should look something like www.YOURWEBSITE.com</span>").insertAfter("#con-url");
		    } else if(! name) {
		    	$('.connections').addClass('shake');
		    	setTimeout(function(){ 
		    		$('.shake').removeClass('shake');
		    	}, 700);
		    	$("#con-name").addClass('error-field');
		    	$("<span class='connection-helper'>Add a name for this connection</span>").insertAfter("#con-name");
		    } else {
				localStorage.setItem(name, data);
				showConnection();
		    }
		});

	}

	function getConnection() {
		var name = document.forms.editor.name.value;
		document.forms.editor.data.value = localStorage.getItem(name);
		showConnection();
	}

	$(document.body).on('click', '.remove-list a', function(event) {
		event.preventDefault();
		var r = confirm("Are you sure you'd like to remove this?");
		if (r == true) {
		    var name = $(this).html();
		localStorage.removeItem(name);
		showConnection();
		}
		event.stopPropagation();
	});

	$(document.body).on('click', '.connection-list a', function(event) {
		var url = $(this).attr('href');
		$('.connections').animate({
			'zoom': .5,
			'opacity':'0'
		}, 400, 'easeInBack', function () {
			window.location = url
		});
			
		return false;
	});

	function clearAll() {
		var r = confirm("Whoa there, do you really want to clear all connections?");
		if (r == true) {
			localStorage.clear();
			showConnection();
		}
	}

	function showConnection() {
		var key = "";
		var pairs = "";
		var i = 0;
		for (i = 0; i <= localStorage.length - 1; i++) {
			key = localStorage.key(i);
			pairs += "<a href='" + localStorage.getItem(key) + "/admin?app=true'>" + key + "</a>";
		}
		$('.connection-list').html(pairs);
		$('.remove-list').html(pairs);
	}

	showConnection();

