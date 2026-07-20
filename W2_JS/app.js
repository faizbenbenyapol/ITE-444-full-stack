// ==========================================
// 1. การคอมเมนต์โค้ด และการแสดงผลพื้นฐาน
// ==========================================
// console.log('Hello, World!');
/*let age = 25;
console.log('My age is ' + age);
age = 30;
console.log('My age is now ' + age);*/

//-------------------------------------------//

// ==========================================
// 2. การประกาศตัวแปรเก็บข้อมูลส่วนบุคคล (Profile)
// ==========================================
/*const firstName = "Wannipat";
const lastName = "Benyapol";
let age = 22;
const email = "Be.wannipat_st@tni.ac.th";
const phoneNumber = "095-538-6849";
const branch = "IT";
let isStudent = true;
console.log("First Name: " + firstName);
console.log("Last Name: " + lastName);
console.log("Age: " + age);
console.log("Email: " + email);
console.log("Phone Number: " + phoneNumber);
console.log("Branch: " + branch);
console.log("Is Student: " + isStudent);*/

//-------------------------------------------//

// ==========================================
// 3. การจัดการข้อมูลแบบอาร์เรย์ (Array) และการวนลูป (Loop)
// ==========================================
/*let cars = ["BMW", "Toyota", "Tesla", "Honda", "Nissan"];
console.log(cars);
//loop
cars.forEach(function(car) {
 console.log(car);
});*/

//-------------------------------------------//

// ==========================================
// 4. การคำนวณราคาสินค้ารวมภาษีมูลค่าเพิ่ม (VAT 7%)
// ==========================================
/*  let totalprice = 500;

let vat = totalprice * 7 / 100;
let total = totalprice + vat;
  
console.log("ราคาสินค้า =", totalprice);
console.log("VAT =", vat);
console.log("รวม =", total); */

//-------------------------------------------//

// ==========================================
// 5. การคำนวณส่วนลดสินค้า และการอัปเดตค่าตัวแปร
// ==========================================
/*let price = 1000;
price -= price * 10 / 1000;
console.log("ราคาหลังลด: " + price);*/

//-------------------------------------------//

// ==========================================
// 6. การตรวจสอบเงื่อนไข (If-Else) ด้วยตัวดำเนินการตรรกศาสตร์ (AND)
// ==========================================
/*let score = 70;
let attendance = true;
if (score >= 60 && attendance === true) {
    console.log("ผ่าน"); // เข้า
} else {
    console.log("ไม่ผ่าน");
}*/

// ==========================================
// 7. การคัดลอกอาร์เรย์ด้วย Spread Operator และการแก้ไขข้อมูล
// ==========================================
/*let carBrand1 = ["Toyota", "Honda", "Mazda"];
let carBrand2 = [...carBrand1];

console.log(carBrand1);
console.log(carBrand2);

carBrand2[2] = 'BMW';

console.log(carBrand2);*/

//-------------------------------------------//

// ==========================================
// 8. Assignment: การสร้างตัวแปรและการแสดงผลข้อมูลนักศึกษา
// ==========================================
const studentId = "2313111086";          
const fullName = "วันนิพัฒน์ เบญญาพล";          
const membershipFee = 500;             
const vatRate = 0.07;                  
let age = 22;                           
let accountBalance = 1550.75;           
let isMember = true;                    
let loginCount = 14;                    
let discountPercent = 10;                
let rewardPoints = 250;                 
let shippingFee = 45;                   
console.log("\n");
console.log("รหัสนักศึกษา:", studentId);
console.log("ชื่อ-นามสกุล:", fullName);
console.log("อายุ:", age, "ปี");
console.log("\n");
console.log("เงินในบัญชี:", accountBalance, "บาท");
console.log("สถานะสมาชิก:", isMember ? "เป็นสมาชิก" : "ไม่ได้เป็นสมาชิก");
console.log("จำนวนครั้งที่เข้าสู่ระบบ:", loginCount, "ครั้ง");
console.log("คะแนนสะสม:", rewardPoints, "คะแนน");
console.log("\n");
console.log("ส่วนลด:", discountPercent, "%");
console.log("ค่าสมัครสมาชิก:", membershipFee, "บาท");
console.log("ค่าจัดส่ง:", shippingFee, "บาท");
console.log("อัตราภาษี (VAT):", (vatRate * 100).toFixed(2), "%");
console.log("\n");