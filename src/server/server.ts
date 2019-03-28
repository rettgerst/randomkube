import * as Queue from 'bee-queue';
import * as express from 'express';

const app = express();

const redis = process.env.REDIS_URL;

if (redis === undefined) throw new Error('environment variable REDIS_URL not defined');

const randomQueue = new Queue('random', { redis } as any);

app.get('/', async (_req, res) => {
	try {
		console.log('hit /');
		const job = await randomQueue
			.createJob({})
			.save();
			
		console.log('created job', job.id);
		
		job.on('succeeded', result => {
			console.log('job succeeded');
			res.json(result);
		});
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

app.listen(8080);
