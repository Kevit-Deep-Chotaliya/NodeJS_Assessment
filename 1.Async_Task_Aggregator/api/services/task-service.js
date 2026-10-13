const AppError = require("../utils/app-error");

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeTask(task) {

    await delay(1000);

    if (task.fail === true) {
        throw new AppError(
            `Task ${task.id} failed during execution`,
            500
        );
    }

    switch (task.type) {
        case "user":
            return {
                userId: task.id,
                name: "Demo User",
                source: "user-service"
            };

        case "product":
            return {
                productId: task.id,
                name: "Laptop",
                price: 55000,
                source: "product-service"
            };

        case "report":
            return {
                reportId: task.id,
                generated: true,
                totalRecords: 100,
                source: "report-service"
            };

        default:
            throw new AppError(
                `Unsupported task type: ${task.type}`,
                400
            );
    }
}

module.exports = { executeTask };