'use strict';

document.getElementById('btn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: onRun
  });
});

function onRun() {
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
  let i = 0;
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
    // if (window.simData.getRensaFlag()) {
    //   return;
    // }
    if (!buttonsOld.has(padA) && buttonsNew.has(padA)) {
      document.getElementById('turn_left_button').click();
    } else if (!buttonsOld.has(padB) && buttonsNew.has(padB)) {
      document.getElementById('turn_right_button').click();
    } else if (!buttonsOld.has(padUp) && buttonsNew.has(padUp)) {
      document.getElementById('toko_back_button').click();
      if (i > 0) {
        iframe.contentWindow.document
          .getElementById('puyo_history_back_button')
          .click();
      }
      i = Math.max(i - 1, 0);
    } else if (!buttonsOld.has(padDown) && buttonsNew.has(padDown)) {
      document.getElementById('move_down_button').click();
      if (i > 0) {
        iframe.contentWindow.document
          .getElementById('puyo_history_forward_button')
          .click();
      }
      i++;
    } else if (!buttonsOld.has(padSelect) && buttonsNew.has(padSelect)) {
      document.getElementById('retry_button').click();
    } else if (!buttonsOld.has(padStart) && buttonsNew.has(padStart)) {
      document.getElementById('start_button').click();
    }
    if (!buttonsOld.has(padLeft) && buttonsNew.has(padLeft)) {
      document.getElementById('move_left_button').click();
    } else if (!buttonsOld.has(padRight) && buttonsNew.has(padRight)) {
      document.getElementById('move_right_button').click();
    }
  }
  setInterval(update, 16.6);

  const iframe = document.createElement('iframe');
  iframe.id = 'hoge';
  iframe.src =
    'http://www.puyop.com/s/_ni4c8woq8Ego5ckk1a9Q0u6Gf83wiungnuoG6c1KjQ3Q0M6MgEjAiwnogk9qnEnwoE088q8si050';
  iframe.scrolling = 'no';
  iframe.style.cssText =
    'position: fixed;' +
    'z-index: 1;' +
    'width: 290px;' +
    'height: 490px;' +
    'right: 0;' +
    'bottom: 0;';

  document.body.appendChild(iframe);
  iframe.onload = function () {
    iframe.contentWindow.scrollTo(0, 65);
  };
}
