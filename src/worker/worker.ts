import * as Queue from 'bee-queue';

const redis = process.env.REDIS_URL;

if (redis === undefined) throw new Error('environment variable REDIS_URL not defined');

const randomQueue = new Queue('random', { redis } as any);

randomQueue.process(1, (job: any, done: any) => {
	console.log('processing job', job.id);
	const delay = Math.random() * 1000 * 10;
	console.log('using delay of', delay / 1000, 'seconds');
	setTimeout(
		() => {
			console.log('finished processing job', job.id);
			done(null, Math.ceil(Math.random() * 100));
		},
		delay
	)
});