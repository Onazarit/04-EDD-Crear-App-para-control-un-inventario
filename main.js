import Product from "./product.js";

class Main{
    constructor(){
        this._btnAdd = document.querySelector("#btnAdd");
        this._btnDelete = document.querySelector("#btnDelete");
        this._btnSearch = document.querySelector("#btnSearch");
        this._btnShowAll = document.querySelector("#btnShowAll");
        this._btnShowAllInv = document.querySelector("#btnShowAllInv");
        this._btnAddOnPos = document.querySelector("#btnAddOnPos");

        this._storage = [];

        this._resultados = document.getElementById("resultados");
        this._child = document.createElement("p");
        let text = document.createTextNode("Aqui se veran los resultados");
        this._child.appendChild(text);
        this._resultados.appendChild(this._child);

        this._btnAdd.addEventListener('click', this._addToList);
        this._btnDelete.addEventListener('click', this._removeFromList);
        this._btnSearch.addEventListener('click', this._searchFromList);
        this._btnShowAll.addEventListener('click', this._ShowAll);
        this._btnShowAllInv.addEventListener('click', this._ShowAllInv);
        this._btnAddOnPos.addEventListener('click', this._addOnPos);
    }

    _addToList = () => {
        let product = Product.readForm();
        
        if(this._storage.length >= 20){ //Capacidad de almacenamiento
            this.sendMessage("Fallo al registrar, el inventario esta lleno");
            return;
        }
        
        if(product == false){
            this.sendMessage("Fallo al registrar, intenta revisar los campos");
            return;
        }
        this._storage.push(product);
        this.sendMessage(`Registro completo, se añadieron: [${product.getQuantity()} unidades de ${product.getName()} a ${product.getQuality()} C/U]`);
    }

    _removeFromList = () => {
        let inpId = document.querySelector("#id");
        let productId = Number(inpId.value);
        let pos = this._storage.findIndex( (p) => {
            if(p.getId() == productId){
                return(true);
            }else {
                return(false);
            }
        });
        if(pos >= 0){
            this.sendMessage(`Se ha removido el producto [${this._storage[pos].getName()}] de la lista`);
            this._storage.splice(pos,1);
            return;
        }
        this.sendMessage(`No se encontro el producto a eliminar`);
        console.log(this._storage);
    }

    _searchFromList = () => {
        let inpId = document.querySelector("#id");
        let productId = Number(inpId.value);
        let pos = this._storage.findIndex( (p) => {
            if(p.getId() == productId){
                return(true);
            }else {
                return(false);
            }
        });

        if(pos >= 0){
            this.sendMessage(`El producto con codigo ${this._storage[pos].getId()} encontrado fue:  [${this._storage[pos].getQuantity()} unidades de ${this._storage[pos].getName()} a ${this._storage[pos].getQuality()} c/u]`);
            return;
        }
        this.sendMessage(`No se encontro el producto buscado`);
    }

    _ShowAll = () => {
        let text = "Los productos en la lista son: ";
        let total = 0;
        this._storage.forEach((p) => {
            text = text + `[Codigo ${p.getId()}: ${p.getName()} ${p.getQuantity()} unidades, $${p.getQuality()} C/U] `
            total += p.getTotal();
        });
        text += `Total = ${total}`;
        this.sendMessage(text);
    }

    _ShowAllInv = () => {
        let text = "Los productos en la lista son: ";
        let total = 0;
        this._storage.reverse().forEach((p) => {
            text = text + `[Codigo ${p.getId()}: ${p.getName()} ${p.getQuantity()} unidades, $${p.getQuality()} C/U] `
            total += p.getTotal();
        });
        text += `Total = ${total}`;
        this.sendMessage(text);
        this._storage.reverse();
    }

    _addOnPos = () => {
        let product = Product.readForm();
        let inpPos = document.querySelector("#position");
        let position = Number(inpPos.value);
        inpPos.value = "";

        if(this._storage.length >= 20){ //Capacidad de almacenamiento
            this.sendMessage("Fallo al registrar, el inventario esta lleno");
            return;
        }
        
        if(product == false){
            this.sendMessage("Fallo al registrar, intenta revisar los campos");
            return;
        }

        if(position >= this._storage.length){
            this.sendMessage("Fallo al registrar, no hay lugar donde insertar");
            return;
        }

        let aux = this._storage.splice(position-1);
        this._storage.push(product);
        aux.forEach((p) =>{
            this._storage.push(p);
        });
        this.sendMessage(`Registro completo, se añadio: ${product.getName()} en la posición ${position}`);
    
    }

    sendMessage(text){
        let message = document.createElement("p");
        let textIn = document.createTextNode(text);
        message.appendChild(textIn);
        this._resultados.replaceChild(message,this._child);
        this._child = message;
    }
}

new Main();