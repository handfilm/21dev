// Minimal CDP driver: navigate, wait real time, collect console/page errors,
// report computed opacity of motion elements, screenshot.
const [, , url, outPath, waitMs = "4000"] = process.argv;

const targets = await (await fetch("http://127.0.0.1:9222/json/list")).json();
const page = targets.find((t) => t.type === "page");
if (!page) throw new Error("no page target");

const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const logs = [];

const send = (method, params = {}) =>
  new Promise((res) => {
    const msgId = ++id;
    pending.set(msgId, res);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
    return;
  }
  if (m.method === "Runtime.consoleAPICalled") {
    logs.push(`[console.${m.params.type}] ${m.params.args.map((a) => a.value ?? a.description ?? "").join(" ")}`);
  }
  if (m.method === "Runtime.exceptionThrown") {
    logs.push(`[pageerror] ${m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text}`);
  }
};

await new Promise((r) => (ws.onopen = r));
await send("Page.enable");
await send("Runtime.enable");
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, Number(waitMs)));

const probe = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return sel + ' => MISSING';
      const cs = getComputedStyle(el);
      return sel + ' => opacity=' + cs.opacity + ' transform=' + cs.transform + ' visible=' + (el.getBoundingClientRect().height > 0);
    };
    return {
      hydrated: !!document.querySelector('h1'),
      io: typeof IntersectionObserver,
      results: [
        pick('h1'),
        pick('h1 span'),
        pick('article'),
        pick('section > div > span'),
      ],
      h1text: document.querySelector('h1')?.textContent?.trim().slice(0,60),
      bodyText: document.body.innerText.trim().slice(0, 200),
    };
  })()`,
});

console.log(JSON.stringify(probe.value, null, 2));
console.log("--- logs ---");
console.log(logs.length ? logs.join("\n") : "(none)");

const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
const { writeFileSync } = await import("node:fs");
writeFileSync(outPath, Buffer.from(shot.data, "base64"));
console.log("--- wrote", outPath);
ws.close();
