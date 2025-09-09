// سيرفر بسيط باستخدام Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

app.get('/outlook/web/index.html', (req, res) => {
	res.sendFile(path.join(__dirname, 'outlook', 'web', 'index.html'));
});

app.get('/', (req, res) => {
	res.send('server OK');
});

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
