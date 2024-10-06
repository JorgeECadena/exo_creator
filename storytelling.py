import os
from dotenv import load_dotenv
from openai import OpenAI


class Storyteller:
    def __init__(self):
        # Overrides system environment variables with .env values if available
        load_dotenv(override=True)

        # Load the API key from the environment variables
        API_Key = os.getenv("API_KEY")  # Make sure .env file has a key named "API_KEY"
        print("api key", API_Key)

        # Initialize the OpenAI client with the API key
        self.client = OpenAI(api_key=API_Key)

        self.storyteller = Storyteller()

    def makeStory(self, facts):
        prompt = f"""Create a story about a planet with the following characteristics:
        Planet Name: {facts['planet_name']}
        Civilization Name: {facts['civilization_name']}
        Nature of the Civilization: {facts['civilization_nature']}
        Disasters Experienced: {facts['planet_disaster']}
        Special Attributes: {facts['special_attributes']}

        Write an engaging story linking these facts together.
        Do not include a title, jump directly to the story.
        At the end of the story, write a | to indicate the end of the story and write a summary of the story, this summary is going to be fed to a Dalle model to create an image of the story.
        """

        try:
            # Use the client object from the current instance
            completion = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ]
            )

            # Extract the generated story from the response
            answer = completion.choices[0].message.content.strip()
            return answer
        except Exception as e:
            print(f"Error when querying ChatGPT: {e}")
            return None

    def makeImage(self, answer):
        image_prompt = f"Create an image based on the following description from a story (focus on the planet and its inhabitants) and do not include any text: {answer}"

        try:
            # Use the client object from the current instance
            response = self.client.images.generate(
                model="dall-e-3",
                prompt=image_prompt,
                size='1024x1024',
                quality="standard",
                n=1,
            )

            # Return the URL of the generated image
            image_url = response.data[0].url
            return image_url
        except Exception as e:
            print(f"Error when querying DALL-E: {e}")
            return None


# Example usage

    def processInput(self, user_facts):
        story = self.storyteller.makeStory(user_facts)
        before, after = story.split("|", 1)
        image = self.storyteller.makeImage(after)

        return {'story':before, 'image':image}

