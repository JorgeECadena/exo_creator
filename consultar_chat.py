from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(override=True)

API_Key = os.getenv('chatKey')

client = OpenAI(api_key=API_Key)

# Function to make a query to ChatGPT
def consultar_chatgpt(row):
    # Convert the pandas row to a string format
    mensaje = row.to_string()

    # Build the prompt to send to ChatGPT
    prompt = (
        "I will provide you with information about an exoplanet and its star, "
        "including details for each field. Please analyze these data and provide a brief description of the planet. "
        "If possible, also mention who discovered it and add some fun facts. "
        "Please give everything in one paragraph and in another paragraph or line, list the facts in bullet points, making sure it's easy to understand for a 10-year-old child. "
        "If the response contains complex data or quantities, "
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
                {"role": "user", "content": prompt}
            ]
        )

        # Extract the answer from the response
        answer = completion.choices[0].message.content.strip()
        return answer
    except Exception as e:
        print(f"Error querying ChatGPT: {e}")
        return None
