require('./server');

const http = require('http');
const { create } = require('nodesite.eu');
const { name, port } = require('./config');

create(name, '/', (req) => {
	return new Promise((resolve) => {
		const request = http.request(
			new URL(req.uri, `http://localhost:${port}`),
			{
				method: req.method,
				headers: req.head,
			},
			(response) => {
				const buffers = [];

				response.on('data', (chunk) => buffers.push(chunk));

				response.on('end', () => {
					const body = Buffer.concat(buffers);

					resolve({
						statusCode: response.statusCode,
						head: response.headers,
						body,
					});
				});
			}
		);

		request.write(req.body);
		request.end();
	});
});
