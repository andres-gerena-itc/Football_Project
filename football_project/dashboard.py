import streamlit as st
import pandas as pd
import sqlite3
import plotly.express as px
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# Título
st.title("Dashboard UEFA Champions League 2023-2024")

# Conexión a la base de datos
conn = sqlite3.connect('db.sqlite3')

# Cargar datos
matches = pd.read_sql_query("SELECT * FROM football_data_match", conn)
teams = pd.read_sql_query("SELECT * FROM football_data_team", conn)

# Filtros en la barra lateral
st.sidebar.header("Filtros")

# Filtro interactivo por Stage (fase del torneo)
selected_stage = st.sidebar.selectbox(
    "Selecciona la Fase del Torneo",
    options=["Todas"] + sorted(matches['stage'].dropna().unique().tolist())
)

# Filtro interactivo por Equipo
team_options = ["Todos"] + sorted(teams['name'].dropna().unique().tolist())
selected_team = st.sidebar.selectbox(
    "Selecciona el Equipo",
    options=team_options
)

# Aplicar filtros
if selected_stage != "Todas":
    matches = matches[matches['stage'] == selected_stage]

if selected_team != "Todos":
    team_id = teams[teams['name'] == selected_team]['id'].values[0]
    matches = matches[(matches['home_team_id'] == team_id) | (matches['away_team_id'] == team_id)]

# KPIs principales
total_matches = matches.shape[0]
total_goals = matches['home_score'].sum() + matches['away_score'].sum()
avg_goals_per_match = round(total_goals / total_matches, 2) if total_matches > 0 else 0

# Mostrar KPIs
st.metric(label="Total Partidos", value=total_matches)
st.metric(label="Total Goles", value=total_goals)
st.metric(label="Promedio Goles por Partido", value=avg_goals_per_match)

# Gráfica: Goles por equipo (como local)
if not matches.empty:
    home_goals = matches.groupby('home_team_id')['home_score'].sum().reset_index()
    home_goals = home_goals.merge(teams, left_on='home_team_id', right_on='id')
    fig = px.bar(home_goals, x='name', y='home_score', title="Goles como Local por Equipo")
    st.plotly_chart(fig)

    # Gráfica: Distribución de Partidos por Fase
    fig2 = px.pie(matches, names='stage', title="Distribución de Partidos por Fase")
    st.plotly_chart(fig2)

    # Tabla dinámica de partidos
    st.header("Detalle de Partidos")

    # Unimos nombre del equipo local
    matches = matches.merge(teams[['id', 'name']], how='left', left_on='home_team_id', right_on='id')
    matches.rename(columns={'name': 'Equipo Local'}, inplace=True)

    # Unimos nombre del equipo visitante
    matches = matches.merge(teams[['id', 'name']], how='left', left_on='away_team_id', right_on='id')
    matches.rename(columns={'name': 'Equipo Visitante'}, inplace=True)

    # Seleccionamos y ordenamos columnas
    table = matches[['date', 'Equipo Local', 'home_score', 'away_score', 'Equipo Visitante', 'stage']].copy()
    table.columns = ['Fecha', 'Equipo Local', 'Goles Local', 'Goles Visitante', 'Equipo Visitante', 'Fase']

    st.dataframe(table)

    # Sección: Modelo Predictivo de Goles (Regresión Lineal)
    st.header("Modelo Predictivo: Regresión Lineal de Goles Totales")

    # Preparar variables
    X = matches[['home_team_id', 'away_team_id']]
    y = matches['home_score'] + matches['away_score']

    # Dividir en entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Crear modelo
    model = LinearRegression()
    model.fit(X_train, y_train)

    # Predicciones
    y_pred = model.predict(X_test)

    # Métricas
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    st.subheader("Resultados del Modelo:")
    st.write(f"- Error cuadrático medio (MSE): {mse:.2f}")
    st.write(f"- Coeficiente de determinación (R²): {r2:.2f}")

    # Gráfica de regresión
    fig3, ax = plt.subplots()
    ax.scatter(y_test, y_pred, color='blue')
    ax.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--', lw=2)
    ax.set_xlabel('Goles Reales')
    ax.set_ylabel('Goles Predichos')
    ax.set_title('Regresión Lineal: Goles Reales vs Predichos')

    st.pyplot(fig3)

else:
    st.warning("No hay partidos para la selección aplicada.")

# Cerrar conexión
conn.close()
