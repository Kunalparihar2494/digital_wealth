# Digital Wealth - Unlisted IPO Platform

## Quick Start

```bash
npm install
cp .env.example .env
npm run start
```

## Running on Different Platforms

```bash
npm run ios
npm run android
npm run web
npm run lint
```

## Architecture

### Key Technologies

- **React Native** + **Expo** - Cross-platform mobile
- **TypeScript** - Type-safe code
- **Zustand** - State management
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - File-based routing

### Security

- Tokens stored in SecureStore on mobile
- HTTPS for API calls
- Input validation on forms
- Error boundary for crash recovery

### Key Files

| File | Purpose |
|------|---------|
| `src/utils/secureStorage.ts` | Secure token management |
| `src/services/auth-service.ts` | Auth logic and token refresh |
| `src/store/auth.store.ts` | Auth state management |
| `src/services/api.ts` | HTTP client configuration |
| `src/services/error-handler.ts` | API error handling |
| `app/index.tsx` | App initialization and routing |

## Authentication Flow

1. User enters mobile and PIN.
2. Login response returns auth tokens.
3. Tokens are stored securely.
4. Auth state is restored on app startup.
5. Token refresh runs when the stored token is expired.
6. Logout clears sensitive auth data.

## Deployment

### iOS

```bash
eas build --platform ios --auto-submit
```

### Android

```bash
eas build --platform android
```

## Testing

```bash
npm run test
```

## Support

Email: support@digitalwealth.in
Issues: Open a GitHub issue.
Docs: See `PRODUCTION_READINESS_PLAN.md`.
