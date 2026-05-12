import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
from datetime import datetime, timezone

load_dotenv()

cert_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "firebase.json")

try:
    cred = credentials.Certificate(cert_path)
    firebase_admin.initialize_app(cred)
except ValueError:
    pass
except FileNotFoundError:
    print(f"Error: No se encontró el archivo de credenciales en la ruta: {cert_path}")
    print("Asegúrate de que 'firebase.json' existe o la variable GOOGLE_APPLICATION_CREDENTIALS es correcta.")
    exit(1)

db = firestore.client()

def test_firestore():
    print("Iniciando prueba de inserción de datos en Firestore...\n")

    # 1. Crear un usuario
    usuario_ref = db.collection('usuarios').document('test_user_123')
    usuario_data = {
        "nombre": "Ana",
        "apellido": "Pérez",
        "correo": "ana.perez@redime.co",
        "telefono": 3001234567,                  # Int64, no string
        "direccion": "Cl. 10 #45-20, Medellín",
        "cedula": 102030,                        # Renombrado y como Int64
        "tipo_usuario": "donante",               # "donante" | "visitante" | "administrador"
        "fecha_registro": datetime.now(timezone.utc),
        "preferencias": {
            "tipo_procesamiento_preferido": "commemoration",
            "consentimiento_publicacion": True
        }
    }
    usuario_ref.set(usuario_data)
    print(f"Usuario creado con ID: {usuario_ref.id}")

    # 2. Crear un punto de recolección
    punto_ref = db.collection('puntos_recoleccion').document('punto_centro_1')
    punto_data = {
        "nombre": "EcoPunto Centro",
        "direccion": "Cra. 52 #44-17, Medellín",
        "ubicacion": firestore.GeoPoint(6.2447, -75.5738),
        "horario": "Lun-Sáb 8:00-18:00",
        "tipos_aceptados": ["largeAppliance", "smallAppliance"],
        "activo": True
    }
    punto_ref.set(punto_data)
    print(f"Punto de recolección creado con ID: {punto_ref.id}")

    # 3. Crear un dispositivo asociado al usuario
    dispositivo_ref = db.collection('dispositivos').document('disp_test_001')
    dispositivo_data = {
        "id_usuario": usuario_ref,               # DocumentReference
        "marca": "Apple",
        "modelo": "iPhone 6",
        "ano_aproximado": 2014,
        "tipo_dispositivo": "telecommunications",
        "peso_estimado": 0.13,
        "antiguedad": "más de 10 años",
        "funciona": False,
        "pieza_entera": True,
        "fecha_registro": datetime.now(timezone.utc),
        "historia": {
            "texto_historia": "Me llamaban el mejor teléfono de su época, pero ahora me reciclarán.",
            "fecha_generacion": datetime.now(timezone.utc),
            "estado_aprobacion": "aprobada",
            "extracto": "Un iPhone 6 que dio su vida útil.",
            # imagen_url eliminado (no está en el nuevo esquema)
            "publica": True
        }
    }
    dispositivo_ref.set(dispositivo_data)
    print(f"Dispositivo creado con ID: {dispositivo_ref.id}")

    # 4. Crear un tracking (Subcolección de dispositivo)
    tracking_ref = dispositivo_ref.collection('tracking').document('track_001')
    tracking_data = {
        "etapa": "delivery",
        "subestado": "Solicitud recibida",
        "fecha_actualizacion": datetime.now(timezone.utc),
        # mensaje_usuario eliminado (no está en el nuevo esquema)
        "procesamiento_tipo": "commemoration"
    }
    tracking_ref.set(tracking_data)
    print(f"Tracking (subcolección) creado con ID: {tracking_ref.id}")

    # 5. Crear una solicitud
    solicitud_ref = db.collection('solicitudes').document('solicitud_test_001')
    solicitud_data = {
        "id_usuario": usuario_ref,               # DocumentReference
        "id_dispositivo": dispositivo_ref,       # DocumentReference
        "id_punto": punto_ref,                   # DocumentReference (null si es a domicilio)
        "fecha_solicitud": datetime.now(timezone.utc),
        "metodo_entrega": "homePickup",
        "direccion": "Cl. 10 #45-20, Medellín",
        "fecha_preferida": datetime.now(timezone.utc),
        "estado_solicitud": "pendiente"
    }
    solicitud_ref.set(solicitud_data)
    print(f"Solicitud creada con ID: {solicitud_ref.id}")

    print("\nTodos los datos de prueba fueron insertados exitosamente según el nuevo esquema.")

if __name__ == "__main__":
    test_firestore()