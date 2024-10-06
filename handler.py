import json
import pandas as pd
from comparison import similarity
from comprobar_vida import check_life
from distancias import Distancias
from conseguir_url import link
from consultar_chat import consultar_chatgpt

df = pd.read_csv('data.csv')

def handler(event, context):
    body = json.loads(event.get('body', '{}'))
    values = body.get('values', [])
    message = []
    #values = [radio_planeta, masa_planeta, temperatura, masa_sol, distancia]

    planeta_parecido = similarity(df, values)
    message.append(planeta_parecido['pl_name'])
    message.append(check_life(values[4], values[3], values[2]))
    distanciaNave = Distancias(values[4])
    message.append(distanciaNave.starTrek())
    message.append(distanciaNave.starWars())
    message.append(distanciaNave.SpaceOdyssey())
    message.append(distanciaNave.halo())
    message.append(link(planeta_parecido["pl_name"]))
    message.append(consultar_chatgpt(planeta_parecido))

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(message)
    }
