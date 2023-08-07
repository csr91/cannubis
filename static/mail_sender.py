import secrets
import smtplib
from email.mime.text import MIMEText

def generar_token():
    token = secrets.token_hex(16)
    return token

def enviar_correo_confirmacion(destinatario, token):
    remitente = 'cesar.mendoza.77@gmail.com'  # Cambia esto por tu dirección de correo electrónico
    contraseña = 'ecjuhpcxlsinwlmb'  # Cambia esto por tu contraseña de correo electrónico

    mensaje = f'Hola,\n\nGracias por registrarte en nuestro sitio web. Por favor, utiliza el siguiente token para confirmar tu cuenta: {token}'

    msg = MIMEText(mensaje)
    msg['Subject'] = 'Confirmación de cuenta'
    msg['From'] = remitente
    msg['To'] = destinatario

    with smtplib.SMTP('smtp.gmail.com', 587) as servidor_smtp:
        servidor_smtp.starttls()
        servidor_smtp.login(remitente, contraseña)
        servidor_smtp.send_message(msg)