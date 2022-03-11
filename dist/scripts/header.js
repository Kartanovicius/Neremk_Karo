var doc, bod, htm;
addEventListener('load', function(){

  doc = document; bod = doc.body; htm = doc.documentElement;

  if (htm.scrollTop > 1) {
    doc.querySelector('header').classList.add('scroll')
  } else {
    doc.querySelector('header').classList.remove('scroll')
  }


  addEventListener('scroll', function(){
    if (htm.scrollTop > 1) {
      doc.querySelector('header').classList.add('scroll')
    } else {
      doc.querySelector('header').classList.remove('scroll')
    }
  });
  
});