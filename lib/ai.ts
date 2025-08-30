// AI service integration for local development
// No real AI service required for proof of concept

export async function generatePrivacyPolicy(prompt: string): Promise<string> {
  // Return a mock privacy policy for local development
  return `Datenschutzerklärung

Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)

Test Organization
123 Test Street
Berlin, Germany
contact@test-org.com

1. Allgemeine Informationen

Wir legen großen Wert auf den Schutz Ihrer personenbezogenen Daten. In dieser Datenschutzerklärung informieren wir Sie darüber, welche Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben.

2. Erhebung und Speicherung personenbezogener Daten

Wir erheben und speichern personenbezogene Daten nur im technisch notwendigen Umfang. Personenbezogene Daten sind Informationen, die es ermöglichen, Ihre Identität zu erfahren.

3. Zwecke der Datenverarbeitung

Wir verwenden Ihre personenbezogenen Daten ausschließlich zur Abwicklung unserer Dienstleistungen und zur Kommunikation mit Ihnen.

4. Rechte der betroffenen Person

Sie haben das Recht, Auskunft über die bezüglich Ihrer gespeicherten Daten zu erhalten. Sie haben auch das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung.

5. Änderungen dieser Datenschutzerklärung

Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die Rechtslage ändert.

Stand: ${new Date().toLocaleDateString('de-DE')}`;
}

export async function analyzeCompliance(text: string): Promise<any> {
  // Return mock compliance analysis for local development
  return {
    compliant: true,
    issues: [],
    recommendations: [
      'Consider adding more specific information about data retention periods',
      'Ensure all third-party processors are explicitly named'
    ]
  };
}

export async function generateDocument(template: string, data: any): Promise<string> {
  // Return a mock document for local development
  return `Generated Document

Template: ${template}

Data: ${JSON.stringify(data, null, 2)}

This is a mock document generated for testing purposes.`;
}

// AI service object to satisfy imports in API routes
export const aiService = {
  generatePrivacyPolicy,
  analyzeCompliance,
  generateDocument,
  checkRateLimit: async (key: string) => {
    // No rate limiting for local development
    return true;
  }
};
