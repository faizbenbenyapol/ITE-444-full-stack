# W15 Exam Template — CRUD (Prisma + XAMPP) + Validation + SweetAlert

ตัดมาจาก W11_Prisma เหลือแค่:

| หน้า | ไฟล์ | หน้าที่ |
|---|---|---|
| `/` | `app/page.js` | หน้าหลักโชว์สินค้า (READ) |
| `/admin/products` | `app/admin/products/page.js` | ตาราง + ปุ่มลบ (DELETE + SweetAlert ยืนยัน) |
| `/admin/products/create` | `create/page.js`, `create/actions.js`, `components/CreateProductForm.js` | เพิ่ม (CREATE + validation) |
| `/admin/products/update/[id]` | `update/[id]/page.js`, `update/[id]/actions.js`, `components/EditProductForm.js` | แก้ไข (UPDATE + validation) |

SweetAlert: `components/SweetAlertDel.js` (ยืนยันก่อนลบ), `components/SuccessAlert.js` (เด้งหลัง create/update/delete ผ่าน `?success=...`)

## เริ่มรัน (ครั้งแรก)

1. เปิด XAMPP → Start **MySQL** (และ Apache ถ้าจะใช้ phpMyAdmin)
   - `cp .env.example .env`
2. Import `lib/exam_db.sql` ใน phpMyAdmin (สร้าง DB `exam_db` + ตาราง products ตัวอย่าง)
3. รันคำสั่ง

```bash
npm install
npm run prisma      # = prisma db pull && prisma generate
npm run dev
```

## วันสอบ (ทำตามลำดับ)

1. phpMyAdmin → DB `exam_db` → ลบตาราง `products` → ใส่ตารางที่อาจารย์ให้ (SQL tab)
   - ถ้าอาจารย์กำหนดชื่อ DB เอง → แก้ `.env` ทั้ง `DATABASE_URL` และ `DATABASE_NAME`
   - **id ต้องเป็น PRIMARY KEY + AUTO_INCREMENT** ไม่งั้น create พัง
2. `npm run prisma` → ดู model ใหม่ใน `prisma/schema.prisma`
3. Ctrl+Shift+H (Find & Replace ทั้งโปรเจกต์) ตามตารางใหม่ เช่นได้ตาราง `tbl_member`:
   - `prisma.products` → `prisma.tbl_member`
   - เปลี่ยนชื่อ field ใน: `create/actions.js`, `update/[id]/actions.js`, `CreateProductForm.js`, `EditProductForm.js`, `app/admin/products/page.js`, `app/page.js`
   - `name="..."` ใน form ต้องตรงกับ `formData.get("...")` ใน actions
4. **หยุด `npm run dev` แล้วรันใหม่** หลัง generate (ไม่งั้น client เก่ายังค้าง)

## จุดที่มักพัง

- **field ชนิด Decimal** (`@db.Decimal`) → ก่อนส่งเข้า Client Component ต้อง `.toString()` (ดู `update/[id]/page.js`) และตอนแสดงผลใช้ `Number(x)`
- **Int** → ต้อง `Number(...)` ก่อน create/update (formData เป็น string เสมอ), รวมถึง `where: { id: Number(id) }`
- **DateTime / dateCreate มี default now()** → ไม่ต้องส่งตอน create; แสดงผล `new Date(x).toLocaleString("th-TH")`
- **field unique** → เช็กซ้ำก่อนบันทึก:
  - create: `await prisma.X.findUnique({ where: { code } })`
  - update: `await prisma.X.findFirst({ where: { code, NOT: { id: Number(id) } } })`
- **select (เช่น role)** → `<select name="role" defaultValue={state?.values?.role || ""}>` + ตรวจใน actions ว่าอยู่ใน list ที่อนุญาต
- `db pull` error เรื่อง mysql.proc / column count → รัน `sudo /opt/lampp/bin/mysql_upgrade` แล้ว restart MySQL ใน XAMPP

## Prisma CRUD สรุป

```js
await prisma.X.findMany({ orderBy: { id: "desc" } });               // READ ทั้งหมด
await prisma.X.findUnique({ where: { id: Number(id) } });            // READ ตัวเดียว
await prisma.X.create({ data: { ... } });                            // CREATE
await prisma.X.update({ where: { id: Number(id) }, data: { ... } }); // UPDATE
await prisma.X.delete({ where: { id: Number(id) } });                // DELETE
```
