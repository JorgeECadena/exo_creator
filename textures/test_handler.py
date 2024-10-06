import json
from textures import TextureGenerator
from storytelling import Storyteller


def handlerStory(event, context):
    print("recieved event: ", event)
    body = json.loads(event.get('body', '{}'))
    user_facts = body.get('user_facts', {})
    storyteller = Storyteller()

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
        },
        'body': json.dumps(storyteller.processInput(user_facts))
    }

def handlerTextures(event, context):
    print("recieved event: ", event)
    body = json.loads(event.get('body', '{}'))
    distance = body.get('distance', 10)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
        },
        'body': json.dumps(TextureGenerator.get_assets(distance))
    }