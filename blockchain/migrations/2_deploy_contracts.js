const WageRecorder = artifacts.require("WageRecorder");

module.exports = function (deployer) {
  deployer.deploy(WageRecorder);
};
