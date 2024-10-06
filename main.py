import pandas as pd
from comparison import similarity
from comprobar_vida import check_life
from distancias import Distancias

df = pd.read_csv('data.csv')
planeta = input('Ingrese el nombre del planeta: ')
distancia = float(input('Ingrese la distancia del planeta a su estrella (en AU): '))
masa_sol = float(input('Ingrese la masa de la estrella (en Soles): '))
temperatura = float(input('Ingrese la temperatura de equilibrio del planeta (en °C): '))
masa_planeta = float(input('Ingrese la masa del planeta (en Tierras): '))
radio_planeta = float(input('Ingrese el radio del planeta (en Tierras): '))
values = [radio_planeta, masa_planeta, temperatura, masa_sol, distancia]

planeta_parecido = similarity(df, values)
print('El planeta más parecido es: ', planeta_parecido['pl_name'])
print('¿Es habitable? ', check_life(distancia, masa_sol, temperatura))

distanciaNave = Distancias(distancia)
print('El tiempo de llegar con una nave de Star Trek al planeta son: ', distanciaNave.starTrek(), 'años')
print('El tiempo de llegar con una nave de Star Wars al planeta son: ', distanciaNave.starWars(), 'años')
print('El tiempo de llegar con una nave de Space Odyssey al planeta son: ', distanciaNave.SpaceOdyssey(), 'años')
print('El tiempo de llegar con una nave de Halo al planeta son: ', distanciaNave.halo(), 'años')
