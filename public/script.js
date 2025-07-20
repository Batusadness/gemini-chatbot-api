const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
 
form.addEventListener('submit', async function (e) {
  e.preventDefault();
 
  const userMessage = input.value.trim();
  if (!userMessage) return;
 
  appendMessage('user', userMessage);
  input.value = '';
 
  // Show a thinking indicator
  const thinkingMessage = appendMessage('bot', 'Gemini is thinking...');
 
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const data = await response.json();
    // Update the "thinking" message with the actual reply
    thinkingMessage.textContent = data.reply;
  } catch (error) {
    console.error('Error sending message:', error);
    thinkingMessage.textContent = 'Error: Could not get a response from the server.';
    thinkingMessage.classList.add('error');
  }
});
 
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Return the message element
}
