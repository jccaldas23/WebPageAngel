from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

@app.route("/api/saludo", methods=["GET"])
def saludo():
    return jsonify({"mensaje": "¡Hola desde Flask!"})

if __name__ == "__main__":
    app.run(debug=True)