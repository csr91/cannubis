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