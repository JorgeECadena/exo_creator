import pandas as pd
from scipy.spatial.distance import euclidean

df = pd.read_csv('data.csv')

radius = 18.647
mass = 2543
temperature = 1800
values = [radius, mass, temperature]

def similarity(df, values):
    # if column not num -> fill with 0
    df[['pl_rade', 'pl_bmasse', 'pl_eqt']] = df[['pl_rade', 'pl_bmasse', 'pl_eqt']].apply(pd.to_numeric, errors='coerce').fillna(0)

    # calculate with each roww
    df['resultDistance'] = df[['pl_rade', 'pl_bmasse', 'pl_eqt']].apply(lambda row: euclidean(row, values), axis=1)

    # min distance
    mostCompatible = df['resultDistance'].idxmin()
    exoplanet = df.iloc[mostCompatible]['pl_name']

    return exoplanet

compatible_planet = similarity(df, values)

print(compatible_planet)