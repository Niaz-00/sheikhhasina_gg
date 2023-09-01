document.getElementById('translateButton').addEventListener('click', function () {
    const apiKey = 'AIzaSyC5E4ZjEeU1bZSPtiyVwpS1a43LTYptMQo'; // Replace with your Google Translate API key

    const items = document.querySelectorAll('ol li');

    items.forEach(async function (item) {
        const banglaText = item.textContent;

        // Make a request to the Google Translate API using your API key
        const translation = await translateText(apiKey, banglaText, 'en');

        // Update the content with the translated text
        item.textContent = translation;
    });
});

// Function to make a request to the Google Translate API
async function translateText(apiKey, text, targetLanguage) {
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const requestBody = {
        q: text,
        target: targetLanguage,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Translation error:', error);
        return 'Translation failed';
    }
}
