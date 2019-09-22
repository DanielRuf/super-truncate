function shave(maxLength,maxHeight){
  var elem = document.querySelector('.selector');
  var wrap = document.querySelector('.wrapper');
  var h1 = elem.getBoundingClientRect().height;
  var h2 = wrap.getBoundingClientRect().height;
  var sumLength = 0;
  var sumHeight = 0;
  var sumHeights = [];
  document.querySelectorAll('.selector > *').forEach(function(el){
    sumLength += el.getClientRects().length; // rows
    sumHeight += // el.offsetHeight +
                 Math.ceil(parseFloat(window.getComputedStyle(el)['marginTop'])) +
                 Math.ceil(parseFloat(window.getComputedStyle(el)['marginBottom']));
    
    for(var i = 0; i < el.getClientRects().length; i++){
      // console.log(window.getComputedStyle(el)['lineHeight'])
      sumHeight += el.getClientRects()[i].height;
      sumHeights.push(sumHeight);
    }
  })
  
  // if(h1 > h2 && !$("#read-more, #read-less").length) {
  if (maxHeight) {
    if(sumHeight > maxHeight) {
      if(!$("#read-less").length){
        $('.wrapper').height(maxHeight);
        $('.wrapper').addClass('collapsed');
      }
      if(!$("#read-more, #read-less").length){
        $('<b id="read-more"><br>show more</b>').insertAfter($('.wrapper.collapsed'));
      }
    // } else if(h1 <= h2) {
    } else if(sumHeight <= maxHeight) {
      $('.wrapper').height('');
      $('#read-more, #read-less').remove();
      $('.wrapper').removeClass('collapsed');
    }
  }
  else if (maxLength) {
    if(sumLength > maxLength) {
      if(!$("#read-less").length){
        $('.wrapper').height(sumHeights[maxLength-1]);
        $('.wrapper').addClass('collapsed')
      }
      if(!$("#read-more, #read-less").length){
        $('<b id="read-more"><br>show more</b>').insertAfter($('.wrapper.collapsed'));
      }
    } else if(sumLength <= maxLength) {
      $('.wrapper').height('');
      $('#read-more, #read-less').remove();
      $('.wrapper').removeClass('collapsed');
    }
  }
   if($('.wrapper.uninitialized').length){
    $('.wrapper').removeClass('uninitialized');
  }
}

function truncateIt() {
  shave(3, 105);
}

function handleReadLessMore(event) {
  if (event.target.id) {
    if (event.target.id === 'read-more') {
      $('.wrapper')
        .removeClass('collapsed')
        .end()
        .find('#read-more')
        .replaceWith('<b id="read-less"><br>show less</b>');
      $('.wrapper').height('');
    } else if (event.target.id === 'read-less') {
      $('.wrapper')
        .addClass('collapsed')
        .end()
        .find('#read-less')
        .replaceWith('<b id="read-more"><br>show more</b>');
        truncateIt();
        // shave(3);
    }
  }
}

document.addEventListener('DOMContentLoaded', truncateIt);
window.addEventListener('resize', truncateIt);
window.addEventListener('orientationchange', truncateIt);
document.addEventListener('click', handleReadLessMore);
