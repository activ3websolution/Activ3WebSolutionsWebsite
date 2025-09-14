<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formspree Debugger - Activ3 Web Solutions</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
            color: #333;
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            padding: 20px;
            margin-bottom: 30px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        h1 {
            color: #1a2a6c;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #666;
            font-size: 1.2rem;
        }
        
        .debug-section {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .card {
            flex: 1;
            min-width: 300px;
            background: white;
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .card h2 {
            color: #1a2a6c;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #fdbb2d;
        }
        
        .step {
            margin-bottom: 20px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
            border-left: 4px solid #1a2a6c;
        }
        
        .step-number {
            display: inline-block;
            width: 30px;
            height: 30px;
            background: #1a2a6c;
            color: white;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
        
        .code-block {
            background: #2d3748;
            color: #e2e8f0;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
        }
        
        .highlight {
            background: #fff3cd;
            padding: 2px 5px;
            border-radius: 3px;
            font-weight: bold;
        }
        
        .test-area {
            background: #e8f4f8;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        input, textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        
        button {
            background: #1a2a6c;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: background 0.3s;
        }
        
        button:hover {
            background: #2c3e90;
        }
        
        .status {
            margin-top: 20px;
            padding: 15px;
            border-radius: 5px;
            display: none;
        }
        
        .success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .info {
            background: #cce5ff;
            color: #004085;
            border: 1px solid #b8daff;
        }
        
        .faq-item {
            margin-bottom: 15px;
        }
        
        .faq-question {
            font-weight: 600;
            margin-bottom: 5px;
            color: #1a2a6c;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            color: white;
        }
        
        @media (max-width: 768px) {
            .debug-section {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1><i class="fas fa-bug"></i> Formspree Debugging Helper</h1>
            <p class="subtitle">Identified: Missing Form Submission Handling in JavaScript</p>
        </header>
        
        <div class="debug-section">
            <div class="card">
                <h2><i class="fas fa-file-code"></i> JavaScript Analysis</h2>
                
                <div class="step">
                    <span class="step-number">1</span>
                    <span>Missing Form Handling</span>
                    <p>Your <span class="highlight">main.js</span> file doesn't contain any code to handle form submissions to Formspree.</p>
                </div>
                
                <div class="step">
                    <span class="step-number">2</span>
                    <span>No Form Validation</span>
                    <p>There's no JavaScript to validate form inputs before submission.</p>
                </div>
                
                <div class="step">
                    <span class="step-number">3</span>
                    <span>No Response Handling</span>
                    <p>Your code doesn't handle Formspree's response to show success/error messages.</p>
                </div>
                
                <h3>Solution:</h3>
                <p>Add this code to your <span class="highlight">main.js</span> file:</p>
                <div class="code-block">
// Formspree Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submit-btn');
      const formStatus = document.getElementById('form-status');
      
      // Disable button to prevent multiple submissions
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Clear previous status messages
      formStatus.className = 'form-status';
      formStatus.textContent = '';
      
      try {
        const response = await fetch(this.action, {
          method: 'POST',
          body: new FormData(this),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = '<i class="bi bi-check-circle"></i> Your message has been sent successfully!';
          contactForm.reset();
        } else {
          const errorData = await response.json();
          formStatus.className = 'form-status error';
          
          if (errorData.errors) {
            formStatus.textContent = errorData.errors.map(error => error.message).join(', ');
          } else {
            formStatus.textContent = 'Oops! There was a problem submitting your form.';
          }
        }
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Oops! There was a problem submitting your form.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }
});
                </div>
            </div>
            
            <div class="card">
                <h2><i class="fas fa-wrench"></i> Test Your Form</h2>
                <p>Test if your Formspree endpoint is working with this form:</p>
                
                <div class="test-area">
                    <form id="testForm" action="https://formspree.io/f/movnzapb" method="POST">
                        <div class="form-group">
                            <label for="name">Your Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Your Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="4" placeholder="Type your message here" required></textarea>
                        </div>
                        
                        <button type="submit"><i class="fas fa-paper-plane"></i> Send Test Message</button>
                    </form>
                    
                    <div id="statusMessage" class="status"></div>
                </div>
                
                <h3 style="margin-top: 30px;">Next Steps</h3>
                <ol>
                    <li>Add the form handling code to your main.js file</li>
                    <li>Make sure your form has the correct ID (<span class="highlight">contact-form</span>)</li>
                    <li>Ensure your submit button has ID <span class="highlight">submit-btn</span></li>
                    <li>Add a status element with ID <span class="highlight">form-status</span></li>
                </ol>
            </div>
        </div>
        
        <div class="card">
            <h2><i class="fas fa-question-circle"></i> Implementation Guide</h2>
            
            <div class="step">
                <span class="step-number">1</span>
                <span>Update your HTML</span>
                <p>Make sure your form has these elements with correct IDs:</p>
                <div class="code-block">
&lt;form id="contact-form" action="https://formspree.io/f/movnzapb" method="POST"&gt;
  &lt;!-- form fields --&gt;
  &lt;button type="submit" id="submit-btn"&gt;Send Message&lt;/button&gt;
  &lt;div id="form-status" class="form-status"&gt;&lt;/div&gt;
&lt;/form&gt;
                </div>
            </div>
            
            <div class="step">
                <span class="step-number">2</span>
                <span>Add CSS for status messages</span>
                <p>Add these styles to your CSS file:</p>
                <div class="code-block">
.form-status {
  padding: 10px;
  margin-top: 15px;
  border-radius: 4px;
}

.form-status.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-status.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
                </div>
            </div>
            
            <div class="step">
                <span class="step-number">3</span>
                <span>Add the JavaScript code</span>
                <p>Add the form handling code to your main.js file (see the code block in the left column).</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Activ3 Web Solutions - JavaScript Fix</p>
            <p>After implementing these changes, your form should work correctly.</p>
        </div>
    </div>

    <script>
        // Test form functionality
        document.getElementById('testForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const statusMessage = document.getElementById('statusMessage');
            statusMessage.style.display = 'block';
            statusMessage.className = 'status info';
            statusMessage.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending your test message...';
            
            const formData = new FormData(this);
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    statusMessage.className = 'status success';
                    statusMessage.innerHTML = '<i class="fas fa-check-circle"></i> Success! Your test message was sent. Check your email inbox.';
                    this.reset();
                } else {
                    const errorData = await response.json();
                    statusMessage.className = 'status error';
                    
                    if (errorData.error) {
                        statusMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> Error: ${errorData.error}`;
                    } else {
                        statusMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> There was an error sending your message. Please check your Formspree configuration.';
                    }
                }
            } catch (error) {
                statusMessage.className = 'status error';
                statusMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Network error. Please check your internet connection and try again.';
            }
        });
    </script>
</body>
</html>
