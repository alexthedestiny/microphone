describe("Configuration of Salesforce Live Agent adapter for Inbenta SDK", function() {
  var SalesforceLiveAgent = require('../src/salesforce-live-agent-adapter');
  var salesforceLiveAgent;

  beforeEach(function() {
    salesforceLiveAgent = new SalesforceLiveAgent();
  });

  it("requires 'salesforceLiveAgentRestApi' that contains Salesforce live agent REST API url", function() {
    expect(function() { salesforceLiveAgent.adapter({}) })
      .toThrow(new Error("The Salesforce live agent adapter require a 'salesforceLiveAgentRestApi'. See Salesforse > Setup > Live Agent Settings > Live Agent API Endpoint"));
  });
});
