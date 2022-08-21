'use strict';

let iframe;
let data;

$(document).ready(function () {
  chrome.storage.local.get('data', (result) => {
    data = result.data || [
      {
        id: 26280,
        text: 'マッキーvsぴぽにあ 第1戦',
        manepuyo:
          'http://www.puyop.com/s/_3uh83scm2I2AaM4cnk38iMi8jCfgfwis2Icuka4MdyoMdqekaInI2MeSfwoMeKascqoQfIdQcAku3i48jm4a3GnC4a3ShGmmim4a2Geamqh0i0',
        tag: ['マッキー', 'GTR', '先折', 'ABACAB']
      },
      {
        id: 25741,
        text: 'マッキーvsぴぽにあ 第2戦',
        manepuyo:
          'http://www.puyop.com/s/_ni4c8woq8Ego5ckk1a9Q0u6Gf83wiungnuoG6c1KjQ3Q0M6MgEjAiwnogk9qnEnwoE088q8si050',
        tag: ['マッキー', 'GTR', '先折', 'ABACBD']
      },
      {
        id: 9690,
        text: 'マッキーvsmomoken 第18戦',
        manepuyo:
          'http://www.puyop.com/s/_6aeS4qeQ4EaA1s6Q9k2semcS4m6clmkm1ae81qcAlIaE6A1KaM5you7glKkIoM4SaQ7qow5q1K40k0',
        tag: ['マッキー', 'GTR', '先折', 'AABCBD']
      }
    ];

    $('.select2')
      .select2({
        data: data,
        templateResult: function (item) {
          const value = $(item.element).val();
          return $(`<span>${item.text}&nbsp;<small>(${value})</small></span>`);
        }
      })
      .on('select2:select', function (e) {
        console.log(e.params.data);
        chrome.storage.local.set({
          puyofu: e.params.data.id,
          manepuyo: e.params.data.manepuyo
        });
      });

    $('#data')
      .find('tbody')
      .append(
        data.map((d) => {
          const tag = d.tag.map((t) => `<span class="tag">${t}</span>`);
          return `<tr><td><a href="${d.manepuyo}" target="_blank">${d.id}</td><td>${tag}</td></tr>`;
        })
      );

    executeScript(init);
  });
});

document.getElementById('btn').addEventListener('click', () => {
  executeScript(show);
});

const executeScript = async (func) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: func
  });
};

const init = () => {
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
  let puyofuNo = 0;

  iframe = document.createElement('iframe');
  iframe.id = 'hoge';
  iframe.scrolling = 'no';
  iframe.style.cssText =
    'position: fixed;' +
    'z-index: 1;' +
    'width: 290px;' +
    'height: 490px;' +
    'right: 0;' +
    'bottom: 0;';

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
      if (puyofuNo > 0) {
        iframe.contentWindow.document
          .getElementById('puyo_history_back_button')
          .click();
      }
      puyofuNo = Math.max(puyofuNo - 1, 0);
    } else if (!buttonsOld.has(padDown) && buttonsNew.has(padDown)) {
      document.getElementById('move_down_button').click();
      if (puyofuNo > 0) {
        iframe.contentWindow.document
          .getElementById('puyo_history_forward_button')
          .click();
      }
      puyofuNo++;
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
};

const show = () => {
  chrome.storage.local.get(['puyofu', 'manepuyo'], (result) => {
    iframe.src = result.manepuyo;
    document.body.appendChild(iframe);
    iframe.onload = function () {
      iframe.contentWindow.scrollTo(0, 65);
    };
    document.getElementById('tokopuyo_button').click();
    document.getElementById('haipuyo_pattern').value = result.puyofu;
    document.getElementById('start_button').click();
  });
};
