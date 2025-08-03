let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let getI;

// create total price
function totalPrice() {
    if (price.value != '') {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = "green";
    } else {
        total.innerHTML = '';
        total.style.background = "rgba(134, 7, 7, 0.867)";
    }
}

// get data and store it in local storage
let productDetails;
if (localStorage.product != null) {
    productDetails = JSON.parse(localStorage.product)
} else {
    productDetails = []
}
submit.onclick = function () {
    let data = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value != '' && price.value != '' && category.value != '' && count.value < 100) {
        if (mood == "create") {
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    productDetails.push(data)
                }
            } else {
                productDetails.push(data)
            }
        } else {
            productDetails[getI] = data;
            submit.value = "Create"
            mood = "create"
            count.style.display="block";
        }
        clear()
    }
    localStorage.setItem("product", JSON.stringify(productDetails))
    readData()
}

// clear inputs after submit
function clear() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

// read data
function readData() {
    totalPrice()
    let table = '';
    for (let i = 0; i < productDetails.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${productDetails[i].title}</td>
                <td>${productDetails[i].price}</td>
                <td>${productDetails[i].taxes}</td>
                <td>${productDetails[i].ads}</td>
                <td>${productDetails[i].discount}</td>
                <td>${productDetails[i].total}</td>
                <td>${productDetails[i].category}</td>
                <td><input onclick="updateData(${i})" type="button" value="update"></td>
                <td><input onclick="deleteData(${i})" type="button" value="delete"></td>
            </tr>
            `
    }
    document.getElementById("tbody").innerHTML = table
    if (productDetails.length >= 1) {
        document.getElementById("deleteall").innerHTML = `<input onclick=deleteAll() type="button" value="delete All (${productDetails.length})">`
    } else {
        document.getElementById("deleteall").innerHTML = ''
    }
}
readData()

// delete data
function deleteData(i) {
    productDetails.splice(i, 1)
    localStorage.product = JSON.stringify(productDetails)
    readData()
}
function deleteAll() {
    productDetails.splice(0)
    localStorage.clear()
    readData()
}

// update data
function updateData(i) {
    title.value = productDetails[i].title;
    price.value = productDetails[i].price;
    taxes.value = productDetails[i].taxes;
    ads.value = productDetails[i].ads;
    discount.value = productDetails[i].discount;
    totalPrice()
    count.style.display="none";
    category.value = productDetails[i].category;
    submit.value = "Update"
    mood = "update"
    getI = i
    scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

// search data 
let searchMood = 'title';
function searchMoodFn(id) {
    let search = document.getElementById("search")
    if (id == "title") {
        searchMood = "title"
    } else {
        searchMood = "category"
    }
    search.placeholder = `search by ${searchMood}`
    search.focus()
    search.value = ''
    readData()
}
function searchData(value) {
    readData()
    let table = '';
    for (let i = 0; i < productDetails.length; i++) {
        if (searchMood == 'title') {
            if (productDetails[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${productDetails[i].title}</td>
                    <td>${productDetails[i].price}</td>
                    <td>${productDetails[i].taxes}</td>
                    <td>${productDetails[i].ads}</td>
                    <td>${productDetails[i].discount}</td>
                    <td>${productDetails[i].total}</td>
                    <td>${productDetails[i].category}</td>
                    <td><input onclick="updateData(${i})" type="button" value="update"></td>
                    <td><input onclick="deleteData(${i})" type="button" value="delete"></td>
                </tr>
                `
            }
        } else {
            if (productDetails[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${productDetails[i].title}</td>
                    <td>${productDetails[i].price}</td>
                    <td>${productDetails[i].taxes}</td>
                    <td>${productDetails[i].ads}</td>
                    <td>${productDetails[i].discount}</td>
                    <td>${productDetails[i].total}</td>
                    <td>${productDetails[i].category}</td>
                    <td><input onclick="updateData(${i})" type="button" value="update"></td>
                    <td><input onclick="deleteData(${i})" type="button" value="delete"></td>
                </tr>
                `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table
}
