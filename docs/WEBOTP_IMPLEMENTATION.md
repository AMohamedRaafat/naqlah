# WebOTP API Implementation

## Overview

The Request Move modal now includes automatic OTP detection using the **WebOTP API**. This allows the application to automatically read OTP codes from SMS messages and fill them into the input fields, providing a seamless user experience.

## How It Works

1. User enters their phone number and submits
2. Backend sends an SMS with the OTP code
3. Browser automatically detects the SMS (if WebOTP API is supported)
4. OTP code is auto-filled into the input fields
5. User can verify immediately without manual entry

## SMS Message Format

For the WebOTP API to work, your SMS messages **MUST** follow this specific format:

```
Your verification code is: 123456

@yourdomain.com #123456
```

### Format Requirements:

1. **Last line must contain:**

   - `@` followed by your domain (e.g., `@naqlah.com`)
   - `#` followed by the OTP code
   - These must be on the last line of the message

2. **Example SMS messages:**

```
Your Naqlah verification code is: 123456

@naqlah.com #123456
```

```
رمز التحقق الخاص بك: 736230

@naqlah.com #736230
```

```
Use 456789 to verify your phone number for Naqlah.

@naqlah.com #456789
```

## Backend Integration

### SMS Template Example (Arabic)

```
رمز التحقق الخاص بنقلة هو: {OTP_CODE}
صالح لمدة 5 دقائق.

@naqlah.com #{OTP_CODE}
```

### SMS Template Example (English)

```
Your Naqlah verification code is: {OTP_CODE}
Valid for 5 minutes.

@naqlah.com #{OTP_CODE}
```

### API Implementation Example (Node.js)

```javascript
// Example using Twilio
const sendOTP = async (phoneNumber, otpCode) => {
  const message = `رمز التحقق الخاص بنقلة هو: ${otpCode}
صالح لمدة 5 دقائق.

@naqlah.com #${otpCode}`;

  await twilioClient.messages.create({
    body: message,
    from: '+966XXXXXXXXX', // Your Twilio number
    to: `+966${phoneNumber}`,
  });
};
```

## Browser Compatibility

### Supported Browsers:

- ✅ Chrome 84+ (Android)
- ✅ Edge 84+ (Android)
- ✅ Opera 70+ (Android)
- ✅ Samsung Internet 14+

### Not Supported:

- ❌ iOS Safari (Apple uses their own autofill system)
- ❌ Firefox (as of now)
- ❌ Desktop browsers

**Note:** If WebOTP API is not supported, users can still enter the OTP manually. The feature degrades gracefully.

## Security Considerations

1. **Domain Verification**: The SMS must contain your exact domain (`@naqlah.com`)
2. **HTTPS Required**: WebOTP API only works on HTTPS sites
3. **User Permission**: Browser may ask for user permission first time
4. **Timeout**: The API request times out after 3 minutes
5. **One-Time Use**: Each OTP credential can only be used once

## Testing

### Testing on Android Device:

1. **Deploy to HTTPS domain** (Required - WebOTP only works on HTTPS)
2. **Open app on Android Chrome** (version 84+)
3. **Open Developer Console** to see WebOTP logs:
   - Chrome DevTools → Console
   - Look for logs starting with "WebOTP:"
4. **Enter phone number and submit**
5. **Send SMS with correct format:**

   ```
   Your Naqlah verification code is: 123456

   @your-domain.com #123456
   ```

6. **Check for permission prompt:**
   - Browser will show a prompt asking to share OTP from SMS
   - If you don't see prompt, check console for errors
   - If "NotAllowedError" appears, user denied permission
7. **Allow the prompt** - OTP will auto-fill!

### Troubleshooting:

**Issue: No permission prompt appears**
- ✓ Verify you're on HTTPS (not HTTP)
- ✓ Check browser version (Chrome 84+)
- ✓ Verify SMS format has `@domain.com #code` on last line
- ✓ Domain in SMS must match website domain exactly

**Issue: "NotAllowedError" in console**
- User denied permission
- Clear browser data and try again
- User can still enter OTP manually

**Issue: "SecurityError" in console**
- Website must be on HTTPS
- Self-signed certificates may cause issues

**Issue: OTP doesn't auto-fill**
- Check console logs for WebOTP errors
- Verify SMS format is correct
- Try the fallback autocomplete method (see below)

### Fallback: Autocomplete Method

The app also uses `autocomplete="one-time-code"` as fallback:
- Works on iOS Safari and other browsers
- Doesn't require specific SMS format
- Browser's native OTP detection
- Less reliable but broader support

### Testing Locally (Development):

WebOTP API requires HTTPS, but you can test locally using:

1. **Chrome Flags** (for testing):

   - Open `chrome://flags`
   - Enable "Experimental Web Platform features"
   - Restart browser

2. **Use ngrok or similar** to create HTTPS tunnel:

   ```bash
   ngrok http 3000
   ```

3. **Test SMS Format**:
   Send SMS with your ngrok domain:

   ```
   Your code: 123456

   @your-ngrok-url.ngrok.io #123456
   ```

## Implementation in Code

The WebOTP implementation is in `components/request-move-modal.tsx`:

```typescript
const startWebOTP = async () => {
  if ('OTPCredential' in window) {
    try {
      const ac = new AbortController();

      // Set timeout to abort after 3 minutes
      setTimeout(() => {
        ac.abort();
      }, 3 * 60 * 1000);

      // Request OTP from SMS
      const otp = await navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      } as any);

      if (otp && (otp as any).code) {
        setOtp((otp as any).code);
        setOtpError('');
      }
    } catch (err) {
      // Graceful degradation - user can enter manually
      console.log('WebOTP not available:', err);
    }
  }
};
```

## Fallback Behavior

If WebOTP API is not available:

- ✅ User can still enter OTP manually
- ✅ No errors or broken functionality
- ✅ Full feature parity, just without auto-fill

## Additional Resources

- [WebOTP API Specification](https://wicg.github.io/web-otp/)
- [MDN Web Docs - WebOTP API](https://developer.mozilla.org/en-US/docs/Web/API/WebOTP_API)
- [Google Developers Guide](https://web.dev/web-otp/)

## Support

For issues or questions about WebOTP implementation, please contact the development team.
