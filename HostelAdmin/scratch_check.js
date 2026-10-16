async function run() {
  const list = await fetch('http://127.0.0.1:9222/json/list').then(r => r.json());
  const page = list.find(p => p.type === 'page' && p.url.includes('localhost:3000'));
  if (!page) {
    console.log('No page found');
    return;
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(res => ws.onopen = res);

  let id = 1;
  function send(method, params = {}) {
    return new Promise(res => {
      const curId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === curId) {
          ws.removeEventListener('message', handler);
          res(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  function rectObj(r) {
    if (!r) return null;
    return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height };
  }

  const evalCode = `(() => {
    function r(el) {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { top: b.top, bottom: b.bottom, left: b.left, right: b.right, width: b.width, height: b.height };
    }
    const footer = document.querySelector('.footer');
    const main = document.querySelector('.main-content');
    const libraryContainer = document.querySelector('.library-container');
    const naac = document.querySelector('.library-container > div:last-child > div:last-child > div:last-child');
    
    return {
      window: { innerWidth: window.innerWidth, innerHeight: window.innerHeight },
      docScroll: { scrollHeight: document.documentElement.scrollHeight, clientHeight: document.documentElement.clientHeight, scrollTop: document.documentElement.scrollTop },
      footerRectAtTop: r(footer),
      libraryContainerRect: r(libraryContainer),
      naacRect: r(naac),
      footerStyle: footer ? {
        display: window.getComputedStyle(footer).display,
        visibility: window.getComputedStyle(footer).visibility,
        opacity: window.getComputedStyle(footer).opacity,
        height: window.getComputedStyle(footer).height,
        marginTop: window.getComputedStyle(footer).marginTop,
        backgroundColor: window.getComputedStyle(footer).backgroundColor
      } : null
    };
  })()`;

  const result = await send('Runtime.evaluate', { expression: evalCode, returnByValue: true });
  console.log('INITIAL AT TOP:\n', JSON.stringify(result.result.value, null, 2));

  // Now scroll to 1000px down (like in the user screenshot)
  const scrollMid = await send('Runtime.evaluate', {
    expression: `(() => {
      function r(el) {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { top: b.top, bottom: b.bottom, width: b.width, height: b.height };
      }
      window.scrollTo(0, 700);
      return {
        scrollTop: window.scrollY || document.documentElement.scrollTop,
        footerRect: r(document.querySelector('.footer')),
        naacRect: r(document.querySelector('.library-container > div:last-child > div:last-child > div:last-child'))
      };
    })()`,
    returnByValue: true
  });
  console.log('AT SCROLL 700px (MIDDLE):\n', JSON.stringify(scrollMid.result.value, null, 2));

  // Now scroll to maximum bottom
  const scrollBot = await send('Runtime.evaluate', {
    expression: `(() => {
      function r(el) {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { top: b.top, bottom: b.bottom, width: b.width, height: b.height };
      }
      window.scrollTo(0, 99999);
      return {
        maxScrollTop: window.scrollY || document.documentElement.scrollTop,
        footerRect: r(document.querySelector('.footer')),
        naacRect: r(document.querySelector('.library-container > div:last-child > div:last-child > div:last-child'))
      };
    })()`,
    returnByValue: true
  });
  console.log('AT MAXIMUM SCROLL (BOTTOM):\n', JSON.stringify(scrollBot.result.value, null, 2));

  ws.close();
}

run().catch(console.error);
