import { generatePrivacyPolicy, analyzeCompliance, generateDocument, aiService } from '../../lib/ai';

describe('AI Service Utilities', () => {
  describe('generatePrivacyPolicy', () => {
    it('should generate a mock privacy policy', async () => {
      const policy = await generatePrivacyPolicy('Test organization');
      expect(policy).toBeDefined();
      expect(typeof policy).toBe('string');
      expect(policy.length).toBeGreaterThan(0);
      expect(policy).toContain('Datenschutzerklärung');
    });
  });

  describe('analyzeCompliance', () => {
    it('should return mock compliance analysis', async () => {
      const analysis: any = await analyzeCompliance('Test text');
      expect(analysis).toBeDefined();
      expect(typeof analysis).toBe('object');
      expect(analysis.compliant).toBeDefined();
      expect(Array.isArray(analysis.issues)).toBe(true);
      expect(Array.isArray(analysis.recommendations)).toBe(true);
    });
  });

  describe('generateDocument', () => {
    it('should generate a mock document', async () => {
      const document = await generateDocument('test-template', { test: 'data' });
      expect(document).toBeDefined();
      expect(typeof document).toBe('string');
      expect(document.length).toBeGreaterThan(0);
      expect(document).toContain('Generated Document');
    });
  });

  describe('aiService object', () => {
    it('should have all required methods', () => {
      expect(aiService).toBeDefined();
      expect(typeof (aiService as any).generatePrivacyPolicy).toBe('function');
      expect(typeof (aiService as any).analyzeCompliance).toBe('function');
      expect(typeof (aiService as any).generateDocument).toBe('function');
      expect(typeof (aiService as any).checkRateLimit).toBe('function');
    });

    it('should check rate limit successfully', async () => {
      const result = await (aiService as any).checkRateLimit('test-key');
      expect(result).toBe(true);
    });
  });
});
