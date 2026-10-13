class JobRunner {
    constructor(concurrency) {
        if (!Number.isInteger(concurrency) || concurrency < 1) {
            throw new Error("Concurrency must be a positive integer");
        }

        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    addJob(job) {
        return new Promise((resolve, reject) => {
            this.queue.push({ job, resolve, reject });
            this.processQueue();
        });
    }

    async processQueue() {
        while (
            this.running < this.concurrency &&
            this.queue.length > 0
        ) {
            const { job, resolve, reject } = this.queue.shift();

            this.running++;

            Promise.resolve()
                .then(() => job())
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.running--;
                    this.processQueue();
                });
        }
    }
}

const runner = new JobRunner(2);

function createJob(id, duration) {
    return async () => {
        console.log(`Job ${id} started`);

        await new Promise(resolve =>
            setTimeout(resolve, duration)
        );

        console.log(`Job ${id} completed`);

        return `Result from Job ${id}`;
    };
}

async function main() {
    const jobs = [
        runner.addJob(createJob(1, 3000)),
        runner.addJob(createJob(2, 2000)),
        runner.addJob(createJob(3, 1000)),
        runner.addJob(createJob(4, 1500)),
        runner.addJob(createJob(5, 1000))
    ];

    const results = await Promise.all(jobs);

    console.log("All jobs completed!");
    console.log(results);
}

main().catch(console.error);