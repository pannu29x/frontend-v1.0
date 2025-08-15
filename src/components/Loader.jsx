export default function Loader({ text = "Loading..." }) {
  return (
    <div style={{
      padding: "20px",
      textAlign: "center",
      fontSize: "18px",
      color: "#555"
    }}>
      ⏳ {text}
    </div>
  );
}
