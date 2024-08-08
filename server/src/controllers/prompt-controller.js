
const inputPrompt = require('../models/input-prompt')
const openai = require('../config/openai')

module.exports = {
    async sendText(req, res){
        
        const inputModel = new inputPrompt(req.body.message)

        try{
            const openaiAPI = openai.configuration()
            const params = openai.textCompletion(inputModel)

            const response = await openaiAPI.chat.completions.create(params)

            console.log('API response:', response);   
            console.log('Message object:', JSON.stringify(response.choices[0].message, null, 2));

            return res.status(200).json({
                success:true,
                data: response.choices[0].message.content.trim()
            })
            
        } catch (error) {
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Error Response Status:', error.response.status);
                console.error('Error Response Headers:', error.response.headers);
            } else {
                console.error('Error Message:', error.message);
            }
    
            res.status(500).json({ success: false, error: 'There was issue in the server' });
            /* return res.status(400).json({
                sucess: false,
                error: error.response ? error.response.data : "There was issue in the server",
            }) */

        }
    }
}