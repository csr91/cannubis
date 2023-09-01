import mysql.connector
import os
from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory
from flask_cors import CORS
from flask import make_response
import bcrypt
from static.mail_sender import enviar_correo_confirmacion
from static.mail_sender import generar_token
import datetime

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'inrepair9843',
    'database': 'cannubis',  # Nombre de tu base de datos
    'port': 3306  # Puerto por defecto de MySQLz
}

@app.route('/avisos-por-filtro/<int:idfiltro>', methods=['GET'])
def obtener_avisos_por_filtro(idfiltro):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Consulta SQL para obtener los avisos con el idfiltro especificado
    query = '''
    SELECT a.Idaviso, a.Titulo, a.Descripcion, a.Precio, a.FechaVencimiento,
           info.Imagen1, info.Imagen2, info.Imagen3, info.Imagen4, info.Imagen5, info.Imagen6
    FROM avisos a
    JOIN infoavisos info ON info.Idaviso = a.Idaviso
    WHERE a.Idfiltro = %s AND a.Disponible = 1
    '''

    # Ejecutar la consulta con el idfiltro como parámetro
    cursor.execute(query, (idfiltro,))
    avisos = cursor.fetchall()
    cursor.close()
    conn.close()

    # Convertir los avisos en un objeto JSON
    avisos_json = []
    for aviso in avisos:
        aviso_json = {
            'Idaviso': aviso[0],
            'Titulo': aviso[1],
            'Descripcion': aviso[2],
            'Precio': aviso[3],
            'FechaVencimiento': aviso[4],
            'Imagen1': aviso[5],
            'Imagen2': aviso[6],
            'Imagen3': aviso[7],
            'Imagen4': aviso[8],
            'Imagen5': aviso[9],
            'Imagen6': aviso[10]
        }
        avisos_json.append(aviso_json)

    # Devolver los avisos como respuesta en formato JSON
    return jsonify(avisos_json)


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

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo')
    contraseña = data.get('contraseña')

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

    # Actualizar la columna 'lastlogin' con la fecha y hora del servidor
    fecha_actual = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    actualizar_ultima_fecha_inicio_sesion(usuario[0], fecha_actual)

    # Crear una cookie con el correo electrónico del usuario
    response = make_response(jsonify({'message': 'Inicio de sesión exitoso.'}))
    response.set_cookie('correo', correo)

    # Mostrar el valor de la cookie en la terminal
    print("Cookie generada:", response.headers['Set-Cookie'])

    return response

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
    
    # Devolver los filtros como respuesta en formato JSON
    print(filtro_json)
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

# Ruta de la API para obtener productos destacados
@app.route('/productos/destacados', methods=['GET'])
def obtener_productos_destacados():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    query = "SELECT av.Idaviso, av.Titulo, av.Descripcion, info.Imagen1, info.Imagen2, info.Imagen3, info.Imagen4, info.Imagen5, info.Imagen6 FROM avisos av JOIN infoavisos info ON info.Idaviso = av.Idaviso WHERE av.Destacado = 1"
    cursor.execute(query)
    productos = cursor.fetchall()
    cursor.close()
    conn.close()

    # Convertir los productos en un objeto JSON
    productos_json = []
    for producto in productos:
        producto_json = {
            'Idaviso': producto[0],
            'Titulo': producto[1],
            'Descripcion': producto[2],
            'Imagenes': [producto[3], producto[4], producto[5], producto[6], producto[7], producto[8]]
        }
        productos_json.append(producto_json)

    # Devolver los productos como respuesta en formato JSON
    return jsonify(productos_json)

# Ruta de la API para obtener los datos del aviso
@app.route('/avisos/<int:idaviso>', methods=['GET'])
def obtener_datos_aviso(idaviso):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Consulta SQL para obtener los datos del aviso
    query = '''
    SELECT a.Idaviso, a.Idfiltro, a.Idtienda, a.Titulo, a.Descripcion, a.IsOnline, a.Destacado, a.Stockproducto,
           a.Precio, a.Valoraciones, a.Etiquetas, a.Disponible, a.Visitas, a.FechaVencimiento, a.Finalizado,
           info.Idinfoaviso, info.Idaviso, info.Condicionesenvio, info.Comentarios, info.Imagen1, info.Imagen2,
           info.Imagen3, info.Imagen4, info.Imagen5, info.Imagen6, info.condicion, info.unidades_vendidas, info.calificacion, info.full_description
    FROM avisos a
    JOIN infoavisos info ON info.Idaviso = a.Idaviso
    WHERE a.Idaviso = %s
    '''

    # Ejecutar la consulta con el idaviso como parámetro
    cursor.execute(query, (idaviso,))
    resultado = cursor.fetchone()
    cursor.close()
    conn.close()

    # Verificar si se encontró el aviso con el idaviso especificado
    if resultado is not None:
        # Crear un diccionario con los nombres de las columnas como claves
        # y los valores correspondientes del resultado de la consulta
        columnas = [
            'Idaviso', 'Idfiltro', 'Idtienda', 'Titulo', 'Descripcion', 'IsOnline', 'Destacado', 'Stockproducto',
            'Precio', 'Valoraciones', 'Etiquetas', 'Disponible', 'Visitas', 'FechaVencimiento', 'Finalizado',
            'Idinfoaviso', 'Idaviso', 'Condicionesenvio', 'Comentarios', 'Imagen1', 'Imagen2', 'Imagen3',
            'Imagen4', 'Imagen5', 'Imagen6', 'condicion', 'unidades_vendidas', 'calificacion', 'full_description'
        ]
        datos_aviso = {columnas[i]: resultado[i] for i in range(len(columnas))}

        # Devolver los datos del aviso en formato JSON
        return jsonify(datos_aviso)
    else:
        # Devolver un mensaje de error si no se encontró el aviso
        return jsonify({'error': 'Aviso no encontrado'})

# Rutas para las páginas web
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/productos')
def serve_react_app():
    build_path = os.path.join(app.static_folder, 'cajonproductos', 'build')
    return send_from_directory(build_path, 'index.html')

@app.route('/tiendas')
def tiendas():
    return render_template('tiendas.html')

@app.route('/login')
def login_route():
    # Verificar si el usuario ya tiene una cookie
    correo_cookie = request.cookies.get('correo')
    print("Cookie existente:", correo_cookie)  # Agrega este registro para ver si hay una cookie

    if correo_cookie:
        print("Usuario autenticado. Redirigiendo a la página de inicio.")  # Registro de redirección
        # Redirigir al usuario a la página de inicio, ya que está autenticado
        return redirect(url_for('index'))
    else:
        print("Usuario no autenticado. Mostrando página de inicio de sesión.")  # Registro de no autenticación
        # Si no tiene una cookie, mostrar la página de inicio de sesión normalmente
        return render_template('login.html')


@app.route('/signin')
def signin():
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

@app.route('/registro-e-inicio-de-sesion')
def registro_e_inicio_de_sesion():
    return render_template('registro_e_inicio_de_sesion.html')

@app.route('/politicas-y-terminos')
def politicas_y_terminos():
    return render_template('politicas_y_terminos.html')

@app.route('/aviso')
def mostrar_aviso():
    id_aviso = request.args.get('id')
    return render_template('aviso.html')

# Establecer la conexión a la base de datos
try:
    conn = mysql.connector.connect(**db_config)
    conn.close()
    print('Conexión exitosa a la base de datos.')
except mysql.connector.Error as err:
    print(f'Error al conectar a la base de datos: {err}')

if __name__ == '__main__':
    app.run()
