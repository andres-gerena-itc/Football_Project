import pandas as pd
import sqlite3
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Conexión a la base de datos
conn = sqlite3.connect('db.sqlite3')

# Leer datos de partidos
matches = pd.read_sql_query("SELECT * FROM football_data_match", conn)

# Preparar variable objetivo
matches['total_goals'] = matches['home_score'] + matches['away_score']

# Seleccionar variables predictoras
X = matches[['home_team_id', 'away_team_id']]  # Usamos IDs de los equipos
y = matches['total_goals']  # Target: goles totales

# Cerrar conexión
conn.close()

# Dividir datos en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear modelo de regresión
model = LinearRegression()

# Entrenar modelo
model.fit(X_train, y_train)

# Predecir en datos de prueba
y_pred = model.predict(X_test)

# Evaluar modelo
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Resultados del modelo de regresión lineal:")
print(f"- Error cuadrático medio (MSE): {mse:.2f}")
print(f"- Coeficiente de determinación (R²): {r2:.2f}")

# Ejemplo: predecir goles para un partido hipotético
sample_input = pd.DataFrame({
    'home_team_id': [1],  # Cambia a un ID real de equipo local
    'away_team_id': [5]   # Cambia a un ID real de equipo visitante
})
predicted_goals = model.predict(sample_input)

print(f"\nPredicción de goles para el partido ejemplo: {predicted_goals[0]:.2f} goles totales")
