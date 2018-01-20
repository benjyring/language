(function($) {

"use strict";

// If we run locally, the template path tag won't exist.
var template_path = window.template_path;
template_path = template_path == '{TEMPLATE_PATH}/' ? '' : template_path;

// Helper functions.
function template( tempName ) {
	// Send a class name (no dot) as an argument.
	// Whether the <body> has that class or not will be returned as boolean.
	return $('body').hasClass(tempName);
}

function get_slug() {
	return window.location.pathname.replace(/^\/|\/$/g,'');
}

function slug( slug_name, part ) {

	// Return whether the current page slug contains a given string. Use this for identifying pages to run code.
	if ( part ) {
		var reg = new RegExp( slug_name );
		return reg.test( get_slug() );

	// Return whether the current page matches a given slug. Use this for identifying pages to run code.
	} else {
		return slug_name == get_slug();
	}

}


// Custom code goes here.
$(function() {

// =======
// Print lexicon table from JSON
// =======
	$.getJSON("parts/lexicon.json",
	function (json) {
		var tr;
		for (var i = 0; i < json.length; i++) {
			tr = $('<tr/>');
			tr.append("<td class='word'>" + json[i].word + "</td>");
			tr.append("<td class='englishTranslation'>" + json[i].english_translation + "</td>");
			tr.append("<td class='partOfSpeech'>" + json[i].part_of_speech + "</td>");
			tr.append("<td class='subCategory'>" + json[i].subcategory + "</td>");
			$('table#lexicon tbody').append(tr);
		}
	});

// =======
// Filter Search: Select/Options show/hide
// =======
	$('#partOfSpeech').change(function(){
		var selectId = $('#partOfSpeech option:selected').val();
		$('select.subCategory').hide();

		if (selectId != 'all') {
			$('#lexicon tbody tr').hide();
			$('#lexicon tbody td.partOfSpeech').each(function(i){
				if ($(this).text().toLowerCase() === selectId){
					$(this).parent().show();
				}
			});
		} else {
			$('#lexicon tbody tr').show();
		}
		$('select#' + selectId).show();
	});

	$('select.subCategory').change(function(){
		var subSelectId = $('select.subCategory option:selected').val();
		if (subSelectId != 'all') {
			$('#lexicon tbody tr').hide();
			$('#lexicon tbody td.subCategory').each(function(i){
				if ($(this).text().toLowerCase() === subSelectId){
					$(this).parent().show();
				}
			});
		} else {
			$('#lexicon tbody tr').show();
		}
		$('select#' + subSelectId).show();
	});

// =======
// Append new table row with inputs
// =======
	$('#plus').click(function(){
		$('table#lexicon tbody').append('<tr><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>');
	});
	$('table#lexicon tbody').on('keyup',function(e){
		if (e.which === 13) {
			$('#plus').click();
		}
	});

// =======
// Remove tr
// =======
	$('#minus').click(function(){
		$('table#lexicon tbody tr:last').remove();
	});
	$('#convert').click(function(){
		// Convert table inputs to just td
		$('table#lexicon tbody td input').each(function(){
			var inputText = $(this).val();
			$(this).parent().html(inputText);
		});
	});
	$('#save').click(function(){

// =======
// Save table#lexicon as JSON
// =======
		var rows = [];
		$('table#lexicon tbody tr').each(function(i, n){
			var $row = $(n);
			rows.push({
				word: $row.find('td:eq(0)').text(),
				english_translation: $row.find('td:eq(1)').text(),
				part_of_speech: $row.find('td:eq(2)').text(),
				subcategory: $row.find('td:eq(3)').text(),
			});
		});

		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rows));
		var dlAnchorElem = document.getElementById('save');
		dlAnchorElem.setAttribute("href",     dataStr     );
		dlAnchorElem.setAttribute("download", "lexicon-latest.json");
		dlAnchorElem.click();
	});
});

// If you need to load or unload things based on the current media query, use Enquire:
// http://wicky.nillia.ms/enquire.js
Modernizr.on('load', [

	// Test for placeholder support, IE8 and IE9 doesn't support input placeholders, target it with '.placeholder' and other normal ways to style placeholders.
	{
		test: Modernizr.placeholder,
		nope: template_path + "js/jquery.placeholder.js",
		complete: function() {

			if ( ! Modernizr.placeholder ) {
				$('input[placeholder]').placeholder();
			}

		}
	},

	// Test if polyfill is needed; this is for Enquire support in older browsers.
	{
		test: window.matchMedia,
		nope: template_path + "js/media.match.min.js"
	},

	// Touch devices get enhanced touch support.
	{
		test: Modernizr.touch,
		yep: [ template_path + "js/doubletaptogo.min.js", template_path + "js/fastclick.js" ],
		complete: function() {

			//For touch devices
			if ( Modernizr.touch ) {
				// Hide top panel on mobile devices.
				window.scrollTo(0, 1);

				//Activate double tap to go for dropdown menus
				$(".nav.navbar-nav li:has(ul)").doubleTapToGo();

				//Activate fastclick.js (https://github.com/ftlabs/fastclick)
				FastClick.attach(document.body);
			}

		}
	},

	// Load Enquire.js
	{
		load: template_path + "js/enquire.min.js",
		complete: function() {

			// Set up enquire

		}
	}

]);

}(jQuery));

