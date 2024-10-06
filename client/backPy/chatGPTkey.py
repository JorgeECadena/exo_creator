import openai 
from openai import OpenAI
import os
from dotenv import load_dotenv


#overrides system
load_dotenv(override=True)

API_Key = os.getenv('chatKey')

client = OpenAI(api_key=API_Key)

# Función para hacer una consulta a ChatGPT
def consultar_chatgpt(mensaje):
    # Construir el mensaje a enviar a ChatGPT
    prompt = (
        "I will provide you with information about an exoplanet and its star, "
        "including details for each field. Please analyze these data and provide a brief description of the planet. "
        "If possible, also mention who discovered it and add some fun facts. "
        "Please give everything in one paragraph and int other paragraph or line, a list the facts in bullet points, making sure it's easy to understand for a 10-year-old child. "
        "Finally, end the response with 'Aña'. If the response contains complex data or quantities, "
        "try to explain them with comparisons to common elements in real life that a young child might understand."
        "\n\n"
        "Exoplanet Data:\n"
        f"{mensaje}\n\n"
        "Field Descriptions:\n"
        "# pl_name - name\n"
        "# sy_snum - star number\n"
        "# sy_pnum - planet number\n"
        "# st_teff - effective temperature\n"
        "# st_rad - radius of the star\n"
        "# st_mass - mass of the star\n"
        "# pl_orbper - orbital period\n"
        "# pl_orbsmax - maximum orbital distance\n"
        "# pl_rade - radius of the planet\n"
        "# pl_bmasse - mass of the planet\n\n"
    )

    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        # Extract the formatted or corrected CURP from the response
        answer = completion.choices[0].message.content.strip()
        return answer
    except Exception as e:
        print(f"Error al consultar ChatGPT: {e}")
        return None

# Ejemplo de uso
if __name__ == "__main__":
    print("Ingresa los datos (presiona CTRL+D para terminar):")
    datos = []
    try:
        # Leer múltiples líneas de entrada hasta CTRL+D (EOF)
        while True:
            linea = input()
            if(linea == "end"):
                break
            datos.append(linea)
    except EOFError:
        # Finaliza la lectura al encontrar EOF
        pass

    # Combina todas las líneas en una sola cadena
    datos = "\n".join(datos)

    respuesta = consultar_chatgpt(datos)
    print("Respuesta de ChatGPT:\n", respuesta)

# pl_name - name 
# sy_snum star num
# sy_pnum planet num
# st_teff efective temperature
# st_rad radio
# st_mass masa
# pl_orbper orbita
# pl_orbsmax orbita maxima
# pl_rade radio
# pl_bmasse masa

# quien lo descubrio
# pasarle el pandas 
# añadir datos curiosos 
