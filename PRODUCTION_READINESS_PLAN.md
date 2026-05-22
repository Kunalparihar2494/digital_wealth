# Production Readiness Improvement Plan
## Digital Wealth App

**Status**: Not Production Ready  
**Created**: 2026-05-22  
**Priority**: HIGH

---

## Table of Contents
1. [Security Issues](#1-security-issues)
2. [Token & Authentication Management](#2-token--authentication-management)
3. [Error Handling & Resilience](#3-error-handling--resilience)
4. [Type Safety](#4-type-safety)
5. [Code Quality & Standards](#5-code-quality--standards)
6. [Documentation](#6-documentation)
7. [Testing](#7-testing)
8. [Deployment & Configuration](#8-deployment--configuration)

---

## 1. Security Issues

### 🔴 CRITICAL: `.env` File Exposed

**Problem**: The `.env` file is committed to the repository, exposing sensitive data:
- `EXPO_PUBLIC_CLIENT_KEY=2cbd22fb7bXX`
- `EXPO_PUBLIC_API_URL=https://digitalwealth.in/`

**Impact**: Anyone with repo access can see API credentials and base URLs.

**Action Items**:

#### Step 1: Update `.gitignore`
```bash
# File: .gitignore
# Add these lines:
.env
.env.local
.env.*.local
.env.production
.env.development
*.local
```

#### Step 2: Create `.env.example`
```bash
# File: .env.example (commit this instead)
EXPO_PUBLIC_API_URL=https://your-api-url.com/
EXPO_PUBLIC_CLIENT_KEY=your_client_key_here
EXPO_PUBLIC_ENV=production
EXPO_PUBLIC_LOG_LEVEL=warn
```

**Timeline**: Immediate (before next deploy)
**Complexity**: 🟢 Low
**Verification**: `git rm --cached .env && git commit -m "Remove .env from tracking"`

---

### 🔴 CRITICAL: Token Storage Not Secure

**Problem**: Access tokens stored in plain AsyncStorage (unencrypted, world-readable):

```typescript
// ❌ CURRENT - UNSAFE
const token = await AsyncStorage.getItem("accessToken");
```

AsyncStorage is meant for non-sensitive data. If device is compromised, tokens are easily extractable.

**Impact**: Account compromise if device is stolen or compromised.

**Solution**: Use SecureStore for sensitive data

#### Implementation Plan:

**Step 1: Create Secure Storage Utility**
```typescript
// File: src/utils/secureStorage.ts
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const TOKEN_KEYS = {
  ACCESS_TOKEN: "app_access_token",
  REFRESH_TOKEN: "app_refresh_token",
  DEVICE_ID: "app_device_id",
} as const;

/**
 * Securely store sensitive tokens
 * Uses SecureStore on mobile, localStorage on web
 */
export const secureStorage = {
  async setToken(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (error) {
        console.warn(`Failed to store ${key} securely:`, error);
        // Fallback to AsyncStorage (with warning)
        await AsyncStorage.setItem(key, value);
      }
    }
  },

  async getToken(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      try {
        return await SecureStore.getItemAsync(key);
      } catch (error) {
        console.warn(`Failed to retrieve ${key} from secure store:`, error);
        // Fallback to AsyncStorage
        return await AsyncStorage.getItem(key);
      }
    }
  },

  async removeToken(key: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (error) {
        console.warn(`Failed to remove ${key} from secure store:`, error);
        await AsyncStorage.removeItem(key);
      }
    }
  },

  async clearAll(): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.clear();
    } else {
      // SecureStore doesn't have clearAll, so clear individual items
      await Promise.all(
        Object.values(TOKEN_KEYS).map(key => this.removeToken(key))
      );
    }
    await AsyncStorage.clear();
  },
};
```

**Step 2: Update API Service**
```typescript
// File: src/services/api.ts (Updated)
import { secureStorage, TOKEN_KEYS } from "@/src/utils/secureStorage";

const getHeaders = async () => {
  const token = await secureStorage.getToken(TOKEN_KEYS.ACCESS_TOKEN);

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "close",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
```

**Step 3: Update Auth Store**
```typescript
// File: src/store/auth.store.ts (Updated)
import { create } from "zustand";
import { secureStorage, TOKEN_KEYS } from "@/src/utils/secureStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, refreshToken: string) => Promise<void>;
  getToken: () => Promise<string | null>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  refreshToken: null,
  isAuthenticated: false,

  setAuth: async (accessToken, refreshToken) => {
    await secureStorage.setToken(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    await secureStorage.setToken(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    set({ token: accessToken, refreshToken, isAuthenticated: true });
  },

  getToken: async () => {
    return await secureStorage.getToken(TOKEN_KEYS.ACCESS_TOKEN);
  },

  logout: async () => {
    await secureStorage.clearAll();
    set({ token: null, refreshToken: null, isAuthenticated: false });
  },

  initializeAuth: async () => {
    const token = await secureStorage.getToken(TOKEN_KEYS.ACCESS_TOKEN);
    set({ 
      token, 
      isAuthenticated: !!token 
    });
  },
}));
```

**Timeline**: 1-2 weeks
**Complexity**: 🟡 Medium
**Testing**: Test on iOS, Android, and Web separately

---

### 🟡 MEDIUM: Inconsistent Token Keys

**Problem**: Multiple token key names used throughout the codebase:
```typescript
AsyncStorage.getItem("token")           // app/index.tsx
AsyncStorage.getItem("accessToken")     // api.ts
"access_token"                          // tokenKeys.ts
"token"                                 // auth.store.ts
```

**Solution**: Centralize all token constants

```typescript
// File: src/constants/storage.ts
export const STORAGE_KEYS = {
  // Authentication
  ACCESS_TOKEN: "app_access_token",
  REFRESH_TOKEN: "app_refresh_token",
  
  // User Data
  USER_DATA: "app_user_data",
  USER_PREFERENCES: "app_user_preferences",
  
  // App State
  DEVICE_ID: "app_device_id",
  KYC_STATUS: "app_kyc_status",
  
  // Biometric
  BIOMETRIC_ENABLED: "biometric_enabled",
  BIOMETRIC_USER: "biometric_user",
  BIOMETRIC_DEVICE: "biometric_device",
  BIOMETRIC_REFRESH_TOKEN: "biometric_refresh_token",
} as const;
```

**Timeline**: 1 week
**Complexity**: 🟢 Low
**Verification**: Search for "AsyncStorage.getItem", "SecureStore" to ensure all use constants

---

### 🟡 MEDIUM: API Credentials in Code

**Problem**: Hard-coded API base URL and CLIENT_KEY:
```typescript
const BASE_URL = "https://digitalwealth.in";
const CLIENT_KEY = process.env.EXPO_PUBLIC_CLIENT_KEY;
```

**Better Approach**:
```typescript
// File: src/config/api.config.ts
export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://digitalwealth.in",
  clientKey: process.env.EXPO_PUBLIC_CLIENT_KEY,
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  environment: process.env.EXPO_PUBLIC_ENV || "production",
  logLevel: (process.env.EXPO_PUBLIC_LOG_LEVEL || "warn") as LogLevel,
};
```

**Timeline**: 1 week
**Complexity**: 🟢 Low

---

## 2. Token & Authentication Management

### 🔴 CRITICAL: Token Inconsistency Issues

**Current Issues**:
1. `app/index.tsx` checks for `"token"` but auth store saves `"accessToken"`
2. No refresh token handling
3. No token expiration logic

**Implementation Plan**:

#### Step 1: Create Comprehensive Auth Service
```typescript
// File: src/services/auth-service.ts
import { secureStorage, TOKEN_KEYS } from "@/src/utils/secureStorage";
import { useAuthStore } from "@/src/store/auth.store";
import api from "@/src/services/api";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class AuthService {
  /**
   * Store tokens after login
   */
  static async storeTokens(response: TokenResponse): Promise<void> {
    await secureStorage.setToken(TOKEN_KEYS.ACCESS_TOKEN, response.accessToken);
    await secureStorage.setToken(TOKEN_KEYS.REFRESH_TOKEN, response.refreshToken);
    
    // Store expiry time
    const expiryTime = Date.now() + response.expiresIn * 1000;
    await AsyncStorage.setItem("tokenExpiryTime", expiryTime.toString());
    
    useAuthStore.getState().setAuth(response.accessToken, response.refreshToken);
  }

  /**
   * Check if token is expired
   */
  static async isTokenExpired(): Promise<boolean> {
    const expiryTime = await AsyncStorage.getItem("tokenExpiryTime");
    if (!expiryTime) return true;
    
    return Date.now() > parseInt(expiryTime);
  }

  /**
   * Refresh access token if expired
   */
  static async refreshTokenIfNeeded(): Promise<boolean> {
    if (!(await this.isTokenExpired())) {
      return true;
    }

    try {
      const refreshToken = await secureStorage.getToken(TOKEN_KEYS.REFRESH_TOKEN);
      if (!refreshToken) return false;

      const response = await api.post("/AppAccess/refresh-token", {
        refreshToken,
      });

      if (response?.data?.accessToken) {
        await this.storeTokens(response.data);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      await this.logout();
      return false;
    }

    return false;
  }

  /**
   * Logout user and clear all auth data
   */
  static async logout(): Promise<void> {
    await secureStorage.clearAll();
    await AsyncStorage.removeItem("tokenExpiryTime");
    useAuthStore.getState().logout();
    // Navigation handled in app
  }
}
```

#### Step 2: Fix Root Index File
```typescript
// File: app/index.tsx (Updated)
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthService } from "@/src/services/auth-service";

export default function Index() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize auth state from secure storage
        await initializeAuth();
        
        // Refresh token if needed
        await AuthService.refreshTokenIfNeeded();
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, [initializeAuth]);

  if (isInitializing) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/login"} />
  );
}
```

**Timeline**: 2-3 weeks
**Complexity**: 🟡 Medium
**Testing**: 
- Test token expiry & refresh flow
- Test logout on all platforms
- Test with expired tokens

---

## 3. Error Handling & Resilience

### 🔴 CRITICAL: No Global Error Boundary

**Problem**: Errors crash the app without graceful fallback.

**Solution**: Implement Error Boundary

#### Step 1: Create Error Boundary Component
```typescript
// File: src/components/ErrorBoundary.tsx
import React, { ReactNode } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { AlertCircle } from "lucide-react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error Boundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // TODO: Send error to monitoring service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ScrollView className="flex-1 bg-white">
          <View className="flex-1 justify-center items-center p-6">
            <AlertCircle size={48} color="#ef4444" />
            
            <Text className="text-xl font-bold text-gray-900 mt-4">
              Something went wrong
            </Text>
            
            <Text className="text-gray-600 mt-2 text-center">
              We encountered an unexpected error. Please try again.
            </Text>

            {__DEV__ && this.state.error && (
              <View className="mt-6 bg-gray-100 p-4 rounded-lg w-full">
                <Text className="text-xs font-mono text-gray-900">
                  {this.state.error.toString()}
                </Text>
              </View>
            )}

            <TouchableOpacity
              className="mt-6 bg-blue-500 px-6 py-3 rounded-lg"
              onPress={() => this.setState({ hasError: false })}
            >
              <Text className="text-white font-semibold">Try Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}
```

#### Step 2: Wrap Root Layout
```typescript
// File: app/_layout.tsx
import { ErrorBoundary } from "@/src/components/ErrorBoundary";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Stack screenOptions={{ headerShown: false }} />
    </ErrorBoundary>
  );
}
```

**Timeline**: 1 week
**Complexity**: 🟢 Low

---

### 🟡 MEDIUM: API Error Handling

**Problem**: API errors logged but not handled consistently.

**Solution**: Create Error Response Handler

```typescript
// File: src/services/error-handler.ts
export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const handleApiError = (error: any): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || "Server error";

    if (status === 401) {
      return new AppError(
        "UNAUTHORIZED",
        status,
        "Unauthorized - Please login again",
        error
      );
    }

    if (status === 403) {
      return new AppError(
        "FORBIDDEN",
        status,
        "You don't have permission to perform this action",
        error
      );
    }

    if (status === 404) {
      return new AppError("NOT_FOUND", status, "Resource not found", error);
    }

    if (status === 422) {
      return new AppError(
        "VALIDATION_ERROR",
        status,
        message,
        error
      );
    }

    if (status >= 500) {
      return new AppError(
        "SERVER_ERROR",
        status,
        "Server error - Please try again later",
        error
      );
    }

    return new AppError("API_ERROR", status, message, error);
  }

  if (error.request && !error.response) {
    return new AppError(
      "NETWORK_ERROR",
      0,
      "Network error - Check your connection",
      error
    );
  }

  if (error.name === "AbortError") {
    return new AppError(
      "TIMEOUT_ERROR",
      0,
      "Request timeout - Please try again",
      error
    );
  }

  return new AppError(
    "UNKNOWN_ERROR",
    0,
    "An unexpected error occurred",
    error
  );
};
```

#### Usage in Components
```typescript
// File: app/(tabs)/shares.tsx (Updated)
const fetchShares = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await getShares();
    setShares(data?.Shares ?? []);
  } catch (err) {
    const appError = handleApiError(err);
    setError(appError.message);
    Alert.alert("Error", appError.message);
  } finally {
    setLoading(false);
  }
};
```

**Timeline**: 1 week
**Complexity**: 🟢 Low

---

### 🟡 MEDIUM: API Retry Logic

**Problem**: Failed requests not retried automatically.

**Solution**: Add Retry Mechanism

```typescript
// File: src/utils/retry.ts
export interface RetryConfig {
  maxAttempts: number;
  delayMs: number;
  backoffMultiplier: number;
  maxDelayMs: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffMultiplier: 2,
  maxDelayMs: 10000,
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: any;

  for (let attempt = 0; attempt < finalConfig.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < finalConfig.maxAttempts - 1) {
        const delay = Math.min(
          finalConfig.delayMs * Math.pow(finalConfig.backoffMultiplier, attempt),
          finalConfig.maxDelayMs
        );

        console.log(
          `Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`,
          error
        );

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}
```

**Timeline**: 1 week
**Complexity**: 🟡 Medium

---

## 4. Type Safety

### 🟡 MEDIUM: Using `any` Types

**Problem**:
```typescript
// ❌ BAD
export default function PrimaryButton({ title, onPress, disabled }: any) {
```

**Solution**: Define proper interfaces

```typescript
// File: src/types/components.ts
export interface PrimaryButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

// File: src/components/PrimaryButton.tsx (Updated)
import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { PrimaryButtonProps } from "@/src/types/components";

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
}: PrimaryButtonProps) {
  const bgColor =
    variant === "primary"
      ? "bg-blue-500"
      : variant === "danger"
        ? "bg-red-500"
        : "bg-gray-500";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      className={`w-full py-3 rounded-lg mt-4 ${
        disabled ? "bg-gray-300" : bgColor
      }`}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white text-center font-semibold text-base">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
```

**Timeline**: 2-3 weeks (gradual)
**Complexity**: 🟡 Medium
**Tool**: Use TypeScript strict mode & ESLint

---

### 🟡 MEDIUM: Missing Interface Documentation

**Create comprehensive type definitions**:

```typescript
// File: src/types/index.ts
/**
 * Auth & User Types
 */
export interface IUser {
  id: string;
  contact: string;
  fullName: string;
  email: string;
  kycStatus: "pending" | "verified" | "rejected";
  createdAt: string;
}

export interface IAuthResponse {
  message: string;
  token: string;
  refreshToken: string;
  user: IUser;
}

/**
 * API Response Types
 */
export interface IApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

/**
 * Error Types
 */
export interface IApiError {
  code: string;
  message: string;
  statusCode: number;
}
```

**Timeline**: 2 weeks
**Complexity**: 🟡 Medium

---

## 5. Code Quality & Standards

### 🟡 MEDIUM: No ESLint Rules Enforced

**Current ESLint Config**: Only extends `eslint-config-expo`

**Enhanced Config**:
```javascript
// File: eslint.config.js (Updated)
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*'],
  },
  {
    rules: {
      // Disallow any types
      '@typescript-eslint/no-explicit-any': 'error',
      
      // Require proper error handling
      '@typescript-eslint/no-floating-promises': 'warn',
      
      // Security
      'no-eval': 'error',
      'no-implied-eval': 'error',
      
      // Console logs in production
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      
      // Unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
    },
  },
]);
```

**Add Pre-commit Hook**:
```bash
# File: .husky/pre-commit
#!/bin/sh
npm run lint -- --fix
npm run type-check
```

**Timeline**: 1 week
**Complexity**: 🟢 Low

---

## 6. Documentation

### 🔴 CRITICAL: No Project Documentation

**Create README.md**:
```markdown
# Digital Wealth - Unlisted IPO & Shares Platform

## Overview
A React Native/Expo app for trading unlisted IPO shares and managing investment portfolio.

## Architecture

### Project Structure
\`\`\`
src/
├── components/       # Reusable UI components
├── services/        # API & external services
├── store/           # Zustand state management
├── screens/         # Screen components
├── utils/           # Helper functions
├── types/           # TypeScript interfaces
└── constants/       # App constants

app/
├── (auth)/          # Auth screens
├── (tabs)/          # Tab navigation screens
├── (pages)/         # Other pages
└── (legal)/         # Legal documents
\`\`\`

### Authentication Flow
1. User logs in with mobile + PIN
2. OTP verification
3. Access & Refresh tokens stored securely
4. Token refresh on expiry
5. Auto-logout on 401

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI

### Installation
\`\`\`bash
npm install
\`\`\`

### Environment Variables
\`\`\`bash
cp .env.example .env
# Edit .env with your values
\`\`\`

### Running the App
\`\`\`bash
# Development
npm run start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
\`\`\`

## API Integration

### Base URL
- Development: \`https://dev-api.digitalwealth.in\`
- Production: \`https://api.digitalwealth.in\`

### Authentication Headers
\`\`\`
Authorization: Bearer <access_token>
Content-Type: application/json
\`\`\`

### Error Handling
See \`src/services/error-handler.ts\`

## Testing

### Unit Tests
\`\`\`bash
npm run test
\`\`\`

### E2E Tests
\`\`\`bash
npm run test:e2e
\`\`\`

## Security

- Tokens stored in SecureStore (encrypted)
- API requests use HTTPS
- Input validation on all forms
- XSS protection via React

## Performance

- Lazy loading screens
- Memoized components
- Image optimization
- Bundle size: < 50MB

## Deployment

### iOS
\`\`\`bash
eas build --platform ios --auto-submit
\`\`\`

### Android
\`\`\`bash
eas build --platform android
\`\`\`

## Contributing

1. Create feature branch
2. Follow TypeScript strict mode
3. Add tests for new features
4. Submit PR for review

## Support

For issues, contact: support@digitalwealth.in
```

**Timeline**: 1 week
**Complexity**: 🟢 Low

---

## 7. Testing

### 🔴 CRITICAL: No Tests

**Setup Testing Framework**:

```bash
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
```

```json
{
  "jest": {
    "preset": "react-native",
    "testEnvironment": "node",
    "moduleFileExtensions": ["ts", "tsx", "js"],
    "testMatch": ["**/__tests__/**/*.test.ts?(x)"],
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.d.ts"
    ]
  }
}
```

#### Sample Test
```typescript
// File: src/services/__tests__/auth-service.test.ts
import { AuthService } from "@/src/services/auth-service";
import { secureStorage } from "@/src/utils/secureStorage";

jest.mock("@/src/utils/secureStorage");

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("storeTokens", () => {
    it("should store tokens securely", async () => {
      const tokens = {
        accessToken: "access_123",
        refreshToken: "refresh_123",
        expiresIn: 3600,
      };

      await AuthService.storeTokens(tokens);

      expect(secureStorage.setToken).toHaveBeenCalledWith(
        TOKEN_KEYS.ACCESS_TOKEN,
        "access_123"
      );
    });
  });
});
```

**Timeline**: 3-4 weeks
**Complexity**: 🟡 Medium
**Coverage Goal**: 70%+

---

## 8. Deployment & Configuration

### 🟡 MEDIUM: No Build Configuration

**Create Build Profiles**:

```json
// File: eas.json (Enhanced)
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_ENV": "development",
        "EXPO_PUBLIC_API_URL": "https://dev-api.digitalwealth.in"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "EXPO_PUBLIC_ENV": "staging",
        "EXPO_PUBLIC_API_URL": "https://staging-api.digitalwealth.in"
      }
    },
    "production": {
      "distribution": "store",
      "env": {
        "EXPO_PUBLIC_ENV": "production",
        "EXPO_PUBLIC_API_URL": "https://api.digitalwealth.in"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "bundleIdentifier": "com.digitalwealth.app"
      },
      "android": {
        "package": "com.digitalwealth.app"
      }
    }
  }
}
```

**Timeline**: 2 weeks
**Complexity**: 🟡 Medium

---

## Implementation Priority & Timeline

### Phase 1: Critical Security (Week 1-2)
- [x] Remove `.env` from git
- [x] Implement SecureStore for tokens
- [x] Fix token inconsistency
- **Estimated**: 2 weeks

### Phase 2: Error Handling & Resilience (Week 3-4)
- [x] Add Error Boundary
- [x] Implement error handler service
- [x] Add retry logic
- **Estimated**: 2 weeks

### Phase 3: Code Quality (Week 5-6)
- [x] Remove `any` types
- [x] Add proper TypeScript interfaces
- [x] Enhance ESLint config
- **Estimated**: 2 weeks

### Phase 4: Testing (Week 7-10)
- [x] Setup Jest & React Testing Library
- [x] Add unit tests (70% coverage)
- [x] Add E2E tests for critical flows
- **Estimated**: 4 weeks

### Phase 5: Documentation & Deployment (Week 11-12)
- [x] Complete README
- [x] API documentation
- [x] Setup CI/CD
- [x] Build configurations
- **Estimated**: 2 weeks

**Total Timeline**: 12 weeks
**Team Size**: 1-2 developers

---

## Verification Checklist

Before deploying to production, verify:

- [ ] No `.env` file in git
- [ ] All tokens stored in SecureStore
- [ ] Error boundary implemented
- [ ] API errors handled with proper messages
- [ ] No `any` types in critical code paths
- [ ] Unit tests pass (70%+ coverage)
- [ ] E2E tests for auth flow pass
- [ ] All secrets in environment variables
- [ ] ESLint passes without warnings
- [ ] App doesn't crash on network errors
- [ ] Token refresh works correctly
- [ ] Logout clears all sensitive data
- [ ] Privacy policy & terms filled in
- [ ] Release notes prepared
- [ ] App version bumped

---

## Tools & Resources

### Security
- [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)
- [Expo Security](https://docs.expo.dev/guides/security/)

### Testing
- [Jest Documentation](https://jestjs.io/)
- [React Native Testing](https://reactnative.dev/docs/testing-overview)

### Monitoring
- [Sentry](https://sentry.io/) - Error tracking
- [LogRocket](https://logrocket.com/) - Session replay
- [Datadog](https://www.datadoghq.com/) - APM

### Code Quality
- [SonarQube](https://www.sonarqube.org/) - Code analysis
- [CodeClimate](https://codeclimate.com/) - CI integration

---

## Questions & Support

For clarification on any item, reach out to the team lead.

**Last Updated**: 2026-05-22
**Status**: Draft - Ready for Review
