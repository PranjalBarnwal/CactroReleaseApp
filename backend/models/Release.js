import pool from '../config/db.js';

export const Release = {
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM releases ORDER BY date DESC'
    );
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query(
      'SELECT * FROM releases WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async create(name, date, additionalInfo) {
    const result = await pool.query(
      'INSERT INTO releases (name, date, additional_info) VALUES ($1, $2, $3) RETURNING *',
      [name, date, additionalInfo || null]
    );
    return result.rows[0];
  },

  async update(id, name, date) {
    const result = await pool.query(
      'UPDATE releases SET name = $1, date = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [name, date, id]
    );
    return result.rows[0];
  },

  async updateSteps(id, completedSteps) {
    const result = await pool.query(
      'UPDATE releases SET completed_steps = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [completedSteps, id]
    );
    return result.rows[0];
  },

  async updateInfo(id, additionalInfo) {
    const result = await pool.query(
      'UPDATE releases SET additional_info = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [additionalInfo, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM releases WHERE id = $1', [id]);
  }
};
