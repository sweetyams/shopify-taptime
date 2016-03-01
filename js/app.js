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

button.on('singletap', function(e) {

    console.log('single');
    
    // if set time is successful
    if(final == true){
      window.location = "http://sweetyams.com/clock/";
    }

    // timeout of 200ms to check for double tap
    setTimeout(function(){
        if(clear){
          return false;
        } else {
          if(clicks >= 1 && focus == 1){
            changePeriod();
           }

          // if hours
          if(focus == 2){
            changeHours();
            haschanged = true;
          }

          // if minutes
          if(focus == 3){
            changeMinutes();
          }

          // if first click - start tour
           if(clicks == 0){
            step = 0;
            $('.s9').removeClass('active');
            $('.s0').addClass('active');
            $('.focus1').addClass('focus')
            button.html('Try it now');
           }
           if(clicks == 1){
            step = 1;
            $('.s0').removeClass('active');
            $('.s1').addClass('active');
            button.html('DOUBLE TAP ME');
           }

           // if more than 6 clicks and hour has been changed - tour step 3
           if(clicks > 6 && haschanged == true){
              step = 3;
              $('.s2').removeClass('active');
              $('.s3').addClass('active');
              
           }

           clicks += 1;
        }
      }, 200);

});

button.on('doubletap', function(e) {

    // uses a timout to stop single taps during 200ms of double tap
    clear = true;
    setTimeout(function(){
      clear = false;
    }, 201);
    focus = changeStep(focus);

    if(step == 1 && clicks < 4){
      step = 2;
      $('.s1').removeClass('active');
      $('.s2').addClass('active');
    }

});

button.on('taphold', function(e) {

    counter = 0;

    if(haschanged == true) {

    //start growing circle and interval timer to fire every 100ms
    $('.success').addClass('start');
    interval = setInterval(function() {
        counter += .1;
        counter.toFixed(1)

        //if hours haven't been set - return error
        if (counter >= 1.5 && hours == 0){

          $('.success').removeClass('start').addClass('error');
          clearInterval(interval);

          setTimeout(function(){
            $('.success').removeClass('error');
          }, 500);

        //if press is long enough - success! - set final to make single tap reset
        } else if (counter >= 1.5) {
          
          button.html('Reset');
          button.addClass('green');

          final = true;

          clearInterval(interval);
          $('.final').addClass('done');

        }
    }, 100);

    }

})

button.on('tapend', function(e) {

  // if counter doesn't hit 1.5, reset the growing circle
  if(counter <= 1.4){
    $('.success').removeClass('start');
    clearInterval(interval);
  }

});
}

// Change step between am/pm, hours, and minutes - edits button and changes the stage focus
var changeStep = function(set){

  if(set == 1){
    set = 2;
    $('.time').html('Change Hours');
  } else if (set == 2){
    set = 3;
    $('.time').html('Change Minutes');
  } else if( set == 3){
    set = 1;
    $('.time').html('Change AM / PM');
  }

  $('.stage').removeClass('focus');
  $('.focus'+set).addClass('focus');

  return set;
}

//Change am/pm period - adds active class and sets period in logic object
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

//Change hours - adds active class, splits time into single digits and applies to html
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

//Change minutes - adds active class, splits time into single digits and applies to html
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