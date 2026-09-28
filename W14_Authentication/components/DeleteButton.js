"use client";
export default function DeleteButton() {
    return (
        <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={(e) => {

                const ok = confirm(
                    "ยืนยันการลบสินค้านี้หรือไม่?"
                );

                if (!ok) {
                    e.preventDefault();
                }

            }}
        >
            ลบ
        </button>
    );
}

