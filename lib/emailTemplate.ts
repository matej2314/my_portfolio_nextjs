import { ContactObject } from '@/types/forms/contactFormTypes';

export const contactMessageTemplate = (data: ContactObject) => {
	return `<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .email-container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
            display: block;
        }
        .field-value {
            background-color: #f8f9fa;
            padding: 12px;
            border-radius: 4px;
            border-left: 4px solid #2563eb;
        }
        .content-field {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #10b981;
            white-space: pre-wrap;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">Nowa wiadomość kontaktowa</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Otrzymano z formularza kontaktowego</p>
        </div>
        
        <div class="field">
            <span class="field-label">👤 Nadawca:</span>
            <div class="field-value">${data.client}</div>
        </div>
        
        <div class="field">
            <span class="field-label">📧 Adres e-mail:</span>
            <div class="field-value">${data.email}</div>
        </div>
        
        <div class="field">
            <span class="field-label">📝 Temat:</span>
            <div class="field-value">${data.subject}</div>
        </div>
        
        <div class="field">
            <span class="field-label">💬 Treść wiadomości:</span>
            <div class="content-field">${data.content}</div>
        </div>
        
        <div class="footer">
            <p>Wiadomość została wysłana automatycznie z formularza kontaktowego portfolio.</p>
            <p>Data wysłania: ${new Date().toLocaleString('pl-PL')}</p>
        </div>
    </div>
</body>
</html>`;
};
