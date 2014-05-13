/**
 * jquery.truncate.js v0.1.0
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Marc D. Brooks
 * https://github.com/markwithasee/truncate
 */

(function($){
	
$.fn.truncate = function(limit) {
    
  var textLimit = (typeof limit === 'undefined') ? 20 : limit;
		
  function shorten (text, limit, prepend, append) {
    if (typeof text !== 'string')
        return '';
    var parts = text.split(' ');
    if (parts.length > limit) {
        for (var i = parts.length - 1; i > -1; --i) {
            if (i+1 > limit) {
                parts.length = i;
            }
        }

        parts.splice(0, 0, prepend);
        
        var lastWord = parts[parts.length-1];
        if( lastWord.indexOf('.') != -1 || lastWord.indexOf('!') != -1 || lastWord.indexOf('?') != -1){
		    parts.push(append);
		}else{
			parts.push(" ... " + append);
		}

    }
    return parts.join(' ');
  }
  
  this.each(function(){
  
    var thisObj = $(this),
        fullText = thisObj.text(),
        moreLink = "<a href='#' class='more'>More &raquo;</a>",
        lessLink = "<a href='#' class='less'>&laquo; Less</a>",
        prepend = '<div class="truncated">',
        append = moreLink + '</div><div class="expanded">' + fullText + ' ' + lessLink + '</div>',
        shortText = shorten(fullText, textLimit, prepend, append);
  
    thisObj.addClass('expand-container')
      .html(shortText)
      .find('.less, .more').on('click',function(e){
        e.preventDefault();
        $(this).closest('.expand-container').find('.truncated, .expanded').toggle();
      });
  
  });
 
  return this;

 };
 
})(jQuery);
