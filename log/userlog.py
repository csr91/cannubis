import mysql.connector
import bcrypt
import bdd
from bdd import db_config

def verificar_contraseña(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def obtener_usuario_por_correo(correo):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    query = "SELECT * FROM cuentas WHERE mail = %s"
    cursor.execute(query, (correo,))
    usuario = cursor.fetchone()
    cursor.close()
    conn.close()
    return usuario

def actualizar_ultima_fecha_inicio_sesion(id_usuario, fecha_actual):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    query = "UPDATE cuentas SET LastLogin = %s WHERE Idcuenta = %s"
    cursor.execute(query, (fecha_actual, id_usuario))
    conn.commit()
    cursor.close()
    conn.close()

def validar_cookie(cookie_value):
    # Recuperar el correo y la fecha actual para reproducir el algoritmo
    correo = 'usuario'  # Debes tener el correo con el que se generó la cookie
    fecha_actual = datetime.datetime.now()

    # Crear el código algorítmico hash basado en el correo y la fecha actual
    codigo_algoritmico_esperado = hashlib.sha256(f"{correo}{fecha_actual}".encode()).hexdigest()

    # Comparar el valor de la cookie con el valor esperado
    return cookie_value == codigo_algoritmico_esperado

def encriptar_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def guardar_usuario_en_db(email, hashed_password):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    token = generar_token()
    fecha_creacion = datetime.datetime.now()
    query = "INSERT INTO cuentas (mail, contraseña_hash, token, FechaCreacion) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (email, hashed_password, token, fecha_creacion))
    conn.commit()
    cursor.close()
    conn.close()    