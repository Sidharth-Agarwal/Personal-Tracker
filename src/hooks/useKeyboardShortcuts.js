import { useEffect } from 'react';

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore shortcuts when user is typing in an input field
      const target = event.target;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Check each shortcut
      shortcuts.forEach(({ key, ctrl, shift, alt, callback }) => {
        const ctrlMatch = ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
        const altMatch = alt ? event.altKey : !event.altKey;
        const keyMatch = event.key.toLowerCase() === key.toLowerCase();

        // Only trigger if matches AND (not typing OR has modifier key like ctrl)
        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          // Allow shortcuts with modifiers (ctrl, alt, shift) even when typing
          // Block shortcuts without modifiers when typing
          if (isTyping && !ctrl && !alt && !shift) {
            return;
          }

          event.preventDefault();
          callback(event);
        }
      });
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
