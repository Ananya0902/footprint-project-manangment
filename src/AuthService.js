// AuthService.js

class AuthService {
    isAuthenticatedValue = false;
  
    login() {
      this.isAuthenticatedValue = true;
    }
  
    logout() {
      this.isAuthenticatedValue = false;
    }
  
    isAuthenticated() {
      return this.isAuthenticatedValue;
    }
}

export default new AuthService();
