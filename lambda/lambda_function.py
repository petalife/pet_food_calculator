import json
import os
try:
    import urllib3
    http = urllib3.PoolManager()
except ImportError:
    # Fallback to built-in urllib
    import urllib.request
    import urllib.parse
    http = None

def lambda_handler(event, context):
    # Enable CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Content-Type': 'application/json'
    }
    
    # Handle preflight OPTIONS request for both API Gateway and Function URL format
    http_method = event.get('httpMethod') or event.get('requestContext', {}).get('http', {}).get('method')
    if http_method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    # Only allow POST requests
    if http_method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({
                'success': False, 
                'message': 'Method Not Allowed'
            })
        }
    
    try:
        # Parse request body - handle both API Gateway and Function URL format
        raw_body = event.get('body', '{}')
        if event.get('isBase64Encoded'):
            import base64
            raw_body = base64.b64decode(raw_body).decode('utf-8')
        body = json.loads(raw_body)
        ingredients = body.get('ingredients', [])
        cooking_method = body.get('cookingMethod', '')
        pet_type = body.get('petType', '')
        
        # Prepare the prompt
        all_ingredients = ', '.join(ingredients)
        
        if cooking_method == 'pan-fried':
            cooking_method_text = 'pan-fried'
        elif cooking_method == 'steamed':
            cooking_method_text = 'steamed'
        else:
            cooking_method_text = 'oven'
            
        pet_type_text = 'dog' if pet_type == 'dog' else 'cat'
        
        prompt = f"""You are an experienced vet. You are going to give suggestions for pet with specific information of how to cook pet food with the given ingredients well in one of the following methods: steamed, oven or pan-fried.

Please provide detailed cooking instructions for a {pet_type_text} using these ingredients: {all_ingredients}. The cooking method should be {cooking_method_text}. Please include: 1) Step-by-step cooking instructions 2) Food safety tips 3) Nutrition preservation tips 4) Portion guidelines. Please respond in Traditional Chinese within 150 words."""

        # Prepare request body for Gemini API
        request_body = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0,
                "maxOutputTokens": 2048
            }
        }
        
        # Get API key from environment variables
        api_key = os.environ.get('GEMINI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'message': 'API金鑰未配置'
                })
            }
        
        # Call Gemini API
        url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
        headers_dict = {
            'Content-Type': 'application/json',
            'x-goog-api-key': api_key
        }
        
        if http:  # urllib3 available
            response = http.request(
                'POST',
                url,
                body=json.dumps(request_body),
                headers=headers_dict
            )
            if response.status != 200:
                raise Exception(f'Gemini API request failed: {response.status} {response.reason}')
            data = json.loads(response.data.decode('utf-8'))
        else:  # Use built-in urllib
            req = urllib.request.Request(
                url, 
                data=json.dumps(request_body).encode('utf-8'),
                headers=headers_dict
            )
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode('utf-8'))
        
        # Extract the AI response
        if (data.get('candidates') and 
            len(data['candidates']) > 0 and 
            data['candidates'][0].get('content') and 
            data['candidates'][0]['content'].get('parts') and 
            len(data['candidates'][0]['content']['parts']) > 0):
            
            advice = data['candidates'][0]['content']['parts'][0]['text']
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': True,
                    'advice': advice
                }, ensure_ascii=False)
            }
        else:
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'success': False,
                    'message': '收到回應但格式不正確，請稍後再試。'
                }, ensure_ascii=False)
            }
            
    except Exception as error:
        print(f'Error calling Gemini API: {str(error)}')
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'message': '抱歉，無法獲取烹飪建議。請稍後再試。',
                'error': str(error)
            }, ensure_ascii=False)
        } 