class Good{
    constructor(id,name,description,sizes,price,available){
        this.id = id;           
        this.name = name;          
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
     setAvailable(vlaue){
        this.available = vlaue;
     }
}


class GoodLost{
    #goods = []
    constructor(filter, sortPrice, sortDir){
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list(){
        const shopList = this.#goods.filter(good => filter.test(good.name));
        if (this.sortPrice == true){
            if (this.sortDir == true){
                shopList.sort((price1, price2) => price1 - price2);
            }else{
                shopList.sort((price1, price2) => price2 - price1);
            }
        }else{
            return shopList
        }
    }
    addGood(newGood){
        this.#goods.push(newGood)
    }
    delGood(id){
        const i = this.#goods.findIndex(good => good.id === id);
        if(i != undefined){
            this.#goods.splice(i,1);
        } 
        return i
    } 

}

class BsasketGood extends Good{
    constructor(id,name,description,sizes,price,available, amount){
        super(id,name,description,sizes,price,available);
        this.amount = amount;   
}
}

class Basket{
    constructor(){
        this.goods = [];

    }
    gettotalAmount(){
       const total = this.goods.map(item => item.amount);
       const totalAmount = total.reduce((a, b) => a+b);
       return totalAmount
    }

    gettotalSum(){
        return totalSum = this.goods.reduce((a,b) => a + b.amount * b.price);
    }

    add(good, amount){
        let i = this.goods.findIndex(vlaue => vlaue.id === good.id);
        if (i >= 0){
            this.goods[i].amount += amount
        }else{
            let addGood = new BsasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGood)
    }
}
clear(){
    this.goods.length = 0;
}

removeUnavailable() {
    this.goods.filter(item => item.available === false).forEach(value => this.remove(value));
}

}

const first = new Good(1, "T-shirt", "color: white, material: coton", ["S", "M", "XL"], 1500, true);
const second = new Good(2, "Dress", "color: red, material: silk", ["S", "M", "L"], 10000, true);
const third = new Good(3, "Jacket", "color: black, material: leather", ["XS", "M", "XXL"], 35000, true);
const fourth = new Good(4, "Jeans", "color: blue, material: coton", ["S", "M", "L", "XL"], 8000, true);
const fifth = new Good(5, "Shorts", "color: grey, material: coton", ["L", "XL"], 4500, true);

console.log('1231244')