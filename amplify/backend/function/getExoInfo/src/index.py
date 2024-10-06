import json
"""from python.comparison import Comparison
from python.comprobar_vida import ComprobarVida
from python.conseguir_url import ConseguirUrl
from python.consultar_chat import ConsultarChat
from python.distancias import Distancias
from python.exo_creator import ExoCreator
from python.handler import handler as hdlr"""

def handler(event, context):
  print('received event:')
  print(event)

  # Read the body of the request
  body = json.loads(event['body'])
  radius = body['planetRadius']
  planetSize = body['planetSize']
  temperature = body['temperature']
  sunMass = body['sunMass']
  distance = body['planetDistance']
  cloudOpacity = body['cloudOpacity']
  texture = body['planetTexture']

  data_list = [radius, planetSize, temperature, sunMass, distance]

  #hdlr_body = hdlr(data_list)



  response = {
    'message': 'Hello from your new Amplify Python lambda!',
    'received_data': json.dumps(body),
  }

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(response)
  }