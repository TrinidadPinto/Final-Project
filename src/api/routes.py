from flask import Flask, request, jsonify, url_for, Blueprint
from flask_bcrypt import Bcrypt
from api.models import db, User, Room
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



api = Blueprint('api', __name__)
bcrypt = Bcrypt()

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])                              #REGISTRARSE
def signup():
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    password = data.get("password")
    address = data.get("address")
    phone = data.get("phone")
    city = data.get("city")
    country = data.get("country")


    if not email or not password or not name:
        return jsonify({"msg": "Email and password required"}), 400
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password,name=name, address=address, phone=phone, city=city, country=country)

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201


@api.route('/login', methods=['POST'])                             #INICIO DE SESION
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"msg": "Login successful", "user": user.serialize(),"access_token":access_token}), 200

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@api.route('/update-profile/<int:user_id>', methods=['PUT'])        #EDITAR PERFIL
def update_profile(user_id):
    data = request.get_json()

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user.name = data.get("name", user.name)
    user.address = data.get("address", user.address)
    user.phone = data.get("phone", user.phone)
    user.city = data.get("city", user.city)
    user.country = data.get("country", user.country)

    db.session.commit()

    return jsonify({"msg": "User profile updated successfully", "user": user.serialize()}), 200

@api.route('/room', methods=['POST', 'GET'])
def handle_rooms():
    if request.method == 'POST':
        data = request.get_json()

        required_fields = ["title", "description", "photos", "capacity", "price", "host_id"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"msg": f"{field} is required"}), 400

        room = Room(
            title=data["title"],
            description=data["description"],
            photo_url=",".join(data.get("photos", [])),
            rules=data.get("rules", ""),
            capacity=data["capacity"],
            price=data["price"],
            host_id=data["host_id"]
        )
        db.session.add(room)
        db.session.commit()

        return jsonify({"msg": "Room created", "room": room.serialize()}), 201
    
    elif request.method == 'GET':
        rooms = Room.query.all()
        return jsonify([room.serialize() for room in rooms]), 200
    
@api.route('/room/<int:room_id>', methods=['PUT'])
@jwt_required()
def update_room(room_id):
    user_id = get_jwt_identity()
    room = Room.query.get(room_id)


    if not room:
        return jsonify({"msg": "Room not found"}), 404
    
    if room.user_id != int(user_id):
        return jsonify({"msg": "Unauthorized"}), 403
    
    data = request.get_json()
    room.title = data.get("title", room.title)
    room.description = data.get("description", room.description)
    room.photo_url = data.get("photo_url", room.photo_url)
    room.rules = data.get("rules", room.rules)
    room.capacity = data.get("capacity", room.capacity)
    room.price = data.get("price", room.price)

    db.session.commit()

    return jsonify({"msg": "Room updated successfully", "room": room.serialize()}), 200


@api.route('/room/<int:room_id>', methods=['GET'])
def get_room(room_id):
    room = Room.query.get(room_id)
    if not room:
        return jsonify({"msg": "Room not found"}), 404
    return jsonify(room.serialize()), 200


@api.route('/room/<int:room_id>', methods=['DELETE'])
@jwt_required()
def delete_room(room_id):
    user_id = get_jwt_identity()
    room = Room.query.get(room_id)
    
    if not room:
        return jsonify({"msg": "Room not found"}), 404
    
    if room.user_id != int(user_id):
        return jsonify({"msg": "Unauthorized"}), 403
    

    db.session.delete(room)
    db.session.commit()

    return jsonify({"msg": "Room deleted succsessfully"}), 200


@api.route('/my-rooms', methods=['GET'])                             #ver mis habitaciones publicadas
@jwt_required()
def get_my_rooms():
    user_id = get_jwt_identity()
    rooms = Room.query.filter_by(user_id=user_id).all()
    return jsonify([room.serialize() for room in rooms]), 200


