import mysql.connector
import os
from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'inrepair9843',
    'database': 'cannubis',  # Nombre de tu base de datos
    'port': 3306  # Puerto por defecto de MySQL
}

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
