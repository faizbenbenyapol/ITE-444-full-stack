// ==========================================
// 1. เขียนโปรแกรมเพื่อรับคะแนนจากผู้ใช้ และแสดงเกรดตามเกณฑ์ (ใบงาน 1)
// ==========================================
/*let score = 75;

if (score >= 90) {
    console.log("A");
} else if (score >= 85) {
    console.log("B+");
} else if (score >= 80) {
    console.log("B");
} else if (score >= 75) {
    console.log("C+");
} else if (score >= 70) {
    console.log("C");
} else {
    console.log("F");
}*/

//-------------------------------------------//

// ==========================================
// 2. คำนวณส่วนลดตามระดับยอดซื้อ (ใบงาน 2)
// ==========================================
/*let total = 15000;
let discount = (total * 10) / 100;
let discountRate = 0;
let grandTotal = 0;

if (total >= 10000) {
    discountRate = 10;
    let discount = (total * discountRate) / 100;
} else if (total >= 8000) {
    discountRate = 8;
    let discount = (total * discountRate) / 100;
} else if (total >= 5000) {
    discountRate = 5;
    let discount = (total * discountRate) / 100;
} else {
    discountRate = 0;
    let discount = total;
}
grandTotal = total - discount;
console.log("\n ราคารวม  : " + total);
console.log(" ส่วนลด" + discountRate + "% : " + discount);
console.log(" ราคาสุทธิ  : " + grandTotal + "\n");*/

//-------------------------------------------//

// ==========================================
// 3. ตรวจสอบเงื่อนไขยอดซื้อรวมของ Notebook และคำนวณส่วนลด (ใบงาน 3)
// ==========================================
/*const productName = "Notebook";
const productPrice = 28500;
const order = 2;
let orderTotal = productPrice * order;
let discountRate = 0;
let discountAmount = 0;
let grandTotal = 0;

// แสดงผล
console.log("\nProduct:", productName);
console.log("Price:", productPrice);
console.log("Order:", order);
console.log("Order Total:", orderTotal);

// ตรวจสอบเงื่อนไข
if (orderTotal >= 50000) {
    discountRate = 15;
} else if (orderTotal >= 30000) {
    discountRate = 10;
} else if (orderTotal >= 10000) {
    discountRate = 5;
} else {
    discountRate = 0;
}

// คำนวณส่วนลด
discountAmount = orderTotal * discountRate / 100;
// คำนวณยอดสุทธิ
grandTotal = orderTotal - discountAmount;
// แสดงผล
console.log("Discount Rate:", discountRate + "%");
console.log("Discount Amount:", discountAmount);
console.log("Grand Total:", grandTotal + "\n");*/

//-------------------------------------------//

// ==========================================
// 4. วนลูปรายชื่อนักเรียนเพื่อตรวจสอบผลการสอบผ่านเกณฑ์ (ใบงาน 4)
// ==========================================
/*const students = [
    { name: "ต้น", score: 78 },
    { name: "มิก", score: 62 },
    { name: "ฟ้า", score: 45 },
    { name: "นัท", score: 91 },
    { name: "เจมส์", score: 38 }
];

for (let i = 0; i < students.length; i++) {
    if (students[i].score >= 50) {
        console.log(students[i].name + " : ผ่าน");
    } else {
        console.log(students[i].name + " : ไม่ผ่าน");
    }
}*/

//-------------------------------------------//

// ==========================================
// 5. วนลูปรายชื่อนักเรียนพร้อมรหัสนักศึกษา (ใบงาน 4 ต่อ)
// ==========================================
/*const students = [
    { stdCode: "2313111086", name: "ต้น", score: 78 },
    { stdCode: "2313111087", name: "มิก", score: 62 },
    { stdCode: "2313111088", name: "ฟ้า", score: 45 },
    { stdCode: "2313111089", name: "นัท", score: 91 },
    { stdCode: "2313111090", name: "เจมส์", score: 38 }
];

for (let i = 0; i < students.length; i++) {
    if (students[i].score >= 50) {
        console.log(students[i].stdCode + " : " + students[i].name + " : ผ่าน");
    } else {
        console.log(students[i].stdCode + " : " + students[i].name + " : ไม่ผ่าน");
    }
}*/

//-------------------------------------------//

// ==========================================
// 6. ตรวจเช็คสต็อกสินค้าใกล้หมดจากคลังสินค้า (ใบงาน 5)
// ==========================================
/*const products = [
    { productID: "P001", name: "Mouse", stock: 15 },
    { productID: "P002", name: "Keyboard", stock: 3 },
    { productID: "P003", name: "Monitor", stock: 8 },
    { productID: "P004", name: "Notebook", stock: 2 },
    { productID: "P005", name: "Printer", stock: 10 }
];

console.log("\n");
for (const product of products) {
    if (product.stock <= 5) {
        console.log(
            product.productID + " : " +
            product.name + " : สินค้าใกล้หมด (" +
            product.stock + " ชิ้น)"
        );
    }
}
console.log("\n");*/

//-------------------------------------------//

// ==========================================
// 7. วนลูปแสดงข้อมูลโปรไฟล์ผู้ใช้งานด้วย for...in (ใบงาน 6)
// ==========================================
/*const user = {
    username: "2313111086",
    fullname: "Wannipat Benyapol",
    email: "Be.wannipat_st@tni.ac.th",
    role: "Student",
    status: "Active"
};

console.log();
for (const key in user) {
    console.log(key + " : " + user[key]);
}
console.log();*/

//-------------------------------------------//

// ==========================================
// 8. แสดงข้อมูลรายการอาหารและราคาด้วย forEach (ใบงาน 7)
// ==========================================
/*const foods = [
    { foodID: "F001", name: "ผัดกระเพรา", price: 60 },
    { foodID: "F002", name: "ไก่ย่าง", price: 80 },
    { foodID: "F003", name: "ปลาเผา", price: 250 },
    { foodID: "F004", name: "ต้มยำ", price: 120 },
    { foodID: "F005", name: "ข้าวสวย", price: 20 }
];

console.log();
foods.forEach((food) => {
    console.log(
        food.foodID + " : " +
        food.name + " ราคา " +
        food.price + " บาท"
    );
});
console.log();*/

//-------------------------------------------//

// ==========================================
// 9. ฟังก์ชันคำนวณราคารวมสินค้าแบบดั้งเดิม (ใบงาน 8)
// ==========================================
/*function calculateTotal(price, quantity) {
    let total = price * quantity;
    return total;
}

// เรียกใช้งาน
let totalPrice = calculateTotal(299, 3);
console.log("ราคารวมสินค้า: " + totalPrice);*/

//-------------------------------------------//

// ==========================================
// 10. ฟังก์ชันคำนวณราคารวมสินค้าแบบ Function Expression (ใบงาน 9)
// ==========================================
/*let calculateTotal = function(price, quantity) {
    let total = price * quantity;
    return total;
};

// เรียกใช้งาน
let totalPrice = calculateTotal(299, 3);
console.log("ราคารวมสินค้า: " + totalPrice);*/

//-------------------------------------------//

// ==========================================
// 11. ฟังก์ชันคำนวณราคารวมสินค้าแบบ Default Parameters (ใบงาน 10)
// ==========================================
/*function calculateTotal(price, quantity = 1) {
    return price * quantity;
}

// เรียกใช้งาน
let total1 = calculateTotal(299);
let total2 = calculateTotal(299, 3);

console.log("\nราคารวมสินค้า1: " + total1);
console.log("ราคารวมสินค้า2: " + total2 + "\n");*/

//-------------------------------------------//

// ==========================================
// 12. Assignment: การคำนวณยอดรวมสินค้า ตะกร้าสินค้า และส่วนลด 10% (ใบงาน 11 Assignment)
// ==========================================
// product list
const products = [
    { name: "Notebook", price: 25000, quantity: 1 },
    { name: "Mouse", price: 500, quantity: 2 },
    { name: "Keyboard", price: 1200, quantity: 1 },
    { name: "Monitor", price: 4500, quantity: 2 }
];

// ประกาศตัวแปรและกำหนดค่าเริ่มต้น
let subtotal = 0;
let discount = 0;
let grandTotal = 0;

console.log("------ PRODUCT LIST --------");

// แสดงรายการสินค้า และคำนวณยอดรวม
for (const product of products) {
    let total = product.price * product.quantity;
    console.log(
        product.name +
        " : ราคา " + product.price +
        " : จำนวน " + product.quantity +
        " : รวม " + total + " บาท"
    );
    subtotal += total;
}

// คำนวณส่วนลด 10%
discount = subtotal * 0.10;

// คำนวณยอดสุทธิ
grandTotal = subtotal - discount;

// แสดงสรุปคำสั่งซื้อ
console.log("");
console.log("========== ORDER SUMMARY ==========");
console.log("Subtotal    : " + subtotal + " บาท");
console.log("Discount    : " + discount + " บาท");
console.log("Grand Total : " + grandTotal + " บาท");