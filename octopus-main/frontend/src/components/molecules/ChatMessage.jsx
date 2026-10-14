export function ChatMessage({ sender, text }) {
  return (
    <div className="chat-message">
      <strong className="chat-message__sender">{sender}:</strong> {text}
    </div>
  );
}
