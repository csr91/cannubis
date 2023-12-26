from functools import wraps
import mysql.connector
import os
from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory, session
from flask_cors import CORS
from flask import make_response
from flask_login import LoginManager, login_user, login_required, logout_user, UserMixin, current_user
import bcrypt
from static.mail_sender import enviar_correo_confirmacion
from static.mail_sender import generar_token
import bdd
from bdd import db_config
import datetime
import hashlib
import log
from log.userlog import verificar_contraseña, obtener_usuario_por_correo, actualizar_ultima_fecha_inicio_sesion, validar_cookie, encriptar_password, guardar_usuario_en_db, login
import apicore
from apicore.apicore import obtener_avisos_por_filtro, obtener_productos_destacados, obtener_datos_aviso,obtener_info_cuenta

app = Flask(__name__)
app.secret_key = "cannubis"
CORS(app)

def require_login(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Verificar si 'userid' está en la sesión o si la cookie 'logid' está presente y es válida
        if 'userid' in session or request.cookies.get('logid'):
            return func(*args, **kwargs)
        else:
            # El usuario no está autenticado, redirigir a la página de inicio de sesión
            return redirect(url_for('login_route'))
    return wrapper

# Ruta para /mi_cuenta
@app.route('/mi_cuenta')
@require_login
def mi_cuenta():
    # Verificar si 'username' está en la sesión
    if 'userid' in session:
        # El usuario tiene una sesión activa, redirigir a /mi_cuenta
        return render_template('cuenta.html')
    else:
        # El usuario no tiene una sesión activa, redirigir a la página de inicio (index)
        return redirect(url_for('index'))


@app.route('/login')
def login_route():
    # Verificar si ya hay una sesión activa
    if 'userid' in session:
        return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def pstlogin():
    return login()

@app.route('/logout')
def logout():
    # Eliminar el usuario de la sesión si está presente
    session.pop('userid', None)

    # También podrías eliminar la cookie si la estás utilizando
    response = make_response(redirect(url_for('login_route')))
    response.delete_cookie('logid')

    return response

@app.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email y contraseña son requeridos.'}), 400

    hashed_password = encriptar_password(password)
    try:
        guardar_usuario_en_db(email, hashed_password)
        token = generar_token()
        enviar_correo_confirmacion(email, token)
        return jsonify({'message': 'Usuario registrado con éxito.'})
    except mysql.connector.IntegrityError as e:
        error_message = str(e)
        if 'Duplicate entry' in error_message:
            return jsonify({'error': 'El correo electrónico ya está registrado.'}), 400
        else:
            return jsonify({'error': 'Ocurrió un error al crear la cuenta.'}), 500
    
@app.route('/confirmar_registro', methods=['GET'])
def confirmar_registro():
    token = request.args.get('token')

    # Verifica y procesa el token como desees
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    query = "SELECT * FROM cuentas WHERE token = %s"
    cursor.execute(query, (token,))
    cuenta = cursor.fetchone()

    if cuenta:
        # Actualiza el campo 'habilitado' a 1 para confirmar el registro
        update_query = "UPDATE cuentas SET habilitado = 1 WHERE token = %s"
        cursor.execute(update_query, (token,))
        conn.commit()

        return jsonify({'message': 'Registro confirmado correctamente'})
    else:
        return jsonify({'error': 'Token inválido'})

    cursor.close()
    conn.close()

@app.route('/infocuentas', methods=['GET'])
@require_login
def infocuentas():
    # Obtener el 'userid' de la sesión
    user_id_from_session = session.get('userid')

    # Verificar si 'userid' está presente en la sesión
    if user_id_from_session:
        # Si está presente, devolver la información de la cuenta
        return obtener_info_cuenta(user_id_from_session)
    else:
        # Si no está presente, redirigir a la página de inicio de sesión
        return redirect(url_for('login_route'))

@app.route('/avisos-por-filtro/<int:idfiltro>', methods=['GET'])
def avisos_por_filtro(idfiltro):
    return obtener_avisos_por_filtro(idfiltro)

# Ruta de la API para obtener productos destacados
@app.route('/productos/destacados', methods=['GET'])
def productos_destacados():
    return obtener_productos_destacados()

# Ruta de la API para obtener los datos del aviso
@app.route('/avisos/<int:idaviso>', methods=['GET'])
def datos_avisos(idaviso):
    return obtener_datos_aviso(idaviso)

@app.route('/productos/filtros', methods=['GET'])
def obtener_filtros():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute('SELECT idfiltro, nombre, idfiltropadre, nivel FROM filtros')
    filtros = cursor.fetchall()
    cursor.close()
    conn.close()

    # Convertir los filtros en un objeto JSON
    filtros_json = []
    for filtro in filtros:
        filtro_json = {
            'idfiltro': filtro[0],
            'nombre': filtro[1],
            'idfiltropadre': filtro[2],
            'nivel': filtro[3]
        }
        filtros_json.append(filtro_json)
    return jsonify(filtros_json)

# Ruta de la API para obtener tiendas destacadas
@app.route('/tiendas/destacadas', methods=['GET'])
def obtener_tiendas_destacadas():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    query = "SELECT t.Idtienda, t.Nombre, i.Imagen FROM tiendas t JOIN infotiendas i ON i.IdTienda = t.IdTienda WHERE t.TiendaDestacada = 1"
    cursor.execute(query)
    tiendas = cursor.fetchall()
    cursor.close()
    conn.close()
    
    # Convertir las tiendas en un objeto JSON
    tiendas_json = []
    for tienda in tiendas:
        tienda_json = {
            'Idtienda': tienda[0],
            'Nombre': tienda[1],
            'Imagen': tienda[2]
        }
        tiendas_json.append(tienda_json)
    
    # Devolver las tiendas como respuesta en formato JSON
    return jsonify(tiendas_json)




# Rutas para las páginas web
@app.route('/inicio')
def inicio():
    return render_template('index.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/tiendas')
def tiendas():
    return render_template('tiendas.html')


@app.route('/signin')
def signin():
    # Verificar si hay una sesión iniciada
    if 'username' in session:
        # El usuario ya está autenticado, redirigir a la página de inicio o a donde prefieras
        return render_template('index.html')

    # Si no hay una sesión iniciada, mostrar la página de registro
    return render_template('signin.html')

@app.route('/categorias')
def categorias():
    return render_template('categorias.html')

@app.route('/detalle-del-producto')
def detalle_del_producto():
    return render_template('detalle_del_producto.html')

@app.route('/carrito-de-compras')
def carrito_de_compras():
    return render_template('carrito_de_compras.html')

@app.route('/finalizacion-de-la-compra')
def finalizacion_de_la_compra():
    return render_template('finalizacion_de_la_compra.html')

@app.route('/perfil-del-vendedor')
def perfil_del_vendedor():
    return render_template('perfil_del_vendedor.html')

@app.route('/politicas-y-terminos')
def politicas_y_terminos():
    return render_template('politicas_y_terminos.html')

@app.route('/aviso')
def mostrar_aviso():
    id_aviso = request.args.get('id')
    return render_template('aviso.html')

@app.route('/rct')
def prd():
    return send_from_directory('cajonprods/build', 'index.html')

@app.route('/rct/terms')
def terms():
    return send_from_directory('cajonprods/build', 'index.html')

@app.route('/rct/productos')
def productos():
    return send_from_directory('cajonprods/build', 'index.html')

@app.route('/<path:filename>')
def custom(filename):
    return send_from_directory('cajonprods/build', filename)

@app.route('/static/js/<path:filename>')
def custom_static_js(filename):
    return send_from_directory('cajonprods/build/static/js', filename)

@app.route('/static/css/<path:filename>')
def custom_static_css(filename):
    return send_from_directory('cajonprods/build/static/css', filename)

@app.route('/static/media/<path:filename>')
def custom_static_media(filename):
    return send_from_directory('cajonprods/build/static/media', filename)

# Establecer la conexión a la base de datos
try:
    conn = mysql.connector.connect(**db_config)
    conn.close()
    print('Conexión exitosa a la base de datos.')
except mysql.connector.Error as err:
    print(f'Error al conectar a la base de datos: {err}')

if __name__ == '__main__':
    app.run(debug=True)