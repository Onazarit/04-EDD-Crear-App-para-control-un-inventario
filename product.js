export default class Product{
    constructor(id,name,quantity,quality){
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._quality = quality;
    }

    getId(){
        return(this._id);
    }

    getName(){
        return(this._name);
    }

    getQuantity(){
        return(this._quantity);
    }

    getQuality(){
        return(this._quality);
    }

    getTotal(){
        let total = this._quality * this._quantity;
        return(total);
    }

    static readForm(){
        let inpId = document.querySelector("#id");
        let inpName = document.querySelector("#name");
        let inpQuantity = document.querySelector("#quantity");
        let inpQuality = document.querySelector("#quality");

        let id = Number(inpId.value);
        let name = inpName.value;
        let quantity = Number(inpQuantity.value);
        let quality = Number(inpQuality.value);
        if(id && name && quantity && quality){
            inpId.value = "";
            inpName.value = "";
            inpQuantity.value = "";
            inpQuality.value = "";
            return(new Product(id, name, quantity, quality));
        }
        return(false);
    }
}