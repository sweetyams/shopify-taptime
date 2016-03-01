/*!
 * jQuery Double Tap Plugin.
 *
 * Copyright (c) 2010 Raul Sanchez (http://www.appcropolis.com)
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
var clicks = 0,
    step = 0,
    focus = 1,
    logic = {period: "am",hours: 0,minutes: 0,},
    hours = logic.hours, 
    minutes = logic.minutes,
    haschanged,
    clear, 
    counter,
    interval,
    final = false,
    button = $('.time');

if(button.length){

button.singletap(function() { 
    
    if(final == true){
      window.location = "/index.html";
    }

    setTimeout(function(){
        if(clear){
          return false;
        } else {
          if(clicks >= 0 && focus == 1){
            changePeriod();
           }

          if(focus == 2){
            changeHours();
            haschanged = true;
          }

          if(focus == 3){
            changeMinutes();
          }

           if(clicks == 1){
            step = 1;
            $('.s0').removeClass('active');
            $('.s1').addClass('active');
            button.html('DOUBLE TAP ME');
           }

           if(clicks > 6 && haschanged == true){
              step = 3;
              $('.s2').removeClass('active');
              $('.s3').addClass('active');
              
           }

           clicks += 1;
        }
      }, 200);

}).doubletap(function() { 

    clear = true;
        setTimeout(function(){
          clear = false;
        }, 201);

        focus = changeStep(focus);

        if(step == 1 && clicks < 9){
          step = 2;
          $('.s1').removeClass('active');
          $('.s2').addClass('active');
        }
}).taphold(function() {


    counter = 0;

    if(haschanged == true) {

    $('.success').addClass('start');
    interval = setInterval(function() {
        counter += .1;
        counter.toFixed(1)
        if (counter >= 1.5 && hours == 0){
          $('.success').removeClass('start').addClass('error');
          clearInterval(interval);
          setTimeout(function(){
            $('.success').removeClass('error');
          }, 500);
        } else if (counter >= 1.5) {
          
          button.html('Reset');
          button.addClass('green');

          final = true;

          clearInterval(interval);
          $('.final').addClass('done');

        }
    }, 100);

    }

}).tapend(function() {
  if(counter <= 1.4){
    $('.success').removeClass('start');
    clearInterval(interval);
  }

});
}


var changeStep = function(set){
  if(set == 3){
    button.html('Change AM / PM');
    set = 1;
  } else if (set == 1) {
    button.html('Change Hours');
    set = 2;
  } else {
    button.html('Change Minutes');
    set = 3;
  }
  $('.stage').removeClass('focus');
  $('.focus'+set).addClass('focus');
  return set;
}

var changePeriod = function(){
  
  if(logic.period == 'am'){
    logic.period = 'pm';
    $('.period').removeClass('setAM');
    $('.period').addClass('setPM');
  } else {
    logic.period = 'am';
    $('.period').removeClass('setPM');
    $('.period').addClass('setAM');
  } 
}

var changeHours = function(){
  if(hours == 12){
    hours = 1;
  } else {
    hours += 1;
  }
  if(hours <= 9){
    $('.h1').html(0);
    $('.h2').html(hours);
  } else {
    $('.h1').html(1);
    var sethours = hours.toString();
    $('.h2').html(sethours.substring(1,2));
  }
  logic.hours = hours;
}

var changeMinutes = function(){
  if(minutes == 59){
    minutes = 0;
  } else {
    minutes += 1;
  }
  if(minutes <= 9){
    $('.m1').html(0);
    $('.m2').html(minutes);
  } else {
    var setminutes = minutes.toString();
    $('.m1').html(setminutes.substring(0,1));
    $('.m2').html(setminutes.substring(1,2));
  }
  logic.minutes = minutes;
}