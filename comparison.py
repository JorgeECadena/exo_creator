import pandas as pd
from scipy.spatial.distance import euclidean

df = pd.read_csv('data.csv')

planeta = input('Ingrese el nombre del planeta: ')
distancia = float(input('Ingrese la distancia del planeta a su estrella (en AU): '))
masa_sol = float(input('Ingrese la masa de la estrella (en Soles): '))
temperatura = float(input('Ingrese la temperatura de equilibrio del planeta (en °C): '))
masa_planeta = float(input('Ingrese la masa del planeta (en Tierras): '))
radio_planeta = float(input('Ingrese el radio del planeta (en Tierras): '))
values = [radio_planeta, masa_planeta, temperatura, masa_sol, distancia]

def similarity(df, values):
    # if column not num -> fill with 0
    df[['pl_rade', 'pl_bmasse', 'pl_eqt', 'st_mass', 'pl_orbsmax']] = df[['pl_rade', 'pl_bmasse', 'pl_eqt', 'st_mass', 'pl_orbsmax']].apply(pd.to_numeric, errors='coerce').fillna(0)

    # calculate with each roww
    df['resultDistance'] = df[['pl_rade', 'pl_bmasse', 'pl_eqt', 'st_mass', 'pl_orbsmax']].apply(lambda row: euclidean(row, values), axis=1)

    # min distance
    mostCompatible = df['resultDistance'].idxmin()
    exoplanet = df.iloc[mostCompatible]
    return exoplanet

compatible_planet = similarity(df, values)

print(compatible_planet['pl_name'])
print(compatible_planet)
#df['pl_orbsmax'] distancias de los planetas a su estrella
#df['st_mass'] masa de la estrella
#df['pl_eqt'] temperatura de equilibrio del planeta