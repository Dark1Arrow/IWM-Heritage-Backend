const otpTemplate = (otp, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
            }
    
            .wrapper {
                background-color: #f4f4f4;
                padding: 40px 20px;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                border-top: 8px solid #B8860B; /* Dark Gold Heritage Accent */
            }
    
            .header {
                background-color: #1a1a1a;
                padding: 30px;
                text-align: center;
            }
    
            .logo {
                max-width: 160px;
                height: auto;
            }
    
            .content {
                padding: 40px 30px;
                color: #333333;
                line-height: 1.6;
                text-align: center;
            }
    
            .greeting {
                font-size: 22px;
                font-weight: 700;
                color: #1a1a1a;
                margin-bottom: 20px;
            }
    
            .otp-container {
                margin: 30px 0;
                padding: 20px;
                background-color: #fffdf0;
                border: 1px dashed #B8860B;
                border-radius: 8px;
                display: inline-block;
            }
    
            .otp-code {
                font-size: 36px;
                font-weight: 800;
                letter-spacing: 8px;
                color: #B8860B;
                margin: 0;
            }
    
            .expiry-note {
                font-size: 13px;
                color: #777777;
                margin-top: 10px;
            }
    
            .footer {
                background-color: #f9f9f9;
                padding: 25px;
                text-align: center;
                font-size: 14px;
                color: #888888;
                border-top: 1px solid #eeeeee;
            }
    
            .footer a {
                color: #B8860B;
                text-decoration: none;
                font-weight: 600;
            }
    
            .divider {
                height: 1px;
                background-color: #eeeeee;
                margin: 20px 0;
            }
        </style>
    </head>
    
    <body>
        <div class="wrapper">
            <div class="container">
                <!-- Header with Logo -->
                <div class="header">
                    <a href="https://yourwebsite.com">
                        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Heritage Logo">
                    </a>
                </div>
    
                <!-- Main Body -->
                <div class="content">
                    <div class="greeting">Verify Your Identity</div>
                    <p>Dear <strong>${name}</strong>,</p>
                    <p>Welcome to Heritage Dharsen. To secure your account and complete your registration, please enter the verification code below:</p>
                    
                    <div class="otp-container">
                        <h2 class="otp-code">${otp}</h2>
                        <div class="expiry-note">Valid for 3 minutes only</div>
                    </div>
    
                    <p style="font-size: 15px;">If you didn't request this, you can safely ignore this email.</p>
                </div>
    
                <!-- Support & Footer -->
                <div class="footer">
                    <p>Questions? Need help?</p>
                    <p>Contact our support team at <br>
                       <a href="mailto:work.goutam910@gmail.com">work.goutam910@gmail.com</a>
                    </p>
                    <div class="divider"></div>
                    <p style="font-size: 12px;">&copy; 2026 Heritage Dharsen. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    
    </html>`;
};

export { otpTemplate };