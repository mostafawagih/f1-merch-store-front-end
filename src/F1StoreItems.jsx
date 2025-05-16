import React, { useEffect, useState } from "react";

const F1StoreItems = () => {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/items");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      {Object.entries(items).map(([team, products]) => (
        <div key={team}>
          <h2>{team.toUpperCase()}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {products.map((item, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "200px",
                }}
              >
                <img
                  src={
                    item.image.startsWith("//")
                      ? `https:${item.image}`
                      : item.image
                  }
                  alt={item.title}
                  width="100%"
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <h4>{item.title}</h4>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default F1StoreItems;
