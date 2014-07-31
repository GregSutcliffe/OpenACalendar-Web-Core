/**
 * @package Core
 * @link http://ican.openacalendar.org/ OpenACalendar Open Source Software - Website
 * @license http://ican.openacalendar.org/license.html 3-clause BSD
 * @copyright (c) 2013-2014, JMB Technology Limited, http://jmbtechnology.co.uk/
 * @author James Baster <james@jarofgreen.co.uk>
*/


$(document).ready(function() {

	$('#SearchField').change(onSearchFormChanged).keyup(onSearchFormKeyUp);

});

var keyUpTimer;

function onSearchFormKeyUp(event) {
	if (event.keyCode != '9') {
		clearTimeout(keyUpTimer);
		keyUpTimer = setTimeout(loadSearchResults, 1000);
	}
}

function onSearchFormChanged() {
	loadSearchResults();
}

var loadSearchResultsAJAX;
var lastFormSerialized = "XXX";

function loadSearchResults() {
	clearTimeout(keyUpTimer);
	var thisFormSerialized = $('#EditEventAreaForm').serialize();
	if (lastFormSerialized == thisFormSerialized) {
		return;
	}
	lastFormSerialized = thisFormSerialized;
	$('#EditEventAreaResults li').remove();
	$("#EditEventAreaResults").prepend('<li class="loading">Loading, please wait ...</li>');
	loadSearchResultsAJAX = $.ajax({
		data: thisFormSerialized,
		dataType: "json",
		url: '/event/'+currentEventSlug+'/edit/area.json',
		success: function(data) {
			var html = '';
			var areas = $.map(data.areas, function(value, index) {
				return [value];
			});;
			areas.sort(function(a,b) {
				if (a.title.toLowerCase() > b.title.toLowerCase()) {
					return 1;
				} else if (a.title.toLowerCase() < b.title.toLowerCase()) {
					return -1;
				} else {
					return 0;
				}
			});
			var html = '';
			for(i in areas) {
				html += '<li class="area">';
				html += '<span class="content">' + escapeHTML(areas[i].title)+(areas[i].parent1title ? ", "+escapeHTML(areas[i].parent1title):'')+'</span>';
				html += '<form action="/event/'+currentEventSlug+'/edit/area" method="post" class="styled">';
				html += '<input type="hidden" name="CSFRToken" value="'+CSFRToken+'">';
				html += '<input type="hidden" name="area_slug" value="' + escapeHTML(areas[i].slug)+'">';
				html += '<div class="actionWrapperBig"><input type="submit" value="Select ' + escapeHTML(areas[i].title)+'"></div>';
				html += '</form>';
				html += '</li>';
			}
			$('#EditEventAreaResults li.loading').remove();
			$("#EditEventAreaResults").prepend(html);
		}
	});

}

