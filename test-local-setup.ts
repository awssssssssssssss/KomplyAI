// Test script to verify local development setup
import { getServerSession } from '@/lib/auth';
import { supabase } from '@/lib/db';
import { aiService } from '@/lib/ai';

async function testLocalSetup() {
  console.log('Testing local development setup...');
  
  // Test mock authentication
  const session = await getServerSession();
  console.log('Mock session:', session);
  
  // Test mock database
  const { data: organizationUser, error: organizationUserError } = await supabase
    .from('organization_users')
    .select('*')
    .eq('user_id', 'test@example.com')
    .eq('organization_id', 'mock-org-id')
    .single();
  
  console.log('Organization user:', organizationUser);
  console.log('Organization user error:', organizationUserError);
  
  // Test mock AI service
  const mockPolicy = await aiService.generatePrivacyPolicy('Test organization');
  console.log('Mock privacy policy generated, length:', mockPolicy.length);
  
  console.log('Local development setup test completed successfully!');
}

testLocalSetup().catch(console.error);
