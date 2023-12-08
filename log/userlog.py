from flask import request, jsonify, make_response, session
import hashlib
import datetime
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
    correo = 'usuario'
    fecha_actual = datetime.datetime.now()
    codigo_algoritmico_esperado = hashlib.sha256(f"{correo}{fecha_actual}".encode()).hexdigest()
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

def login():
    data = request.get_json()
    correo = data.get('correo')
    contraseña = data.get('contraseña')
    nombre_cookie = 'logid'
    if not correo or not contraseña:
        return jsonify({'error': 'Correo y contraseña son requeridos.'}), 400
    usuario = obtener_usuario_por_correo(correo)
    if not usuario:
        return jsonify({'error': 'Correo o contraseña incorrectos.'}), 401
    contraseña_hash = usuario[2]
    if not verificar_contraseña(contraseña, contraseña_hash):
        return jsonify({'error': 'Correo o contraseña incorrectos.'}), 401
    if not usuario[3]:
        return jsonify({'error': 'La cuenta no está habilitada.'}), 401
    codigo_algoritmico = hashlib.sha256(f"{correo}{datetime.datetime.now()}".encode()).hexdigest()
    response = make_response(jsonify({'message': 'Inicio de sesión exitoso'}))
    response.set_cookie(nombre_cookie, codigo_algoritmico, max_age=1200)
    actualizar_ultima_fecha_inicio_sesion(usuario[0], datetime.datetime.now())
    session['userid'] = usuario[0]
    return response