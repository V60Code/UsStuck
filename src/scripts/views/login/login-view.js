class LoginView {
  constructor() {
    this.currentMode = 'login'; // 'login' or 'register'
  }

  render() {
    return `
      <div class="login-page">
        <div class="login-container">
          <div class="login-card">
            <div class="login-header">
              <div class="logo-section">
                <div class="logo-icon">🕌</div>
                <h1 class="app-title">UsStuck</h1>
                <p class="app-subtitle">Platform Edukasi Islam</p>
              </div>
            </div>

            <div class="login-tabs">
              <button id="login-tab" class="tab-button active" data-mode="login">
                Masuk
              </button>
              <button id="register-tab" class="tab-button" data-mode="register">
                Daftar
              </button>
            </div>

            <div class="login-content">
              <div id="login-form-container" class="form-container active">
                ${this.renderLoginForm()}
              </div>
              
              <div id="register-form-container" class="form-container">
                ${this.renderRegisterForm()}
              </div>
            </div>

            <div class="demo-section">
              <h4>Akun Demo:</h4>
              <div id="demo-credentials" class="demo-credentials">
                <!-- Will be populated by presenter -->
              </div>
            </div>
          </div>
        </div>

        <style>
          .login-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f7f4 0%, #e8e6e1 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }

          .login-container {
            width: 100%;
            max-width: 450px;
          }

          .login-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            animation: slideUp 0.6s ease-out;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .login-header {
            background: linear-gradient(135deg, #556B2F 0%, #6B8E23 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }

          .logo-icon {
            font-size: 3rem;
            margin-bottom: 16px;
          }

          .app-title {
            font-size: 2rem;
            font-weight: bold;
            margin: 0 0 8px 0;
          }

          .app-subtitle {
            font-size: 1rem;
            opacity: 0.9;
            margin: 0;
          }

          .login-tabs {
            display: flex;
            background: #f8f7f4;
          }

          .tab-button {
            flex: 1;
            padding: 16px;
            border: none;
            background: transparent;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #666;
          }

          .tab-button.active {
            background: white;
            color: #556B2F;
            border-bottom: 3px solid #556B2F;
          }

          .tab-button:hover:not(.active) {
            background: #f0f0f0;
          }

          .login-content {
            padding: 30px;
          }

          .form-container {
            display: none;
          }

          .form-container.active {
            display: block;
            animation: fadeIn 0.3s ease-in;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #333;
          }

          .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
            box-sizing: border-box;
          }

          .form-input:focus {
            outline: none;
            border-color: #556B2F;
          }

          .form-input.error {
            border-color: #e74c3c;
          }

          .error-message {
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 4px;
            display: none;
          }

          .error-message.show {
            display: block;
          }

          .submit-button {
            width: 100%;
            padding: 14px;
            background: #556B2F;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .submit-button:hover:not(:disabled) {
            background: #4a5d29;
            transform: translateY(-1px);
          }

          .submit-button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
          }

          .submit-button.loading {
            color: transparent;
          }

          .loading-spinner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border: 2px solid transparent;
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: none;
          }

          .submit-button.loading .loading-spinner {
            display: block;
          }

          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }

          .demo-section {
            background: #f8f7f4;
            padding: 20px 30px;
            border-top: 1px solid #e0e0e0;
          }

          .demo-section h4 {
            margin: 0 0 12px 0;
            color: #556B2F;
            font-size: 0.9rem;
          }

          .demo-credentials {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .demo-credential {
            background: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            color: #666;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid #e0e0e0;
          }

          .demo-credential:hover {
            background: #556B2F;
            color: white;
            transform: translateX(4px);
          }

          .forgot-password {
            text-align: center;
            margin-top: 16px;
          }

          .forgot-password a {
            color: #556B2F;
            text-decoration: none;
            font-size: 0.9rem;
          }

          .forgot-password a:hover {
            text-decoration: underline;
          }

          @media (max-width: 480px) {
            .login-page {
              padding: 10px;
            }
            
            .login-header {
              padding: 30px 20px;
            }
            
            .login-content, .demo-section {
              padding: 20px;
            }
          }
        </style>
      </div>
    `;
  }

  renderLoginForm() {
    return `
      <form id="login-form" class="auth-form">
        <div class="form-group">
          <label for="login-email" class="form-label">Email</label>
          <input 
            type="email" 
            id="login-email" 
            class="form-input" 
            placeholder="Masukkan email Anda"
            required
          >
          <div class="error-message" id="login-email-error"></div>
        </div>

        <div class="form-group">
          <label for="login-password" class="form-label">Password</label>
          <input 
            type="password" 
            id="login-password" 
            class="form-input" 
            placeholder="Masukkan password Anda"
            required
          >
          <div class="error-message" id="login-password-error"></div>
        </div>

        <button type="submit" id="login-submit" class="submit-button">
          Masuk
          <div class="loading-spinner"></div>
        </button>

        <div class="forgot-password">
          <a href="#" id="forgot-password-link">Lupa password?</a>
        </div>
      </form>
    `;
  }

  renderRegisterForm() {
    return `
      <form id="register-form" class="auth-form">
        <div class="form-group">
          <label for="register-name" class="form-label">Nama Lengkap</label>
          <input 
            type="text" 
            id="register-name" 
            class="form-input" 
            placeholder="Masukkan nama lengkap Anda"
            required
          >
          <div class="error-message" id="register-name-error"></div>
        </div>

        <div class="form-group">
          <label for="register-email" class="form-label">Email</label>
          <input 
            type="email" 
            id="register-email" 
            class="form-input" 
            placeholder="Masukkan email Anda"
            required
          >
          <div class="error-message" id="register-email-error"></div>
        </div>

        <div class="form-group">
          <label for="register-password" class="form-label">Password</label>
          <input 
            type="password" 
            id="register-password" 
            class="form-input" 
            placeholder="Minimal 6 karakter"
            required
          >
          <div class="error-message" id="register-password-error"></div>
        </div>

        <div class="form-group">
          <label for="register-confirm-password" class="form-label">Konfirmasi Password</label>
          <input 
            type="password" 
            id="register-confirm-password" 
            class="form-input" 
            placeholder="Ulangi password Anda"
            required
          >
          <div class="error-message" id="register-confirm-password-error"></div>
        </div>

        <button type="submit" id="register-submit" class="submit-button">
          Daftar
          <div class="loading-spinner"></div>
        </button>
      </form>
    `;
  }

  renderDemoCredentials(credentials) {
    return credentials.map(cred => `
      <div class="demo-credential" data-email="${cred.email}" data-password="${cred.password}">
        <strong>${cred.role}:</strong> ${cred.email} / ${cred.password}
      </div>
    `).join('');
  }

  switchTab(mode) {
    this.currentMode = mode;
    
    // Update tab buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.getElementById(`${mode}-tab`).classList.add('active');
    
    // Update form containers
    document.querySelectorAll('.form-container').forEach(container => {
      container.classList.remove('active');
    });
    document.getElementById(`${mode}-form-container`).classList.add('active');
  }

  showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field && errorElement) {
      field.classList.add('error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field && errorElement) {
      field.classList.remove('error');
      errorElement.classList.remove('show');
    }
  }

  clearAllErrors() {
    document.querySelectorAll('.form-input').forEach(input => {
      input.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(error => {
      error.classList.remove('show');
    });
  }

  setLoading(formType, isLoading) {
    const submitButton = document.getElementById(`${formType}-submit`);
    if (submitButton) {
      if (isLoading) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
      } else {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
      }
    }
  }

  fillDemoCredentials(email, password) {
    if (this.currentMode === 'login') {
      const emailField = document.getElementById('login-email');
      const passwordField = document.getElementById('login-password');
      
      if (emailField && passwordField) {
        emailField.value = email;
        passwordField.value = password;
        
        // Add visual feedback
        [emailField, passwordField].forEach(field => {
          field.style.backgroundColor = '#e8f5e8';
          setTimeout(() => {
            field.style.backgroundColor = '';
          }, 1000);
        });
      }
    }
  }

  getCurrentMode() {
    return this.currentMode;
  }
}

export default LoginView;