<script type="text/javascript">
	function updateQueryStringParameter(uri, key, value) {
	  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	  if (uri.match(re)) {
	    return uri.replace(re, '$1' + key + "=" + value + '$2');
	  }
	  else {
	    return uri + separator + key + "=" + value;
	  }
	}

	function getParameterByName(name, url) {
	  if (!url) url = window.location.href;
	  name = name.replace(/[\[\]]/g, "\\$&");
	  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	      results = regex.exec(url);
	  if (!results) return null;
	  if (!results[2]) return '';
	  return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	function updateUrlOnChange() {
		let newFirstAndLastName = jQuery("div.fpd-text-layer-content textarea").val()
		console.log(newFirstAndLastName, "newFirstAndLastName")
		if(newFirstAndLastName) {
			// If firstandlastname is already present in url then update otherwise insert
			if( getParameterByName("firstandlastname") ) {
				let url1 = updateQueryStringParameter(window.location.href, 'firstandlastname', newFirstAndLastName)
	        	history.pushState({}, "", url1)
			} else {
				history.pushState({}, "", `?firstandlastname=${newFirstAndLastName}`)
			}			
		}

		let mobileNumber = jQuery("div.fpd-text-layer-content input[type='text']").val()
		console.log(mobileNumber, "mobileNumber")
		if(mobileNumber) {
	        let url2 = updateQueryStringParameter(window.location.href, 'telephonenu', mobileNumber)
	        history.pushState({}, "", url2)
	        // If telephonenu is already present in url then update otherwise insert
			if( getParameterByName("telephonenu") ) {
				let url2 = updateQueryStringParameter(window.location.href, 'telephonenu', mobileNumber)
	        	history.pushState({}, "", url2)
			} else {
				history.pushState({}, "", `?telephonenu=${mobileNumber}`)
			}			
		}
	}

	function updateCanvasAfterAjax() {
		let newFirstAndLastName = getParameterByName("firstandlastname");
		let mobileNumber = getParameterByName("telephonenu");
		jQuery("div.fpd-text-layer-content textarea").val(newFirstAndLastName)
		jQuery("div.fpd-text-layer-content input[type='text']").val(mobileNumber)		
		jQuery("div.fpd-text-layer-content input[type='text']").keyup()
		jQuery("div.fpd-text-layer-content textarea").keyup()
	}

	jQuery(document).ready(function() {
		let firstandlastname = getParameterByName("firstandlastname");
		let telephonenu = getParameterByName("telephonenu");
		
		// First time when document load then updating url
		updateUrlOnChange()

		// When input(textarea/text) is change then updating url
		jQuery("div.fpd-text-layer-content input[type='text'], div.fpd-text-layer-content textarea").live('change', function(){
			updateUrlOnChange()
		})

		
		// When variation is changed then update url and value of textfields
		jQuery("ul.color-variable-wrapper li").live("click",function() {
			
		})

		jQuery( document ).ajaxStop(function(){
			console.log("Ajax stopped calling updateCanvasAfterAjax function after 2 sec")
			setTimeout(function(){ 
				updateCanvasAfterAjax()
			}, 2000);
		});
	})
</script>
