from flask import jsonify
import mysql.connector
import bdd
from bdd import db_config

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

def obtener_info_cuenta(idcuenta):
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Consulta SQL para obtener la información de la cuenta
    query = '''
    SELECT idcuenta, mail
    FROM cuentas
    WHERE idcuenta = %s
    '''

    # Ejecutar la consulta con el idcuenta como parámetro
    cursor.execute(query, (idcuenta,))
    resultado = cursor.fetchone()
    cursor.close()
    conn.close()

    # Verificar si se encontró la cuenta con el idcuenta especificado
    if resultado is not None:
        # Crear un diccionario con los nombres de las columnas como claves
        # y los valores correspondientes del resultado de la consulta
        columnas = ['idcuenta', 'mail']
        info_cuenta = {columnas[i]: resultado[i] for i in range(len(columnas))}

        # Devolver la información de la cuenta en formato JSON
        return jsonify(info_cuenta)
    else:
        # Devolver un mensaje de error si no se encontró la cuenta
        return jsonify({'error': 'Cuenta no encontrada'})