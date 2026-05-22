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


def test_museo_memorias():
    print("Iniciando prueba de inserción para Museo Digital (memorias utilizadas)...\n")

    # ──────────────────────────────────────────────
    # 1. Crear 4 usuarios con IDs auto-generados por Firestore
    # ──────────────────────────────────────────────
    usuarios = []
    usuarios_data = [
        {
            "nombre": "Carlos",
            "apellido": "Mendoza",
            "correo": "carlos.mendoza@email.com",
            "telefono": 3001112233,
            "direccion": "Cra. 45 #67-89, Bogotá",
            "cedula": 11223344,
            "tipo_usuario": "donante",
            "fecha_registro": datetime.now(timezone.utc),
            "preferencias": {
                "tipo_procesamiento_preferido": "commemoration",
                "consentimiento_publicacion": True
            }
        },
        {
            "nombre": "María",
            "apellido": "Giraldo",
            "correo": "maria.giraldo@email.com",
            "telefono": 3004445566,
            "direccion": "Cl. 8 #23-45, Medellín",
            "cedula": 55667788,
            "tipo_usuario": "donante",
            "fecha_registro": datetime.now(timezone.utc),
            "preferencias": {
                "tipo_procesamiento_preferido": "commemoration",
                "consentimiento_publicacion": True
            }
        },
        {
            "nombre": "Andrés",
            "apellido": "Ramírez",
            "correo": "andres.ramirez@email.com",
            "telefono": 3007778899,
            "direccion": "Av. siempre viva #12-34, Cali",
            "cedula": 99001122,
            "tipo_usuario": "donante",
            "fecha_registro": datetime.now(timezone.utc),
            "preferencias": {
                "tipo_procesamiento_preferido": "commemoration",
                "consentimiento_publicacion": True
            }
        },
        {
            "nombre": "Valentina",
            "apellido": "Orozco",
            "correo": "valentina.orozco@email.com",
            "telefono": 3002223344,
            "direccion": "Cl. 5 #10-20, Pereira",
            "cedula": 33445566,
            "tipo_usuario": "donante",
            "fecha_registro": datetime.now(timezone.utc),
            "preferencias": {
                "tipo_procesamiento_preferido": "commemoration",
                "consentimiento_publicacion": True
            }
        }
    ]

    for i, u_data in enumerate(usuarios_data):
        ref = db.collection("usuarios").document()
        ref.set(u_data)
        usuarios.append(ref)
        print(f"Usuario {i+1} creado con ID único: {ref.id} — {u_data['nombre']} {u_data['apellido']}")

    # ──────────────────────────────────────────────
    # 2. Crear 4 dispositivos (memorias) asociados a cada usuario,
    #    con tipo_dispositivo que corresponde a categorías del museo digital
    # ──────────────────────────────────────────────
    dispositivos_data = [
        {
            "marca": "Nokia",
            "modelo": "1100",
            "ano_aproximado": 2003,
            "tipo_dispositivo": "telecommunications",
            "peso_estimado": 0.09,
            "antiguedad": "más de 20 años",
            "funciona": False,
            "pieza_entera": True,
            "fecha_registro": datetime.now(timezone.utc),
            "historia": {
                "texto_historia": (
                    "Este Nokia 1100 fue mi primer teléfono. Lo compré en 2003 "
                    "con mis ahorros de todo un año. Recuerdo que lo llevaba a todas partes "
                    "y nunca me falló. Cuando finalmente dejó de funcionar, lo guardé como "
                    "un tesoro. Hoy sé que sus materiales pueden tener una nueva vida "
                    "en una obra de arte que cuente nuestra historia."
                ),
                "fecha_generacion": datetime.now(timezone.utc),
                "estado_aprobacion": "aprobada",
                "extracto": "Un Nokia 1100 que acompañó a su dueño durante 20 años.",
                "publica": True
            }
        },
        {
            "marca": "Samsung",
            "modelo": "SyncMaster 940N",
            "ano_aproximado": 2008,
            "tipo_dispositivo": "monitors",
            "peso_estimado": 3.50,
            "antiguedad": "más de 15 años",
            "funciona": False,
            "pieza_entera": True,
            "fecha_registro": datetime.now(timezone.utc),
            "historia": {
                "texto_historia": (
                    "Pasé incontables horas frente a este monitor trabajando en mi tesis "
                    "universitaria. Fue testigo de trasnochos, café derramado y muchas "
                    "lágrimas de frustración. Pero también vio mi graduación cuando "
                    "revisé el correo con los resultados. Este monitor merece descansar "
                    "y convertirse en parte del arte electrónico."
                ),
                "fecha_generacion": datetime.now(timezone.utc),
                "estado_aprobacion": "aprobada",
                "extracto": "Monitor SyncMaster que presenció una tesis universitaria.",
                "publica": True
            }
        },
        {
            "marca": "Intel",
            "modelo": "Pentium III",
            "ano_aproximado": 2001,
            "tipo_dispositivo": "components",
            "peso_estimado": 0.05,
            "antiguedad": "más de 20 años",
            "funciona": False,
            "pieza_entera": True,
            "fecha_registro": datetime.now(timezone.utc),
            "historia": {
                "texto_historia": (
                    "Este procesador fue el cerebro de la primera computadora que armé "
                    "con mi papá cuando tenía 12 años. Aprendí a programar gracias a ella. "
                    "Cada vez que veo este Pentium III recuerdo el olor a componentes nuevos "
                    "y la emoción de ver el BIOS encenderse por primera vez. Ahora formará "
                    "parte de algo más grande que un simple computador."
                ),
                "fecha_generacion": datetime.now(timezone.utc),
                "estado_aprobacion": "aprobada",
                "extracto": "Pentium III de la primera PC armada en familia.",
                "publica": True
            }
        },
        {
            "marca": "Sony",
            "modelo": "Ericsson K750i",
            "ano_aproximado": 2005,
            "tipo_dispositivo": "telecommunications",
            "peso_estimado": 0.10,
            "antiguedad": "más de 15 años",
            "funciona": False,
            "pieza_entera": True,
            "fecha_registro": datetime.now(timezone.utc),
            "historia": {
                "texto_historia": (
                    "Mi Sony Ericsson K750i fue mi compañero de viajes por Sudamérica. "
                    "Con su cámara de 2 megapíxeles capturé paisajes increíbles y momentos "
                    "inolvidables. Sobrevivió a caídas, lluvia y hasta a un paseo por el río. "
                    "Cuando murió definitivamente, sentí que perdía un amigo. Pero reciclando "
                    "sus partes, su historia vivirá en el museo digital."
                ),
                "fecha_generacion": datetime.now(timezone.utc),
                "estado_aprobacion": "aprobada",
                "extracto": "Sony Ericsson K750i que viajó por toda Sudamérica.",
                "publica": True
            }
        }
    ]

    dispositivos = []
    for i, (user_ref, d_data) in enumerate(zip(usuarios, dispositivos_data)):
        d_data["id_usuario"] = user_ref
        ref = db.collection("dispositivos").document()
        ref.set(d_data)
        dispositivos.append(ref)
        print(f"Dispositivo {i+1} creado con ID único: {ref.id} — {d_data['marca']} {d_data['modelo']} "
              f"(categoría: {d_data['tipo_dispositivo']})")

    # ──────────────────────────────────────────────
    # 3. Crear solicitudes vinculando cada usuario con su dispositivo
    #    (id_punto = None porque es recolección a domicilio)
    # ──────────────────────────────────────────────
    solicitudes = []
    for i, (user_ref, dispo_ref) in enumerate(zip(usuarios, dispositivos)):
        solicitud_ref = db.collection("solicitudes").document()
        solicitud_data = {
            "id_usuario": user_ref,
            "id_dispositivo": dispo_ref,
            "id_punto": None,
            "fecha_solicitud": datetime.now(timezone.utc),
            "metodo_entrega": "homePickup",
            "direccion": user_ref.get().to_dict().get("direccion", ""),
            "fecha_preferida": datetime.now(timezone.utc),
            "estado_solicitud": "pendiente"
        }
        solicitud_ref.set(solicitud_data)
        solicitudes.append(solicitud_ref)
        print(f"Solicitud {i+1} creada con ID único: {solicitud_ref.id}")

    # ──────────────────────────────────────────────
    # 4. Crear tracking (subcolección) para cada dispositivo
    # ──────────────────────────────────────────────
    for i, dispo_ref in enumerate(dispositivos):
        tracking_ref = dispo_ref.collection("tracking").document()
        tracking_data = {
            "etapa": "delivery",
            "subestado": "Solicitud recibida",
            "fecha_actualizacion": datetime.now(timezone.utc),
            "procesamiento_tipo": "commemoration"
        }
        tracking_ref.set(tracking_data)
        print(f"Tracking creado para dispositivo {i+1} con ID: {tracking_ref.id}")

    print("\n" + "=" * 60)
    print("RESUMEN — Datos insertados:")
    print("=" * 60)
    print(f"• 4 usuarios (IDs únicos Firestore)")
    print(f"• 4 dispositivos / memorias (historia.publica = True)")
    print(f"• 4 solicitudes (recolección a domicilio)")
    print(f"• 4 tracking entries (subcolección)")
    print()
    print("Colecciones NO incluidas: publicaciones, puntos_recoleccion")
    print("=" * 60)


if __name__ == "__main__":
    test_museo_memorias()
