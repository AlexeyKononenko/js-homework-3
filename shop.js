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


class GoodsList{
    #goods
    constructor(filter, sortPrice, sortDir){
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list() {
        const shopList = this.#goods.filter(good => this.filter.test(good.name));
        
        if (this.sortPrice != true) {
            return shopList;
        }
        if (this.sortDir === true) {
            return shopList.sort((a, b) => (a.price - b.price)); }
        return shopList.sort((a, b) => (b.price - a.price));
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
        return this.goods.reduce((a,b) => a + b.amount * b.price, 0);
    }

    addGood(good, amount){
        let i = this.goods.findIndex(vlaue => vlaue.id === good.id);
        if (i >= 0){
            this.goods[i].amount += amount
        }else{
            let addgood = new BsasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addgood)
    }
}

    remove(good, amount){
        let i = this.goods.findIndex(vlaue => vlaue.id === good.id);
         if(i >= 0){
            if(this.goods[i].amount - amount <= 0 || amount ===0){
            this.goods.splice(i,1)
        }else{
            this.goods[i].amount -=amount
        }
    }
}

clear(){
    this.goods.length = 0;
}

delUnavailable() {
    let goodAvailable = this.goods.filter(good => good.available === true)
    return goodAvailable
}

}

const one = new Good(1, "Футболка", "Цвет: Черный", ["S", "M", "XL"], 3000, true);
const two = new Good(2, "Куртка", "Цвет: Красный", ["S", "M", "L"], 10000, true);
const three = new Good(3, "Свитер", "Цвет: Синий", ["XS", "M", "XXL"], 35000, true);
const four = new Good(4, "Брюки", "Зеленый", ["S", "M", "L", "XL"], 8000, true);
const five = new Good(5, "Худи", "Цвет: Серый", ["L", "XL"], 4500, true);

regexp = /Куртка|Свитер|Брюки/i
let catalog = new GoodsList(regexp, false, true)


catalog.addGood(one)
catalog.addGood(two)
catalog.addGood(three)
catalog.addGood(four)
catalog.addGood(five)

console.log(`Список отобраных товаров:`, catalog.list)

catalog.sortPrice = true;
catalog.sortDir = true;

console.log(`Список отсортированый по цене`, catalog.list)


catalog.delGood(2)
console.log(`Список после удаления товара`,catalog.list)

one.setAvailable(false)
console.log(one)



let basket = new Basket()

console.log(basket)

basket.addGood(one,5)
basket.addGood(two, 7)
basket.addGood(three,5)
basket.addGood(four,7)
basket.addGood(five,10)

console.log(`Содержимое коризины`, basket)

console.log(`Количество товаров в коризине:`, basket.gettotalAmount())

console.log(`Сумма всех товаров:`, basket.gettotalSum())

basket.remove(five,10)
basket.remove(one,4)

console.log(basket.goods)

console.log(basket.delUnavailable())

basket.clear()

console.log(basket.goods)