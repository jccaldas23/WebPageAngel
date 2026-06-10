import os
import json
import uuid
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data/momentos.json'
IMAGENES_FOLDER = 'data/imagenes'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def leer_momentos():
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def guardar_momentos(momentos):
    with open(DATA_FILE, 'w') as f:
        json.dump(momentos, f, ensure_ascii=False, indent=2)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Obtener todos los momentos
@app.route('/api/momentos', methods=['GET'])
def get_momentos():
    return jsonify(leer_momentos())

# Crear un momento
@app.route('/api/momentos', methods=['POST'])
def crear_momento():
    titulo = request.form.get('titulo')
    descripcion = request.form.get('descripcion')
    fecha = request.form.get('fecha', '')
    imagen_url = ''

    if 'imagen' in request.files:
        file = request.files['imagen']
        if file and allowed_file(file.filename):
            ext = file.filename.rsplit('.', 1)[1].lower()
            filename = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(IMAGENES_FOLDER, filename))
            imagen_url = f"/api/imagenes/{filename}"

    momentos = leer_momentos()
    nuevo = {
        'id': str(uuid.uuid4()),
        'titulo': titulo,
        'descripcion': descripcion,
        'fecha': fecha,
        'imagen': imagen_url
    }
    momentos.append(nuevo)
    guardar_momentos(momentos)
    return jsonify(nuevo), 201

# Eliminar un momento
@app.route('/api/momentos/<id>', methods=['DELETE'])
def eliminar_momento(id):
    momentos = leer_momentos()
    momentos = [m for m in momentos if m['id'] != id]
    guardar_momentos(momentos)
    return jsonify({'ok': True})

# Servir imágenes
@app.route('/api/imagenes/<filename>')
def get_imagen(filename):
    return send_from_directory(IMAGENES_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)