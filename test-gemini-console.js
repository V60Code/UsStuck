// 🧪 GEMINI API TEST SCRIPT
// Copy dan paste script ini ke browser console untuk test API

console.log('🧪 Starting Gemini API Test...');

// Test function
async function testGeminiAPI() {
    const apiKey = 'AIzaSyDBltsYy8WI1wATuco1XosChzJu5IqZias';
    const model = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
    
    console.log('📡 Testing API endpoint:', url);
    
    const requestBody = {
        contents: [{
            parts: [{
                text: "Assalamu'alaikum, apa kabar? Tolong jawab dalam bahasa Indonesia."
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        },
        safetySettings: [
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_HATE_SPEECH", 
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
    };

    try {
        console.log('📤 Sending request...');
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('📥 Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('❌ API Error:', response.status, errorData);
            return { success: false, error: errorData };
        }

        const data = await response.json();
        console.log('📋 Full response:', data);
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const responseText = data.candidates[0].content.parts[0].text;
            console.log('✅ API Test SUCCESS!');
            console.log('🤖 AI Response:', responseText);
            return { success: true, response: responseText };
        } else {
            console.error('❌ Invalid response format:', data);
            return { success: false, error: 'Invalid response format' };
        }
        
    } catch (error) {
        console.error('❌ Network Error:', error);
        return { success: false, error: error.message };
    }
}

// Run the test
testGeminiAPI().then(result => {
    if (result.success) {
        console.log('🎉 GEMINI API IS WORKING!');
        console.log('Response:', result.response);
    } else {
        console.log('💥 GEMINI API FAILED!');
        console.log('Error:', result.error);
    }
});

// Export for manual testing
window.testGeminiAPI = testGeminiAPI;