import { useState, useEffect } from 'react';

export default function ReleaseDetailView({ release, steps, onUpdateSteps, onUpdateInfo, onUpdateRelease, onDelete, onBack }) {
  const [completedSteps, setCompletedSteps] = useState(release.completed_steps);
  const [additionalInfo, setAdditionalInfo] = useState(release.additional_info || '');
  const [releaseName, setReleaseName] = useState(release.name);
  const [releaseDate, setReleaseDate] = useState(release.date.split('T')[0]);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCompletedSteps(release.completed_steps);
    setAdditionalInfo(release.additional_info || '');
    setReleaseName(release.name);
    setReleaseDate(release.date.split('T')[0]);
    setHasChanges(false);
  }, [release]);

  const handleStepToggle = (stepId) => {
    const newSteps = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(newSteps);
    setHasChanges(true);
  };

  const handleInfoChange = (value) => {
    setAdditionalInfo(value);
    setHasChanges(true);
  };

  const handleNameChange = (value) => {
    setReleaseName(value);
    setHasChanges(true);
  };

  const handleDateChange = (value) => {
    setReleaseDate(value);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateRelease(release.id, releaseName, releaseDate);
      await onUpdateSteps(release.id, completedSteps);
      await onUpdateInfo(release.id, additionalInfo);
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div style={{ 
        padding: '16px 24px', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '15px',
              color: '#6366f1',
              fontWeight: '500'
            }}
          >
            All releases
          </button>
          <span style={{ color: '#9ca3af', fontSize: '18px' }}>›</span>
          <span style={{ fontSize: '15px', color: '#c7d2fe', fontWeight: '500' }}>{release.name}</span>
        </div>
        <button
          onClick={() => onDelete(release.id)}
          style={{
            padding: '8px 18px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          Delete
        </button>
      </div>

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Release
            </label>
            <input
              type="text"
              value={releaseName}
              onChange={(e) => handleNameChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#6b7280',
                backgroundColor: 'white'
              }}
            />
          </div>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: '#6b7280',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Date
            </label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#6b7280',
                backgroundColor: 'white'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {steps.map(step => (
              <label
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#6b7280'
                }}
              >
                <input
                  type="checkbox"
                  checked={completedSteps.includes(step.id)}
                  onChange={() => handleStepToggle(step.id)}
                  style={{ 
                    marginRight: '12px', 
                    width: '16px', 
                    height: '16px', 
                    cursor: 'pointer',
                    accentColor: '#d1d5db'
                  }}
                />
                <span>{step.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '12px', 
            fontWeight: '600', 
            color: '#6b7280',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Additional remarks / tasks
          </label>
          <textarea
            value={additionalInfo}
            onChange={(e) => handleInfoChange(e.target.value)}
            placeholder="Please enter any other important notes for the release"
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '14px',
              minHeight: '100px',
              fontFamily: 'inherit',
              color: '#6b7280',
              resize: 'none'
            }}
          />
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            style={{
              padding: '8px 20px',
              backgroundColor: hasChanges && !isSaving ? '#6366f1' : '#e5e7eb',
              color: hasChanges && !isSaving ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '6px',
              cursor: hasChanges && !isSaving ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minWidth: '90px',
              justifyContent: 'center'
            }}
          >
            {isSaving ? (
              <>
                <span style={{ 
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  border: '2px solid #9ca3af',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite'
                }}></span>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
