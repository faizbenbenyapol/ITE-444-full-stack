const orders = [
    {
        id: 1001,
        customer: "Somchai",
        total: 2500,
        status: "Success"
    },
    {
        id: 1002,
        customer: "Suda",
        total: 1800,
        status: "Shipping"
    },
    {
        id: 1003,
        customer: "Anan",
        total: 3200,
        status: "Pending"
    },
    {
        id: 1004,
        customer: "Mali",
        total: 1500,
        status: "Success"
    },
    {
        id: 1005,
        customer: "Kanya",
        total: 2800,
        status: "Success"
    }
];

console.log(orders);

// จำลองการดึงข้อมูลจาก Server
function loadOrders() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(orders);
        }, 3000);
    });
}

async function displayOrders() {
    console.log("Loading Orders...");

    const data = await loadOrders();

    console.log("========== ORDER LIST ==========");

    let orderTotal = 0;

    for (const order of data) {
        console.log(
            order.id,
            order.customer,
            order.total,
            order.status
        );

        // รวมยอดเฉพาะรายการที่มีสถานะ Success
        if (order.status === "Success") {
            orderTotal += order.total;
        }
    }

    console.log(
        "========== TOTAL",
        orderTotal,
        "=========="
    );
}

displayOrders();