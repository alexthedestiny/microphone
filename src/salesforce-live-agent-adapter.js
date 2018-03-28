function SalesforceLiveAgent() {
  this.adapter = function(configuration) {
    if (!configuration.salesforceLiveAgentRestApi) {
      throw new Error("The Salesforce live agent adapter require a 'salesforceLiveAgentRestApi'. See Salesforse > Setup > Live Agent Settings > Live Agent API Endpoint");
    }

    return function salesforceLiveAgentAdapter(bot) {
      alert('test');
    }
  }
}

export default SalesforceLiveAgent;
