const nsblob = require('nsblob');

module.exports = {
	fetch(key) {
		if (key.length > 44) {
			return nsblob.fetch(key);
		} else {
			key = key.replace(/~/g, '+').replace(/_/g, '/');

			return nsblob.fetch(Buffer.from(key, 'base64').toString('hex'));
		}
	},
	async store(blob) {
		const hex = await nsblob.store(blob);

		return Buffer.from(hex, 'hex')
			.toString('base64')
			.replace(/\=+/g, '')
			.replace(/\+/g, '~')
			.replace(/\//g, '_');
	},
};
