$(document).ready(function(){

// =======
// Print lexicon table from JSON
// =======
	$.getJSON("lexicon.json",
	function (json) {
		var tr;
		for (var i = 0; i < json.length; i++) {
			tr = $('<tr/>');
			tr.append("<td class='word'>" + json[i].A + "</td>");
			tr.append("<td class='englishTranslation'>" + json[i].B + "</td>");
			tr.append("<td class='partOfSpeech'>" + json[i].C + "</td>");
			tr.append("<td class='subCategory'>" + json[i].D + "</td>");
			$('table#lexicon').append(tr);
		}
	});

// =======
// Filter Search: Select/Options show/hide
// =======
	$('#partOfSpeech').change(function(){
		var selectId = $('#partOfSpeech option:selected').val();
		$('select.subCategory').hide();

		if (selectId != 'all') {
			$('#lexicon tr').hide();
			$('#lexicon td.partOfSpeech').each(function(i){
				if ($(this).text().toLowerCase() === selectId){
					$(this).parent().show();
				}
			});
		} else {
			$('#lexicon tr').show();
		}
		$('select#' + selectId).show();
	});
});
