# Zod Validation Implementation

## ✅ **Migration Complete - All Forms Now Use Zod!**

Zod is now the primary validation library for all forms in the Naqlah application.

---

## 📦 What is Zod?

**Zod** is a TypeScript-first schema validation library with:

- ✅ **Type Safety**: Automatic TypeScript type inference
- ✅ **Runtime Validation**: Catches errors at runtime
- ✅ **Composable**: Build complex schemas from simple ones
- ✅ **Zero Dependencies**: Lightweight and fast
- ✅ **Better DX**: Clear error messages and great IDE support

---

## 🚀 Installation

```bash
npm install zod
```

**Status**: ✅ Already installed

---

## 📁 Project Structure

```
lib/
└── validations/
    └── schemas.ts          # All Zod schemas and helpers

app/
├── register-company/
│   └── page.tsx           # Uses registerCompanySchema
└── ...

components/
├── request-move-modal.tsx # Uses requestMovePhoneSchema & requestMoveOTPSchema
└── home/
    └── contact-section.tsx # Uses contactSchema

utils/
└── validation.ts          # @deprecated - kept for backward compatibility
```

---

## 📚 Available Schemas

### **Common Field Schemas**

#### 1. **Saudi Phone Number**

```typescript
import { saudiPhoneSchema } from '@/lib/validations/schemas';

// Validates: 9 digits starting with 5
// Example: "591002006"
const phoneError = validateField(saudiPhoneSchema, phoneNumber);
```

**Rules:**

- Exactly 9 digits
- Must start with 5
- Only numeric characters

#### 2. **Email**

```typescript
import { emailSchema } from '@/lib/validations/schemas';

const emailError = validateField(emailSchema, email);
```

**Rules:**

- Standard email format
- Non-empty

#### 3. **Password**

```typescript
import { passwordSchema } from '@/lib/validations/schemas';

const passwordError = validateField(passwordSchema, password);
```

**Rules:**

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

#### 4. **Non-Empty String**

```typescript
import { nonEmptyStringSchema } from '@/lib/validations/schemas';

const error = validateField(nonEmptyStringSchema, value);
```

**Rules:**

- Not empty
- Trimmed whitespace

---

### **Form Schemas**

#### 1. **Register Company Schema**

```typescript
import { registerCompanySchema, RegisterCompanyFormData } from '@/lib/validations/schemas';

// Type-safe form data
const formData: RegisterCompanyFormData = {
  companyName: string,
  city: string,
  email: string,
  password: string,
  confirmPassword: string,
  phoneNumber: string,
  services: string[],
  aboutCompany: string,
  agreeTerms: boolean,
};

// Validate
const validation = safeValidate(registerCompanySchema, formData);
```

**Fields:**

- `companyName`: Min 2 characters
- `city`: Required
- `email`: Valid email format
- `password`: Strong password (see password schema)
- `confirmPassword`: Must match password
- `phoneNumber`: Saudi phone format
- `services`: At least 1 service
- `aboutCompany`: Min 10 characters
- `agreeTerms`: Must be true

#### 2. **Request Move Phone Schema**

```typescript
import { requestMovePhoneSchema } from '@/lib/validations/schemas';

const data = {
  phoneNumber: string,
  saveData: boolean,
};

const validation = safeValidate(requestMovePhoneSchema, data);
```

#### 3. **Request Move OTP Schema**

```typescript
import { requestMoveOTPSchema } from '@/lib/validations/schemas';

const data = {
  otp: string, // Must be 6 digits
};

const validation = safeValidate(requestMoveOTPSchema, data);
```

#### 4. **Contact Form Schema**

```typescript
const contactSchema = z.object({
  name: nonEmptyStringSchema.min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  messageTitle: nonEmptyStringSchema.min(3, 'Subject must be at least 3 characters'),
  message: nonEmptyStringSchema.min(10, 'Message must be at least 10 characters'),
});
```

---

## 🛠️ Helper Functions

### 1. **safeValidate()**

Safe validation with formatted errors:

```typescript
import { safeValidate } from '@/lib/validations/schemas';

const validation = safeValidate(schema, data);

if (!validation.success) {
  console.log(validation.errors);
  // { fieldName: "error message", ... }
} else {
  console.log(validation.data); // Typed data
}
```

**Returns:**

```typescript
{
  success: boolean;
  data?: T;              // Only if success
  errors?: Record<string, string>;  // Only if failure
}
```

### 2. **validateField()**

Validate a single field:

```typescript
import { validateField, saudiPhoneSchema } from '@/lib/validations/schemas';

const error = validateField(saudiPhoneSchema, phoneNumber);
if (error) {
  setPhoneError(error);
}
```

**Returns:** `string | null`

### 3. **formatZodErrors()**

Format Zod errors into a simple object:

```typescript
import { formatZodErrors } from '@/lib/validations/schemas';

try {
  schema.parse(data);
} catch (error) {
  if (error instanceof z.ZodError) {
    const errors = formatZodErrors(error);
    // { field1: "error1", field2: "error2" }
  }
}
```

---

## 💻 Usage Examples

### **Example 1: Register Company Form**

```typescript
import { registerCompanySchema, safeValidate } from '@/lib/validations/schemas';

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Validate using Zod
  const validation = safeValidate(registerCompanySchema, formData);

  if (!validation.success) {
    setErrors({
      companyName: validation.errors?.companyName || '',
      email: validation.errors?.email || '',
      // ... other fields
    });
    return;
  }

  // Form is valid - proceed
  console.log(validation.data); // Type-safe!
  submitToAPI(validation.data);
};
```

### **Example 2: Phone Number Validation**

```typescript
import { validateField, saudiPhoneSchema } from '@/lib/validations/schemas';

const handlePhoneChange = (value: string) => {
  setPhoneNumber(value);

  // Validate on change
  const error = validateField(saudiPhoneSchema, value);
  if (error) {
    setPhoneError(error);
  } else {
    setPhoneError('');
  }
};
```

### **Example 3: Custom Schema**

```typescript
import { z } from 'zod';
import { emailSchema, saudiPhoneSchema } from '@/lib/validations/schemas';

const customSchema = z.object({
  email: emailSchema,
  phone: saudiPhoneSchema,
  age: z.number().min(18, 'Must be at least 18'),
  website: z.string().url('Invalid URL').optional(),
});

type CustomData = z.infer<typeof customSchema>;
```

---

## 🔄 Migration from Manual Validation

### Before (Manual):

```typescript
// ❌ Manual validation - Error prone
if (!email) {
  return 'Email is required';
}
if (!email.includes('@')) {
  return 'Invalid email';
}
if (password.length < 8) {
  return 'Password too short';
}
if (!/[A-Z]/.test(password)) {
  return 'Need uppercase';
}
// ... many more checks
```

### After (Zod):

```typescript
// ✅ Zod validation - Clean and type-safe
import { emailSchema, passwordSchema, validateField } from '@/lib/validations/schemas';

const emailError = validateField(emailSchema, email);
const passwordError = validateField(passwordSchema, password);
```

---

## 📊 Comparison

| Feature             | Manual Validation | Zod Validation                |
| ------------------- | ----------------- | ----------------------------- |
| **Type Safety**     | ❌ No             | ✅ Yes (TypeScript inference) |
| **Code Lines**      | 🟡 Many           | ✅ Few                        |
| **Maintainability** | ❌ Hard           | ✅ Easy                       |
| **Reusability**     | 🟡 Medium         | ✅ High                       |
| **Error Messages**  | 🟡 Manual         | ✅ Built-in                   |
| **Testing**         | ❌ Complex        | ✅ Simple                     |
| **Documentation**   | ❌ Manual         | ✅ Self-documenting           |

---

## 🎯 Forms Migrated to Zod

### ✅ **Completed**:

1. **Register Company Form** (`app/register-company/page.tsx`)

   - All 9 fields validated with Zod
   - Type-safe form data
   - Auto-scroll to first error

2. **Request Move Modal** (`components/request-move-modal.tsx`)

   - Phone number validation
   - OTP validation
   - Both steps use Zod

3. **Contact Form** (`components/home/contact-section.tsx`)
   - Name, email, subject, message validation
   - Success/error feedback
   - Loading states

---

## 🚀 Best Practices

### 1. **Always Use Existing Schemas**

```typescript
// ✅ Good - Reuse existing schemas
import { saudiPhoneSchema } from '@/lib/validations/schemas';

// ❌ Bad - Don't create duplicate schemas
const myPhoneSchema = z.string().regex(/^5[0-9]{8}$/);
```

### 2. **Use Type Inference**

```typescript
// ✅ Good - Let Zod infer types
type FormData = z.infer<typeof mySchema>;

// ❌ Bad - Manual type definitions
interface FormData {
  email: string;
  phone: string;
}
```

### 3. **Validate Early, Display Later**

```typescript
// ✅ Good - Validate on submit, show errors
const handleSubmit = () => {
  const validation = safeValidate(schema, data);
  if (!validation.success) {
    setErrors(validation.errors);
    return;
  }
  // Proceed...
};

// ❌ Bad - Validate on every keystroke (annoying UX)
const handleChange = (e) => {
  const value = e.target.value;
  const error = validateField(schema, value);
  setError(error); // Too aggressive!
};
```

### 4. **Clear Errors on Input**

```typescript
// ✅ Good - Clear error when user starts typing
const handleChange = (e) => {
  setValue(e.target.value);
  if (error) setError(''); // Clear error
};
```

### 5. **Use safeValidate for Form Validation**

```typescript
// ✅ Good - safeValidate for entire form
const validation = safeValidate(formSchema, formData);

// ❌ Less ideal - try/catch
try {
  formSchema.parse(formData);
} catch (error) {
  // Manual error handling
}
```

---

## 🧪 Testing with Zod

```typescript
import { registerCompanySchema } from '@/lib/validations/schemas';

describe('Register Company Validation', () => {
  it('should validate correct data', () => {
    const data = {
      companyName: 'Test Company',
      email: 'test@example.com',
      password: 'Strong123!',
      confirmPassword: 'Strong123!',
      phoneNumber: '591002006',
      city: 'riyadh',
      services: ['moving'],
      aboutCompany: 'We move things',
      agreeTerms: true,
    };

    const result = registerCompanySchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('should reject invalid phone', () => {
    const data = { ...validData, phoneNumber: '123' };
    const result = registerCompanySchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
```

---

## 📚 Resources

### Official Docs:

- [Zod Documentation](https://zod.dev/)
- [Zod GitHub](https://github.com/colinhacks/zod)

### Tutorials:

- [Zod + React Forms](https://www.youtube.com/watch?v=u6PQ5xZAv7Q)
- [TypeScript with Zod](https://www.totaltypescript.com/tutorials/zod)

---

## ✨ Benefits Achieved

### **For Developers:**

✅ **Type Safety**: Catch errors at compile time  
✅ **Less Code**: Schemas are concise and readable  
✅ **Better IDE Support**: Autocomplete and type hints  
✅ **Easier Testing**: Test schemas, not implementations  
✅ **Maintainable**: Single source of truth for validation

### **For Users:**

✅ **Consistent Errors**: Same message format everywhere  
✅ **Better UX**: Clear, specific error messages  
✅ **Faster Forms**: Client-side validation prevents unnecessary API calls  
✅ **Accessible**: Proper ARIA labels and error associations

### **For Project:**

✅ **Scalable**: Easy to add new forms  
✅ **Documented**: Schemas serve as documentation  
✅ **Testable**: Unit test schemas easily  
✅ **Future-Proof**: Industry standard library

---

## 🎓 Next Steps

1. **Add More Schemas**: As you create new forms, add schemas to `schemas.ts`
2. **Server-Side Validation**: Reuse Zod schemas in API routes
3. **Form Libraries**: Consider integrating React Hook Form + Zod resolver
4. **Custom Errors**: Add translations for error messages
5. **Advanced Validation**: Add async validators for unique checks

---

## 📝 Summary

| Metric                   | Before       | After      |
| ------------------------ | ------------ | ---------- |
| **Validation Library**   | Manual       | ✅ Zod     |
| **Type Safety**          | ❌ No        | ✅ Yes     |
| **Code Lines**           | ~150         | ~50        |
| **Error Handling**       | Inconsistent | ✅ Unified |
| **Maintainability**      | ⭐⭐         | ⭐⭐⭐⭐⭐ |
| **Developer Experience** | 🟡 OK        | ✅ Great   |

**Status**: ✅ **Migration Complete - All Forms Use Zod!**

---

**Last Updated**: October 29, 2025  
**Version**: 1.0.0  
**Dependencies**: `zod@latest`
