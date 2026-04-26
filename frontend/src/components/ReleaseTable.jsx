export default function ReleaseTable({ releases, onSelectRelease, onDeleteRelease }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (releases.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
        No releases yet. Create your first release!
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <table style={{ width: '100%', borderCollapse: 'collapse', display: 'table' }} className="desktop-table">
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '14px', color: '#374151' }}>Release</th>
            <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '14px', color: '#374151' }}>Date</th>
            <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '14px', color: '#374151' }}>Status</th>
            <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '14px', color: '#374151' }}></th>
            <th style={{ padding: '16px', textAlign: 'left', fontWeight: '700', fontSize: '14px', color: '#374151' }}></th>
          </tr>
        </thead>
        <tbody>
          {releases.map(release => (
            <tr key={release.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>{release.name}</td>
              <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>{formatDate(release.date)}</td>
              <td style={{ padding: '16px', fontSize: '14px', textTransform: 'capitalize', color: '#6b7280' }}>
                {release.status}
              </td>
              <td style={{ padding: '16px' }}>
                <button
                  onClick={() => onSelectRelease(release)}
                  style={{
                    padding: '0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>View</span>
                </button>
              </td>
              <td style={{ padding: '16px' }}>
                <button
                  onClick={() => onDeleteRelease(release.id)}
                  style={{
                    padding: '0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="mobile-cards" style={{ display: 'none' }}>
        {releases.map(release => (
          <div
            key={release.id}
            style={{
              padding: '16px',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: 'white'
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                {release.name}
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                {formatDate(release.date)}
              </div>
              <div style={{ fontSize: '13px', color: '#6b7280', textTransform: 'capitalize' }}>
                Status: {release.status}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => onSelectRelease(release)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                View
              </button>
              <button
                onClick={() => onDeleteRelease(release.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
