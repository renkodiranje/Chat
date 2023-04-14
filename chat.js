export class Chatroom {
  constructor(r, u) {
    this.room = r;
    this.username = u;
    this.chats = db.collection("chats");
    this.unsub;
  }
  get room() {
    return this._room;
  }
  set room(r) {
    this._room = r;
  }
  //update sobe
  updateRoom(ur) {
    this.room = ur;
    if (this.unsub) {
      this.unsub();
    }
  }
  get username() {
    return this._username;
  }
  set username(u) {
    if (u.trim().length >= 2 && u.trim().length <= 10) {
      this._username = u;

      let user = localStorage.getItem("cuvaj");
      let note = document.getElementById("alert");

      if (this.username != user) {
        note.style.display = "inline";
        let noteTime = setTimeout(() => {
          note.style.display = "none";
        }, 3000);
      }
    } else {
      alert("user name must be between 2 and 10 characters long");
      console.log("error");
    }
  }

  updateUsername(ime) {
    return (this.username = ime);
  }

  async addChat(mess) {
    let vreme = new Date();

    let docChat = {
      message: mess,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(vreme),
    };

    let response = await this.chats.add(docChat);
    return response;
  }

  getChats(callback) {
    this.unsub = this.chats
      .orderBy("created_at")
      .where("room", "==", this.room)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let doc = change.doc;

          if (change.type == "added") {
            callback(doc);
          }
        });
      });
  }
}
