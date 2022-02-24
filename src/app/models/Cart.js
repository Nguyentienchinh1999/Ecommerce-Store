module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {}
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 }
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++
        this.totalPrice += storedItem.item.price
    }
    this.delete = function (item, id) {
        var arr = this.items
        // delete arr[id]

        if (arr[id]) {
            this.totalPrice -= arr[id].price
            this.totalQty -= arr[id].qty
            delete arr[id]
            if (this.totalQty == 0) {
                this.totalQty = null
            }
        }

    }


    this.generateArray = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id])

        }
        return arr
    }
}