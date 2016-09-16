(function () {
  function addEvent(obj, type, fn) {
    if (obj.attachEvent) {
      obj['e' + type + fn] = fn;
      obj[type + fn] = function () {
        obj['e' + type + fn](window.event);
      };
      obj.attachEvent('on' + type, obj[type + fn]);
    } else {
      obj.addEventListener(type, fn, false);
    }
  }

  function getScrollY() {
    var scrOfY = 0;
    if (typeof(window.pageYOffset) == 'number') {
      //Netscape compliant
      scrOfY = window.pageYOffset;
    } else if (document.body && document.body.scrollTop) {
      //DOM compliant
      scrOfY = document.body.scrollTop;
    }
    return scrOfY;
  }

  function initScroll() {
    var startpostion = false;
    var postion = [];
    var box = document.querySelectorAll('div.box');
    for (var i = 0; i < box.length; i++) {
      var temp = {
        dom: box[i],
        top: box[i].offsetTop
      };
      postion.push(temp);
    }
    addEvent(window, 'scroll', function (event) {
      var y = getScrollY();
      if (!startpostion) {
        startpostion = y;
      } else {
        var distance = startpostion - y;
        if (Math.abs(distance) >= 300) {
          console.log(startpostion, y);
          startpostion = false;
          if (distance > 0)  {
            console.log('to top');
            for (var j = 0; j < postion.length; j++) {
             if (postion[j].top < y && postion[j].top > (y - 600)) {
               console.log('in top');
               $('html, body').animate({ scrollTop: postion[j].top }, 'fast');
             }
            }
          } else {
            console.log('to bottom');
            for (var j = 0; j < postion.length; j++) {
              if (postion[j].top > y && postion[j].top < (y + 600)) {
                console.log('in bottom');
                $('html, body').animate({ scrollTop: postion[j].top  }, 'fast');
              }
            }
          }
        }
      }
    });
  }

  initScroll();
})();