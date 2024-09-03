import csv
import requests
import secrets
import json

# Configuraciones
csv_file_path = '../assets/csv/objetos.csv'
endpoint_url = 'http://localhost:3009/api/objetos/crearObjeto'
default_description = "Descripción no proporcionada"
default_image_url = "https://res.cloudinary.com/dn4m0kr7j/image/upload/v1719868792/logoInvMgr_ongzfh.png"

def generate_unique_code(length=20):
    return secrets.token_urlsafe(length)[:length]

def process_csv_and_insert(file_path, endpoint_url):
    with open(file_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            nombre = row['NOMBRE']
            cantidad = int(row['CANTIDAD'])
            ubicacion = row['LUGAR']

            # Extraer descripción si está en paréntesis en el nombre
            if '(' in nombre and ')' in nombre:
                descripcion = nombre[nombre.find("(")+1:nombre.find(")")]
                nombre = nombre[:nombre.find("(")].strip()
            else:
                descripcion = default_description

            # Determinar el estado del objeto
            estado = "Disponible"
            if "no sirve" in descripcion.lower():
                estado = "No Disponible"

            # Crear objetos basados en la cantidad
            objetos = []
            for i in range(cantidad):
                objeto = {
                    "nombre": nombre.strip(),
                    "descripcion": descripcion,
                    "codigoQR": generate_unique_code(),
                    "numeroSerie": None,
                    "estado": estado,
                    "ubicacion": ubicacion.strip(),
                    "categoria": None,
                    "fechaAdquisicion": None,
                    "valor": None,
                    "fechaUltimoMantenimiento": None,
                    "urlImagen": default_image_url,
                    "activo": True
                }
                objetos.append(objeto)

            # Crear el objeto principal para la inserción sin la descripción
            objeto_principal = {
                "nombre": nombre.strip(),
                "ubicacion": ubicacion.strip(),
                "objetos": objetos
            }

            # Realizar la solicitud de inserción
            response = requests.post(endpoint_url, json=objeto_principal)
            if response.status_code == 201:
                print(f"Objeto {nombre} insertado con éxito.")
            else:
                print(f"Error al insertar {nombre}: {response.status_code} - {response.text}")

# Ejecutar el procesamiento e inserción
process_csv_and_insert(csv_file_path, endpoint_url)
