export class ChatUI {

    constructor(l) {
        this.lista = l;
    }

    get lista() {
        return this._lista;
    }

    set lista(l) {
        this._lista = l;
    }

    templateLI(doc) {
        let data = doc.data();
        let id = doc.id;
        let vreme = data.created_at.toDate();
        let ime = data.username;
        let x = localStorage.getItem("cuvaj");
        console.log(x);
        let htmlli;
        if(ime == x) {
            htmlli=
            `<li class = "oblak"  id ="${id}" style="float: right;border-radius:30px 0px 40px 30px;background-image: linear-gradient(45deg,rgb(45, 27, 50),rgb(12, 183, 100))">
            
               <span class = "ime">${data.username}:</span>
               <span class = "poruka">${data.message}</span>
               <div class= "vreme">${this.formatVreme(vreme)}</div>
               <img src="slika/kanta.png" style= "width: 25px" id = "brisi" class = "kanta">
           </li>`;
        }
        else{
            htmlli=
         `<li class = "oblak"  id ="${id}">
         
            <span class = "ime">${data.username}:</span>
            <span class = "poruka">${data.message}</span>
            <div class= "vreme">${this.formatVreme(vreme)}</div>
            <img src="slika/kanta.png" style= "width: 25px" id = "brisi" class = "kanta">
        </li>`;
        }
        
        this.lista.innerHTML += htmlli;
        
        
    }
    // templateliright(doc) {
    //     let data = doc.data();
    //     let id = doc.id;
    //     let vreme = data.created_at.toDate();
       
    //     let htmlli=
    //         `<li class = "oblak"  id ="${id}" style="float: right;border-radius:30px 0px 40px 30px;background-image: linear-gradient(45deg,rgb(45, 27, 50),rgb(12, 183, 100))">
            
    //            <span class = "ime">${data.username}:</span>
    //            <span class = "poruka">${data.message}</span>
    //            <div class= "vreme">${this.formatVreme(vreme)}</div>
    //            <img src="slika/kanta.png" style= "width: 25px" id = "brisi" class = "kanta">
    //        </li>`;
       
    //     this.lista.innerHTML += htmlli;
         
    // }

    // templatelileft(doc) {
    //     let data = doc.data();
    //     let id = doc.id;
    //     let vreme = data.created_at.toDate();
    //     let htmlli=
    //      `<li class = "oblak"  id ="${id}">
    //         <span class = "ime">${data.username}:</span>
    //         <span class = "poruka">${data.message}</span>
    //         <div class= "vreme">${this.formatVreme(vreme)}</div>
    //         <img src="slika/kanta.png" style= "width: 25px" id = "brisi" class = "kanta">
    //     </li>`;
    
    //     this.lista.innerHTML += htmlli;
        
   // }

    formatVreme(vreme) {
       
        let d = vreme.getDate();
        let m = vreme.getMonth()+1;
        let g = vreme.getFullYear();
        let s = vreme.getHours();
        let mi = vreme.getMinutes();

        d = String(d).padStart(2, "0");
        m = String(m).padStart(2, "0");
        s = String(s).padStart(2, "0");
        mi = String(mi).padStart(2, "0");

        let danas = new Date();
        let d1 = danas.getDate();
        let m1 = danas.getMonth()+1;
        let g1 = danas.getFullYear();
        let ispis;

        if(d == d1 && m == m1 && g == g1) {
            ispis = s + ":"+ mi;
        }
        else {
            ispis = d + "." + m + "." + g + "." + " - " + s +":" + mi;
        }
        
        return ispis;
    }
    
    clearUl() {
        this.lista.innerHTML = "";
    }

}
