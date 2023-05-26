let db = [
    {
        "id":1,
        "name":"Asus",
        "price":2345,
        "image":"1.jpeg",
        "stock":2
    },
    {
        "id":2,
        "name":"Dell",
        "price":4000,
        "image":"3.png",
        "stock":8
    }

]
let counter = 0;

module.exports = class Product {
    constructor(id, name, stock, price) {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.price = price;
        this.image="3.png";
    }

    save(){
        this.id = ++counter; //start with 1;
        db.push(this);
        return this;
    }

    edit(){
        const index = db.findIndex(prod => prod.id == this.id);
        db.splice(index, 1, this);
        return this;
    }

    

    static getAll(){
       
        return db;
    }

    static getById(prodId){
        
        const index = db.findIndex(prod => prod.id == prodId);
        const deletedProd = db[index];
        
        return deletedProd;
    }

    static deleteById(prodId){
        const index = db.findIndex(prod => prod.id == prodId);
        const deletedProd = db[index];
        db.splice(index, 1);
        return deletedProd;
    }



}


