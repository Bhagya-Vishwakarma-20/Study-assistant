// Global study shortcuts must not fire while the user is typing or holding a modifier.
export function isTypingTarget(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return true;
  }

  const target = event.target as HTMLElement | null;
  if (!target) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "INPUT" ||
    target.tagName === "SELECT"
  );
}
