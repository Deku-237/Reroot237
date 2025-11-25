const { supabase } = require('../config/supabase');

async function logActivity(action, data = {}) {
  try {
    await supabase
      .from('activity_logs')
      .insert([{
        action,
        data,
        timestamp: new Date().toISOString(),
        ip_address: data.ip || null,
        user_agent: data.userAgent || null
      }]);
  } catch (error) {
    console.error('Logging failed:', error);
    // Don't throw error to avoid breaking main functionality
  }
}

module.exports = { logActivity };