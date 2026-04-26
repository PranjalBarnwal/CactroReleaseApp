const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getSteps() {
  const response = await fetch(`${API_URL}/steps`);
  return response.json();
}

export async function getReleases() {
  const response = await fetch(`${API_URL}/releases`);
  return response.json();
}

export async function createRelease(data) {
  const response = await fetch(`${API_URL}/releases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function updateRelease(id, name, date) {
  const response = await fetch(`${API_URL}/releases/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, date: new Date(date).toISOString() })
  });
  return response.json();
}

export async function updateSteps(id, completedSteps) {
  const response = await fetch(`${API_URL}/releases/${id}/steps`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completedSteps })
  });
  return response.json();
}

export async function updateInfo(id, additionalInfo) {
  const response = await fetch(`${API_URL}/releases/${id}/info`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ additionalInfo })
  });
  return response.json();
}

export async function deleteRelease(id) {
  await fetch(`${API_URL}/releases/${id}`, {
    method: 'DELETE'
  });
}
