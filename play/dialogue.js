export function createDialogueController({ overlay, getDialogue, setActiveFlag, audio }) {
  let active = false;
  let current = null;
  let lineIndex = 0;
  let visibleChars = 0;
  let timer = 0;

  function renderLine() {
    if (!current) return;
    const line = current.lines[lineIndex] || "";
    overlay.innerHTML = `
      <div class="dialogue-speaker">${escapeHtml(current.speaker || "Resume Terminal")}</div>
      <div class="dialogue-line">${escapeHtml(line.slice(0, visibleChars))}</div>
      <div class="dialogue-hint">SPACE / tap to continue</div>
    `;
  }

  function startTyping() {
    clearInterval(timer);
    visibleChars = 0;
    renderLine();
    timer = window.setInterval(() => {
      const line = current && current.lines[lineIndex] ? current.lines[lineIndex] : "";
      visibleChars += 1;
      renderLine();
      if (visibleChars >= line.length) {
        clearInterval(timer);
        timer = 0;
      }
    }, 30);
  }

  function open(dialogueId) {
    const dialogue = getDialogue(String(dialogueId));
    if (!dialogue || !Array.isArray(dialogue.lines) || !dialogue.lines.length) return false;
    current = dialogue;
    lineIndex = 0;
    active = true;
    overlay.classList.remove("hidden");
    setActiveFlag(true);
    if (audio) audio.playSfx("dialogue");
    startTyping();
    return true;
  }

  function close() {
    clearInterval(timer);
    timer = 0;
    active = false;
    current = null;
    lineIndex = 0;
    visibleChars = 0;
    overlay.classList.add("hidden");
    overlay.innerHTML = "";
    setActiveFlag(false);
  }

  function advance() {
    if (!active || !current) return false;
    const line = current.lines[lineIndex] || "";
    if (visibleChars < line.length) {
      clearInterval(timer);
      timer = 0;
      visibleChars = line.length;
      renderLine();
      if (audio) audio.playSfx("advance");
      return true;
    }

    lineIndex += 1;
    if (lineIndex >= current.lines.length) {
      close();
      return true;
    }

    if (audio) audio.playSfx("advance");
    startTyping();
    return true;
  }

  function isActive() {
    return active;
  }

  overlay.addEventListener("click", advance);

  return {
    open,
    close,
    advance,
    isActive
  };
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
