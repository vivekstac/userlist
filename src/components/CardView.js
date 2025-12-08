export default function ListView({ data, onEdit, onDelete }) {
    return (
        <div className="user-grid">
            {data.map((row) => (
                <div className="user-card" key={row.id}>
                    <img className="avatar" src={row.avatar} alt="" />
                    <h4>{row.name}</h4>
                    <p>{row.email}</p>

                    <div className="action-overlay">
                        <button className="icon-btn edit" onClick={() => onEdit(row.id)}>
                            ✏️
                        </button>
                        <button className="icon-btn delete" onClick={() => onDelete(row.id)}>
                            🗑️
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
