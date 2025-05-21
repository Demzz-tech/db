// Chat functionality for DevBlaze website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat components
    initChat();
});

function initChat() {
    const chatButton = document.querySelector('.chat-button');
    const chatContainer = document.querySelector('.chat-container');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');

    // Toggle chat interface when chat button is clicked
    chatButton.addEventListener('click', function() {
        chatContainer.classList.add('active');
        chatInput.focus();
    });

    // Close chat interface when close button is clicked
    chatClose.addEventListener('click', function() {
        chatContainer.classList.remove('active');
    });

    // Send message when send button is clicked or Enter key is pressed
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Function to send a message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Send message to OpenAI API
            sendMessageToAI(message)
                .then(response => {
                    // Remove typing indicator
                    removeTypingIndicator();
                    
                    // Add AI response
                    addMessage(response, 'bot');
                })
                .catch(error => {
                    // Remove typing indicator
                    removeTypingIndicator();
                    
                    // Add error message
                    addMessage("I'm sorry, I encountered an error. Please try again later.", 'bot');
                    console.error("Error:", error);
                });
        }
    }

    // Function to add a message to the chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        typingIndicator.id = 'typing-indicator';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Add initial welcome message
    setTimeout(() => {
        addMessage("👋 Hi there! I'm DevBlaze's AI assistant. How can I help you today?", 'bot');
    }, 1000);
}

// Function to send message to OpenAI API
async function sendMessageToAI(message) {
    try {
        // This is a placeholder for the actual API call
        // In production, this would be replaced with a server-side API call
        // to protect your API key
        
        // For demonstration purposes, we're showing how the API would be called
        // but not actually making the call from the client side
        
        /*
        const client = new OpenAI({
            baseURL: "https://models.inference.ai.azure.com",
            apiKey: process.env["GITHUB_TOKEN"] // API key would be securely stored
        });

        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant for DevBlaze Digital Agency. Provide concise, professional responses about our digital marketing, web design, branding, and content creation services." },
                { role: "user", content: message }
            ],
            model: "gpt-4o",
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1
        });

        return response.choices[0].message.content;
        */
        
        // For now, return a simulated response
        console.log("Message sent to AI:", message);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Return simulated response based on user input
        if (message.toLowerCase().includes("pricing") || message.toLowerCase().includes("cost")) {
            return "Our pricing varies based on project scope and requirements. For website design, packages start at $2,500. For digital marketing, monthly retainers start at $1,500. Would you like to schedule a consultation for a custom quote?";
        } else if (message.toLowerCase().includes("contact") || message.toLowerCase().includes("email") || message.toLowerCase().includes("phone")) {
            return "You can reach our team at contact@devblaze.com or call us at (555) 123-4567. Our office hours are Monday-Friday, 9am-5pm EST. Would you like me to have someone contact you directly?";
        } else if (message.toLowerCase().includes("service") || message.toLowerCase().includes("offer")) {
            return "DevBlaze offers a full range of digital services including website design & development, brand strategy & identity, digital marketing & SEO, and content creation & copywriting. Which service are you most interested in learning more about?";
        } else {
            return "Thank you for your message. Our team at DevBlaze is dedicated to helping businesses achieve digital excellence. Could you tell me more about your specific needs or questions so I can provide more targeted information?";
        }
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        throw error;
    }
}
