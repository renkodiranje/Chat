import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

let user = localStorage.cuvaj || "anonimus";
console.log(user);
let soba = localStorage.room || "#general";
console.log(soba);

// dom

let ul = document.querySelector("ul");
console.log(ul.children);

let send = document.getElementById("send");
let poruka = document.getElementById("poruka");
let update = document.getElementById("update");
let username = document.getElementById("username");
let general = document.getElementById("general");
let js = document.getElementById("js");
let homeworks = document.getElementById("homeworks");
let tests = document.getElementById("tests");
let inputboja = document.getElementById("izborboje");
let formaboja = document.getElementById("boja");
let nav = document.getElementById("nav");
let ton = document.getElementById("ton");
let sandwich = document.getElementById("sandwich");
let alert = document.getElementById("alert");
let chatroom = new Chatroom(soba, user);
let chatUI = new ChatUI(ul);

//////////////////////////////////////

sandwich.addEventListener("click", function () {
  nav.classList.toggle("meni");
});

chatroom.getChats((doc) => {
  general.classList.add("yellow");
  let data = doc.data();
  console.log(data);
  console.log(data.username);
  console.log(user);
  chatUI.templateLI(doc);
});

//change background color
let bojareload = localStorage.getItem("boja");
document.body.style.backgroundColor = bojareload;
formaboja.addEventListener("submit", (e) => {
  let timer = null;
  e.preventDefault();
  let taboja = inputboja.value;
  localStorage.setItem("boja", taboja);

  if (timer == null) {
    timer = setTimeout(() => {
      document.body.style.backgroundColor = taboja;
    }, 500);
  }
  timer = null;
});

//add new message
send.addEventListener("submit", (e) => {
  e.preventDefault();
  if (poruka.value.trim().length >= 1) {
    chatroom
      .addChat(poruka.value)
      .then(() => send.reset())
      .catch((err) => console.error(err));
    let x = document.querySelector("ul li:last-of-type");
    x.scrollIntoView();
    ton.autoplay = "true";
    ton.load();
  } else {
    alert("ne mozete poslati praznu poruku!");
  }
});

//update username
update.addEventListener("submit", (e) => {
  e.preventDefault();

  let nova = username.value;
  chatroom.username = nova;
  localStorage.setItem("cuvaj", nova);
  update.reset();
  chatroom.updateUsername(nova);
  location.reload();
});

//change room
nav.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName == "BUTTON") {
    soba = e.target.textContent;
    chatroom.updateRoom(soba);
    localStorage.setItem("room", soba);

    js.classList.remove("yellow");
    tests.classList.remove("yellow");
    homeworks.classList.remove("yellow");
    general.classList.remove("yellow");
    e.target.classList.add("yellow");
    chatUI.clearUl();
    chatroom.getChats((doc) => {
      chatUI.templateLI(doc);
    });
  }
});

//deleting message
ul.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName == "IMG") {
    let li = e.target.parentElement;
    console.log(li);
    let id = li.id;
    console.log(id);
    let user = chatroom.username;
    console.log(user);
    chatroom.chats
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.data().username === user) {
          if (confirm("da li zelite da trajno obrisete poruku?")) {
            chatroom.chats
              .doc(id)
              .delete()
              .then(() => {
                e.target.parentElement.remove();
                alert("Message deleted");
              })
              .catch((err) => {
                alert(`message not deleted ${err}`);
              });
          } else {
          }
        } else {
          e.target.parentElement.remove();
        }
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
});
