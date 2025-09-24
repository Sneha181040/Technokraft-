from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Allow frontend requests from different port

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # SQLite DB
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # store hashed password

# Create DB tables
with app.app_context():
    db.create_all()

# -------------------- Routes --------------------

# Registration
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"success": False, "message": "All fields are required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"success": False, "message": "Email already registered"}), 400

        hashed_password = generate_password_hash(password)
        new_user = User(name=name, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"success": True, "message": "User registered successfully"}), 201

    except Exception as e:
        print("❌ Error in /register:", str(e))  # log real error
        return jsonify({"success": False, "message": "Internal server error"}), 500

# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return jsonify({"success": True, "message": f"Welcome {user.name}"})
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

# Forgot Password
@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    user = User.query.filter_by(email=email).first()
    if user:
        # For demo, we don’t expose real password
        return jsonify({"success": True, "message": "Password reset link sent to your email."})
    else:
        return jsonify({"success": False, "message": "Email not found"}), 404

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
