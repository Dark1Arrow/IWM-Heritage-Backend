const passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Update Confirmation</title>
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
                border-top: 8px solid #B8860B;
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
    
            .status-icon {
                font-size: 48px;
                margin-bottom: 20px;
            }
    
            .greeting {
                font-size: 22px;
                font-weight: 700;
                color: #1a1a1a;
                margin-bottom: 20px;
            }
    
            .highlight {
                font-weight: bold;
                color: #B8860B;
            }
    
            .warning-box {
                margin-top: 30px;
                padding: 15px;
                background-color: #fff5f5;
                border-radius: 8px;
                border-left: 4px solid #e53e3e;
                font-size: 14px;
                text-align: left;
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
                <!-- Header -->
                <div class="header">
                    <a href="https://yourwebsite.com">
                        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Heritage Logo">
                    </a>
                </div>
    
                <!-- Main Content -->
                <div class="content">
                    <div class="status-icon">🔐</div>
                    <div class="greeting">Password Updated Successfully</div>
                    <p>Hey <strong>${name}</strong>,</p>
                    <p>This is a confirmation that your password has been successfully changed for the account: <br>
                       <span class="highlight">${email}</span>
                    </p>
                    
                    <div class="warning-box">
                        <strong>Didn't make this change?</strong><br>
                        If you did not request a password update, please contact our security team immediately to protect your account.
                    </div>
                </div>
    
                <!-- Footer -->
                <div class="footer">
                    <p>Need further assistance?</p>
                    <p>Reach out to us at <br>
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

export { passwordUpdated };