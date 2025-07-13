import LoginModel from '../../models/login/login-model.js';
import LoginView from '../../views/login/login-view.js';

class LoginPresenter {
  constructor() {
    this.model = new LoginModel();
    this.view = new LoginView();
  }

  async init() {
    this.setupEventListeners();
    this.renderDemoCredentials();
    this.checkExistingLogin();
  }

  setupEventListeners() {
    // Tab switching
    document.addEventListener('click', (event) => {
      const tabButton = event.target.closest('.tab-button');
      if (tabButton) {
        const mode = tabButton.getAttribute('data-mode');
        this.view.switchTab(mode);
        this.view.clearAllErrors();
      }

      // Demo credentials
      const demoCredential = event.target.closest('.demo-credential');
      if (demoCredential) {
        const email = demoCredential.getAttribute('data-email');
        const password = demoCredential.getAttribute('data-password');
        this.view.fillDemoCredentials(email, password);
      }

      // Forgot password
      const forgotPasswordLink = event.target.closest('#forgot-password-link');
      if (forgotPasswordLink) {
        event.preventDefault();
        this.handleForgotPassword();
      }
    });

    // Form submissions
    document.addEventListener('submit', (event) => {
      const loginForm = event.target.closest('#login-form');
      const registerForm = event.target.closest('#register-form');

      if (loginForm) {
        event.preventDefault();
        this.handleLogin();
      } else if (registerForm) {
        event.preventDefault();
        this.handleRegister();
      }
    });

    // Real-time validation
    document.addEventListener('input', (event) => {
      const input = event.target.closest('.form-input');
      if (input) {
        this.view.clearError(input.id);
        this.validateField(input);
      }
    });

    // Input focus effects
    document.addEventListener('focus', (event) => {
      const input = event.target.closest('.form-input');
      if (input) {
        input.style.borderColor = '#556B2F';
      }
    }, true);

    document.addEventListener('blur', (event) => {
      const input = event.target.closest('.form-input');
      if (input) {
        input.style.borderColor = '#e0e0e0';
      }
    }, true);

    // Button hover effects
    this.setupHoverEffects();
  }

  setupHoverEffects() {
    document.addEventListener('mouseenter', (event) => {
      const submitButton = event.target.closest('.submit-button:not(:disabled)');
      if (submitButton) {
        submitButton.style.backgroundColor = '#4a5d29';
        submitButton.style.transform = 'translateY(-1px)';
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      const submitButton = event.target.closest('.submit-button:not(:disabled)');
      if (submitButton) {
        submitButton.style.backgroundColor = '#556B2F';
        submitButton.style.transform = 'translateY(0)';
      }
    }, true);
  }

  renderDemoCredentials() {
    const credentials = this.model.getDemoCredentials();
    const container = document.getElementById('demo-credentials');
    
    if (container) {
      container.innerHTML = this.view.renderDemoCredentials(credentials);
    }
  }

  checkExistingLogin() {
    if (this.model.isLoggedIn()) {
      const user = this.model.getCurrentUser();
      this.showToast(`Selamat datang kembali, ${user.name}!`);
      
      // Redirect to home after a short delay
      setTimeout(() => {
        window.location.hash = '#/';
      }, 2000);
    }
  }

  async handleLogin() {
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    // Clear previous errors
    this.view.clearAllErrors();

    // Validate inputs
    let hasErrors = false;

    if (!email) {
      this.view.showError('login-email', 'Email harus diisi');
      hasErrors = true;
    } else if (!this.model.validateEmail(email)) {
      this.view.showError('login-email', 'Format email tidak valid');
      hasErrors = true;
    }

    if (!password) {
      this.view.showError('login-password', 'Password harus diisi');
      hasErrors = true;
    }

    if (hasErrors) return;

    // Show loading state
    this.view.setLoading('login', true);

    try {
      const result = await this.model.login(email, password);
      
      if (result.success) {
        this.showToast(`Selamat datang, ${result.user.name}!`);
        
        // Redirect to home page
        setTimeout(() => {
          window.location.hash = '#/';
        }, 1500);
      } else {
        this.showToast(result.message, 'error');
      }
    } catch (error) {
      this.showToast('Terjadi kesalahan saat login', 'error');
      console.error('Login error:', error);
    } finally {
      this.view.setLoading('login', false);
    }
  }

  async handleRegister() {
    const name = document.getElementById('register-name')?.value.trim();
    const email = document.getElementById('register-email')?.value.trim();
    const password = document.getElementById('register-password')?.value;
    const confirmPassword = document.getElementById('register-confirm-password')?.value;

    // Clear previous errors
    this.view.clearAllErrors();

    // Validate inputs
    let hasErrors = false;

    if (!name) {
      this.view.showError('register-name', 'Nama harus diisi');
      hasErrors = true;
    } else if (!this.model.validateName(name)) {
      this.view.showError('register-name', 'Nama minimal 2 karakter');
      hasErrors = true;
    }

    if (!email) {
      this.view.showError('register-email', 'Email harus diisi');
      hasErrors = true;
    } else if (!this.model.validateEmail(email)) {
      this.view.showError('register-email', 'Format email tidak valid');
      hasErrors = true;
    }

    if (!password) {
      this.view.showError('register-password', 'Password harus diisi');
      hasErrors = true;
    } else if (!this.model.validatePassword(password)) {
      this.view.showError('register-password', 'Password minimal 6 karakter');
      hasErrors = true;
    }

    if (!confirmPassword) {
      this.view.showError('register-confirm-password', 'Konfirmasi password harus diisi');
      hasErrors = true;
    } else if (password !== confirmPassword) {
      this.view.showError('register-confirm-password', 'Password tidak cocok');
      hasErrors = true;
    }

    if (hasErrors) return;

    // Show loading state
    this.view.setLoading('register', true);

    try {
      const result = await this.model.register({ name, email, password });
      
      if (result.success) {
        this.showToast(result.message);
        
        // Switch to login tab
        setTimeout(() => {
          this.view.switchTab('login');
          
          // Pre-fill email
          const emailField = document.getElementById('login-email');
          if (emailField) {
            emailField.value = email;
          }
        }, 1500);
      } else {
        this.showToast(result.message, 'error');
      }
    } catch (error) {
      this.showToast('Terjadi kesalahan saat registrasi', 'error');
      console.error('Register error:', error);
    } finally {
      this.view.setLoading('register', false);
    }
  }

  validateField(input) {
    const value = input.value.trim();
    const fieldId = input.id;

    switch (fieldId) {
      case 'login-email':
      case 'register-email':
        if (value && !this.model.validateEmail(value)) {
          this.view.showError(fieldId, 'Format email tidak valid');
        }
        break;
      
      case 'register-name':
        if (value && !this.model.validateName(value)) {
          this.view.showError(fieldId, 'Nama minimal 2 karakter');
        }
        break;
      
      case 'register-password':
        if (value && !this.model.validatePassword(value)) {
          this.view.showError(fieldId, 'Password minimal 6 karakter');
        }
        break;
      
      case 'register-confirm-password':
        const password = document.getElementById('register-password')?.value;
        if (value && value !== password) {
          this.view.showError(fieldId, 'Password tidak cocok');
        }
        break;
    }
  }

  handleForgotPassword() {
    this.showToast('Fitur reset password sedang dalam pengembangan. Silakan gunakan akun demo yang tersedia.');
  }

  showToast(message, type = 'success') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add styles
    Object.assign(toast.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'error' ? '#e74c3c' : '#556B2F',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide and remove toast
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }
}

export default LoginPresenter;