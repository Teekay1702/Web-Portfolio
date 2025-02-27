const hamburger = document.querySelector('.hamburger');
const tabs = document.querySelector('.tabs');
const closebtn = document.querySelector('.close-btn');
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotContainer = document.getElementById("chatbotContainer");
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const questionButtons = document.querySelectorAll(".question-btn");

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('bx-x');
    tabs.classList.toggle('active');
});

closebtn.addEventListener('click', () => {
    tabs.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
    const chatboxIcon = document.getElementById("chatboxIcon");
    const chatbot = document.getElementById("bot");
    const chatbox = document.getElementById("chatbox");
    const chatOptions = document.getElementById("chat-options");
    const closeChatButton = document.getElementById("close");
    const clearChatButton = document.getElementById("menu");

    function displayMessage(message, isUserMessage = false, callback) {
        const p = document.createElement("p");
        p.classList.add(isUserMessage ? "user-message" : "bot-message");

        chatbox.appendChild(p);
        chatbox.scrollTop = chatbox.scrollHeight;

        if (message.includes("<a")) {
            p.innerHTML = message;
            if (callback) setTimeout(callback, 500);
        } else {
            typeWriter(message, p, callback);
        }
    }

    function typeWriter(text, element, callback) {
        let index = 0;
        const typingSpeed = 60;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    function showOptions(options) {
        chatOptions.innerHTML = "";
        options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option.text;
            button.addEventListener("click", function () {
                displayMessage(`You: ${option.text}`, true);
                setTimeout(() => {
                    displayMessage(option.response);
                    if (option.followUp) {
                        showOptions(option.followUp);
                    }
                }, 500);
            });
            chatOptions.appendChild(button);
        });
    }

    function handleUnknownQuestion() {
        displayMessage("I’m not sure how to answer that. Can you try something else?");
    }

    function processUserQuestion(inputText) {
        const recognizedOptions = {
            " Who is the owner of the web-portfolio? ": "He is Tokoloho Lekoro. A Software Developer.",
            " What does he do? ": "He specializes in building Mobile and Web applications",
            " What is his specialty? ": "He specializes in C#, Flutter, Dart, HTML, CSS and JavaScript.",
            " Industry Experience ": "He is still learning and gaining experience.",
            " How can i contact you ": "You can contact me via email, phone, or LinkedIn."
        };

        const response = recognizedOptions[inputText.toLowerCase()];
        if (response) {
            displayMessage(response);
        } else {
            handleUnknownQuestion();
        }
    }

    chatboxIcon.addEventListener("click", function () {
        chatbot.style.display = "block";
        chatboxIcon.style.display = "none";
        startChat();

    });

    function startChat() {
        chatboxIcon.innerHTML = "";
        displayMessage("Hello, This is Maverick. How can I help you?", false, function () {
            showOptions([
                { text: "Who is the owner of the web-portfolio? ", response: "He is Tokoloho Lekoro. A Software Developer." },
                { text: "What does he do?", response: "He specializes in building Mobile and Web applications" },
                { text: "What is his specialty? ", response: "He specializes in C#, Flutter, Dart, HTML, CSS and JavaScript." },
                { text: "Industry Experience ", response: "He is still learning and gaining experience." },
                {
                    text: "How can I contact you?",
                    response: "How would you like to contact me?",
                    followUp: [
                        { text: "Email", response: `You can contact him via email: <a href="mailto:tokoloho57@gmail.com">tokoloho57@gmail.com</a>.` },
                        { text: "Personal Number", response: "You can contact him via Phone Number: 0849992284." },

                    ]

                },
            ]);
        });
    }


    closeChatButton.addEventListener("click", function () {
        chatbot.style.display = "none";
        chatboxIcon.style.display = "block";
        chatbox.innerHTML = "";
    });


    clearChatButton.addEventListener("click", function () {
        chatbox.innerHTML = "";
        startChat();
    });


    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && chatOptions.children.length === 0) {
            const userQuestion = chatbox.lastElementChild.textContent.replace("You: ", "").trim();
            processUserQuestion(userQuestion);
        }
    });
});






