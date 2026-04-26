import { useState, useEffect } from 'react';
import CreateReleaseModal from './components/CreateReleaseModal';
import ReleaseTable from './components/ReleaseTable';
import ReleaseDetailView from './components/ReleaseDetailView';
import * as api from './api/releases';

export default function App() {
  const [releases, setReleases] = useState([]);
  const [steps, setSteps] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [releasesData, stepsData] = await Promise.all([
        api.getReleases(),
        api.getSteps()
      ]);
      setReleases(releasesData);
      setSteps(stepsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateRelease(data) {
    try {
      await api.createRelease(data);
      await loadData();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating release:', error);
    }
  }

  async function handleUpdateRelease(id, name, date) {
    try {
      const updated = await api.updateRelease(id, name, date);
      setReleases(releases.map(r => r.id === id ? updated : r));
      if (selectedRelease?.id === id) {
        setSelectedRelease(updated);
      }
    } catch (error) {
      console.error('Error updating release:', error);
    }
  }

  async function handleUpdateSteps(id, completedSteps) {
    try {
      const updated = await api.updateSteps(id, completedSteps);
      setReleases(releases.map(r => r.id === id ? updated : r));
      if (selectedRelease?.id === id) {
        setSelectedRelease(updated);
      }
    } catch (error) {
      console.error('Error updating steps:', error);
    }
  }

  async function handleUpdateInfo(id, additionalInfo) {
    try {
      const updated = await api.updateInfo(id, additionalInfo);
      setReleases(releases.map(r => r.id === id ? updated : r));
      if (selectedRelease?.id === id) {
        setSelectedRelease(updated);
      }
    } catch (error) {
      console.error('Error updating info:', error);
    }
  }

  async function handleDeleteRelease(id) {
    if (!confirm('Are you sure you want to delete this release?')) return;
    
    try {
      await api.deleteRelease(id);
      await loadData();
      setSelectedRelease(null);
    } catch (error) {
      console.error('Error deleting release:', error);
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#666' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 16px' }}>
        {selectedRelease ? (
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <ReleaseDetailView
              release={selectedRelease}
              steps={steps}
              onUpdateRelease={handleUpdateRelease}
              onUpdateSteps={handleUpdateSteps}
              onUpdateInfo={handleUpdateInfo}
              onDelete={handleDeleteRelease}
              onBack={() => setSelectedRelease(null)}
            />
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', color: '#1f2937' }}>ReleaseCheck</h1>
              <p style={{ color: '#6b7280', fontSize: '15px' }}>Your all-in-one release checklist tool</p>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '15px', color: '#a5b4fc', fontWeight: '500' }}>All releases</div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  New release
                </button>
              </div>

              <ReleaseTable
                releases={releases}
                onSelectRelease={setSelectedRelease}
                onDeleteRelease={handleDeleteRelease}
              />
            </div>
          </>
        )}
      </div>

      {showCreateModal && (
        <CreateReleaseModal
          onSubmit={handleCreateRelease}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
