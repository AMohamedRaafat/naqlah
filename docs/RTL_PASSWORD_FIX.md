# RTL Password Input Fix

## Issue

The eye icon (password visibility toggle) in password input fields was always positioned on the right side, which looked incorrect in Arabic (RTL) layout where it should appear on the left side (visually the right side in RTL).

## Solution Applied

### Files Modified

- `app/register-company/page.tsx`

### Changes Made

#### 1. Password Field

**Before:**

```tsx
<Input
  className="border-[#EDEDED] pr-12"
/>
<button
  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
>
```

**After:**

```tsx
<Input
  className={`border-[#EDEDED] ${isRTL ? 'pl-12' : 'pr-12'}`}
/>
<button
  className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${
    isRTL ? 'left-3' : 'right-3'
  }`}
>
```

#### 2. Confirm Password Field

Same fix applied to the confirm password field.

### Key Changes

1. **Input Padding**: Changed from fixed `pr-12` (padding-right) to conditional:

   - Arabic (RTL): `pl-12` (padding-left)
   - English (LTR): `pr-12` (padding-right)

2. **Icon Position**: Changed from fixed `right-3` to conditional:

   - Arabic (RTL): `left-3` (appears on the left, which is visually right in RTL)
   - English (LTR): `right-3` (appears on the right as usual)

3. **Container Direction**: Added `dir` attribute to the relative container to ensure proper layout direction.

## Result

### Arabic (RTL)

- ✅ Eye icon appears on the left side (visually right)
- ✅ Input padding on the left to make room for the icon
- ✅ Text input flows from right to left correctly

### English (LTR)

- ✅ Eye icon appears on the right side as expected
- ✅ Input padding on the right to make room for the icon
- ✅ Text input flows from left to right as usual

## Testing

1. **Test in Arabic:**

   ```bash
   # Switch to Arabic in the app
   # Navigate to Register Company page
   # Check password fields - icon should be on the left
   ```

2. **Test in English:**

   ```bash
   # Switch to English in the app
   # Navigate to Register Company page
   # Check password fields - icon should be on the right
   ```

3. **Verify Functionality:**
   - Click eye icon - password should toggle visibility
   - Type in password - icon should not overlap text
   - Both languages work correctly

## Future Considerations

If adding more password fields in the future, use this pattern:

```tsx
<div className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
  <Input
    type={showPassword ? 'text' : 'password'}
    className={`border-[#EDEDED] ${isRTL ? 'pl-12' : 'pr-12'}`}
    dir={isRTL ? 'rtl' : 'ltr'}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${isRTL ? 'left-3' : 'right-3'}`}
  >
    {showPassword ? <EyeOff /> : <Eye />}
  </button>
</div>
```

## Related Files

- `app/register-company/page.tsx` - Register company form with password fields
- `contexts/language-context.tsx` - Language context providing `isRTL` flag

## Status

✅ **Fixed** - All password inputs now properly support RTL layout

---

**Last Updated**: October 29, 2025  
**Status**: ✅ Complete
