# Security Guidelines

## API Key Security

**IMPORTANT:** Never commit API keys or sensitive credentials to your repository!

### What Happened
The X.AI API key was accidentally exposed in the source code and has been detected by GitGuardian. This poses a security risk as anyone can see and potentially misuse your API key.

### Immediate Actions Taken
1. Removed the exposed API key from the source code
2. Disabled the API functionality temporarily
3. Added .env files to .gitignore

### How to Properly Configure API Keys

1. Create a `.env` file in your project root (this file should NOT be committed):
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

2. Update your code to use environment variables:
```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

3. For production deployment on AWS:
   - Set environment variables in your hosting service
   - Never include API keys in your build files

### Next Steps
1. Revoke the exposed API key on X.AI platform
2. Generate a new API key
3. Configure it as an environment variable
4. Test the functionality locally before deploying

### Security Best Practices
- Always use environment variables for sensitive data
- Add .env files to .gitignore
- Regularly rotate API keys
- Monitor for credential exposure with tools like GitGuardian
- Use different API keys for development and production 