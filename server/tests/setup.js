// Test setup file
const { supabase } = require('../config/supabase');

// Clean up test data before each test
beforeEach(async () => {
  // Clean up test users (be careful in production!)
  if (process.env.NODE_ENV === 'test') {
    await supabase
      .from('users')
      .delete()
      .like('email', '%@example.com');
  }
});

// Global test timeout
jest.setTimeout(10000);