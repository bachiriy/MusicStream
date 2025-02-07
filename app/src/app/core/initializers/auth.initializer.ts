import { AuthService } from '../services/auth.service';

export function initializeAuth(authService: AuthService) {
    return () => authService.initializeAuth();
} 