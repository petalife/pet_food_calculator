# Code Verification Feature Setup

## Overview

The app now includes a code verification feature that:
1. Shows only basic info and calories initially
2. Requires a unique 8-character code to access detailed information
3. Validates codes against DynamoDB

## Environment Variables

Add these to your `.env` file:

```env
# Backend API URL for cooking advice
VITE_BACKEND_URL=https://your-cooking-advice-lambda-url.amazonaws.com

# Code verification API URL
VITE_VERIFY_CODE_URL=https://your-verify-code-lambda-url.amazonaws.com
```

## Features Added

### Frontend Changes:
- ✅ **Code verification section** with input field and verify button
- ✅ **Hidden content** (ingredient amounts, nutritional analysis) only shown after verification
- ✅ **Error handling** for invalid codes
- ✅ **Loading states** during verification
- ✅ **Auto-uppercase** for code input
- ✅ **Reset functionality** when going back to form

### User Flow:
1. User fills out pet form and submits
2. **Initially shows**: Pet info + Calorie breakdown
3. **Hidden until verified**: Ingredient amounts + Nutritional analysis
4. User enters 8-character code and clicks "驗證"
5. Frontend calls Lambda to verify code
6. If valid: Shows all detailed information
7. If invalid: Shows error message

## Backend Requirements

You need to deploy the `verify_code_function.py` Lambda function and configure:

1. **Lambda Function**: Deploy the verify code function
2. **DynamoDB Permissions**: Lambda needs read access to your table
3. **CORS**: Configure CORS for frontend access
4. **Function URL**: Create a function URL for the Lambda

## Testing

1. **Get a valid code** from your DynamoDB table:
   ```bash
   python access_code1_attributes.py
   ```

2. **Test the flow**:
   - Fill out the form
   - Submit to see basic results
   - Enter a valid code to see detailed info
   - Try invalid codes to test error handling

## Code Structure

- **State management**: Added `codeVerified`, `userCode`, `codeError`, `isVerifyingCode`
- **Verification function**: `verifyCode()` that calls the Lambda
- **Conditional rendering**: Hidden content only shows when `codeVerified` is true
- **Error handling**: Shows user-friendly error messages 