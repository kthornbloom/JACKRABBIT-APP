$('.connection-tabs .tab-content:first').show();
	$(document.body).on('click', '.connection-tabs .tab', function (event) {
		var getIndex = $(this).index();
		$('.connection-tabs .tab-content').hide();
		$('.tab-current').removeClass('tab-current');
		$(this).addClass('tab-current');
		$('.connection-tabs .tab-content:eq('+getIndex+')').show();
		event.preventDefault();
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
		var data = $('#con-url').val();
		var auth = ''+data+'/jackrabbit-handshake.gif';

		checkExists(auth, function(exists) {
		    if(!exists) {
		    	$('.connections').addClass('shake');
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
		var name = $(this).html();
		localStorage.removeItem(name);
		showConnection();		
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
		localStorage.clear();
		showConnection();
	}

	function showConnection() {
		var key = "";
		var pairs = "";
		var i = 0;
		for (i = 0; i <= localStorage.length - 1; i++) {
			key = localStorage.key(i);
			//pairs += "<a href='initial-state.html'>" + key + "</a>";
			// USE THE LINE BELOW FOR ACTUAL LINK
			pairs += "<a href='" + localStorage.getItem(key) + "/admin'>" + key + "</a>";
		}
		$('.connection-list').html(pairs);
		$('.remove-list').html(pairs);
	}

	showConnection();

