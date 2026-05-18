const philosophers = [

{
name:"Marcus Aurelius",
school:"Stoicism",
image:"marcus.png",

intro:`
Roman emperor and Stoic philosopher focused on discipline,
virtue,
mortality,
and inner peace.
`,

topics:[
"Stoicism",
"Discipline",
"Mortality",
"Virtue",
"Self-Control"
],

personality:`
You are Marcus Aurelius.

Speak calmly,
reflectively,
and with dignity.
`
},

{
name:"Osho",
school:"    ",
image:"osho.png",

intro:`
Indian mystic and spiritual teacher known for meditation,
awareness,
freedom,
and challenging social conditioning.
`,

topics:[
"Meditation",
"Awareness",
"Consciousness",
"Freedom",
"Love"
],

personality:`
You are Osho.

Speak poetically,
provocatively,
and conversationally.
`
},

{
name:"Friedrich Nietzsche",
school:"Existentialism",
image:"nietzsche.png",

intro:`
German philosopher known for critiques of conformity,
nihilism,
strength,
and self-overcoming.
`,

topics:[
"Nihilism",
"Strength",
"Suffering",
"Power",
"Individuality"
],

personality:`
You are Friedrich Nietzsche.

Speak intensely and provocatively.
`
},

{
name:"Diogenes",
school:"Cynicism",
image:"diogenes.png",

intro:`
Greek Cynic philosopher famous for mocking society,
luxury,
and hypocrisy.
`,

topics:[
"Simplicity",
"Freedom",
"Society",
"Luxury",
"Honesty"
],

personality:`
You are Diogenes.

Speak sarcastically and brutally honestly.
`
},

{
name:"Albert Camus",
school:"Absurdism",
image:"camus.png",

intro:`
French philosopher and novelist associated with absurdism,
rebellion,
and meaning in a meaningless world.
`,

topics:[
"Absurdism",
"Meaning",
"Freedom",
"Rebellion",
"Suffering"
],

personality:`
You are Albert Camus.

Speak thoughtfully and reflectively.
`
},

{
name:"Socrates",
school:"Classical Greek Philosophy",
image:"socrates.png",

intro:`
Greek philosopher known for questioning assumptions
through dialogue and inquiry.
`,

topics:[
"Truth",
"Questions",
"Wisdom",
"Reason",
"Ethics"
],

personality:`
You are Socrates.

Respond mainly through questions.
`
},

{
name:"Plato",
school:"Platonism",
image:"plato.png",

intro:`
Greek philosopher focused on truth,
ideal forms,
justice,
and the soul.
`,

topics:[
"Truth",
"Ideal Forms",
"Justice",
"The Soul",
"Wisdom"
],

personality:`
You are Plato.

Speak elegantly and philosophically.
`
},

{
name:"Aristotle",
school:"Peripatetic School",
image:"aristotle.png",

intro:`
Greek philosopher focused on logic,
ethics,
reason,
and practical wisdom.
`,

topics:[
"Logic",
"Virtue",
"Reason",
"Ethics",
"Balance"
],

personality:`
You are Aristotle.

Speak logically and systematically.
`
},

{
name:"Immanuel Kant",
school:"Transcendental Idealism",
image:"kant.png",

intro:`
German philosopher known for morality,
reason,
and duty-based ethics.
`,

topics:[
"Morality",
"Duty",
"Reason",
"Freedom",
"Ethics"
],

personality:`
You are Immanuel Kant.

Speak formally and rationally.
`
},

{
name:"Lao Tzu",
school:"Taoism",
image:"laotzu.png",

intro:`
Ancient Chinese philosopher associated with Taoism,
simplicity,
balance,
and natural flow.
`,

topics:[
"Tao",
"Nature",
"Balance",
"Stillness",
"Simplicity"
],

personality:`
You are Lao Tzu.

Speak minimally and poetically.
`
},

{
name:"Vivekananda",
school:"Neo Vedanta",
image:"vivekananda.png",

intro:`
Indian monk and spiritual teacher who introduced Vedanta
and Yoga to the modern world.
`,

topics:[
"Vedanta",
"Strength",
"Discipline",
"Spirituality",
"Self-Confidence"
],

personality:`
You are Swami Vivekananda.

Speak powerfully,
clearly,
and inspirationally.
`
}


];

const welcomeScreen =
document.getElementById("welcome-screen");

const philosopherScreen =
document.getElementById("philosopher-screen");

const chatScreen =
document.getElementById("chat-screen");

const philosopherList =
document.getElementById("philosopher-list");

const enterBtn =
document.getElementById("enter-btn");

const chatMessages =
document.getElementById("chat-messages");

const chatInput =
document.getElementById("chat-input");

const sendBtn =
document.getElementById("send-btn");

const thinking =
document.getElementById("thinking");

const chatPhilosopherName =
document.getElementById("chat-philosopher-name");

const chatPhilosopherSchool =
document.getElementById("chat-philosopher-school");

const chatPhilosopherImg =
document.getElementById("chat-philosopher-img");

const sideMenu =
document.getElementById("side-menu");

const menuBtn =
document.getElementById("menu-btn");

const overlay =
document.getElementById("overlay");

const deleteHistoryBtn =
document.getElementById("delete-history-btn");

const backBtn =
document.getElementById("back-btn");

const modelSelect =
document.getElementById("model-select");

const chatModelSelect =
document.getElementById("chat-model-select");

const infoPanel =
document.getElementById("info-panel");

const closeInfo =
document.getElementById("close-info");

const infoImage =
document.getElementById("info-image");

const infoName =
document.getElementById("info-name");

const infoSchool =
document.getElementById("info-school");

const infoIntro =
document.getElementById("info-intro");

const infoTopics =
document.getElementById("info-topics");

let currentPhilosopher = null;

enterBtn.onclick = ()=>{

welcomeScreen.classList.remove("active");

philosopherScreen.classList.add("active");

};

philosophers.forEach((philosopher)=>{

const card =
document.createElement("div");

card.className =
"philosopher-card";

card.innerHTML = `
<img src="images/${philosopher.image}">
<h3>${philosopher.name}</h3>
<p>${philosopher.school}</p>
`;

card.addEventListener("click",()=>{

currentPhilosopher =
philosopher;

openInfoPanel();

});

philosopherList.appendChild(card);

});

function openInfoPanel(){

infoPanel.classList.add("open");

infoImage.src =
`images/${currentPhilosopher.image}`;

infoName.innerText =
currentPhilosopher.name;

infoSchool.innerText =
currentPhilosopher.school;

infoIntro.innerText =
currentPhilosopher.intro;

infoTopics.innerHTML = "";

currentPhilosopher.topics
.forEach(topic=>{

const tag =
document.createElement("span");

tag.innerText = topic;

infoTopics.appendChild(tag);

});

const existingBtn =
document.getElementById(
"start-chat-btn"
);

if(existingBtn){

existingBtn.remove();

}

const startBtn =
document.createElement("button");

startBtn.id =
"start-chat-btn";

startBtn.className =
"start-chat-btn";

startBtn.innerText =
"Start Conversation";

startBtn.addEventListener("click",()=>{

infoPanel.classList.remove("open");

openChat(currentPhilosopher);

});

infoPanel.appendChild(startBtn);

}

function openChat(philosopher){

currentPhilosopher =
philosopher;

infoPanel.classList.remove("open");

philosopherScreen.classList.remove("active");

chatScreen.classList.add("active");

chatPhilosopherName.innerText =
philosopher.name;

chatPhilosopherSchool.innerText =
philosopher.school;

chatPhilosopherImg.src =
`images/${philosopher.image}`;

loadChatHistory();

}

function getChatKey(){

return `chat_${currentPhilosopher.name}`;

}

function loadChatHistory(){

chatMessages.innerHTML = "";

const savedMessages =
JSON.parse(
localStorage.getItem(getChatKey())
) || [];

savedMessages.forEach((msg)=>{

addMessage(
msg.text,
msg.type,
false,
false
);

});

}

function saveMessage(text,type){

const savedMessages =
JSON.parse(
localStorage.getItem(getChatKey())
) || [];

savedMessages.push({
text,
type
});

localStorage.setItem(
getChatKey(),
JSON.stringify(savedMessages)
);

}

function addMessage(
text,
type,
save=true,
animate=true
){

const messageDiv =
document.createElement("div");

messageDiv.className =
`message ${type}`;

chatMessages.appendChild(messageDiv);

messageDiv.innerText =
text;

chatMessages.scrollTop =
chatMessages.scrollHeight;

if(save){

saveMessage(text,type);

}

}

async function sendMessage(){

const message =
chatInput.value.trim();

if(!message) return;

addMessage(message,"user");

chatInput.value = "";

thinking.classList.remove("hidden");

try {

const response =
await fetch(
"/chat",
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

philosopher:
currentPhilosopher.name,

school:
currentPhilosopher.school,

personality:
currentPhilosopher.personality,

model:
chatModelSelect.value,

message:message

})

}
);

const data =
await response.json();

thinking.classList.add("hidden");

addMessage(
data.reply,
"ai"
);

}catch(err){

thinking.classList.add("hidden");

addMessage(
"Failed connecting to server.",
"ai"
);

}

}

sendBtn.onclick =
sendMessage;

chatInput.addEventListener(
"keypress",
(e)=>{

if(e.key==="Enter"){

sendMessage();

}

}
);

menuBtn.onclick = ()=>{

sideMenu.classList.add("open");

overlay.classList.add("show");

};

overlay.onclick = ()=>{

sideMenu.classList.remove("open");

overlay.classList.remove("show");

infoPanel.classList.remove("open");

};

closeInfo.onclick = ()=>{

infoPanel.classList.remove("open");

};

deleteHistoryBtn.onclick = ()=>{

localStorage.removeItem(
getChatKey()
);

loadChatHistory();

sideMenu.classList.remove("open");

overlay.classList.remove("show");

};

backBtn.onclick = ()=>{

chatScreen.classList.remove("active");

philosopherScreen.classList.add("active");

sideMenu.classList.remove("open");

overlay.classList.remove("show");

};

modelSelect.addEventListener("change",()=>{

chatModelSelect.value =
modelSelect.value;

});

chatModelSelect.addEventListener("change",()=>{

modelSelect.value =
chatModelSelect.value;

});

const isMobile = /iPhone|iPad|iPod|Android/i.test(
navigator.userAgent
);

if(isMobile){

document.getElementById(
"mobile-warning"
).style.display = "flex";

document.body.style.overflow =
"hidden";

}
window.addEventListener("load",()=>{

const isMobile =
/Android|iPhone|iPad|iPod/i.test(
navigator.userAgent
);

if(isMobile){

const warning =
document.getElementById(
"mobile-warning"
);

warning.style.display =
"flex";

document.body.style.overflow =
"hidden";

}

});