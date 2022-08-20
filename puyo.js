var buttonsOld = new Set();
var buttonsNew = new Set();
var padLeft = 14;
var padRight = 15;
var padUp = 12;
var padDown = 13;
var padA = 0;
var padB = 1;
var padStart = 9;
var padSelect = 8;
function update() {
  buttonsOld = new Set(Array.from(buttonsNew));
  buttonsNew.clear();
  var pads = navigator.getGamepads();
  var pad = pads[0];
  if (pad != null) {
    for (var i = 0; i < pad.buttons.length; ++i) {
      if (pad.buttons[i].pressed) {
        buttonsNew.add(i);
      }
    }
  }
  if (simData.getRensaFlag()) {
    return;
  }
  if (!buttonsOld.has(padA) && buttonsNew.has(padA)) {
    simToko.rotate(-1);
  } else if (!buttonsOld.has(padB) && buttonsNew.has(padB)) {
    simToko.rotate(1);
  } else if (!buttonsOld.has(padUp) && buttonsNew.has(padUp)) {
    $('#toko_back_button').click();
  } else if (!buttonsOld.has(padDown) && buttonsNew.has(padDown)) {
    $('#move_down_button').click();
  } else if (!buttonsOld.has(padSelect) && buttonsNew.has(padSelect)) {
    simToko.retryTokopuyo();
  } else if (!buttonsOld.has(padStart) && buttonsNew.has(padStart)) {
    simToko.startTokopuyo();
  }
  if (!buttonsOld.has(padLeft) && buttonsNew.has(padLeft)) {
    simToko.move(-1);
  } else if (!buttonsOld.has(padRight) && buttonsNew.has(padRight)) {
    simToko.move(1);
  }
}
setInterval(update, 16.6);
const iframe = $('<iframe>', {
  id: 'hoge',
  src: 'http://www.puyop.com/s/_ni4c8woq8Ego5ckk1a9Q0u6Gf83wiungnuoG6c1KjQ3Q0M6MgEjAiwnogk9qnEnwoE088q8si050',
  scrolling: 'no',
}).css({
  position: 'fixed',
  'z-index': 1,
  width: '290px',
  height: '490px',
  right: 0,
  bottom: 0,
});

$('body').append(iframe);
$('#hoge').load(function () {
  $('body,html', $('#hoge').contents()).animate({ scrollTop: 65 });
});

let i = 0;

document.addEventListener(
  'click',
  function (e) {
    if (e.target.id === 'move_down_button') {
      if (i > 0) {
        $('#hoge').contents().find('#puyo_history_forward_button').click();
      }
      i++;
    } else if (e.target.id === 'toko_back_button') {
      if (i > 0) {
        $('#hoge').contents().find('#puyo_history_back_button').click();
      }
      i--;
    }
  },
  false
);
