import { useState } from "react";

export default function TableView({ data, onEdit, onDelete }) {
    const itemsPerPage = 5;
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const pageData = data.slice(start, start + itemsPerPage);

    return (
        <>
            <div className="user-table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageData && pageData.length > 0 && pageData.map((row) => (
                            <tr key={row.id}>
                                <td><img className="avatar" src={row.avatar} alt={row.name} width="50" height="50" /></td>
                                <td>{row.email}</td>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => onEdit(row.id)}>Edit</button>
                                    <button className="btn-delete" onClick={() => onDelete(row.id)} style={{ marginLeft: 10 }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {pageData && pageData.length === 0 && <div style={{ padding: "20px", textAlign: 'center' }}>
                    <h2>No Record Found</h2>
                </div>}
            </div>

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    {`<`}
                </button>
                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                        <button
                            key={pageNum}
                            className={page === pageNum ? "active" : ""}
                            onClick={() => setPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                {/* <span style={{ margin: "0 10px" }}>
                    Page {page} of {totalPages}
                </span> */}

                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    {`>`}
                </button>
            </div>
        </>
    );
}
