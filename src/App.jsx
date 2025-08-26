import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState([]);
  const [modoOscuro, setModoOscuro] = useState(false);

  // 🔹 Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setLista(JSON.parse(tareasGuardadas));
    }

    const modoGuardado = localStorage.getItem("modoOscuro");
    if (modoGuardado === "true") setModoOscuro(true);
  }, []);

  // 🔹 Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(lista));
  }, [lista]);

  // 🔹 Guardar preferencia de modo
  useEffect(() => {
    localStorage.setItem("modoOscuro", modoOscuro);
  }, [modoOscuro]);

  // Agregar tarea
  const agregarTarea = () => {
    if (tarea.trim() === "") return;
    setLista([...lista, { texto: tarea, completada: false }]);
    setTarea("");
  };

  // Cambiar estado de completada
  const toggleTarea = (index) => {
    const nuevaLista = [...lista];
    nuevaLista[index].completada = !nuevaLista[index].completada;
    setLista(nuevaLista);
  };

  // Eliminar tarea
  const eliminarTarea = (index) => {
    setLista(lista.filter((_, i) => i !== index));
  };

  // Contador de pendientes
  const pendientes = lista.filter((t) => !t.completada).length;

  return (
    <div className={`app ${modoOscuro ? "dark" : ""}`}>
      <h1>🌸 Mi lista de tareas 💜</h1>

      {/* Botón modo oscuro */}
      <button
        onClick={() => setModoOscuro(!modoOscuro)}
        style={{ marginBottom: "50px" }}
      >
        {modoOscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
      </button>

      {/* Input y botón */}
      <div>
        <input
          type="text"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          placeholder="Escribe una tarea..."
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      {/* Contador */}
      <p style={{ marginTop: "15px", color: modoOscuro ? "#fff" : "#6a0572" }}>
        {pendientes === 0
          ? "🎉 No tienes tareas pendientes"
          : `Tienes ${pendientes} tarea${pendientes > 1 ? "s" : ""} pendiente${
              pendientes > 1 ? "s" : ""
            } ✨`}
      </p>

      {/* Lista de tareas */}
      <ul>
        
          {lista.map((item, index) => (
            <li
              key={index}
              className={item.completada ? "completed" : ""}
            >
              <span>{item.texto}</span>
              <button onClick={() => toggleTarea(index)}>✔</button>
              <button onClick={() => eliminarTarea(index)}>❌</button>
            </li>
          ))}
        
      </ul>
    </div>
  );
}

export default App;
