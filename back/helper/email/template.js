exports.template = (text) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
        <style>
          .container {
            width: 100%;
            height: 100%;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .email {
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
          }
          .email-header {
            background-color: #333;
            color: #fff;
            padding: 5px;
            text-align: center;
          }
          .email-body {
            padding: 20px;
          }
          .email-footer {
            background-color: #333;
            color: #fff;
            padding: 5px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email">
            <div class="email-header">
              <h1>MedSoc Account Verification</h1>
            </div>
            <div class="email-body">
              Click link below to verification your account <br/>
              <a href="http://localhost:3000/register/verification/${text}">Verification Account </a>
            </div>
            <div class="email-footer">
              <p>Thank for trying MedSoc</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}