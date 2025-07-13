class LoginModel {
  constructor() {
    this.users = [
      {
        id: 1,
        email: 'admin@usstuck.com',
        password: 'admin123',
        name: 'Administrator',
        role: 'admin'
      },
      {
        id: 2,
        email: 'user@usstuck.com',
        password: 'user123',
        name: 'User Demo',
        role: 'user'
      }
    ];
    this.currentUser = null;
    this.isLoading = false;
  }

  async login(email, password) {
    this.isLoading = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser = { ...user };
      delete this.currentUser.password; // Remove password from current user object
      
      // Store in localStorage for persistence
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      
      this.isLoading = false;
      return { success: true, user: this.currentUser };
    } else {
      this.isLoading = false;
      return { success: false, message: 'Email atau password salah' };
    }
  }

  async register(userData) {
    this.isLoading = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists
    const existingUser = this.users.find(u => u.email === userData.email);
    
    if (existingUser) {
      this.isLoading = false;
      return { success: false, message: 'Email sudah terdaftar' };
    }
    
    // Create new user
    const newUser = {
      id: this.users.length + 1,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: 'user'
    };
    
    this.users.push(newUser);
    
    this.isLoading = false;
    return { success: true, message: 'Registrasi berhasil! Silakan login.' };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  getLoadingState() {
    return this.isLoading;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    return password.length >= 6;
  }

  validateName(name) {
    return name.trim().length >= 2;
  }

  getDemoCredentials() {
    return [
      { email: 'admin@usstuck.com', password: 'admin123', role: 'Admin' },
      { email: 'user@usstuck.com', password: 'user123', role: 'User' }
    ];
  }
}

export default LoginModel;