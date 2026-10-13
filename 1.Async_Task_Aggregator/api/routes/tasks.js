const express = require("express");
const router = express.Router();

const AppError = require("../utils/app-error");
const { executeTask } = require("../services/task-service");

router.post("/aggregate", async (req, res, next) => {
    try {
        const { tasks } = req.body;

        if (!Array.isArray(tasks)) {
            throw new AppError(
                "tasks must be an array",
                400
            );
        }

        if (tasks.length === 0) {
            throw new AppError(
                "At least one task is required",
                400
            );
        }

        if (tasks.length > 20) {
            throw new AppError(
                "Maximum 20 tasks are allowed",
                400
            );
        }

        const allowedTypes = ["user", "product", "report"];

        tasks.forEach((task, index) => {
            if (
                !task ||
                typeof task !== "object" ||
                Array.isArray(task)
            ) {
                throw new AppError(
                    `Task at index ${index} must be an object`,
                    400
                );
            }

            if (
                typeof task.id !== "string" ||
                task.id.trim() === ""
            ) {
                throw new AppError(
                    `Task at index ${index} requires a non-empty string id`,
                    400
                );
            }

            if (!allowedTypes.includes(task.type)) {
                throw new AppError(
                    `Invalid type for task ${task.id}`,
                    400
                );
            }
        });

        const results = await Promise.allSettled(
            tasks.map(task => executeTask(task))
        );

        const aggregatedResults = results.map(
            (result, index) => {
                if (result.status === "fulfilled") {
                    return {
                        id: tasks[index].id,
                        status: "success",
                        data: result.value
                    };
                }

                return {
                    id: tasks[index].id,
                    status: "failed",
                    error: result.reason.message
                };
            }
        );

        const successful = aggregatedResults.filter(
            result => result.status === "success"
        ).length;

        res.status(200).json({
            message: "Task aggregation completed",
            summary: {
                total: tasks.length,
                successful,
                failed: tasks.length - successful
            },
            results: aggregatedResults
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;