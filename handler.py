import json
import pandas as pd
from comparison import similarity
from comprobar_vida import check_life
from distancias import Distancias
from conseguir_url import link
from consultar_chat import consultar_chatgpt
from textures import TextureGenerator

df = pd.read_csv('data.csv')

def handler(event, context):
    body = json.loads(event.get('body', '{}'))
    values = body.get('values', [])
    
    #values = [radio_planeta, masa_planeta, temperatura, masa_sol, distancia]
    values[2] = values[2] + 273.15
    planeta_parecido = similarity(df, values)
    message = {}
    message['planet_name'] = planeta_parecido['pl_name']
    message['life_check'] = check_life(planeta_parecido['pl_orbsmax'], planeta_parecido['st_mass'], planeta_parecido['pl_eqt'])
    
    distanciaNave = Distancias(planeta_parecido["sy_dist"])
    message['star_trek_distance'] = distanciaNave.starTrek()
    message['star_wars_distance'] = distanciaNave.starWars()
    message['space_odyssey_distance'] = distanciaNave.SpaceOdyssey()
    message['halo_distance'] = distanciaNave.halo()
    
    message['planet_link'] = link(planeta_parecido["pl_name"])
    message['chatgpt_response'] = consultar_chatgpt(planeta_parecido)
    message['system_distance'] = planeta_parecido["sy_dist"]
    message['planet_distance'] = planeta_parecido["orbsmax"]

    TextureGenerator.get_assets(values[4])
    TextureGenerator.get_assets(planeta_parecido["orbsmax"])

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(message)
    }
