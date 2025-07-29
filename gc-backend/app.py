from flask import Flask, request, jsonify #type: ignore
from flask_cors import CORS #type: ignore
from flask_pymongo import PyMongo #type: ignore
from flask_bcrypt import Bcrypt #type: ignore
from flask_jwt_extended import JWTManager, create_access_token, jwt_required #type: ignore

from ai_helper import ai_helper_chain #to call the helper agent
import datetime

from dotenv import load_dotenv #type: ignore
import os
app = Flask(__name__)
# allow Vite frontend to access Flask backend
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

load_dotenv()
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

mongo = PyMongo(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

users = mongo.db.users

#method for signup
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if users.find_one({"email": email}):
        return jsonify({"msg": "User already exists"}), 409
    
    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    users.insert_one({"email": email, "password": hashed_pw})
    return jsonify({"msg": "user created !!"}), 201

#method for login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    user = users.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"msg": "invalid credentials ❌"}), 401
    
    #create access
    access_token = create_access_token(identity=email, expires_delta=datetime.timedelta(days=1))
    return jsonify(token=access_token), 200

#protect the route
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify({"msg": "You are authenticated 🚀"})

#route to use ai helper 
@app.route("/api/ai-recommend", methods=["POST"])
def ai_helper_route():
    data = request.get_json()
    brand = data.get("brand")
    use_case = data.get("useCase")
    
    if not brand or not use_case:
        return jsonify({"msg": "Missing brand or use case !!"}), 400
    
    try:
        result = ai_helper_chain.invoke({"brand": brand, "use_case": use_case})
        return jsonify({"recommendation": result["response"]}), 200
    except Exception as e:
        print("AI helper error❌: ", e)
        return jsonify({"msg": "something went wrong 404 !!"}), 500

if __name__ == "__main__":
    app.run(debug=True)



