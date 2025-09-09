// Simple Express server for webhook only
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files for assets (needed for icons)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve static files for web (needed for HTML files)
app.use('/web', express.static(path.join(__dirname, 'web')));

// Webhook endpoint to receive email data
app.post('/webhook', (req, res) => {
	try {
		const emailData = req.body;
		
		// Log the received email data
		console.log('Received email data:');
		console.log('From:', emailData.from);
		console.log('To:', emailData.to);
		console.log('Subject:', emailData.subject);
		console.log('Timestamp:', emailData.timestamp);
		console.log('Body:', emailData.body.substring(0, 100) + '...');
		
		// Here you can process the email data as needed
		// For example, store it in a database, forward it to another service, etc.
		
		// Send success response
		res.status(200).json({ 
			success: true, 
			message: 'Email received successfully' 
		});
	} catch (error) {
		console.error('Error processing webhook:', error);
		res.status(500).json({ 
			success: false, 
			message: 'Error processing email data',
			error: error.message
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Webhook endpoint available at: http://localhost:${PORT}/webhook`);
});
